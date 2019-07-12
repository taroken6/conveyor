'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Popover = exports.PopoverContent = undefined;

var _reactTippy = require('react-tippy');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopoverContent = exports.PopoverContent = function PopoverContent(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    { style: {
        'textAlign': 'justify',
        'textJustify': 'interWord',
        'overflowY': 'scroll',
        'maxHeight': '250px',
        'paddingRight': '8px'
      } },
    children
  );
};
var Popover = exports.Popover = function Popover(_ref2) {
  var labelValue = _ref2.labelValue,
      Content = _ref2.Content;

  return _react2.default.createElement(
    _reactTippy.Tooltip,
    {
      theme: 'light',
      trigger: 'mouseenter click',
      interactive: 'true',
      position: 'left',
      html: Content
    },
    _react2.default.createElement(
      'a',
      { href: '#' },
      labelValue
    )
  );
};