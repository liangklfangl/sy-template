import React from "react";
import Demo from "./Demo";
import EditButton from "./EditButton";
import {Row , Col,Icon} from "antd";
import classNames from  'classnames';
import {jsonmlReactLoader} from "../../../mock/jsonmlReactLoader";
const styles = require("../../static/demo-page.less");
import { getChildren } from 'jsonml.js/lib/utils';
/**
 * [这个组件用于显示有demo的页面，像组件Components下都是有demo属性的，这时候可能有分成两列来展示Demo]
 * @param  {[type]} props [description]
 * @return {[type]}       [description]
 */
export default class DemoPage extends React.Component{
 
  state = {
    expandAll : false
  };
  
 handleExpandToggle = ()=>{
   this.setState({ expandAll: !this.state.expandAll});
 }
  render(){
 
   console.log("demopage",this.props);
   //得到这个组件的index.md的说明内容用于显示,demo表示哪些例子
   const {demo,index} = this.props.pageData;
   //得到我们的index.md的内容(dora-plugin-antd)
   const {api,content,meta} = index;
   const {title,subtitle,filename} = meta;
   const utils = this.props.utils;
   //我们继续来获取demo页面应该有的demo内容
   const demos = this.props.demos;
   const leftDemos = [];
   const rightDemos = [];
   //分为左边的Demo和右边两处
   const expandTriggerClass = classNames({
      'code-box-expand-trigger': true,
      'code-box-expand-trigger-active': !!this.state.expandAll,
    });
   Object.keys(demos).forEach((key,index)=>{
     //为我们每一个demo都手动添加jsonmlReactLoader方法
     demos[key].jsonmlReactLoader = jsonmlReactLoader;

     if(index % 2 == 0){
      //父组件要通知子组件重新渲染才行
     	  leftDemos.push(
              <Demo key={index} codeExpand={this.state.expandAll} utils={utils} {...demos[key]}/>
     	  	);
     }else{
     	  rightDemos.push(
             <Demo key={index} codeExpand={this.state.expandAll} utils={utils} {...demo[key]}/>
     	  	);
     }
   });
   console.log("含有Demo的页面内容:",leftDemos);
      	return (
                <div className="markdown">
                   <h1>
                      <span>{title}</span>
                      <span>{subtitle}</span>
                      <EditButton title={title} filename={filename} />
                   </h1> 
                    <If condition={content}>
                      {utils.toReactComponent(content)}
                    </If>
                    {/*这里的h2是代码演示部分*/}
                    <h2>
                      <span>代码演示</span>
                      <Icon type="appstore" className={expandTriggerClass}
                      title="展开全部代码" onClick={this.handleExpandToggle}
                     />
                    </h2>
                    <Row className="demo-row" gutter={16}>
                        <Col lg={12} md={12} sm={24} xs={24}>
                           {leftDemos}
                        </Col>
                         <Col lg={12} md={12} sm={24} xs={24}>
                           {rightDemos}
                        </Col>
                    </Row>
                    <If condition={api}>
                      {utils.toReactComponent(["article",{className:'markdown api-container'}].concat(getChildren(api)))}
                    </If>
                </div>
      		)
    }
}