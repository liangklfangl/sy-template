'use strict';

var React = require('react');
var JsonML = require('jsonml.js/lib/utils');
module.exports = function () {
  return {
    converters: [
    //this is from https://github.com/benjycui/jsonml-to-react-element
    [function (node) {
      return JsonML.isElement(node) && JsonML.getTagName(node) === 'pre';
    }, function (node, index) {
      var attr = JsonML.getAttributes(node);
      return React.createElement('pre', {
        key: index,
        className: 'language-' + attr.lang
      }, React.createElement('code', {
        dangerouslySetInnerHTML: { __html: attr.highlighted }
      }));
    }]]
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;