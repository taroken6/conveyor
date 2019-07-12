'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteDetail = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

var _Modal = require('../Modal');

var _isType = require('../utils/isType');

var _Utils = require('../Utils');

var _schemaGetters = require('../utils/schemaGetters');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFields = function getFields(schema, modelName, node) {
  var fieldDefinitions = (0, _schemaGetters.getFields)(schema, modelName);

  var fields = Object.entries(node).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (value === Object(value)) {
      var targetModel = R.path([key, 'type', 'target'], fieldDefinitions);
      return getFields(schema, targetModel, value);
    }

    if (!R.includes(key, ['__typename', 'id'])) {
      var fieldDefinition = R.prop(key, fieldDefinitions);
      if ((0, _isType.isEnum)(fieldDefinition)) {
        return (0, _Utils.getEnumLabel)({ schema: schema, modelName: modelName, fieldName: key, value: value });
      } else {
        return value;
      }
    }
  });

  return R.pipe(R.flatten, R.reject(function (val) {
    return val === undefined;
  }))(fields);
};

var Row = function Row(_ref3) {
  var schema = _ref3.schema,
      model = _ref3.model,
      node = _ref3.node;

  var fields = getFields(schema, model, node);
  return _react2.default.createElement(
    'tr',
    null,
    fields.map(function (field, index) {
      return _react2.default.createElement(
        'td',
        { key: index },
        field
      );
    })
  );
};

var ReviewTable = function ReviewTable(_ref4) {
  var schema = _ref4.schema,
      table = _ref4.table;
  return _react2.default.createElement(
    'div',
    { className: 'mt-2' },
    _react2.default.createElement(
      'h5',
      { className: 'd-inline' },
      table[0].__typename
    ),
    _react2.default.createElement(
      'table',
      { className: 'table table-striped table-bordered' },
      _react2.default.createElement(
        'tbody',
        null,
        table && table.map(function (node, index) {
          return _react2.default.createElement(Row, _extends({ key: index + '-' + node.id }, {
            schema: schema,
            model: R.prop('__typename', node),
            node: node
          }));
        })
      )
    )
  );
};

var DeleteDetail = exports.DeleteDetail = function DeleteDetail(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      id = _ref5.id,
      modalId = _ref5.modalId,
      title = _ref5.title,
      onDelete = _ref5.onDelete,
      modalStore = _ref5.modalStore,
      parentModelName = _ref5.parentModelName,
      parentId = _ref5.parentId;

  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onCancelDelete = R.path(['delete', 'onCancelDelete'], actions);
  return _react2.default.createElement(
    _Modal.Modal,
    { id: modalId, title: title },
    _react2.default.createElement(
      'span',
      null,
      _react2.default.createElement(
        'strong',
        null,
        'The following entries will be deleted:'
      )
    ),
    !modalStore && _react2.default.createElement(
      'div',
      { className: 'text-center' },
      '...loading'
    ),
    modalStore && modalStore.map(function (table, index) {
      return _react2.default.createElement(ReviewTable, _extends({ key: index + '-' + table[0].__typename }, { schema: schema, table: table }));
    }),
    _react2.default.createElement(
      'div',
      { className: 'modal-footer justify-content-center mt-3' },
      _react2.default.createElement(
        'div',
        { className: 'btn-group' },
        _react2.default.createElement(
          'button',
          {
            className: 'btn btn-small btn-outline-secondary ',
            'data-dismiss': 'modal',
            onClick: function onClick() {
              return onCancelDelete();
            }
          },
          'Cancel'
        ),
        _react2.default.createElement(
          'button',
          {
            className: 'btn btn-small btn-outline-danger ',
            'data-dismiss': 'modal',
            onClick: function onClick() {
              return onDelete({
                id: id,
                parentModel: parentModelName,
                parentId: parentId,
                modelName: modelName
              });
            }
          },
          'Confirm Delete'
        )
      )
    )
  );
};