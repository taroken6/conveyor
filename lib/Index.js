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

var Filters = function Filters(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      selectOptions = _ref.selectOptions,
      data = _ref.data,
      currentFilters = _ref.currentFilters,
      filterOrder = _ref.filterOrder,
      filtersAreActive = _ref.filtersAreActive;
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var addFilter = R.path(['tableOptions', 'addFilter'], actions);
  var deleteFilter = R.path(['tableOptions', 'deleteFilter'], actions);
  var clearFilters = R.path(['tableOptions', 'clearFilters'], actions);
  var changeField = R.path(['tableOptions', 'changeField'], actions);
  var onFilterChange = R.path(['tableOptions', 'filterChange'], actions);
  var onFilterSubmit = R.path(['tableOptions', 'filterSubmit'], actions);
  var onFilterDropdown = R.path(['tableOptions', 'filterDropdown'], actions);
  return _react["default"].createElement(_Filter.FilterModal, {
    modelName: modelName,
    schema: schema,
    selectOptions: selectOptions,
    data: data,
    addFilter: addFilter,
    deleteFilter: deleteFilter,
    clearFilters: clearFilters,
    changeField: changeField,
    onFilterChange: onFilterChange,
    onFilterSubmit: onFilterSubmit,
    onFilterDropdown: onFilterDropdown,
    currentFilters: currentFilters,
    filterOrder: filterOrder,
    filtersAreActive: filtersAreActive,
    filterInputs: currentFilters
  });
};

var DefaultIndexTitle = function DefaultIndexTitle(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      selectOptions = _ref2.selectOptions,
      path = _ref2.path,
      data = _ref2.data,
      user = _ref2.user,
      currentFilters = _ref2.currentFilters,
      filterOrder = _ref2.filterOrder,
      filtersAreActive = _ref2.filtersAreActive,
      customProps = _ref2.customProps;
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var tableOptions = R.prop('tableOptions', actions);
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
  var filterable = (0, _Filter.isModelFilterable)({
    schema: schema,
    modelName: modelName,
    tableOptions: tableOptions
  });
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
  })), filterable && _react["default"].createElement(Filters, {
    schema: schema,
    modelName: modelName,
    selectOptions: selectOptions,
    data: data,
    currentFilters: currentFilters,
    filterOrder: filterOrder,
    filtersAreActive: filtersAreActive
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

var DefaultIndex = function DefaultIndex(_ref3) {
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
      currentFilters = _ref3.currentFilters,
      filterOrder = _ref3.filterOrder,
      filtersAreActive = _ref3.filtersAreActive,
      tableOptions = _ref3.tableOptions,
      customProps = _ref3.customProps;

  if (!(0, _schemaGetters.getHasIndex)(schema, modelName)) {
    return _react["default"].createElement(_reactRouterDom.Redirect, {
      to: "/"
    });
  }

  var IndexTitleOverride = (0, _Utils.getIndexTitleOverride)(schema, modelName);
  var IndexPageOverride = (0, _Utils.getIndexPageOverride)(schema, modelName);
  var IndexTitle = IndexTitleOverride || DefaultIndexTitle;
  var IndexPage = IndexPageOverride || _Table.Table;
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
    currentFilters: currentFilters,
    filterOrder: filterOrder,
    filtersAreActive: filtersAreActive,
    tableOptions: tableOptions,
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
    currentFilters: currentFilters,
    filterOrder: filterOrder,
    filtersAreActive: filtersAreActive,
    tableOptions: tableOptions,
    customProps: customProps,
    fieldOrder: fieldOrder,
    fromIndex: true,
    onDelete: onDelete,
    onEditSubmit: onEditSubmit
  }));
};

var Index = function Index(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      data = _ref4.data,
      modalData = _ref4.modalData,
      editData = _ref4.editData,
      selectOptions = _ref4.selectOptions,
      modelStore = _ref4.modelStore,
      path = _ref4.path,
      tooltipData = _ref4.tooltipData,
      user = _ref4.user,
      currentFilters = _ref4.currentFilters,
      filterOrder = _ref4.filterOrder,
      filtersAreActive = _ref4.filtersAreActive,
      tableOptions = _ref4.tableOptions,
      customProps = _ref4.customProps;

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

  var IndexOverride = (0, _Utils.getIndexOverride)(schema, modelName);
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
    currentFilters: currentFilters,
    filterOrder: filterOrder,
    filtersAreActive: filtersAreActive,
    tableOptions: tableOptions,
    customProps: customProps
  });
};

var _default = Index;
exports["default"] = _default;