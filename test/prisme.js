'use strict';

const Prism = require('node-prismjs');
//An adapter which make it easier to use Prism in Node.js.
const JsonML = require('jsonml.js/lib/utils');
function getCode(node) {
  return JsonML.getChildren(
    JsonML.getChildren(node)[0] || ''
    //Children of pre tagName is code, so we firstly get code Element by which we get true code!
  )[0] || '';
}
function highlight(node) {
  if (!JsonML.isElement(node)) return;
  //We just highlight those elements with tag of pre.
  if (JsonML.getTagName(node) !== 'pre') {
    JsonML.getChildren(node).forEach(highlight);
    return;
  }
  const language = Prism.languages[JsonML.getAttributes(node).lang] ||
          Prism.languages.autoit;
          console.log(">>>>>>>>",Prism.highlight(getCode(node), language));
  //Get attribute of language of pre Element
  JsonML.getAttributes(node).highlighted =
    Prism.highlight(getCode(node), language);
}

module.exports = (markdownData) => {
  highlight(markdownData.content);
  return markdownData;
};
