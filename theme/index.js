const path = require('path');
const contentTmpl = './template/content/index.jsx';
const layoutTemp = './template/Layout/index.jsx';
const homeTmpl = './template/home/index.jsx';
module.exports = {
  routes: {
  	path:'/',
  	component:layoutTemp,
    indexRoute: { component: homeTmpl },
    //when initialize layoutTemp, we will also initialize homeTemp
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
       {
       path: 'docs/spec/:children',
       component: contentTmpl,
      },
       {
       path: 'docs/resource/:children',
       component: contentTmpl,
      },
      {
       path: 'docs/pattern/:children',
       component: contentTmpl,
      },
        {
        path: 'components/:children/',
        component: contentTmpl,
      }
      //此时只有path最后含有"/"才会实例化这个组件，比如"components/alert/"
      //而"components/alert"不会实例化
    ]
   
  }
};