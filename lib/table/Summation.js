"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Summation = void 0;

var _react = _interopRequireDefault(require("react"));

var _consts = require("../consts");

var _getType = require("../utils/getType");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Summation = function Summation(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldName = _ref.fieldName,
      summary = _ref.summary,
      customProps = _ref.customProps;
  return _react["default"].createElement("span", null, summary && summary[fieldName] ? "$".concat(summary[fieldName]) : 'N/A');
};

exports.Summation = Summation;