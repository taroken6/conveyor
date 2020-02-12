"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailSummation = exports.Summation = void 0;

var _react = _interopRequireDefault(require("react"));

var _consts = require("../consts");

var R = _interopRequireWildcard(require("ramda"));

var _schemaGetters = require("../utils/schemaGetters");

var _getType = require("../utils/getType");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Summation = function Summation(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldName = _ref.fieldName,
      summary = _ref.summary,
      customProps = _ref.customProps;
  var total;

  if (summary && summary[modelName]) {
    var currentTotal = R.path([modelName, fieldName], summary);
    if (currentTotal === undefined) total = 'N/A';else if ((0, _getType.getType)({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName
    }) === 'currency') total = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(currentTotal);
  } else {
    total = 'N/A';
  }

  return _react["default"].createElement("span", null, total);
};

exports.Summation = Summation;

var DetailSummation = function DetailSummation(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      fieldName = _ref2.fieldName,
      parentModelName = _ref2.parentModelName,
      parentFieldName = _ref2.parentFieldName,
      summary = _ref2.summary,
      customProps = _ref2.customProps;
  var total;

  if (summary) {
    if ((0, _getType.getType)({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName
    }) === 'currency') {
      var fieldTotal = R.path([parentModelName, parentFieldName, fieldName], summary);

      if (fieldTotal !== undefined) {
        total = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(fieldTotal);
      } else {
        total = 'N/A';
      }
    } else {
      total = 'N/A';
    }

    return _react["default"].createElement("span", null, total);
  }
};

exports.DetailSummation = DetailSummation;