"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldOrderAlter = exports.FieldOrderAlterIndex = exports.FieldOrderAlterDetail = exports.FieldOrderAlterButton = exports.getFieldOrderAlternate = void 0;

var _react = _interopRequireDefault(require("react"));

var R = _interopRequireWildcard(require("ramda"));

var _fa = require("react-icons/fa");

var _schemaGetters = require("../utils/schemaGetters");

var _input = _interopRequireDefault(require("../input"));

var _consts = require("../consts");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getFieldOrderAlternate = function getFieldOrderAlternate(_ref) {
  var tableView = _ref.tableView,
      modelName = _ref.modelName,
      _ref$fieldName = _ref.fieldName,
      fieldName = _ref$fieldName === void 0 ? undefined : _ref$fieldName,
      fieldOrder = _ref.fieldOrder;

  /* by default, returns fieldOrder
  returns alternate fieldOrder based on user preference
  if fieldName not passed in, assume table is index table, otherwise detail relationship table */
  // get form object from redux store; 'fieldName' indicates location
  var fieldOrderAltValues = fieldName ? R.pathOr([], [modelName, 'fields', fieldName, 'fieldOrderAlt'], tableView) : R.pathOr([], [modelName, 'fieldOrderAlt'], tableView); // get fieldNames from form object

  var alt = R.map(function (val) {
    return val.value;
  }, fieldOrderAltValues); // if the result is empty, return 'fieldOrder' as default

  return R.isEmpty(alt) ? fieldOrder : alt;
};

exports.getFieldOrderAlternate = getFieldOrderAlternate;

var FieldOrderAlterButton = function FieldOrderAlterButton(_ref2) {
  var active = _ref2.active,
      options = _ref2.options,
      fieldOrderAltValues = _ref2.fieldOrderAltValues,
      fieldOrderChange = _ref2.fieldOrderChange,
      fieldOrderReset = _ref2.fieldOrderReset,
      modelName = _ref2.modelName,
      fieldName = _ref2.fieldName;
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("button", {
    className: "btn btn-sm btn-outline-primary",
    onClick: function onClick() {
      // if button not clicked previously, populate input w/ all options
      if (!active) {
        return fieldOrderChange({
          modelName: modelName,
          fieldName: fieldName,
          fieldOrderAltValues: options
        });
      } // otherwise, if already in the process, do nothing


      return null;
    }
  }, _react["default"].createElement(_fa.FaListOl, {
    color: active ? 'lightgreen' : 'black'
  })), _react["default"].createElement(_input["default"], {
    id: "fieldOrderAlt-input-".concat(modelName, "-").concat(fieldName),
    onChange: function onChange(evt) {
      return fieldOrderChange({
        modelName: modelName,
        fieldName: fieldName,
        fieldOrderAltValues: evt
      });
    },
    value: fieldOrderAltValues,
    type: _consts.inputTypes.SELECT_TYPE,
    isMulti: true,
    options: options
  }));
}; // field order alternate => for detail page


exports.FieldOrderAlterButton = FieldOrderAlterButton;

var FieldOrderAlterDetail = function FieldOrderAlterDetail(_ref3) {
  var schema = _ref3.schema,
      modelName = _ref3.modelName,
      targetModelName = _ref3.targetModelName,
      fieldName = _ref3.fieldName,
      tableView = _ref3.tableView,
      fieldOrder = _ref3.fieldOrder,
      node = _ref3.node,
      customProps = _ref3.customProps;
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var fieldOrderChange = R.path(['tableOptions', 'fieldOrderDetailChange'], actions);
  var fieldOrderReset = R.path(['tableOptions', 'fieldOrderDetailReset'], actions);
  var fieldOrderAltValues = R.path([modelName, 'fields', fieldName, 'fieldOrderAlt'], tableView);
  return _react["default"].createElement(FieldOrderAlter, {
    schema: schema,
    modelName: modelName,
    targetModelName: targetModelName,
    fieldName: fieldName,
    fieldOrder: fieldOrder,
    fieldOrderAltValues: fieldOrderAltValues,
    fieldOrderChange: fieldOrderChange,
    fieldOrderReset: fieldOrderReset,
    node: node,
    customProps: customProps
  });
}; // field order alternate => for index page


exports.FieldOrderAlterDetail = FieldOrderAlterDetail;

var FieldOrderAlterIndex = function FieldOrderAlterIndex(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      targetModelName = _ref4.targetModelName,
      tableView = _ref4.tableView,
      fieldOrder = _ref4.fieldOrder,
      node = _ref4.node,
      customProps = _ref4.customProps;
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var fieldOrderChange = R.path(['tableOptions', 'fieldOrderIndexChange'], actions);
  var fieldOrderReset = R.path(['tableOptions', 'fieldOrderIndexReset'], actions);
  var fieldOrderAltValues = R.path([modelName, 'fieldOrderAlt'], tableView);
  return _react["default"].createElement(FieldOrderAlter, {
    schema: schema,
    modelName: modelName,
    targetModelName: targetModelName,
    fieldOrder: fieldOrder,
    fieldOrderAltValues: fieldOrderAltValues,
    fieldOrderChange: fieldOrderChange,
    fieldOrderReset: fieldOrderReset,
    node: node,
    customProps: customProps
  });
};

exports.FieldOrderAlterIndex = FieldOrderAlterIndex;

var FieldOrderAlter = function FieldOrderAlter(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      targetModelName = _ref5.targetModelName,
      fieldName = _ref5.fieldName,
      fieldOrder = _ref5.fieldOrder,
      fieldOrderAltValues = _ref5.fieldOrderAltValues,
      fieldOrderChange = _ref5.fieldOrderChange,
      fieldOrderReset = _ref5.fieldOrderReset,
      node = _ref5.node,
      customProps = _ref5.customProps;
  // if has values, display
  var active = fieldOrderAltValues && !R.isEmpty(fieldOrderAltValues); // get dropdown options

  var toOptions = function toOptions(fieldName) {
    return {
      label: (0, _schemaGetters.getFieldLabel)({
        schema: schema,
        modelName: targetModelName,
        fieldName: fieldName,
        node: node,
        customProps: customProps
      }),
      value: fieldName
    };
  }; // fieldOrder here represents the raw field order of all possible fields that can be on the table


  var options = fieldOrder.map(function (fieldName) {
    return toOptions(fieldName);
  });
  return _react["default"].createElement(FieldOrderAlterButton, {
    active: active,
    options: options,
    fieldOrderAltValues: fieldOrderAltValues,
    fieldOrderChange: fieldOrderChange,
    fieldOrderReset: fieldOrderReset,
    modelName: modelName,
    fieldName: fieldName
  });
};

exports.FieldOrderAlter = FieldOrderAlter;