"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Summation = void 0;

var _react = _interopRequireDefault(require("react"));

var consts = _interopRequireWildcard(require("../consts"));

var R = _interopRequireWildcard(require("ramda"));

var _Utils = require("../Utils");

var _schemaGetters = require("../utils/schemaGetters");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSum = function getSum(_ref) {
  var modelName = _ref.modelName,
      fieldName = _ref.fieldName,
      data = _ref.data;
  var sumString;

  if (data.length >= 1) {
    var sum = data.map(function (node, idx) {
      return node[fieldName];
    }).reduce(function (prev, curr) {
      return prev + curr;
    });
    sumString = "$".concat(sum);
  } else {
    sumString = 'N/A';
  }

  return sumString;
};

var Summation = function Summation(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      fieldName = _ref2.fieldName,
      data = _ref2.data;
  // getSum({ modelName, fieldName })
  var total = getSum({
    modelName: modelName,
    fieldName: fieldName,
    data: data
  });
  return _react["default"].createElement("span", null, " Total: ".concat(total));
};

exports.Summation = Summation;