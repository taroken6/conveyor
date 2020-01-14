"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DefaultIndexTitle = void 0;

var _react = _interopRequireDefault(require("react"));

var _Table = require("./table/Table");

var R = _interopRequireWildcard(require("ramda"));

var _CreateButton = _interopRequireDefault(require("./CreateButton"));

var _Filter = require("./table/Filter");

var _schemaGetters = require("./utils/schemaGetters");

var _reactRouterDom = require("react-router-dom");

var _Utils = require("./Utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DefaultIndexTitle = function DefaultIndexTitle(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      selectOptions = _ref.selectOptions,
      path = _ref.path,
      data = _ref.data,
      user = _ref.user,
      tableView = _ref.tableView,
      customProps = _ref.customProps;
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
    user: user,
    customProps: customProps
  });
  var filterable = (0, _Filter.isTableFilterable)({
    schema: schema,
    modelName: modelName
  });
  var currentFilters = R.path(['filter', modelName], tableView);
  var filterOrder = R.path(['filterOrder', modelName], tableView);
  var filtersAreActive = R.path(['filtersAreActive', modelName], tableView);
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
    user: user,
    customProps: customProps
  })), filterable && _react["default"].createElement(_Filter.FilterModal, {
    schema: schema,
    modelName: modelName,
    selectOptions: selectOptions,
    data: data,
    filterOrder: filterOrder,
    filterInputs: currentFilters
  }), _react["default"].createElement("div", {
    className: "float-right"
  }, filterable && _react["default"].createElement(_Filter.FilterModalButton, {
    modelName: modelName,
    filtersAreActive: filtersAreActive
  }), creatable && _react["default"].createElement(_CreateButton["default"], {
    onClick: onClick
  })));
};

exports.DefaultIndexTitle = DefaultIndexTitle;

var DefaultIndex = function DefaultIndex(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      data = _ref2.data,
      modalData = _ref2.modalData,
      editData = _ref2.editData,
      selectOptions = _ref2.selectOptions,
      modelStore = _ref2.modelStore,
      path = _ref2.path,
      tooltipData = _ref2.tooltipData,
      user = _ref2.user,
      tableView = _ref2.tableView,
      customProps = _ref2.customProps;

  if (!(0, _schemaGetters.getHasIndex)(schema, modelName)) {
    return _react["default"].createElement(_reactRouterDom.Redirect, {
      to: "/"
    });
  }

  var IndexTitleOverride = (0, _Utils.getIndexTitleOverride)(schema, modelName);
  var IndexPageOverride = (0, _Utils.getIndexPageOverride)(schema, modelName);
  var IndexTitle = IndexTitleOverride || DefaultIndexTitle;
  var IndexPage = IndexPageOverride || _Table.Table;
  console.log('data', data);
  var fieldOrder = (0, _schemaGetters.getIndexFields)({
    schema: schema,
    modelName: modelName,
    data: data,
    user: user,
    customProps: customProps
  });
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onDelete = R.path(['delete', 'onIndexDelete'], actions);
  var onEditSubmit = R.path(['edit', 'onIndexEditSubmit'], actions);

  if ((0, _Utils.skipOverride)(IndexTitleOverride) && (0, _Utils.skipOverride)(IndexPageOverride)) {
    return null;
  }

  return _react["default"].createElement("div", {
    className: "container"
  }, (0, _Utils.skipOverride)(IndexTitleOverride) ? null : _react["default"].createElement(IndexTitle, {
    schema: schema,
    modelName: modelName,
    data: data,
    modalData: modalData,
    editData: editData,
    selectOptions: selectOptions,
    path: path,
    tooltipData: tooltipData,
    user: user,
    tableView: tableView,
    customProps: customProps
  }), (0, _Utils.skipOverride)(IndexPageOverride) ? null : _react["default"].createElement(IndexPage, {
    schema: schema,
    modelName: modelName,
    data: data,
    modalData: modalData,
    editData: editData,
    selectOptions: selectOptions,
    modelStore: modelStore,
    path: path,
    tooltipData: tooltipData,
    user: user,
    tableView: tableView,
    customProps: customProps,
    fieldOrder: fieldOrder,
    fromIndex: true,
    onDelete: onDelete,
    onEditSubmit: onEditSubmit
  }));
};

var Index = function Index(_ref3) {
  var schema = _ref3.schema,
      modelName = _ref3.modelName,
      data = _ref3.data,
      modalData = _ref3.modalData,
      editData = _ref3.editData,
      selectOptions = _ref3.selectOptions,
      modelStore = _ref3.modelStore,
      path = _ref3.path,
      tooltipData = _ref3.tooltipData,
      user = _ref3.user,
      tableView = _ref3.tableView,
      customProps = _ref3.customProps;

  // if singleton, Index redirects to Detail pg
  if ((0, _schemaGetters.getSingleton)(schema, modelName)) {
    var singleton = R.last(data); // singleton may not be null when last deleted; test for 'id'

    var singleId = R.propOr(null, 'id', singleton);

    if (singleId) {
      return _react["default"].createElement(_reactRouterDom.Redirect, {
        to: "/".concat(modelName, "/").concat(singleId)
      });
    } // if no singleId exists, must create


    var actions = (0, _schemaGetters.getActions)(schema, modelName);
    var onCreateClick = R.path(['create', 'onIndexCreate'], actions);
    return _react["default"].createElement("div", {
      className: "container"
    }, _react["default"].createElement("h1", null, "No ".concat((0, _schemaGetters.getModelLabel)({
      schema: schema,
      modelName: modelName,
      data: data,
      user: user,
      customProps: customProps
    }), " Exists"), _react["default"].createElement(_CreateButton["default"], {
      onClick: function onClick() {
        return onCreateClick({
          modelName: modelName
        });
      }
    })));
  }

  var model = R.prop(modelName, schema);

  if (R.isNil(model)) {
    return null;
  }

  var IndexOverride = (0, _Utils.getIndexOverride)(schema, modelName);
  console.log('IndexOverride', IndexOverride);
  console.log('modelName', modelName);
  console.log('schema', schema);
  var IndexComponent = IndexOverride || DefaultIndex;
  return (0, _Utils.skipOverride)(IndexOverride) ? null : _react["default"].createElement(IndexComponent, {
    schema: schema,
    modelName: modelName,
    data: data,
    modalData: modalData,
    editData: editData,
    selectOptions: selectOptions,
    modelStore: modelStore,
    path: path,
    tooltipData: tooltipData,
    user: user,
    tableView: tableView,
    customProps: customProps
  });
};

var _default = Index;
exports["default"] = _default;