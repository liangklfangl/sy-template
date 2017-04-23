const styles = require("../../static/header.less");
import { Select, Menu, Row, Col, Icon, Button, Popover } from 'antd';
import { Link } from 'react-router';
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
const Option = Select.Option;
export default class Header extends React.Component{
   //We dont need to invoke super method manually,this will also be set to prototype chain
   //https://github.com/liangklfangl/babel-compiler-extends
  state = {
     horizontal:true
  }
  /**
   * [componentDidMount Hook function for display mode update]
   * @return {[type]} [description]
   */
  componentDidMount(){
    require('enquire.js').register('only screen and (min-width:320px) and (max-width:992px)',{
      match:()=>{
         this.setState({horizontal:false})
      },
      unmatch:()=>{
        this.setState({horizontal:true});
      }
    });
  }
  /**
   * [render description]
   * @return {[type]} [description]
   */
  render(){
  const { picked } = this.props; 
  //picked专门用于首页这个`组件搜索按钮`
  //picked是我们对所有的组件进行了筛选，得到我们感兴趣的部分
  const {horizontal} = this.state; 
  //We get mode of menu
  const mode = horizontal ? "horizontal" :"inline";
  const menus = [
     <Button type="ghost" className="lang">
       切换语言
     </Button>,
     <Menu mode={mode} className="menu" id="nav">
       <Menu.Item key="home">
          <Link to='/'>
            主页
          </Link>
        </Menu.Item>
        <Menu.Item key="docs/spec">
          <Link to='/docs/spec/introduce'>
            指导
          </Link>
        </Menu.Item>
        <Menu.Item key="docs/react">
          <Link to='/docs/react/introduce'>
            组件
          </Link>
        </Menu.Item>
        <Menu.Item key="docs/pattern">
          <Link to='/docs/pattern/navigation'>
              模式
          </Link>
        </Menu.Item>
        <Menu.Item key="docs/resource">
          <Link to='/docs/resource/download'>
             资源
          </Link>
        </Menu.Item>
     </Menu>
  ];
  const searchText = "搜索组件...";
  const options = picked.components.map((component) =>{
     const componentName = component.meta.filename.split("/")[1];
     //得到组件名称
     const url = `/components/${componentName}`;
     //将这个作为Option的URL，那么选中了就可以跳转了，也就是重新渲染页面了
     const subTitle = component.meta.subtitle;
     //得到组件名称,key设置为url那么每一个组件都有一个独一无二的key
     return (
         <Option value={component.meta.title} key={url}>
           <strong>{component.meta.title}</strong>
           {subTitle && <span>{subTitle}</span>}
         </Option>
      )
  });
  //如果是inline模式，我们在右侧多出一个气泡卡
    return (
         <div className="header">
            <If condition={!this.state.horizontal }>
              <Popover content={menus} overlayStyle={{}} overlayClassName="popover-menu">
                  <Icon type="menu" className="popover-icon"/>
              </Popover>
            </If>
             <Row>
                <Col lg={4} md={6} sm={24} xs={24}>
                  <Link id="logo">
                    <img id="banner" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg"/>
                    <span className="corp">阿里数娱</span>
                  </Link>
                </Col>
                <Col lg={20} md={18} sm={0} xs={0}>
                 <div id="search-box">
                  <Select combobox placeholder={searchText} className="select-content">
                     {options}
                  </Select>
                 </div>
                 {mode == "horizontal" ? menus :null}
                </Col>
             </Row> 
         </div>
        )
  }
}

Header.PropTypes={
  picked :PropTypes.object
}