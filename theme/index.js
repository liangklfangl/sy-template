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
      //If we click 'component' panel, we will initialize contentTmpl
        {
        path: 'components/:children/',
        component: contentTmpl,
      }
      //If you click 'component' panel, content part of layoutTemp will be replaced by contentTmpl!
      //this time collect function will be revoked and left part and right part of content will be recalculated
      //while header and footer part stand still
    ]
    //path relative to cwd/theme/template
    //Every component instantiated will receive a util object to translate jsonml to react Component
  }
};