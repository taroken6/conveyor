"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.makeCreateLabel = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var R = _interopRequireWildcard(require("ramda"));

var _Input = _interopRequireWildcard(require("./Input"));

var _schemaGetters = require("../utils/schemaGetters");

var _Breadcrumbs = require("./Breadcrumbs");

var _getType = require("../utils/getType");

var _index = require("../input/index");

var _InputType = require("../form/InputType");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var getFieldErrorCreate = function getFieldErrorCreate(_ref) {
  var formStack = _ref.formStack,
      stackIndex = _ref.stackIndex,
      fieldName = _ref.fieldName;
  return R.path(['stack', stackIndex, 'errors', fieldName], formStack);
};

var makeCreateLabel = function makeCreateLabel(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      fieldName = _ref2.fieldName,
      props = _objectWithoutProperties(_ref2, ["schema", "modelName", "fieldName"]);

  var type = R.prop('type', (0, _schemaGetters.getField)(schema, modelName, fieldName));

  if (R.type(type) !== 'Object') {
    return null;
  }

  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onStackCreate = R.path(['create', 'onStackCreate'], actions);
  var targetModel = R.path([modelName, 'fields', fieldName, 'type', 'target'], schema);

  var onClick = function onClick() {
    return onStackCreate({
      modelName: targetModel
    });
  };

  var CreateLabel = (0, _Input.relationshipLabelFactory)(_objectSpread({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    onClick: onClick
  }, props));
  return CreateLabel;
}; // TODO: improve the way the disabled fields are handled, instead of directly
// holding value at ['stack', index, 'fields', 'fieldName'], hold an object
// with disabled and value key. This will also allow for other metadata to
// be held there if necessary


exports.makeCreateLabel = makeCreateLabel;

var isFieldDisabled = function isFieldDisabled(_ref3) {
  var schema = _ref3.schema,
      modelName = _ref3.modelName,
      fieldName = _ref3.fieldName,
      form = _ref3.form;
  var type = (0, _getType.getType)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName
  });

  if (type.includes('ToMany')) {
    return R.path(['fields', fieldName, 0, 'disabled'], form);
  } else {
    return R.path(['fields', fieldName, 'disabled'], form);
  }
};

var getDisabledValue = function getDisabledValue(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      fieldName = _ref4.fieldName,
      form = _ref4.form;
  var type = (0, _getType.getType)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName
  });

  if (type.includes('ToMany')) {
    return R.path(['fields', fieldName, 0, 'label'], form);
  } else {
    return R.path(['fields', fieldName, 'label'], form);
  }
};

var Create = function Create(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      formStack = _ref5.formStack,
      selectOptions = _ref5.selectOptions,
      getEnumOptions = _ref5.getEnumOptions,
      props = _objectWithoutProperties(_ref5, ["schema", "modelName", "formStack", "selectOptions", "getEnumOptions"]);

  var stackIndex = R.prop('index', formStack);
  var originFieldName = R.prop('originFieldName', formStack);

  if (stackIndex === -1) {
    return _react["default"].createElement(_reactRouterDom.Redirect, {
      to: R.propOr('/', 'originPath', formStack)
    });
  }

  var origin = R.prop('originModelName', formStack);
  var fieldOrder = (0, _schemaGetters.getCreateFields)(_objectSpread({
    schema: schema,
    modelName: modelName
  }, props));

  if (origin && stackIndex === 0) {
    var index = fieldOrder.indexOf(originFieldName);

    if (index !== -1) {
      fieldOrder.splice(index, 1);
    }

    fieldOrder.splice(0, 0, originFieldName);
  }

  var stack = R.prop('stack', formStack);
  var form = R.prop(stackIndex, stack);
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onChange = R.path(['create', 'onInputChange'], actions);
  var onCancel = R.path(['create', 'onCancel'], actions);
  var onSave = R.path(['create', 'onSave'], actions);
  var disableButtons = stackIndex !== stack.length - 1;
  var autoFocusAdded = false;

  var onKeyDown = function onKeyDown(evt) {
    if (evt.key === 'Enter') {
      return onSave({
        modelName: modelName
      });
    }
  };

  return _react["default"].createElement("div", {
    className: "container"
  }, _react["default"].createElement(_Breadcrumbs.Breadcrumbs, {
    schema: schema,
    formStack: formStack
  }), _react["default"].createElement("h1", null, "Create ", (0, _schemaGetters.getModelLabel)({
    schema: schema,
    modelName: modelName,
    form: form
  })), _react["default"].createElement("div", null, "* Indicates a Required Field"), _react["default"].createElement("br", null), _react["default"].createElement("div", null, fieldOrder.map(function (fieldName) {
    var disabled = isFieldDisabled({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      form: form
    });
    var value = disabled ? getDisabledValue({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      form: form
    }) : R.path(['fields', fieldName], form);
    var error = getFieldErrorCreate({
      formStack: formStack,
      stackIndex: stackIndex,
      fieldName: fieldName
    });
    var autoFocus = false;

    if (!autoFocusAdded && (0, _index.isAutoFocusInput)((0, _InputType.getInputType)({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName
    }))) {
      autoFocus = true;
      autoFocusAdded = true;
    }

    return _react["default"].createElement(_Input["default"], _extends({
      key: fieldName
    }, _objectSpread({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      value: value,
      error: error,
      selectOptions: selectOptions,
      getEnumOptions: getEnumOptions,
      onChange: onChange,
      disabled: disabled,
      formStack: formStack,
      customLabel: makeCreateLabel(_objectSpread({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName
      }, props)),
      autoFocus: autoFocus,
      onKeyDown: onKeyDown
    }, props)));
  })), disableButtons && _react["default"].createElement("p", {
    className: "text-danger"
  }, "Cannot save or cancel until all subsequent creates are resolved."), _react["default"].createElement("div", {
    className: "btn-group"
  }, _react["default"].createElement("button", {
    className: "btn btn-success",
    role: "button",
    onClick: function onClick() {
      return onSave({
        modelName: modelName
      });
    },
    disabled: disableButtons
  }, "Submit"), _react["default"].createElement("button", {
    className: "btn",
    role: "button",
    onClick: function onClick() {
      return onCancel();
    },
    disabled: disableButtons
  }, "Cancel")));
};

var _default = Create;
exports["default"] = _default;