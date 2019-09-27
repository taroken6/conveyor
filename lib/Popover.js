"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Popover = exports.PopoverContent = void 0;

var _reactTippy = require("react-tippy");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PopoverContent = function PopoverContent(_ref) {
  var children = _ref.children;
  return _react["default"].createElement("div", {
    style: {
      'textAlign': 'justify',
      'textJustify': 'interWord',
      'overflowY': 'scroll',
      'maxHeight': '250px',
      'paddingRight': '8px'
    }
  }, children);
};

exports.PopoverContent = PopoverContent;

var Popover = function Popover(_ref2) {
  var labelValue = _ref2.labelValue,
      Content = _ref2.Content;
  return _react["default"].createElement(_reactTippy.Tooltip, {
    theme: "light",
    trigger: "mouseenter click",
    interactive: "true",
    position: "left",
    html: Content
  }, _react["default"].createElement("a", {
    href: "#"
  }, labelValue));
};

exports.Popover = Popover;