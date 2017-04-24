'use strict';
const chain = require('ramda/src/chain');
const toReactComponent = require('jsonml-to-react-component');
//jsonml-to-react-component
const exist = require('exist.js');
const NotFound = require('./theme/template/NotFound.jsx');
//replace dynamic param with truely passed param value
function calcPropsPath(dataPath, params) {
  return Object.keys(params).reduce(
    (path, param) => path.replace(`:${param}`, params[param]),
    dataPath
  );
}
//Some dynamic parameter injected
function hasParams(dataPath) {
  return dataPath.split('/').some((snippet) => snippet.startsWith(':'));
}
//collect的方法第一个参数为nextProps，该参数会传入到callback的第二个参数中作为调用的nextProps
//callback中的err是一个null
function defaultCollect(nextProps, callback) {
  callback(null, nextProps);
}

module.exports = function getRoutes(data) {
  const plugins = data.plugins;
  //其中markdowndata中的plugins表示的是哪些用于将jsonml转化为components的组件本身
  const converters = chain((plugin) => plugin.converters || [], plugins);
  //在浏览器环境中通过这些plugin的converters进行转化
  const utils = {
    get: exist.get,
    toReactComponent(jsonml) {
      return toReactComponent(jsonml, converters);
    },
  };
  plugins.map((plugin) => plugin.utils || {})
    .forEach((u) => Object.assign(utils, u));
   //将每一个plugin的util都封装到最后的util中返回
   
  function templateWrapper(template, dataPath = '') {
   const Template = require('./theme/template' + template.replace(/^\.\/template/, ''));
   //找到组件，我们加载到这个组件
    return (nextState, callback) => {
      const propsPath = calcPropsPath(dataPath, nextState.params);
      //替代URL中动态参数部分
      const pageData = exist.get(data.markdown, propsPath.replace(/^\//, '').replace(/\/$/,"").split('/'));
      //得到这个URL对应的数据
      const collect = Template.collect || defaultCollect;
      //我们调用该组件中的collect方法(如果不存在就直接调用我们这个默认的collect方法)，将我们提供的数据和
      //nextState组合起来，包括{data:data.markdown,picked:data.picked,pageData,util,nextState}
      collect(Object.assign({}, nextState, {
        data: data.markdown,
        picked: data.picked,
        pageData,
        //page data is for special html page based on url
        utils,
      }), (err, nextProps) => {
        const Comp = (hasParams(dataPath) || pageData) && err !== 404 ?
        Template.default || Template : NotFound.default || NotFound;
        //不管你是调用我们提供的默认方法，还是组件本身我们都会执行这个回调，那么就会实例化这个组件并传入参数 
        const dynamicPropsKey = nextState.location.pathname;
        //下一个要实例化的组件的路径
        Comp[dynamicPropsKey] = nextProps;
        //In create-element.js, we do that. <Component {...props} {...Component[dynamicPropsKey]} />
        //something as bellow
        //实例化组件的时候我们会将nextProps全部原样传入到组件实例化
        callback(err === 404 ? null : err, Comp);
        //https://react-guide.github.io/react-router-cn/docs/guides/advanced/DynamicRouting.html
        //callback of react-router natively
      });
    };
  }
  const theme = require('./theme');
  //这是我们的mdw的配置文件
  const routes = Array.isArray(theme.routes) ? theme.routes : [theme.routes];
  //得到我们配置文件中的routes部分用于react-router路由
  function processRoutes(route) {
    if (Array.isArray(route)) {
    	//map is used to manipulate some object
      return route.map(processRoutes);
    }
    return Object.assign({}, route, {
      onEnter: () => {
        if (typeof document !== 'undefined') {
        }
      },
      component: undefined,
      //Same as component but asynchronous, useful for code-splitting.
      //https://github.com/liangklfang/react-router/blob/master/docs/API.md#getcomponentsnextstate-callback
      //http://www.mtons.com/content/61.htm
      getComponent: templateWrapper(route.component, route.dataPath || route.path),
      //templateWrapper返回的是一个函数，接收nextState和callback回调，这是react-router对getComponent规定
      indexRoute: route.indexRoute && Object.assign({}, route.indexRoute, {
        component: undefined,
        //对于indexRoute继续进行同样的处理
        getComponent: templateWrapper(
          route.indexRoute.component,
          route.indexRoute.dataPath || route.indexRoute.path
        ),
      }),
      //对于childRoutes继续进行同样的处理
      childRoutes: route.childRoutes && route.childRoutes.map(processRoutes),
    });
  }
  const processedRoutes = processRoutes(routes);
  //对每一个路由进行处理转化为动态路由
  processedRoutes.push({
    path: '*',
    getComponents: templateWrapper('/NotFound.jsx'),
  });
 //Here is default router!
  return processedRoutes;
};
