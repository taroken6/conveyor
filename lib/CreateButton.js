'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreateButton = function CreateButton(_ref) {
  var onClick = _ref.onClick;
  return _react2.default.createElement(
    _reactRouterDom.Link,
    {
      to: '/Create',
      onClick: onClick,
      className: 'btn btn-sm btn-outline-success',
      style: { marginLeft: '10px' },
      role: 'button',
      replace: true
    },
    'Create'
  );
};

exports.default = CreateButton;