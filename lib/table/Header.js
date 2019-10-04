"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = exports.THead = void 0;

var _react = _interopRequireDefault(require("react"));

var _Detail = require("../Detail");

var _Table = require("./Table");

var R = _interopRequireWildcard(require("ramda"));

var _schemaGetters = require("../utils/schemaGetters");

var _isType = require("../utils/isType");

var _Filter = require("./Filter");

var _Sort = require("./Sort");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var THead = function THead(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldOrder = _ref.fieldOrder,
      editable = _ref.editable,
      deletable = _ref.deletable,
      detailField = _ref.detailField,
      data = _ref.data,
      tableOptions = _ref.tableOptions,
      sortable = _ref.sortable,
      filterable = _ref.filterable,
      selectOptions = _ref.selectOptions;
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onSort = R.path(['tableOptions', 'sort'], actions);

  var _onFilterChange = R.path(['tableOptions', 'filterChange'], actions);

  var onFilterSubmit = R.path(['tableOptions', 'filterSubmit'], actions);
  var onFilterRadio = R.path(['tableOptions', 'filterRadio'], actions);
  var onMenuOpen = R.path(['input', 'onMenuOpen'], actions);
  return _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, fieldOrder.map(function (fieldName, idx) {
    var isRelField = (0, _isType.isRel)((0, _schemaGetters.getField)(schema, modelName, fieldName));
    var filterInput = R.path(['filter', modelName, fieldName], tableOptions);
    var sortKeyObj = R.path(['sort', modelName], tableOptions);
    return _react["default"].createElement("th", {
      key: idx,
      style: {
        minWidth: '130px'
      }
    }, _react["default"].createElement(Header, {
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      title: (0, _Detail.getFieldLabel)({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        data: R.prop(fieldName, data)
      }),
      onFilterChange: function onFilterChange(evt) {
        return _onFilterChange(_objectSpread({
          modelName: modelName
        }, evt));
      },
      onFilterSubmit: onFilterSubmit,
      onFilterRadio: onFilterRadio,
      onSort: onSort,
      onMenuOpen: onMenuOpen,
      showSort: tableOptions && sortable && (0, _Sort.isSortable)({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName
      }) ? !isRelField : false,
      showFilter: (0, _Filter.isColFilterable)({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        tableOptions: tableOptions,
        filterable: filterable
      }),
      sortKeyObj: sortKeyObj,
      filterInput: filterInput,
      selectOptions: selectOptions
    }));
  }), (0, _Table.showButtonColumn)({
    deletable: deletable,
    editable: editable,
    detailField: detailField
  }) && _react["default"].createElement("th", {
    className: "table_btn_col"
  })));
};

exports.THead = THead;

var Header = function Header(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      fieldName = _ref2.fieldName,
      title = _ref2.title,
      onFilterChange = _ref2.onFilterChange,
      onFilterSubmit = _ref2.onFilterSubmit,
      onFilterRadio = _ref2.onFilterRadio,
      onSort = _ref2.onSort,
      onMenuOpen = _ref2.onMenuOpen,
      showSort = _ref2.showSort,
      showFilter = _ref2.showFilter,
      sortKeyObj = _ref2.sortKeyObj,
      filterInput = _ref2.filterInput,
      selectOptions = _ref2.selectOptions;
  return _react["default"].createElement("div", {
    className: "header"
  }, _react["default"].createElement("div", {
    className: "title"
  }, _react["default"].createElement("a", {
    style: {
      "float": 'left',
      fontSize: '.9em'
    },
    href: '#'
  }, title), showSort && _react["default"].createElement(_Sort.SortButton, {
    modelName: modelName,
    fieldName: fieldName,
    onSort: onSort,
    sortKeyObj: sortKeyObj
  }), showFilter && _react["default"].createElement(_Filter.FilterComp, {
    fieldName: fieldName,
    modelName: modelName,
    schema: schema,
    onFilterChange: onFilterChange,
    onFilterSubmit: onFilterSubmit,
    onFilterRadio: onFilterRadio,
    onMenuOpen: onMenuOpen,
    filterInput: filterInput,
    selectOptions: selectOptions
  })));
};

exports.Header = Header;