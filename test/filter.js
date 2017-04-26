const JsonML = require('jsonml.js/lib/utils');
function getStyleNode(contentChildren) {
  return contentChildren.filter(node =>
     isStyleTag(node) ||
      (JsonML.getTagName(node) === 'pre' && JsonML.getAttributes(node).lang === 'css')
  )[0];
}
function isStyleTag(node) {
  return node && JsonML.getTagName(node) === 'style';
}
module.exports = getStyleNode