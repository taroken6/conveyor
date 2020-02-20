"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecursiveTab = void 0;

var _react = _interopRequireDefault(require("react"));

var R = _interopRequireWildcard(require("ramda"));

var _reactRouterDom = require("react-router-dom");

var _Detail = require("./Detail");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TabFields = function TabFields(_ref) {
  var match = _ref.match,
      tabs = _ref.tabs,
      fields = _ref.fields,
      Component = _ref.component,
      schema = _ref.schema,
      modelName = _ref.modelName,
      id = _ref.id,
      node = _ref.node,
      path = _ref.path,
      editData = _ref.editData,
      tooltipData = _ref.tooltipData,
      modalData = _ref.modalData,
      selectOptions = _ref.selectOptions,
      tableView = _ref.tableView,
      customProps = _ref.customProps;

  if (Component) {
    return _react["default"].createElement(Component, {
      match: match,
      tabs: tabs,
      fields: fields,
      schema: schema,
      editData: editData,
      modelName: modelName,
      tooltipData: tooltipData,
      id: id,
      node: node,
      path: path,
      modalData: modalData,
      selectOptions: selectOptions,
      tableView: tableView,
      customProps: customProps
    });
  }

  var _partitionDetailField = (0, _Detail.partitionDetailFields)({
    schema: schema,
    modelName: modelName,
    node: node,
    include: fields,
    customProps: customProps
  }),
      _partitionDetailField2 = _slicedToArray(_partitionDetailField, 2),
      tableFields = _partitionDetailField2[0],
      descriptionList = _partitionDetailField2[1];

  return _react["default"].createElement(_Detail.DetailFields, {
    schema: schema,
    modelName: modelName,
    id: id,
    node: node,
    modalData: modalData,
    path: path,
    tableFields: tableFields,
    tooltipData: tooltipData,
    editData: editData,
    descriptionList: descriptionList,
    selectOptions: selectOptions,
    tableView: tableView,
    customProps: customProps
  });
};

var RecursiveTab = function RecursiveTab(_ref2) {
  var match = _ref2.match,
      tabs = _ref2.tabs,
      fields = _ref2.fields,
      component = _ref2.component,
      schema = _ref2.schema,
      modelName = _ref2.modelName,
      id = _ref2.id,
      node = _ref2.node,
      modalData = _ref2.modalData,
      editData = _ref2.editData,
      tooltipData = _ref2.tooltipData,
      path = _ref2.path,
      selectOptions = _ref2.selectOptions,
      tableView = _ref2.tableView,
      customProps = _ref2.customProps;

  if (tabs.length === 1) {
    return _react["default"].createElement(RecursiveTab, {
      match: match,
      tabs: R.pathOr([], [0, 'tabs'], tabs),
      fields: R.pathOr([], [0, 'fields'], tabs),
      component: R.pathOr(null, [0, 'component'], tabs),
      schema: schema,
      modelName: modelName,
      id: id,
      node: node,
      path: path,
      editData: editData,
      modalData: modalData,
      tooltipData: tooltipData,
      selectOptions: selectOptions,
      tableView: tableView,
      customProps: customProps
    });
  }

  return _react["default"].createElement("div", null, _react["default"].createElement(TabFields, {
    match: match,
    tabs: tabs,
    fields: fields,
    component: component,
    schema: schema,
    modelName: modelName,
    editData: editData,
    tooltipData: tooltipData,
    id: id,
    node: node,
    path: path,
    modalData: modalData,
    selectOptions: selectOptions,
    tableView: tableView,
    customProps: customProps
  }), _react["default"].createElement("ul", {
    className: "nav nav-pills"
  }, tabs.map(function (tab) {
    return _react["default"].createElement("li", {
      key: "".concat(R.prop('pillId', tab), "-link")
    }, _react["default"].createElement(_reactRouterDom.NavLink, {
      to: "".concat(R.prop('url', match), "/").concat(R.prop('pillId', tab)),
      className: "nav-link"
    }, R.prop('name', tab)));
  })), _react["default"].createElement(_reactRouterDom.Switch, null, tabs.map(function (tab) {
    var matchAppend = {
      isExact: R.prop('isExact', match),
      params: R.assoc('pillId', R.prop('pillId', tab), R.prop('params', match)),
      path: R.prop('path', match) + '/:pillId',
      url: R.prop('url', match) + "/".concat(R.prop('pillId', tab))
    };
    return _react["default"].createElement(_reactRouterDom.Route, {
      key: "".concat(R.prop('pillId', tab), "-route"),
      path: "".concat(R.prop('url', match), "/").concat(R.prop('pillId', tab)),
      render: function render(renderProps) {
        return _react["default"].createElement(RecursiveTab, _objectSpread({
          match: matchAppend,
          tabs: R.propOr([], 'tabs', tab),
          fields: R.propOr([], 'fields', tab),
          component: R.propOr(null, 'component', tab),
          schema: schema,
          modelName: modelName,
          id: id,
          node: node,
          modalData: modalData,
          editData: editData,
          tooltipData: tooltipData,
          path: path,
          selectOptions: selectOptions,
          tableView: tableView,
          customProps: customProps
        }, renderProps));
      }
    });
  }), R.pathOr(false, [0, 'pillId'], tabs) ? _react["default"].createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(R.prop('url', match)),
    render: function render() {
      return _react["default"].createElement(_reactRouterDom.Redirect, {
        to: "".concat(R.prop('url', match), "/").concat(R.path([0, 'pillId'], tabs))
      });
    }
  }) : ''));
};

exports.RecursiveTab = RecursiveTab;