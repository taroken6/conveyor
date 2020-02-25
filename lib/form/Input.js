"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.InputCore = exports.getOnChange = exports.DisabledInput = exports.relationshipLabelFactory = void 0;

var _react = _interopRequireDefault(require("react"));

var R = _interopRequireWildcard(require("ramda"));

var _index = _interopRequireDefault(require("../input/index"));

var _consts = require("../consts");

var _Utils = require("../Utils");

var _schemaGetters = require("../utils/schemaGetters");

var _fileConverters = require("../utils/fileConverters");

var _CreateButton = _interopRequireDefault(require("../CreateButton"));

var _Field = require("../table/Field");

var _getType = require("../utils/getType");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var relationshipLabelFactory = function relationshipLabelFactory(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldName = _ref.fieldName,
      onClick = _ref.onClick,
      customProps = _ref.customProps;
  var relSchemaEntry = (0, _Field.getRelSchemaEntry)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName
  });
  var relModelName = R.prop('modelName', relSchemaEntry);
  var id = "input-".concat(modelName, "-").concat(fieldName);
  var required = R.prop('required', (0, _schemaGetters.getField)(schema, modelName, fieldName));
  var creatable = (0, _Utils.isCreatable)({
    schema: schema,
    modelName: relModelName,
    customProps: customProps
  });

  var Label = function Label(_ref2) {
    var labelStr = _ref2.labelStr;
    return _react["default"].createElement("label", {
      htmlFor: id
    }, _react["default"].createElement("span", null, labelStr), required && ' *', creatable && _react["default"].createElement(_CreateButton["default"], {
      onClick: onClick
    }));
  };

  return Label;
};

exports.relationshipLabelFactory = relationshipLabelFactory;

var DisabledInput = function DisabledInput(_ref3) {
  var value = _ref3.value,
      label = _ref3.label;
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("span", null, label), _react["default"].createElement("div", {
    style: {
      paddingBottom: '10px',
      paddingTop: '10px'
    }
  }, _react["default"].createElement("div", {
    style: {
      padding: '7px 7px 7px 12px',
      backgroundColor: '#E0E0E0',
      minHeight: '40px'
    },
    className: "border rounded primary"
  }, value)));
};

exports.DisabledInput = DisabledInput;

var Input = function Input(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      fieldName = _ref4.fieldName,
      node = _ref4.node,
      value = _ref4.value,
      error = _ref4.error,
      inline = _ref4.inline,
      onChange = _ref4.onChange,
      selectOptions = _ref4.selectOptions,
      disabled = _ref4.disabled,
      customLabel = _ref4.customLabel,
      formStack = _ref4.formStack,
      autoFocus = _ref4.autoFocus,
      onKeyDown = _ref4.onKeyDown,
      customProps = _ref4.customProps;
  var InputOverride = (0, _Utils.getInputOverride)(schema, modelName, fieldName);
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onMenuOpen = R.path(['input', 'onMenuOpen'], actions);
  var onCreatableMenuOpen = R.path(['input', 'onCreatableMenuOpen'], actions);

  if ((0, _Utils.skipOverride)(InputOverride)) {
    return null;
  }

  if (InputOverride) {
    return _react["default"].createElement(InputOverride, {
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      node: node,
      value: value,
      error: error,
      inline: inline,
      onChange: onChange,
      selectOptions: selectOptions,
      disabled: disabled,
      customLabel: customLabel,
      onMenuOpen: onMenuOpen,
      onCreatableMenuOpen: onCreatableMenuOpen,
      autoFocus: autoFocus,
      onKeyDown: onKeyDown,
      customProps: customProps
    });
  }

  if (disabled) {
    var label = (0, _schemaGetters.getFieldLabel)({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      node: R.path(['originNode'], formStack),
      customProps: customProps
    });
    return _react["default"].createElement(DisabledInput, {
      value: value,
      label: label
    });
  }

  var fieldHelp = (0, _schemaGetters.getFieldHelpText)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName
  });
  return _react["default"].createElement("div", null, _react["default"].createElement(InputCore, {
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    node: node,
    value: value,
    error: error,
    inline: inline,
    onChange: onChange,
    selectOptions: selectOptions,
    disabled: disabled,
    customLabel: customLabel,
    onMenuOpen: onMenuOpen,
    onCreatableMenuOpen: onCreatableMenuOpen,
    autoFocus: autoFocus,
    onKeyDown: onKeyDown,
    customProps: customProps
  }), fieldHelp && _react["default"].createElement("small", {
    className: "help-text"
  }, fieldHelp));
};

var getOnChange = function getOnChange(_ref5) {
  var inputType = _ref5.inputType,
      onChange = _ref5.onChange,
      fieldName = _ref5.fieldName;

  var defaultHandleOnChange = function defaultHandleOnChange(val) {
    return onChange({
      fieldName: fieldName,
      value: val
    });
  };

  if (inputType !== _consts.inputTypes.FILE_TYPE) {
    return defaultHandleOnChange;
  }

  return function (evt) {
    var fileReader = new FileReader();

    var onloadend = function onloadend() {
      // handle result of read
      if (!fileReader.error) {
        var content = fileReader.result; // since cannot save ArrayBuffer to store, convert value

        var converted = (0, _fileConverters.arrayBufferToStoreValue)(content);
        defaultHandleOnChange(converted);
      } else {// TODO handle error
      }
    };

    if (evt.target.files.length > 0) {
      // initiate read
      fileReader.onloadend = onloadend;
      fileReader.readAsArrayBuffer(evt.target.files[0]);
    }
  };
};

exports.getOnChange = getOnChange;

var InputCore = function InputCore(_ref6) {
  var schema = _ref6.schema,
      modelName = _ref6.modelName,
      fieldName = _ref6.fieldName,
      value = _ref6.value,
      error = _ref6.error,
      inline = _ref6.inline,
      onChange = _ref6.onChange,
      selectOptions = _ref6.selectOptions,
      customLabel = _ref6.customLabel,
      _onMenuOpen = _ref6.onMenuOpen,
      onCreatableMenuOpen = _ref6.onCreatableMenuOpen,
      customInput = _ref6.customInput,
      autoFocus = _ref6.autoFocus,
      onKeyDown = _ref6.onKeyDown,
      customProps = _ref6.customProps;
  var inputType = (0, _getType.getType)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName
  });
  var defaultHandleOnChange = getOnChange({
    inputType: inputType,
    onChange: onChange,
    fieldName: fieldName
  });
  var fieldLabel = (0, _schemaGetters.getFieldLabel)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    customProps: customProps
  });
  var defaultProps = {
    id: "input-".concat(modelName, "-").concat(fieldName),
    type: inputType,
    onChange: defaultHandleOnChange,
    labelStr: inline ? null : fieldLabel,
    value: value,
    error: error,
    required: R.prop('required', (0, _schemaGetters.getField)(schema, modelName, fieldName)),
    customInput: customInput,
    autoFocus: autoFocus,
    onKeyDown: onKeyDown
  };
  var enumChoices = (0, _schemaGetters.getEnumChoices)(schema, modelName, fieldName);
  var enumChoiceOrder = (0, _schemaGetters.getEnumChoiceOrder)(schema, modelName, fieldName);
  var options;

  switch (inputType) {
    case _consts.inputTypes.STRING_TYPE:
    case _consts.inputTypes.INT_TYPE:
    case _consts.inputTypes.TEXTAREA_TYPE:
    case _consts.inputTypes.DATE_TYPE:
    case _consts.inputTypes.URL_TYPE:
    case _consts.inputTypes.EMAIL_TYPE:
    case _consts.inputTypes.PHONE_TYPE:
    case _consts.inputTypes.BOOLEAN_TYPE:
    case _consts.inputTypes.CURRENCY_TYPE:
    case _consts.inputTypes.PASSWORD_TYPE:
    case _consts.inputTypes.FILE_TYPE:
      return _react["default"].createElement(_index["default"], defaultProps);

    case _consts.inputTypes.FLOAT_TYPE:
      return _react["default"].createElement(_index["default"], _objectSpread({}, defaultProps, {
        type: _consts.inputTypes.INT_TYPE,
        customInput: {
          step: 'any'
        }
      }));

    case _consts.inputTypes.ENUM_TYPE:
      options = (0, _schemaGetters.getOptionsOverride)({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        options: enumChoiceOrder.map(function (choice) {
          return {
            label: enumChoices[choice],
            value: choice
          };
        }),
        value: value,
        customProps: customProps
      });
      return _react["default"].createElement(_index["default"], _objectSpread({}, defaultProps, {
        type: _consts.inputTypes.SELECT_TYPE,
        options: options,
        customInput: {
          step: 'any'
        }
      }));

    case _consts.inputTypes.ONE_TO_ONE_TYPE:
    case _consts.inputTypes.MANY_TO_ONE_TYPE:
    case _consts.inputTypes.ONE_TO_MANY_TYPE:
    case _consts.inputTypes.MANY_TO_MANY_TYPE:
      options = (0, _schemaGetters.getOptionsOverride)({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        options: R.path([modelName, fieldName], selectOptions),
        value: value,
        customProps: customProps
      });
      return _react["default"].createElement(_index["default"], _objectSpread({}, R.dissoc('type', defaultProps), {
        type: _consts.inputTypes.SELECT_TYPE,
        isMulti: inputType === _consts.inputTypes.ONE_TO_MANY_TYPE || inputType === _consts.inputTypes.MANY_TO_MANY_TYPE,
        customLabel: customLabel,
        onMenuOpen: function onMenuOpen(evt) {
          return _onMenuOpen({
            modelName: modelName,
            fieldName: fieldName
          });
        },
        options: options
      }));

    case _consts.inputTypes.CREATABLE_STRING_SELECT_TYPE:
      return _react["default"].createElement(_index["default"], _objectSpread({}, defaultProps, {
        customLabel: customLabel,
        onMenuOpen: function onMenuOpen() {
          return onCreatableMenuOpen({
            modelName: modelName,
            fieldName: fieldName
          });
        },
        options: R.path([modelName, fieldName], selectOptions)
      }));

    default:
      return _react["default"].createElement("p", null, fieldName, " default input");
  }
};

exports.InputCore = InputCore;
var _default = Input;
exports["default"] = _default;