import React from 'react';
import { Link } from 'react-router';
import toReactElement from 'jsonml-to-react-element';
import JsonML from 'jsonml.js/lib/utils';

function isHeading(node) {
  return /h[1-6]/i.test(JsonML.getTagName(node));
}

function isZhCN(pathname) {
  return /-cn\/?$/.test(pathname);
}

function makeSureComonentsLink(pathname) {
  const pathSnippets = pathname.split('#');
  if (pathSnippets[0].indexOf('/components') > -1 && !pathSnippets[0].endsWith('/')) {
    pathSnippets[0] = `${pathSnippets[0]}/`;
  }
  return pathSnippets.join('#');
}

function toZhCNPathname(pathname) {
  const pathSnippets = pathname.split('#');
  pathSnippets[0] = `${pathSnippets[0].replace(/\/$/, '')}-cn`;
  return makeSureComonentsLink(pathSnippets.join('#'));
}

/**
 * [generateSluggedId Generate id]
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
  const sluggedId = headingText.trim().replace(/\s+/g, '-');
  //"When to use" will be changed to "When-to-use"
  return sluggedId;
}
//如果函数返回一个对象，那么要用小括号括起来
module.exports = (_, props) =>
   ({
     converters: [
       [node => JsonML.isElement(node) && isHeading(node), (node, index) => {
         const children = JsonML.getChildren(node);
         const sluggedId = generateSluggedId(children);
         //生成ID
         return React.createElement(JsonML.getTagName(node), {
           key: index,
           id: sluggedId,
           ...JsonML.getAttributes(node),
         }, [
           <span key="title">{children.map(child => toReactElement(child))}</span>,
           <a href={`#${sluggedId}`} className="anchor" key="anchor">#</a>,
         ]);
         //childElement
       }]
     ],
   })
;