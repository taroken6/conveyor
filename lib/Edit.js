"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InlineInput = exports.EditInput = exports.EditCancelButton = exports.EditSaveButton = exports.TableEditButton = exports.RowEditButton = exports.isFieldEditing = exports.isEditing = exports.getFieldErrorEdit = exports.getFieldEditData = exports.FileDeleteIcon = exports.InlineEditButton = void 0;

var _react = _interopRequireDefault(require("react"));

var R = _interopRequireWildcard(require("ramda"));

var _schemaGetters = require("./utils/schemaGetters");

var _Input = _interopRequireDefault(require("./form/Input"));

var _reactSvg = _interopRequireDefault(require("react-svg"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var InlineEditButton = function InlineEditButton(_ref) {
  var onEditClick = _ref.onEditClick;
  return _react["default"].createElement(_reactSvg["default"], {
    src: "/static/img/edit.svg",
    className: "edit-icon",
    svgStyle: {
      width: '20px',
      height: '20px'
    },
    onClick: onEditClick
  });
};

exports.InlineEditButton = InlineEditButton;

var FileDeleteIcon = function FileDeleteIcon(_ref2) {
  var onClick = _ref2.onClick;
  return _react["default"].createElement(_reactSvg["default"], {
    src: "/static/img/trash-alt.svg",
    className: "trash-icon",
    onClick: onClick
  });
};

exports.FileDeleteIcon = FileDeleteIcon;

var getFieldEditData = function getFieldEditData(editData, modelName, fieldName, id) {
  return R.path([modelName, id, fieldName, 'currentValue'], editData);
};

exports.getFieldEditData = getFieldEditData;

var getFieldErrorEdit = function getFieldErrorEdit(editData, modelName, fieldName, id) {
  return R.path([modelName, id, fieldName, 'errors'], editData);
};

exports.getFieldErrorEdit = getFieldErrorEdit;

var isEditing = function isEditing(editData, modelName, id) {
  return R.pathOr(false, [modelName, id], editData);
};

exports.isEditing = isEditing;

var isFieldEditing = function isFieldEditing(editData, modelName, id, fieldName) {
  var idEditData = R.pathOr({}, [modelName, id], editData);
  return fieldName in idEditData;
};

exports.isFieldEditing = isFieldEditing;

var EditButton = function EditButton(_ref3) {
  var onClick = _ref3.onClick;
  return _react["default"].createElement("button", {
    className: "btn btn-sm btn-outline-success",
    onClick: onClick
  }, "Edit");
};

var RowEditButton = function RowEditButton(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      id = _ref4.id,
      node = _ref4.node;
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onEditClick = R.path(['edit', 'onTableRowEdit'], actions);
  return _react["default"].createElement(EditButton, {
    onClick: function onClick() {
      return onEditClick({
        modelName: modelName,
        id: id,
        node: node
      });
    }
  });
};

exports.RowEditButton = RowEditButton;

var TableEditButton = function TableEditButton(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      id = _ref5.id,
      fieldName = _ref5.fieldName,
      node = _ref5.node;
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onEditClick = R.path(['edit', 'onAttributeEdit'], actions);
  return _react["default"].createElement(EditButton, {
    onClick: function onClick() {
      return onEditClick({
        modelName: modelName,
        id: id,
        fieldName: fieldName,
        value: R.prop(fieldName, node)
      });
    }
  });
};

exports.TableEditButton = TableEditButton;

var EditSaveButton = function EditSaveButton(_ref6) {
  var onClick = _ref6.onClick;
  return _react["default"].createElement("button", {
    className: "btn btn-sm btn-success",
    onClick: onClick
  }, "Save");
};

exports.EditSaveButton = EditSaveButton;

var EditCancelButton = function EditCancelButton(_ref7) {
  var onClick = _ref7.onClick;
  return _react["default"].createElement("button", {
    className: "btn btn-sm btn",
    onClick: onClick
  }, "Cancel");
};

exports.EditCancelButton = EditCancelButton;

var EditInput = function EditInput(_ref8) {
  var schema = _ref8.schema,
      modelName = _ref8.modelName,
      fieldName = _ref8.fieldName,
      node = _ref8.node,
      editData = _ref8.editData,
      error = _ref8.error,
      selectOptions = _ref8.selectOptions;
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onEditInputChange = R.path(['edit', 'onEditInputChange'], actions);
  return _react["default"].createElement(_Input["default"], _extends({
    key: fieldName
  }, {
    selectOptions: selectOptions,
    schema: schema,
    onChange: function onChange(_ref9) {
      var props = _extends({}, _ref9);

      return onEditInputChange(_objectSpread({
        id: node.id,
        modelName: modelName
      }, props));
    },
    fieldName: fieldName,
    modelName: modelName,
    value: editData,
    error: error,
    inline: true,
    node: node
  }));
};

exports.EditInput = EditInput;

var InlineInput = function InlineInput(_ref10) {
  var props = _extends({}, _ref10);

  return _react["default"].createElement("div", {
    className: "detail-edit d-inline-block pull-left"
  }, _react["default"].createElement(EditInput, _objectSpread({}, props)));
};

exports.InlineInput = InlineInput;