'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InlineInput = exports.EditInput = exports.EditCancelButton = exports.EditSaveButton = exports.TableEditButton = exports.RowEditButton = exports.isFieldEditing = exports.isEditing = exports.getFieldErrorEdit = exports.getFieldEditData = exports.InlineEditButton = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

var _schemaGetters = require('./utils/schemaGetters');

var _Input = require('./form/Input');

var _Input2 = _interopRequireDefault(_Input);

var _reactSvg = require('react-svg');

var _reactSvg2 = _interopRequireDefault(_reactSvg);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var InlineEditButton = exports.InlineEditButton = function InlineEditButton(_ref) {
  var onEditClick = _ref.onEditClick;
  return _react2.default.createElement(_reactSvg2.default, {
    src: '/static/img/edit.svg',
    className: 'edit-icon',
    svgStyle: { width: '20px', height: '20px' },
    onClick: onEditClick
  });
};

var getFieldEditData = exports.getFieldEditData = function getFieldEditData(editData, modelName, fieldName, id) {
  return R.path([modelName, id, fieldName, 'currentValue'], editData);
};

var getFieldErrorEdit = exports.getFieldErrorEdit = function getFieldErrorEdit(editData, modelName, fieldName, id) {
  return R.path([modelName, id, fieldName, 'errors'], editData);
};

var isEditing = exports.isEditing = function isEditing(editData, modelName, id) {
  return R.pathOr(false, [modelName, id], editData);
};

var isFieldEditing = exports.isFieldEditing = function isFieldEditing(editData, modelName, id, fieldName) {
  var idEditData = R.pathOr({}, [modelName, id], editData);
  return fieldName in idEditData;
};

var EditButton = function EditButton(_ref2) {
  var onClick = _ref2.onClick;

  return _react2.default.createElement(
    'button',
    {
      className: 'btn btn-sm btn-outline-success',
      onClick: onClick },
    'Edit'
  );
};

var RowEditButton = exports.RowEditButton = function RowEditButton(_ref3) {
  var schema = _ref3.schema,
      modelName = _ref3.modelName,
      id = _ref3.id,
      node = _ref3.node;

  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onEditClick = R.path(['edit', 'onTableRowEdit'], actions);
  return _react2.default.createElement(EditButton, { onClick: function onClick() {
      return onEditClick({ modelName: modelName, id: id, node: node });
    } });
};

var TableEditButton = exports.TableEditButton = function TableEditButton(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      id = _ref4.id,
      fieldName = _ref4.fieldName,
      node = _ref4.node;

  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onEditClick = R.path(['edit', 'onAttributeEdit'], actions);

  return _react2.default.createElement(EditButton, { onClick: function onClick() {
      return onEditClick({ modelName: modelName, id: id, fieldName: fieldName, value: R.prop(fieldName, node) });
    } });
};

var EditSaveButton = exports.EditSaveButton = function EditSaveButton(_ref5) {
  var onClick = _ref5.onClick;

  return _react2.default.createElement(
    'button',
    { className: 'btn btn-sm btn-success',
      onClick: onClick
    },
    'Save'
  );
};

var EditCancelButton = exports.EditCancelButton = function EditCancelButton(_ref6) {
  var onClick = _ref6.onClick;

  return _react2.default.createElement(
    'button',
    { className: 'btn btn-sm btn',
      onClick: onClick
    },
    'Cancel'
  );
};

var EditInput = exports.EditInput = function EditInput(_ref7) {
  var schema = _ref7.schema,
      modelName = _ref7.modelName,
      fieldName = _ref7.fieldName,
      node = _ref7.node,
      editData = _ref7.editData,
      error = _ref7.error,
      selectOptions = _ref7.selectOptions;

  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onEditInputChange = R.path(['edit', 'onEditInputChange'], actions);
  return _react2.default.createElement(_Input2.default, _extends({ key: fieldName }, {
    selectOptions: selectOptions,
    schema: schema,
    onChange: function onChange(_ref8) {
      var props = _objectWithoutProperties(_ref8, []);

      return onEditInputChange({ id: node.id, modelName: modelName, ...props });
    },
    fieldName: fieldName,
    modelName: modelName,
    value: editData,
    error: error,
    inline: true,
    node: node
  }));
};

var InlineInput = exports.InlineInput = function InlineInput(_ref9) {
  var props = _objectWithoutProperties(_ref9, []);

  return _react2.default.createElement(
    'div',
    { className: 'detail-edit d-inline-block pull-left' },
    _react2.default.createElement(EditInput, { ...props })
  );
};