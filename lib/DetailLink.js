'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DetailLink = function DetailLink(_ref) {
  var modelName = _ref.modelName,
      id = _ref.id,
      children = _ref.children;
  return _react2.default.createElement(
    _reactRouterDom.Link,
    { to: '/' + modelName + '/' + id },
    children
  );
};

exports.default = DetailLink;