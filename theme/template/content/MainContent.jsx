import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Row, Col, Menu } from 'antd';
import Doc from "./Doc";
import Article from "./Article";
const SubMenu = Menu.SubMenu;
const styles = require("../../static/main-content.less");
function isNotTopLevel(level) {
  return level !== 'topLevel';
}
//对左侧内容进行分类显示
function getMenuItems(moduleData,) {
  const menuMeta = moduleData.map(item => item.meta);
  const menuItems = {};
  menuMeta.sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  ).forEach((meta) => {
    const category = meta.category || 'topLevel';
    if (!menuItems[category]) {
      menuItems[category] = {};
    }
    const type = meta.type || 'topLevel';
    if (!menuItems[category][type]) {
      menuItems[category][type] = [];
    }
    //每一个{category:{type:[]}},其中category表示是哪一类，component下type的Navigation会有很多组件的
    menuItems[category][type].push(meta);
  });
  return menuItems;
}
function getLocalizedPathname(path, zhCN) {
  const pathname = path.startsWith('/') ? path : `/${path}`;
  //获取具体的路径
  if (!zhCN) { // to enUS
    //英文版的地址为：http://localhost:8001/components/icon/
    //英文版的时候，如果是index-cn那么直接切换到主目录下，否则就是取消-cn部分就可以了
    return /\/?index-cn/.test(pathname) ? '/' : pathname.replace('-cn', '');
  } else if (pathname === '/') {
    return '/index-cn';
  } else if (pathname.endsWith('/')) {
    return pathname.replace(/\/$/, '-cn/');
  }
  return `${pathname}-cn`;
}

/**
 * [getModuleData 根据导航栏点击或者左侧点击确定要传入的数据,如果是component或者docs/components那么topLevel会显示docs/react里面的所有的说明内容标题]
 * @param  {[type]} props [description]
 * @return {[type]}       [description]
 */
function getModuleData(props) {
  const pathname = props.location.pathname;
  const moduleName = /^\/?components/.test(pathname) ?
          'components' : pathname.split('/').filter(item => item).slice(0, 2).join('/');
  const moduleData = moduleName === 'components' || moduleName === 'docs/react' ||
          moduleName === 'changelog'?
          [...props.picked.components, ...props.picked['docs/react'], ...props.picked.changelog] :
          props.picked[moduleName];
  return moduleData;
}

function fileNameToPath(filename) {
const snippets = filename.replace(/(\/index)?((\.zh-CN)|(\.en-US))?\.md$/i, '').split('/');
  return snippets[snippets.length - 1];
}

export default class MainContent extends React.Component{
 constructor(props){
 	super(props);
 }
//产生菜单项
 generateMenuItem(isTop, item) {
    const key = fileNameToPath(item.filename);
     //更新title防止报错，因为迭代出来的是一个对象
    const text = isTop ?
            item.title : [
              <span key="english">{item.title}</span>,
              <span className="chinese" key="chinese">{item.subtitle}</span>
            ];
    const disabled = item.disabled;
    const url = item.filename.replace(/(\/index)?((\.zh-CN)|(\.en-US))?\.md$/i, '').toLowerCase();
    const child = !item.link ? (
      <Link to={url} disabled={disabled}>
           {text}
      </Link>
    ) : (
      <a href={item.link} target="_blank" rel="noopener noreferrer" disabled={disabled}>
        {text}
      </a>
    );
    return (
      <Menu.Item key={key.toLowerCase()} disabled={disabled}>
        {child}
      </Menu.Item>
    );
  }
 //产生最顶级的菜单项
 generateSubMenuItems(obj) {
    const topLevel = (obj.topLevel || []).map(this.generateMenuItem.bind(this, true));
    //这是没有指定category的那些内容(目前只有components文件夹下有category为`component`，也就是在页面左侧一级的菜单 
    const itemGroups = Object.keys(obj).filter(isNotTopLevel) 
      .map((type, index) => {
        const groupItems = obj[type].sort((a, b) => {
          return a.title.charCodeAt(0) -
          b.title.charCodeAt(0);
        }).map(this.generateMenuItem.bind(this, false));
        return (
          <Menu.ItemGroup title={type} key={index}>
            {groupItems}
          </Menu.ItemGroup>
        );
      });
    return [...topLevel, ...itemGroups];
  }

 getMenuItems(){
   const moduleData = getModuleData(this.props);
 	//首先根据最上面的导航栏选择当前要显示的左侧的导航栏是那些内容
   const menuItems = getMenuItems(moduleData);
   //根据需要的数据产生按照Menu.Item排列好的对象，按照category和type进行分类，其中签名为:{category:{type:[]}}
   const topLevel = this.generateSubMenuItems(menuItems.topLevel);
   //'topLevel'，也就是不属于特定category的先产生一个Menu.Item，因为他们是不用产生SubMenu的
   //而且当你点击不同的顶部导航栏，那么因为moduleData不一样，所以这里的topLevel也是不一样的!!!!
    const subMenu = Object.keys(menuItems).filter(isNotTopLevel)
      .map((category) => {
        const subMenuItems = this.generateSubMenuItems(menuItems[category]);
        return (
          <SubMenu title={<h4>{category}</h4>} key={category}>
            {subMenuItems}
          </SubMenu>
        );
      });
    return [...topLevel, ...subMenu];
 }

 //第二个Col表示在sm和xs下也独自占据一行
 render(){
 	console.log('MainContent this.props:',this.props);
    const props = this.props;
    //是为了显示当前选中的菜单的key数组
    const menuItems = this.getMenuItems();
    //得到所有的Menu.Item对象
 	return (
            <Row className="main-container-row">
               <Col lg={4} md={6} sm={24} xs={24}>
                 <Menu mode="inline" >
                   {menuItems}
		            </Menu>
               </Col>
           <Col  lg={20} md={18} sm={24} xs={24} className="main-container">
             <Choose>
    				  <When condition={ props.demos }>
    				    <Doc {...props} demos={props.demos}/>
    				  </When>
    				  <Otherwise>
    				    <Article {...props}/>
    				  </Otherwise>
    		  	 </Choose>
            </Col>
          </Row>
 		)
 }
} 