"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.InputCore = exports.DisabledInput = exports.relationshipLabelFactory = void 0;

var _react = _interopRequireDefault(require("react"));

var R = _interopRequireWildcard(require("ramda"));

var _index = _interopRequireDefault(require("../input/index"));

var _InputType = require("./InputType");

var _consts = require("../consts");

var _Utils = require("../Utils");

var _schemaGetters = require("../utils/schemaGetters");

var _fileConverters = require("../utils/fileConverters");

var _CreateButton = _interopRequireDefault(require("../CreateButton"));

var _Field = require("../table/Field");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var relationshipLabelFactory = function relationshipLabelFactory(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldName = _ref.fieldName,
      onClick = _ref.onClick,
      props = _objectWithoutProperties(_ref, ["schema", "modelName", "fieldName", "onClick"]);

  var relSchemaEntry = (0, _Field.getRelSchemaEntry)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName
  });
  var relModelName = R.prop('modelName', relSchemaEntry);
  var id = "input-".concat(modelName, "-").concat(fieldName);
  var required = R.prop('required', (0, _schemaGetters.getField)(schema, modelName, fieldName));
  var creatable = (0, _Utils.isCreatable)(_objectSpread({
    schema: schema,
    modelName: relModelName
  }, props));

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
      backgroundColor: '#E0E0E0'
    },
    className: "border rounded primary"
  }, value)));
};

exports.DisabledInput = DisabledInput;

var Input = function Input(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      fieldName = _ref4.fieldName,
      value = _ref4.value,
      error = _ref4.error,
      inline = _ref4.inline,
      onChange = _ref4.onChange,
      selectOptions = _ref4.selectOptions,
      disabled = _ref4.disabled,
      customLabel = _ref4.customLabel,
      props = _objectWithoutProperties(_ref4, ["schema", "modelName", "fieldName", "value", "error", "inline", "onChange", "selectOptions", "disabled", "customLabel"]);

  var InputOverride = (0, _Utils.getInputOverride)(schema, modelName, fieldName);
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onMenuOpen = R.path(['input', 'onMenuOpen'], actions);

  if (InputOverride) {
    return _react["default"].createElement(InputOverride, _objectSpread({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      value: value,
      error: error,
      inline: inline,
      onChange: onChange,
      customLabel: customLabel,
      selectOptions: selectOptions,
      disabled: disabled,
      onMenuOpen: onMenuOpen
    }, props));
  }

  if (disabled) {
    var label = (0, _schemaGetters.getFieldLabel)({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      data: R.path(['formStack', 'originData'], props)
    });
    return _react["default"].createElement(DisabledInput, {
      value: value,
      label: label
    });
  }

  return _react["default"].createElement(InputCore, _objectSpread({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    value: value,
    error: error,
    inline: inline,
    onChange: onChange,
    selectOptions: selectOptions,
    disabled: disabled,
    customLabel: customLabel,
    onMenuOpen: onMenuOpen
  }, props));
};

var InputCore = function InputCore(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      fieldName = _ref5.fieldName,
      value = _ref5.value,
      error = _ref5.error,
      inline = _ref5.inline,
      onChange = _ref5.onChange,
      selectOptions = _ref5.selectOptions,
      customLabel = _ref5.customLabel,
      _onMenuOpen = _ref5.onMenuOpen,
      customProps = _ref5.customProps,
      autoFocus = _ref5.autoFocus,
      onKeyDown = _ref5.onKeyDown,
      props = _objectWithoutProperties(_ref5, ["schema", "modelName", "fieldName", "value", "error", "inline", "onChange", "selectOptions", "customLabel", "onMenuOpen", "customProps", "autoFocus", "onKeyDown"]);

  var inputType = (0, _InputType.getInputType)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName
  });

  var defaultHandleOnChange = function defaultHandleOnChange(val) {
    return onChange({
      fieldName: fieldName,
      value: val
    });
  };

  var fieldLabel = (0, _schemaGetters.getFieldLabel)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    data: {}
  });
  var defaultProps = {
    id: "input-".concat(modelName, "-").concat(fieldName),
    type: inputType,
    onChange: defaultHandleOnChange,
    labelStr: inline ? null : fieldLabel,
    value: value,
    error: error,
    required: R.prop('required', (0, _schemaGetters.getField)(schema, modelName, fieldName)),
    customProps: customProps,
    autoFocus: autoFocus,
    onKeyDown: onKeyDown
  };
  var enumChoices = (0, _schemaGetters.getEnumChoices)(schema, modelName, fieldName);
  var enumChoiceOrder = (0, _schemaGetters.getEnumChoiceOrder)(schema, modelName, fieldName);

  var onChangeFile = function onChangeFile(evt) {
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
      return _react["default"].createElement(_index["default"], defaultProps);

    case _consts.inputTypes.FILE_TYPE:
      return _react["default"].createElement(_index["default"], _objectSpread({}, defaultProps, {
        onChange: onChangeFile
      }));

    case _consts.inputTypes.FLOAT_TYPE:
      return _react["default"].createElement(_index["default"], _objectSpread({}, defaultProps, {
        type: _consts.inputTypes.INT_TYPE,
        customProps: {
          step: 'any'
        }
      }));

    case _consts.inputTypes.ENUM_TYPE:
      return _react["default"].createElement(_index["default"], _objectSpread({}, defaultProps, {
        type: _consts.inputTypes.SELECT_TYPE,
        options: enumChoiceOrder.map(function (choice) {
          return {
            label: enumChoices[choice],
            value: choice
          };
        }),
        customProps: {
          step: 'any'
        }
      }));

    case _consts.inputTypes.RELATIONSHIP_SINGLE:
    case _consts.inputTypes.RELATIONSHIP_MULTIPLE:
      return _react["default"].createElement(_index["default"], _objectSpread({}, R.dissoc('type', defaultProps), {
        type: _consts.inputTypes.SELECT_TYPE,
        isMulti: inputType === _consts.inputTypes.RELATIONSHIP_MULTIPLE,
        customLabel: customLabel,
        onMenuOpen: function onMenuOpen(evt) {
          return _onMenuOpen({
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