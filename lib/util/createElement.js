'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
module.exports = function createElement(Component, props) {
  var dynamicPropsKey = props.location.pathname;
  return React.createElement(Component, (0, _extends3.default)({}, props, Component[dynamicPropsKey]));
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;