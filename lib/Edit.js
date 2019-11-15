"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditInput = exports.EditCancelButton = exports.EditSaveButton = exports.TableEditButton = exports.RowEditButton = exports.isFieldEditing = exports.isEditing = exports.getFieldErrorEdit = exports.getFieldEditData = exports.FileDelete = exports.FileDeleteIcon = exports.InlineEditButton = void 0;

var _react = _interopRequireDefault(require("react"));

var R = _interopRequireWildcard(require("ramda"));

var _schemaGetters = require("./utils/schemaGetters");

var _Input = _interopRequireDefault(require("./form/Input"));

var _reactSvg = _interopRequireDefault(require("react-svg"));

var _Modal = require("./Modal");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
  var modalId = _ref2.modalId;
  return _react["default"].createElement(_reactSvg["default"], {
    src: "/static/img/trash-alt.svg",
    className: "trash-icon",
    "data-toggle": "modal",
    "data-target": '#' + modalId
  });
};

exports.FileDeleteIcon = FileDeleteIcon;

var FileDelete = function FileDelete(_ref3) {
  var id = _ref3.id,
      fieldName = _ref3.fieldName,
      onFileDelete = _ref3.onFileDelete;
  // do not begin modalId with number
  var modalId = "".concat(fieldName, "-").concat(id, "-file-delete-modal");
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(FileDeleteIcon, {
    modalId: modalId
  }), _react["default"].createElement(_Modal.Modal, {
    id: modalId,
    title: 'Are you sure you want to delete this file?'
  }, _react["default"].createElement("div", {
    className: "text-center"
  }, _react["default"].createElement("div", {
    className: "btn-group"
  }, _react["default"].createElement("button", {
    className: "btn btn-small btn-outline-secondary",
    "data-dismiss": "modal"
  }, "Cancel"), _react["default"].createElement("button", {
    className: "btn btn-sm btn-outline-danger",
    "data-dismiss": "modal",
    onClick: onFileDelete
  }, "Confirm Delete")))));
};

exports.FileDelete = FileDelete;

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

var EditButton = function EditButton(_ref4) {
  var onClick = _ref4.onClick;
  return _react["default"].createElement("button", {
    className: "btn btn-sm btn-outline-success",
    onClick: onClick
  }, "Edit");
};

var RowEditButton = function RowEditButton(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      id = _ref5.id,
      node = _ref5.node;
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

var TableEditButton = function TableEditButton(_ref6) {
  var schema = _ref6.schema,
      modelName = _ref6.modelName,
      id = _ref6.id,
      fieldName = _ref6.fieldName,
      node = _ref6.node;
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

var EditSaveButton = function EditSaveButton(_ref7) {
  var onClick = _ref7.onClick;
  return _react["default"].createElement("button", {
    className: "btn btn-sm btn-success",
    onClick: onClick
  }, "Save");
};

exports.EditSaveButton = EditSaveButton;

var EditCancelButton = function EditCancelButton(_ref8) {
  var onClick = _ref8.onClick;
  return _react["default"].createElement("button", {
    className: "btn btn-sm btn",
    onClick: onClick
  }, "Cancel");
};

exports.EditCancelButton = EditCancelButton;

var EditInput = function EditInput(_ref9) {
  var schema = _ref9.schema,
      modelName = _ref9.modelName,
      fieldName = _ref9.fieldName,
      node = _ref9.node,
      editData = _ref9.editData,
      error = _ref9.error,
      selectOptions = _ref9.selectOptions,
      customProps = _ref9.customProps;
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onEditInputChange = R.path(['edit', 'onEditInputChange'], actions);
  return _react["default"].createElement(_Input["default"], _extends({
    key: fieldName
  }, {
    selectOptions: selectOptions,
    schema: schema,
    onChange: function onChange(_ref10) {
      var props = _extends({}, _ref10);

      return onEditInputChange(_objectSpread({
        id: node.id,
        modelName: modelName
      }, props));
    },
    fieldName: fieldName,
    modelName: modelName,
    node: node,
    value: editData,
    error: error,
    inline: true,
    customProps: customProps
  }));
};

exports.EditInput = EditInput;