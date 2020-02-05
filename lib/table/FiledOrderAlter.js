"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldOrderAlterDetail = exports.FieldOrderInput = exports.FieldOrderButton = exports.getFieldOrderAlternate = void 0;

var _react = _interopRequireDefault(require("react"));

var R = _interopRequireWildcard(require("ramda"));

var _fa = require("react-icons/fa");

var _schemaGetters = require("../utils/schemaGetters");

var _input = _interopRequireDefault(require("../input"));

var _consts = require("../consts");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getFieldOrderAlternate = function getFieldOrderAlternate(_ref) {
  var tableView = _ref.tableView,
      parentModelName = _ref.parentModelName,
      parentFieldName = _ref.parentFieldName,
      modelName = _ref.modelName,
      fieldOrder = _ref.fieldOrder,
      fromIndex = _ref.fromIndex;

  /* by default, returns fieldOrder
  returns alternate fieldOrder based on user preference
  if fieldName not passed in, assume table is index table, otherwise detail relationship table */
  // get form object from redux store; 'fieldName' indicates location
  var fieldOrderAltValues = fromIndex ? R.pathOr([], [modelName, 'fieldOrderAlt', 'values'], tableView) : R.pathOr([], [parentModelName, 'fields', parentFieldName, 'fieldOrderAlt', 'values'], tableView); // get fieldNames from form object

  var alt = R.map(function (val) {
    return val.value;
  }, fieldOrderAltValues); // if the result is empty, return 'fieldOrder' as default

  return R.isEmpty(alt) ? fieldOrder : alt;
};

exports.getFieldOrderAlternate = getFieldOrderAlternate;

var FieldOrderButton = function FieldOrderButton(_ref2) {
  var hasValues = _ref2.hasValues,
      open = _ref2.open,
      options = _ref2.options,
      fieldOrderChange = _ref2.fieldOrderChange,
      fieldOrderToggle = _ref2.fieldOrderToggle,
      modelName = _ref2.modelName,
      fieldName = _ref2.fieldName;
  return _react["default"].createElement("button", {
    className: "btn btn-sm btn-outline-primary",
    style: {
      marginLeft: '4px'
    },
    onClick: function onClick() {
      // if button not clicked previously, populate input w/ all options
      if (!hasValues) {
        return fieldOrderChange({
          modelName: modelName,
          fieldName: fieldName,
          fieldOrderAltValues: options
        });
      } // otherwise, clicking will 'close' the feature


      return fieldOrderToggle({
        modelName: modelName,
        fieldName: fieldName,
        open: open
      });
    }
  }, _react["default"].createElement(_fa.FaListOl, {
    color: hasValues ? 'lightgreen' : 'inherit'
  }));
};

exports.FieldOrderButton = FieldOrderButton;

var FieldOrderInput = function FieldOrderInput(_ref3) {
  var hasValues = _ref3.hasValues,
      open = _ref3.open,
      options = _ref3.options,
      fieldOrderAltValues = _ref3.fieldOrderAltValues,
      fieldOrderChange = _ref3.fieldOrderChange,
      modelName = _ref3.modelName,
      fieldName = _ref3.fieldName;

  if (hasValues && open) {
    return _react["default"].createElement("div", null, _react["default"].createElement("div", {
      className: "d-inline-block",
      style: {
        'width': '94%'
      }
    }, _react["default"].createElement(_input["default"], _extends({
      className: 'field-order-alter-input'
    }, {
      id: "alternate-input-".concat(modelName, "-").concat(fieldName),
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
    }))), _react["default"].createElement("button", {
      style: {
        'verticalAlign': 'text-bottom'
      },
      className: "btn btn-sm btn-outline-danger",
      onClick: function onClick() {
        return fieldOrderChange({
          modelName: modelName,
          fieldName: fieldName,
          fieldOrderAltValues: null
        });
      }
    }, "Reset"));
  }

  return null;
}; // field order alternate => for detail page


exports.FieldOrderInput = FieldOrderInput;

var FieldOrderAlterDetail = function FieldOrderAlterDetail(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      targetModelName = _ref4.targetModelName,
      fieldName = _ref4.fieldName,
      tableView = _ref4.tableView,
      fieldOrder = _ref4.fieldOrder,
      node = _ref4.node,
      customProps = _ref4.customProps;
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var fieldOrderChange = R.path(['tableOptions', 'fieldOrderDetailChange'], actions);
  var fieldOrderToggle = R.path(['tableOptions', 'fieldOrderDetailToggle'], actions);
  var fieldOrderAltValues = R.path([modelName, 'fields', fieldName, 'fieldOrderAlt', 'values'], tableView);
  var open = R.pathOr(true, [modelName, 'fields', fieldName, 'fieldOrderAlt', 'open'], tableView); // get dropdown options

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
  var hasValues = fieldOrderAltValues && !R.isEmpty(fieldOrderAltValues);
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(FieldOrderButton, {
    hasValues: hasValues,
    open: open,
    options: options,
    fieldOrderChange: fieldOrderChange,
    fieldOrderToggle: fieldOrderToggle,
    modelName: modelName,
    fieldName: fieldName
  }), _react["default"].createElement(FieldOrderInput, {
    hasValues: hasValues,
    open: open,
    options: options,
    fieldOrderAltValues: fieldOrderAltValues,
    fieldOrderChange: fieldOrderChange,
    modelName: modelName,
    fieldName: fieldName
  }));
};

exports.FieldOrderAlterDetail = FieldOrderAlterDetail;