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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DefaultIndexTitle = function DefaultIndexTitle(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      path = _ref.path,
      data = _ref.data,
      user = _ref.user;
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onCreateClick = R.path(['create', 'onIndexCreate'], actions);

  var onClick = function onClick() {
    return onCreateClick({
      modelName: modelName,
      path: path
    });
  };

  var creatable = (0, _Utils.isCreatable)({
    schema: schema,
    modelName: modelName,
    data: data,
    user: user
  }); // todo: custom
  //todo: custom: getModelLabelPlural()

  return _react["default"].createElement("div", {
    style: {
      marginBottom: '10px'
    }
  }, _react["default"].createElement("h3", {
    className: "d-inline"
  }, (0, _schemaGetters.getModelLabelPlural)({
    schema: schema,
    modelName: modelName,
    data: data,
    user: user
  })), creatable && _react["default"].createElement("div", {
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
      user = _ref2.user,
      tableOptions = _ref2.tableOptions;

  if (!(0, _schemaGetters.getHasIndex)(schema, modelName)) {
    return _react["default"].createElement(_reactRouterDom.Redirect, {
      to: "/"
    });
  }

  var fieldOrder = (0, _schemaGetters.getIndexFields)({
    schema: schema,
    modelName: modelName,
    data: data,
    user: user
  }); // todo: custom

  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onDelete = R.path(['delete', 'onIndexDelete'], actions);
  var onEditSubmit = R.path(['edit', 'onIndexEditSubmit'], actions);
  return _react["default"].createElement("div", {
    className: "container"
  }, _react["default"].createElement(Title, {
    schema: schema,
    modelName: modelName,
    path: path,
    data: data,
    user: user
  }), _react["default"].createElement(Table, {
    schema: schema,
    modelName: modelName,
    data: data,
    onDelete: onDelete,
    onEditSubmit: onEditSubmit,
    tooltipData: tooltipData,
    fieldOrder: fieldOrder,
    selectOptions: selectOptions,
    editData: editData,
    modalData: modalData,
    user: user,
    tableOptions: tableOptions
  }));
};

var _default = Index;
exports["default"] = _default;