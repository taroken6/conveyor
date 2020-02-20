"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = exports.THead = void 0;

var _react = _interopRequireDefault(require("react"));

var _schemaGetters = require("../utils/schemaGetters");

var _Table = require("./Table");

var R = _interopRequireWildcard(require("ramda"));

var _isType = require("../utils/isType");

var _Sort = require("./Sort");

var _Utils = require("../Utils");

var _Sort2 = require("./Sort.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var THead = function THead(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldOrder = _ref.fieldOrder,
      editable = _ref.editable,
      deletable = _ref.deletable,
      detailField = _ref.detailField,
      data = _ref.data,
      tableView = _ref.tableView,
      fromIndex = _ref.fromIndex,
      customProps = _ref.customProps,
      user = _ref.user;
  // first check if sortable on model level
  var tableSortable = fromIndex && (0, _Utils.isTableSortable)({
    schema: schema,
    modelName: modelName,
    user: user,
    customProps: customProps
  });
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onSort = R.path(['tableOptions', 'sort'], actions);
  return _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, fieldOrder.map(function (fieldName, idx) {
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

    var sortKeyObj = R.path([modelName, 'sort'], tableView); // now check if field level is sortable as well

    var showSort = tableSortable ? (0, _Utils.isSortable)({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      user: user,
      customProps: customProps
    }) : false;
    var sortKey = R.prop('fieldName', sortKeyObj) === fieldName ? R.prop('sortKey', sortKeyObj) : undefined;
    return _react["default"].createElement("th", {
      key: "".concat(idx, "-").concat(modelName, "-").concat(fieldName),
      style: {
        minWidth: '130px'
      },
      onClick: function onClick() {
        return showSort ? onSort({
          modelName: modelName,
          fieldName: fieldName,
          sortKey: (0, _Sort2.getNextSortKey)(sortKey)
        }) : {};
      }
    }, _react["default"].createElement(Header, {
      modelName: modelName,
      fieldName: fieldName,
      title: (0, _schemaGetters.getFieldLabel)({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        data: data,
        customProps: customProps
      }),
      // this is the actual 'data' list, not 'node'
      onSort: onSort,
      showSort: showSort,
      sortKeyObj: sortKeyObj
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
  var modelName = _ref2.modelName,
      fieldName = _ref2.fieldName,
      title = _ref2.title,
      onSort = _ref2.onSort,
      showSort = _ref2.showSort,
      sortKeyObj = _ref2.sortKeyObj;
  return _react["default"].createElement("div", {
    className: "header"
  }, _react["default"].createElement("div", {
    className: "title"
  }, _react["default"].createElement("span", {
    className: "header-title"
  }, title)), _react["default"].createElement("div", {
    className: 'header-overflow'
  }, showSort && _react["default"].createElement(_Sort.SortButton, {
    modelName: modelName,
    fieldName: fieldName,
    onSort: onSort,
    sortKeyObj: sortKeyObj
  })));
};

exports.Header = Header;