import React from 'react';
import { Link } from 'react-router';
import toReactElement from 'jsonml-to-react-element';
import JsonML from 'jsonml.js/lib/utils';

function isHeading(node) {
  return /h[1-6]/i.test(JsonML.getTagName(node));
}
/**
 * [generateSluggedId 为我们的H1-H6标签生产ID]
 * @param  {[type]} children [description]
 * @return {[type]}          [description]
 */
function generateSluggedId(children) {
  const headingText = children.map((node) => {
    if (JsonML.isElement(node)) {
      if (JsonML.hasAttributes(node)) {
        return node[2] || '';
      }
      return node[1] || '';
    }
    return node;
  }).join('');
  //得到标题的内容,如[ 'article', [ 'h2', 'hello' ], [ 'h2', 'world' ] ]
  const sluggedId = headingText.trim().replace(/\s+/g, '-');
  //多个空格之间使用"_"来替换
  return sluggedId;
}
//如果函数返回一个对象，那么要用小括号括起来。所以这些jsonml都会传入到converter中
module.exports = () =>
   ({
     converters: [
       [node => JsonML.isElement(node) && isHeading(node), (node, index) => {
         const children = JsonML.getChildren(node);
         //得到h标签的内容，也就是我们的标题本身，如"API"
         const sluggedId = generateSluggedId(children);
         //生成ID
         return React.createElement(JsonML.getTagName(node), {
           key: index,
           id: sluggedId,
           ...JsonML.getAttributes(node),
           //H1-h6标签本身的属性保持不变
         }, [
           <span key="title">{children.map(child => toReactElement(child))}</span>,
           <a href={`#${sluggedId}`} className="anchor" key="anchor">#</a>,
         ]);
         //childElement
       }]
     ],
   })
;