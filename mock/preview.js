'use strict';

/* eslint-disable no-var */
var React = require('react');
module.exports = function() {
  return {
    converters: [
      [
        function(node) { return typeof node === 'function'; },
        //in jsonml, we care about node of function because in jsonml-react-loader, we return a function
        function(node, index) {
          return React.cloneElement(node(), { key: index });
          //we invoke function to get ReactElement
        },
      ],
    ],
  };
};
