"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCreatable = exports.isDeletable = exports.isTableDeletable = exports.isFieldEditable = exports.isRowEditable = exports.isTableEditable = exports.getEnumLabel = exports.skipOverride = exports.getInputOverride = exports.getDetailValueOverride = exports.getDetailLabelOverride = exports.getDetailOverride = exports.getCellOverride = exports.humanize = exports.spaceOnCapitalLetter = exports.capitalizeFirstChar = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _schemaGetters = require("./utils/schemaGetters");

var _rxjs = require("rxjs");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var capitalizeFirstChar = function capitalizeFirstChar(str) {
  return str.replace(/^./, function (str) {
    return str.toUpperCase();
  });
};

exports.capitalizeFirstChar = capitalizeFirstChar;

var spaceOnCapitalLetter = function spaceOnCapitalLetter(str) {
  return str.replace(/([A-Z])/g, ' $1');
};

exports.spaceOnCapitalLetter = spaceOnCapitalLetter;

var humanize = function humanize(str) {
  return R.pipe(spaceOnCapitalLetter, capitalizeFirstChar)(str);
};

exports.humanize = humanize;

var getCellOverride = function getCellOverride(schema, modelName, fieldName) {
  return R.path([modelName, 'fields', fieldName, 'components', 'cell'], schema);
};

exports.getCellOverride = getCellOverride;

var getDetailOverride = function getDetailOverride(schema, modelName, fieldName) {
  return R.path([modelName, 'fields', fieldName, 'components', 'detail'], schema);
};

exports.getDetailOverride = getDetailOverride;

var getDetailLabelOverride = function getDetailLabelOverride(schema, modelName, fieldName) {
  return R.path([modelName, 'fields', fieldName, 'components', 'detailLabel'], schema);
};

exports.getDetailLabelOverride = getDetailLabelOverride;

var getDetailValueOverride = function getDetailValueOverride(schema, modelName, fieldName) {
  return R.path([modelName, 'fields', fieldName, 'components', 'detailValue'], schema);
};

exports.getDetailValueOverride = getDetailValueOverride;

var getInputOverride = function getInputOverride(schema, modelName, fieldName) {
  return R.path([modelName, 'fields', fieldName, 'components', 'input'], schema);
}; // override component skipped only if 'null' (undefined by default)


exports.getInputOverride = getInputOverride;

var skipOverride = function skipOverride(component) {
  return component === null;
};

exports.skipOverride = skipOverride;

var getEnumLabel = function getEnumLabel(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldName = _ref.fieldName,
      value = _ref.value;

  if (value === null) {
    return 'N/A';
  }

  var field = (0, _schemaGetters.getField)(schema, modelName, fieldName);
  return R.pathOr('Value Not Found', ['choices', value], field);
};

exports.getEnumLabel = getEnumLabel;

var isTableEditable = function isTableEditable(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      data = _ref2.data,
      props = _objectWithoutProperties(_ref2, ["schema", "modelName", "data"]);

  return !R.isEmpty(data.filter(function (rowData) {
    return isRowEditable(_objectSpread({
      schema: schema,
      modelName: modelName,
      rowData: rowData
    }, props));
  }));
};

exports.isTableEditable = isTableEditable;

var isRowEditable = function isRowEditable(_ref3) {
  var schema = _ref3.schema,
      modelName = _ref3.modelName,
      rowData = _ref3.rowData,
      props = _objectWithoutProperties(_ref3, ["schema", "modelName", "rowData"]);

  return R.pipe(R.mapObjIndexed(function (_value, fieldName) {
    return isFieldEditable(_objectSpread({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      rowData: rowData
    }, props));
  }), R.filter(_rxjs.identity), function (filteredNode) {
    return !R.isEmpty(filteredNode);
  })(rowData);
};

exports.isRowEditable = isRowEditable;

var isFieldEditable = function isFieldEditable(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      fieldName = _ref4.fieldName,
      props = _objectWithoutProperties(_ref4, ["schema", "modelName", "fieldName"]);

  var editable = R.prop('editable', (0, _schemaGetters.getField)(schema, modelName, fieldName));

  if (R.type(editable) === 'Boolean') {
    return editable;
  } else if (R.type(editable) === 'Function') {
    return editable(_objectSpread({
      schema: schema,
      modelName: modelName
    }, props));
  } else {
    return false;
  }
};

exports.isFieldEditable = isFieldEditable;

var isTableDeletable = function isTableDeletable(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      data = _ref5.data,
      props = _objectWithoutProperties(_ref5, ["schema", "modelName", "data"]);

  return !R.isEmpty(data.filter(function (rowData) {
    return isDeletable(_objectSpread({
      schema: schema,
      modelName: modelName,
      rowData: rowData
    }, props));
  }));
};

exports.isTableDeletable = isTableDeletable;

var isDeletable = function isDeletable(_ref6) {
  var schema = _ref6.schema,
      modelName = _ref6.modelName,
      props = _objectWithoutProperties(_ref6, ["schema", "modelName"]);

  var deletable = R.prop('deletable', (0, _schemaGetters.getModel)(schema, modelName));

  if (R.type(deletable) === 'Boolean') {
    return deletable;
  } else if (R.type(deletable) === 'Function') {
    return deletable(_objectSpread({
      schema: schema,
      modelName: modelName
    }, props));
  } else {
    return false;
  }
};

exports.isDeletable = isDeletable;

var isCreatable = function isCreatable(_ref7) {
  var schema = _ref7.schema,
      modelName = _ref7.modelName,
      props = _objectWithoutProperties(_ref7, ["schema", "modelName"]);

  var creatable = R.prop('creatable', (0, _schemaGetters.getModel)(schema, modelName));

  if (R.type(creatable) === 'Boolean') {
    return creatable;
  } else if (R.type(creatable) === 'Function') {
    return creatable(_objectSpread({
      schema: schema,
      modelName: modelName
    }, props));
  } else {
    return false;
  }
};

exports.isCreatable = isCreatable;