import React from "react";
import EditButton from "./EditButton";
import { getChildren,getAttribute } from 'jsonml.js/lib/utils';
const styles = require("../../static/article.less");
/**
 * [这个组件用于显示没有demo的页面，如那些topLevel级别的markdown文件，而像组件Components下都是有demo属性的
 *  所以这个组件会接收到整个this.props作为props传入
 * ]
 * @param  {[type]} props [description]
 * @return {[type]}       [description]
 */
export default (props)=>{
   const {content, description,meta} = props.pageData;
   //title是一级标题，description是说明(来自于dora-plugin-description)，content是处理description的部分
   const {title,subtitle,filename} = meta;
   //meta部分的title,subtile,filename属性
   console.log('Article组件中的content部分:',content);
    	return (
        <article className="markdown">
          <h1>
            {title}
             <If condition={subtitle}>
                 <span className="subtitle">{subtitle}</span>
             </If>
            <EditButton title={title} filename={filename} />
          </h1>
	       <If condition={description}>
	           {props.utils.toReactComponent(['section', { className: 'markdown' }].concat(getChildren(description)))}
	       </If>
          <If condition={content}>
             {props.utils.toReactComponent(['section', { className: 'markdown' }].concat(getChildren(content)))}
          </If>
        </article>
    )
}