"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CreateButton = function CreateButton(_ref) {
  var onClick = _ref.onClick;
  return _react["default"].createElement(_reactRouterDom.Link, {
    to: "/Create",
    onClick: onClick,
    className: "btn btn-sm btn-outline-success",
    style: {
      marginLeft: '10px'
    },
    role: "button",
    replace: true
  }, "Create");
};

var _default = CreateButton;
exports["default"] = _default;