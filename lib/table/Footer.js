"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TFoot = void 0;

var _react = _interopRequireDefault(require("react"));

var _schemaGetters = require("../utils/schemaGetters");

var _Utils = require("../Utils");

var R = _interopRequireWildcard(require("ramda"));

var _getType = require("../utils/getType");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TFoot = function TFoot(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      parentModelName = _ref.parentModelName,
      parentFieldName = _ref.parentFieldName,
      fieldOrder = _ref.fieldOrder,
      summary = _ref.summary,
      fromIndex = _ref.fromIndex,
      customProps = _ref.customProps;

  var getSummaryPath = function getSummaryPath(fieldName) {
    return fromIndex ? [modelName, fieldName] : [parentModelName, parentFieldName, fieldName];
  };

  var checkFooterField = function checkFooterField(fieldName) {
    var summaryPath = getSummaryPath(fieldName);
    var schemaPath = [modelName, 'fields', fieldName, 'showFooter'];
    return R.path(summaryPath, summary) && R.path(schemaPath, schema);
  };

  var showFooter = R.any(checkFooterField, fieldOrder);

  if (!showFooter) {
    return null;
  }

  return _react["default"].createElement("tfoot", null, _react["default"].createElement("tr", null, fieldOrder.map(function (fieldName, idx) {
    if (fromIndex === true) {
      var displayCondition = R.prop('index', (0, _schemaGetters.getFieldConditions)(schema, modelName, fieldName));

      if ((0, _Utils.shouldDisplay)({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        displayCondition: displayCondition,
        customProps: customProps
      }) === false) {
        return null;
      }
    }

    if (!checkFooterField(fieldName)) {
      return _react["default"].createElement("th", {
        key: "".concat(idx, "-").concat(modelName, "-").concat(fieldName)
      });
    }

    var summaryPath = getSummaryPath(fieldName);
    var total = R.path(summaryPath, summary);
    if ((0, _getType.getType)({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName
    }) === 'currency') total = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(total);
    return _react["default"].createElement("th", {
      key: "".concat(idx, "-").concat(modelName, "-").concat(fieldName),
      style: {
        minWidth: '130px'
      }
    }, _react["default"].createElement("div", {
      className: "footer"
    }, _react["default"].createElement("div", {
      className: "sum"
    }, total)));
  })));
};

exports.TFoot = TFoot;