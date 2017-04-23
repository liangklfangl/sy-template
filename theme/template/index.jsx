const path = require('path');
const contentTmpl = './content/index.jsx';
const layoutTemp = './template/Layout/index.jsx';
const homeTmpl = './template/home/index.jsx';
function pickerGenerator(module) {
}

module.exports = {
  categoryOrder: {
    十大原则: 0,
    Principles: 0,
    设计基础: 1,
    'Design Fundamental': 1,
  },

  //Components中每一个都是一个数组
  typeOrder: {
    General: 0,
    Layout: 1,
    Navigation: 2,
    'Data Entry': 3,
    'Data Display': 4,
    Feedback: 5,
    Localization: 6,
    Other: 7,
  },
  docVersions: {
   
  },
  routes: {
  	path:'/',
  	component:layoutTemp,
    indexRoute: { component: homeTmpl },
    //when initialize layoutTemp, we will also initialize homeTemp as child router
    //in layoutTemp, we will devide our html page into three parts, header,footer,content,
    //while content will be replaced by child router content
    childRoutes: [
    {
      path: 'index-cn',
      component: homeTmpl,
      dataPath: '/',
    },
    //if you visit '/index-cn', we also initialize homeTempl
      // { 
      //   path: 'components/:children/', 
      //   //So, 'components/Button/demos/basic' will not work, we just care about 'components/Button/'
      //   component: contentTmpl
      // },
       {
       path: 'docs/react/:children',
       component: contentTmpl,
      },
      //If we click 'component' panel, we will initialize contentTmpl
      //  {
      //   path: 'components/:children/',
      //   component: contentTmpl,
      // }
      //这里只是用于替换this.props.children而已，其中父组件中Header,Footer正常实例化
      //If you click 'component' panel, content part of layoutTemp will be replaced by contentTmpl!
      //this time collect function will be revoked and left part and right part of content will be recalculated
      //while header and footer part stand still
    ]
    //path relative to cwd/theme/template
    //Every component instantiated will receive a util object to translate jsonml to react Component
  }
};