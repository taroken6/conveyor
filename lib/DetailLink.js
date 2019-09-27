"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DetailLink = function DetailLink(_ref) {
  var modelName = _ref.modelName,
      id = _ref.id,
      children = _ref.children;
  return _react["default"].createElement(_reactRouterDom.Link, {
    to: "/".concat(modelName, "/").concat(id)
  }, children);
};

var _default = DetailLink;
exports["default"] = _default;