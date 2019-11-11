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

var _Utils = require("../Utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
      user = _ref2.user,
      customProps = _ref2.customProps;
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

  var CreateLabel = (0, _Input.relationshipLabelFactory)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    onClick: onClick,
    user: user,
    customProps: customProps
  });
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

var DefaultCreateTitle = function DefaultCreateTitle(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      formStack = _ref5.formStack,
      customProps = _ref5.customProps;
  var stackIndex = R.prop('index', formStack);
  var stack = R.prop('stack', formStack);
  var form = R.prop(stackIndex, stack);
  return _react["default"].createElement("h1", null, "Create ", (0, _schemaGetters.getModelLabel)({
    schema: schema,
    modelName: modelName,
    form: form,
    formStack: formStack,
    customProps: customProps
  }));
};

var DefaultCreatePage = function DefaultCreatePage(_ref6) {
  var schema = _ref6.schema,
      modelName = _ref6.modelName,
      formStack = _ref6.formStack,
      selectOptions = _ref6.selectOptions,
      user = _ref6.user,
      customProps = _ref6.customProps;
  var stackIndex = R.prop('index', formStack);
  var originFieldName = R.prop('originFieldName', formStack);
  var stack = R.prop('stack', formStack);
  var form = R.prop(stackIndex, stack);
  customProps = R.assoc('form', form, customProps);
  var origin = R.prop('originModelName', formStack);
  var fieldOrder = (0, _schemaGetters.getCreateFields)({
    schema: schema,
    modelName: modelName,
    user: user,
    customProps: customProps
  });

  if (origin && stackIndex === 0) {
    var index = fieldOrder.indexOf(originFieldName);

    if (index !== -1) {
      fieldOrder.splice(index, 1);
    }

    fieldOrder.splice(0, 0, originFieldName);
  }

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

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", null, "* Indicates a Required Field"), _react["default"].createElement("br", null), _react["default"].createElement("div", null, fieldOrder.map(function (fieldName) {
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
    }, {
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      value: value,
      error: error,
      selectOptions: selectOptions,
      onChange: onChange,
      disabled: disabled,
      formStack: formStack,
      customLabel: makeCreateLabel({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        user: user,
        customProps: customProps
      }),
      autoFocus: autoFocus,
      onKeyDown: onKeyDown,
      customProps: customProps
    }));
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

var DefaultCreate = function DefaultCreate(_ref7) {
  var schema = _ref7.schema,
      modelName = _ref7.modelName,
      formStack = _ref7.formStack,
      selectOptions = _ref7.selectOptions,
      user = _ref7.user,
      customProps = _ref7.customProps;
  var CreateTitleOverride = (0, _Utils.getCreateTitleOverride)(schema, modelName);
  var CreatePageOverride = (0, _Utils.getCreatePageOverride)(schema, modelName);
  var CreateTitle = CreateTitleOverride || DefaultCreateTitle;
  var CreatePage = CreatePageOverride || DefaultCreatePage;

  if ((0, _Utils.skipOverride)(CreateTitleOverride) && (0, _Utils.skipOverride)(CreatePageOverride)) {
    return null;
  }

  return _react["default"].createElement("div", {
    className: "container"
  }, _react["default"].createElement(_Breadcrumbs.Breadcrumbs, {
    schema: schema,
    formStack: formStack,
    customProps: customProps
  }), (0, _Utils.skipOverride)(CreateTitleOverride) ? null : _react["default"].createElement(CreateTitle, {
    schema: schema,
    modelName: modelName,
    formStack: formStack,
    selectOptions: selectOptions,
    user: user,
    customProps: customProps
  }), (0, _Utils.skipOverride)(CreatePageOverride) ? null : _react["default"].createElement(CreatePage, {
    schema: schema,
    modelName: modelName,
    formStack: formStack,
    selectOptions: selectOptions,
    user: user,
    customProps: customProps
  }));
};

var Create = function Create(_ref8) {
  var schema = _ref8.schema,
      modelName = _ref8.modelName,
      formStack = _ref8.formStack,
      selectOptions = _ref8.selectOptions,
      user = _ref8.user,
      customProps = _ref8.customProps;
  var CreateOverride = (0, _Utils.getCreateOverride)(schema, modelName);
  var CreateComponent = CreateOverride || DefaultCreate;

  if (R.prop('index', formStack) === -1) {
    return _react["default"].createElement(_reactRouterDom.Redirect, {
      to: R.propOr('/', 'originPath', formStack)
    });
  }

  return (0, _Utils.skipOverride)(CreateOverride) ? null : _react["default"].createElement(CreateComponent, {
    schema: schema,
    modelName: modelName,
    formStack: formStack,
    selectOptions: selectOptions,
    user: user,
    customProps: customProps
  });
};

var _default = Create;
exports["default"] = _default;