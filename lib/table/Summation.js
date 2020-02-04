"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Summation = void 0;

var _react = _interopRequireDefault(require("react"));

var _consts = require("../consts");

var _getType = require("../utils/getType");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getCurrencyTotal = function getCurrencyTotal(_ref) {
  var fieldName = _ref.fieldName,
      data = _ref.data;
  var sumString;

  if (data.length >= 1) {
    var sum = data.map(function (node) {
      return node[fieldName];
    }).reduce(function (prev, curr) {
      return prev + curr;
    });
    sumString = "".concat(sum);
  } else {
    sumString = 'N/A';
  }

  return sumString !== 'N/A' ? "$".concat(sumString) : sumString;
};

var Summation = function Summation(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      fieldName = _ref2.fieldName,
      summary = _ref2.summary,
      customProps = _ref2.customProps;
  console.log('In summation', summary);
  return _react["default"].createElement("span", null, summary ? "$".concat(summary) : 'N/A');
};

exports.Summation = Summation;