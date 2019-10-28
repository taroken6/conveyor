"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DefaultIndexTitle = void 0;

var _react = _interopRequireDefault(require("react"));

var _Table = require("./table/Table");

var R = _interopRequireWildcard(require("ramda"));

var _CreateButton = _interopRequireDefault(require("./CreateButton"));

var _schemaGetters = require("./utils/schemaGetters");

var _reactRouterDom = require("react-router-dom");

var _Utils = require("./Utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var DefaultIndexTitle = function DefaultIndexTitle(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      path = _ref.path,
      data = _ref.data,
      props = _objectWithoutProperties(_ref, ["schema", "modelName", "path", "data"]);

  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onCreateClick = R.path(['create', 'onIndexCreate'], actions);

  var onClick = function onClick() {
    return onCreateClick({
      modelName: modelName,
      path: path
    });
  };

  var creatable = (0, _Utils.isCreatable)(_objectSpread({
    schema: schema,
    modelName: modelName,
    data: data
  }, props));
  return _react["default"].createElement("div", {
    style: {
      marginBottom: '10px'
    }
  }, _react["default"].createElement("h3", {
    className: "d-inline"
  }, (0, _schemaGetters.getModelLabelPlural)(_objectSpread({
    schema: schema,
    modelName: modelName,
    data: data
  }, props))), creatable && _react["default"].createElement("div", {
    className: "float-right"
  }, _react["default"].createElement(_CreateButton["default"], {
    onClick: onClick
  })));
};

exports.DefaultIndexTitle = DefaultIndexTitle;

var Index = function Index(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      data = _ref2.data,
      modalData = _ref2.modalData,
      editData = _ref2.editData,
      selectOptions = _ref2.selectOptions,
      path = _ref2.path,
      tooltipData = _ref2.tooltipData,
      _ref2$Title = _ref2.Title,
      Title = _ref2$Title === void 0 ? DefaultIndexTitle : _ref2$Title,
      _ref2$Table = _ref2.Table,
      Table = _ref2$Table === void 0 ? _Table.Table : _ref2$Table,
      props = _objectWithoutProperties(_ref2, ["schema", "modelName", "data", "modalData", "editData", "selectOptions", "path", "tooltipData", "Title", "Table"]);

  if (!(0, _schemaGetters.getHasIndex)(schema, modelName)) {
    return _react["default"].createElement(_reactRouterDom.Redirect, {
      to: "/"
    });
  }

  var model = (0, _schemaGetters.getModel)(schema, modelName);
  var fields = (0, _schemaGetters.getFields)(schema, modelName);
  var fieldOrder = (0, _schemaGetters.getIndexFields)(_objectSpread({
    schema: schema,
    modelName: modelName,
    data: data
  }, props));
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onDelete = R.path(['delete', 'onIndexDelete'], actions);
  var onEditSubmit = R.path(['edit', 'onIndexEditSubmit'], actions);
  return _react["default"].createElement("div", {
    className: "container"
  }, _react["default"].createElement(Title, _objectSpread({
    schema: schema,
    modelName: modelName,
    path: path,
    data: data
  }, props)), _react["default"].createElement(Table, _objectSpread({
    schema: schema,
    modelName: modelName,
    data: data,
    onDelete: onDelete,
    onEditSubmit: onEditSubmit,
    tooltipData: tooltipData,
    fieldOrder: fieldOrder,
    selectOptions: selectOptions,
    editData: editData,
    modalData: modalData
  }, props)));
};

var _default = Index;
exports["default"] = _default;