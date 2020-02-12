"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Footer = exports.TFoot = void 0;

var _react = _interopRequireDefault(require("react"));

var _schemaGetters = require("../utils/schemaGetters");

var _Utils = require("../Utils");

var _Summation = require("./Summation");

var R = _interopRequireWildcard(require("ramda"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TFoot = function TFoot(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      parentModelName = _ref.parentModelName,
      parentFieldName = _ref.parentFieldName,
      fieldOrder = _ref.fieldOrder,
      data = _ref.data,
      summary = _ref.summary,
      fromIndex = _ref.fromIndex,
      customProps = _ref.customProps,
      user = _ref.user;
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

    var showFooterInfo = fromIndex ? (0, _Utils.isFooterShown)({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      user: user
    }) : (0, _Utils.isDetailFieldFooterShown)({
      schema: schema,
      parentModelName: parentModelName,
      parentFieldName: parentFieldName,
      modelName: modelName,
      fieldName: fieldName,
      user: user
    });
    var shownFooters;
    return _react["default"].createElement("th", {
      key: "".concat(idx, "-").concat(modelName, "-").concat(fieldName),
      style: {
        minWidth: '130px'
      }
    }, _react["default"].createElement(Footer, {
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      parentModelName: parentModelName,
      parentFieldName: parentFieldName,
      title: showFooterInfo ? (0, _schemaGetters.getFooterLabel)({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        data: data,
        customProps: customProps
      }) : false,
      summary: summary,
      fromIndex: fromIndex,
      showFooterInfo: showFooterInfo,
      shownFooters: shownFooters,
      customProps: customProps
    }));
  })));
};

exports.TFoot = TFoot;

var Footer = function Footer(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      fieldName = _ref2.fieldName,
      parentModelName = _ref2.parentModelName,
      parentFieldName = _ref2.parentFieldName,
      title = _ref2.title,
      summary = _ref2.summary,
      fromIndex = _ref2.fromIndex,
      showFooterInfo = _ref2.showFooterInfo,
      customProps = _ref2.customProps;
  return _react["default"].createElement("div", {
    className: "footer"
  }, _react["default"].createElement("div", {
    className: "sum"
  }, _react["default"].createElement("span", {
    className: "footer-title"
  }, title ? "Total ".concat(title, ": ") : null), fromIndex ? showFooterInfo && _react["default"].createElement(_Summation.Summation, {
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    summary: summary,
    customProps: customProps
  }) : showFooterInfo && _react["default"].createElement(_Summation.DetailSummation, {
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    parentModelName: parentModelName,
    parentFieldName: parentFieldName,
    summary: summary,
    customProps: customProps
  })));
};

exports.Footer = Footer;