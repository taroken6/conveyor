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

var _Sort = require("./Sort");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
      props = _objectWithoutProperties(_ref, ["schema", "modelName", "fieldOrder", "editable", "deletable", "detailField", "data", "tableOptions", "sortable"]);

  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onSort = R.path(['tableOptions', 'sort'], actions);
  return _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, fieldOrder.map(function (fieldName, idx) {
    var isRelField = (0, _isType.isRel)((0, _schemaGetters.getField)(schema, modelName, fieldName));
    var sortKeyObj = R.path(['sort', modelName], tableOptions);
    return _react["default"].createElement("th", {
      key: idx,
      style: {
        minWidth: '130px'
      }
    }, _react["default"].createElement(Header, {
      modelName: modelName,
      fieldName: fieldName,
      title: (0, _Detail.getFieldLabel)({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        data: R.prop(fieldName, data)
      }),
      onSort: onSort,
      showSort: tableOptions && sortable ? !isRelField : false,
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
  })));
};

exports.Header = Header;