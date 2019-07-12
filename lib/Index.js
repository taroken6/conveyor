'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultIndexTitle = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Table = require('./table/Table');

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

var _CreateButton = require('./CreateButton');

var _CreateButton2 = _interopRequireDefault(_CreateButton);

var _schemaGetters = require('./utils/schemaGetters');

var _reactRouterDom = require('react-router-dom');

var _Utils = require('./Utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DefaultIndexTitle = exports.DefaultIndexTitle = function DefaultIndexTitle(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      path = _ref.path,
      props = _objectWithoutProperties(_ref, ['schema', 'modelName', 'path']);

  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onCreateClick = R.path(['create', 'onIndexCreate'], actions);
  var onClick = function onClick() {
    return onCreateClick({ modelName: modelName, path: path });
  };
  var creatable = (0, _Utils.isCreatable)({ schema: schema, modelName: modelName, ...props });
  return _react2.default.createElement(
    'div',
    { style: { marginBottom: '10px' } },
    _react2.default.createElement(
      'h3',
      { className: 'd-inline' },
      R.pathOr('No Name Found', [modelName, 'displayNamePlural'], schema)
    ),
    creatable && _react2.default.createElement(
      'div',
      { className: 'float-right' },
      _react2.default.createElement(_CreateButton2.default, { onClick: onClick })
    )
  );
};

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
      Title = _ref2$Title === undefined ? DefaultIndexTitle : _ref2$Title,
      _ref2$Table = _ref2.Table,
      Table = _ref2$Table === undefined ? _Table.Table : _ref2$Table,
      props = _objectWithoutProperties(_ref2, ['schema', 'modelName', 'data', 'modalData', 'editData', 'selectOptions', 'path', 'tooltipData', 'Title', 'Table']);

  if (!(0, _schemaGetters.getHasIndex)(schema, modelName)) {
    return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/' });
  }
  var model = (0, _schemaGetters.getModel)(schema, modelName);
  var fields = (0, _schemaGetters.getFields)(schema, modelName);
  var fieldOrder = R.pipe(R.prop('fieldOrder'), R.filter(function (fieldName) {
    return R.path([fieldName, 'showIndex'], fields);
  }))(model);
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onDelete = R.path(['delete', 'onIndexDelete'], actions);
  var onEditSubmit = R.path(['edit', 'onIndexEditSubmit'], actions);

  return _react2.default.createElement(
    'div',
    { className: 'container' },
    _react2.default.createElement(Title, { schema: schema, modelName: modelName, path: path, ...props }),
    !R.isEmpty(data) && _react2.default.createElement(Table, {
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
      ...props
    })
  );
};

exports.default = Index;