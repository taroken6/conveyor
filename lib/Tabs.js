'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabFields = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

var _reactRouterDom = require('react-router-dom');

var _Detail = require('./Detail');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TabFields = exports.TabFields = function TabFields(_ref) {
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
      props = _objectWithoutProperties(_ref, ['match', 'tabs', 'fields', 'component', 'schema', 'modelName', 'id', 'node', 'path', 'editData', 'tooltipData', 'modalData', 'selectOptions']);

  if (Component) {
    return _react2.default.createElement(Component, {
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
      ...props
    });
  }

  var _partitionDetailField = (0, _Detail.partitionDetailFields)({
    schema: schema,
    modelName: modelName,
    include: fields
  }),
      _partitionDetailField2 = _slicedToArray(_partitionDetailField, 2),
      tableFields = _partitionDetailField2[0],
      descriptionList = _partitionDetailField2[1];

  return _react2.default.createElement(_Detail.DetailFields, {
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
    ...props
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
      props = _objectWithoutProperties(_ref2, ['match', 'tabs', 'fields', 'component', 'schema', 'modelName', 'id', 'node', 'modalData', 'editData', 'tooltipData', 'path', 'selectOptions']);

  if (tabs.length === 1) {
    return _react2.default.createElement(RecursiveTab, {
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
      ...props
    });
  }

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(TabFields, {
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
      ...props
    }),
    _react2.default.createElement(
      'ul',
      { className: 'nav nav-pills' },
      tabs.map(function (tab) {
        return _react2.default.createElement(
          'li',
          { key: R.prop('pillId', tab) + '-link' },
          _react2.default.createElement(
            _reactRouterDom.NavLink,
            {
              to: R.prop('url', match) + '/' + R.prop('pillId', tab),
              className: 'nav-link'
            },
            R.prop('name', tab)
          )
        );
      })
    ),
    _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      tabs.map(function (tab) {
        var matchAppend = {
          isExact: R.prop('isExact', match),
          params: R.assoc('pillId', R.prop('pillId', tab), R.prop('params', match)),
          path: R.prop('path', match) + '/:pillId',
          url: R.prop('url', match) + ('/' + R.prop('pillId', tab))
        };

        return _react2.default.createElement(_reactRouterDom.Route, {
          key: R.prop('pillId', tab) + '-route',
          path: R.prop('url', match) + '/' + R.prop('pillId', tab),
          render: function render(renderProps) {
            return _react2.default.createElement(RecursiveTab, {
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
              ...props,
              ...renderProps
            });
          }
        });
      }),
      R.pathOr(false, [0, 'pillId'], tabs) ? _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '' + R.prop('url', match), render: function render() {
          return _react2.default.createElement(_reactRouterDom.Redirect, { to: R.prop('url', match) + '/' + R.path([0, 'pillId'], tabs) });
        } }) : ''
    )
  );
};

exports.default = RecursiveTab;