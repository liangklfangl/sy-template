import React from "react";
import ReactDOM from "react-dom";
const styles = require("../../static/demo.less");
const hightlight = require("../../static/highlight");
import { getChildren } from 'jsonml.js/lib/utils';
import classNames from 'classnames';
import {Icon} from "antd";
import EditButton from "./EditButton";
const highlightStyleMock = require("../../../mock/highlightStyle");
export default class Demo extends React.Component {
   constructor(props){
     super(props);
   }
    state = {
   	  codeExpand:false
     };
   //panel收缩张开
   handleCodeExpand = ()=>{
     this.setState({codeExpand : !this.state.codeExpand});
   }
   //父组件传递了codeExpand也要重新渲染子组件
   //this.state.codeExpand || this.props.codeExpand表示上次组件的状态~
   //nextProps.codeExpand || nextState.codeExpand表示组件的下次状态~
   shouldComponentUpdate(nextProps,nextState){
     return (this.state.codeExpand || this.props.codeExpand)!==(nextProps.codeExpand || nextState.codeExpand)
   }
   render(){
    //我们手动添加highlightStyle
  const {content,highlightedCode,meta,jsonmlReactLoader} = this.props;
	 //详见dora-plugin-antd，content是一个对象有{zh-CN:{},en-US:{}}属性(Demo页面含有中文和英文两部分)
	 //highlightedCode是demo页面中的"pre标签"与pre标签含有的jsx语言和hightlighted属性(通过prisme高亮显示)
   const {highlightedStyle, style} = this.props;
   //获取到我们在demo里面写入内联style(调控demo的样式)和highlightedStyle(已经高亮的用于原样显示的代码)
	 const utils = this.props.utils;
	 const localTitle = meta.title["zh-CN"];
	 //获取title
	 const localContent = content["zh-CN"];
	 //直接调用我们的元素的toReactComponent就可以了，其中处理的逻辑通过dora-plugin-highlighted来完成
	 const liveDemo = this.props.jsonmlReactLoader(React, ReactDOM);
	 const { codeExpand } = this.props;
   //父组件传递过来codeExpand
   const classHighlightCode = classNames({
         'code-box': true,
          expand: this.state.codeExpand || codeExpand,
	 });
   const highlightedWrapperClss = classNames({
      'highlight-wrapper': true,
      'highlight-wrapper-expand': this.state.codeExpand || codeExpand,
   });
   //高亮显示的代码部分
     return (
      <div className={classHighlightCode}>
         <div  className="code-box-demo">
           {liveDemo}
           <If condition={style}>
             {
               <style dangerouslySetInnerHTML={{ __html: style }}/>
             }
           </If>
         </div>
         <div className="code-title-wrapper">
          <div className="code-title">{localTitle}</div>
          <EditButton title="github上编辑" filename="http://github.com"/>
         </div>
          <div className="code-content-description">{localContent}</div>
           <Icon type="down-circle-o" title="Show Code" className="collapse" onClick={this.handleCodeExpand} />
          <div className={highlightedWrapperClss}>
               {utils.toReactComponent(highlightedCode)}
              <If condition={highlightStyleMock}>
               <div key="style" className="highlight">
                  {/*toReactComponent只有显示属性中hightlight属性的功能，见dora-plugin-highlight*/}
                   <pre>
                      <code dangerouslySetInnerHTML={{__html:highlightStyleMock}}>
                      </code>
                   </pre>
                </div>
              </If>
          </div>
      </div>
  	)
   }
}