"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputSelect = exports.InputCheckbox = exports.InputSwitch = exports.InputFile = exports.InputRadio = exports.InputTextArea = exports.InputCurrency = exports.InputInt = exports.InputPassword = exports.InputString = exports.InputDate = exports.FormGroup = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactSelect = _interopRequireDefault(require("react-select"));

var _reactDatepicker = _interopRequireDefault(require("react-datepicker"));

var _reactCurrencyInput = _interopRequireDefault(require("react-currency-input"));

var _rcSwitch = _interopRequireDefault(require("rc-switch"));

var R = _interopRequireWildcard(require("ramda"));

var _consts = require("../consts");

var _inputStringTypeMap;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var errorBuilder = function errorBuilder(_ref) {
  var error = _ref.error,
      id = _ref.id;
  return error.map(function (r) {
    return _react["default"].createElement("div", {
      key: "".concat(r, "-").concat(id, "-error")
    }, r, _react["default"].createElement("br", null));
  });
};

var FormGroup = function FormGroup(_ref2) {
  var labelStr = _ref2.labelStr,
      htmlFor = _ref2.htmlFor,
      error = _ref2.error,
      children = _ref2.children,
      required = _ref2.required,
      _ref2$customError = _ref2.customError,
      customError = _ref2$customError === void 0 ? null : _ref2$customError,
      _ref2$customLabel = _ref2.customLabel,
      customLabel = _ref2$customLabel === void 0 ? null : _ref2$customLabel;
  var errorComp;

  if (!customError && error) {
    errorComp = _react["default"].createElement("div", {
      className: "invalid-feedback"
    }, errorBuilder({
      error: error,
      id: htmlFor
    }));
  } else if (customError && error) {
    errorComp = customError({
      error: error,
      id: htmlFor
    });
  }

  var labelComp;

  if (customLabel) {
    labelComp = customLabel({
      labelStr: labelStr,
      required: required
    });
  } else if (labelStr) {
    labelComp = _react["default"].createElement("label", {
      htmlFor: htmlFor
    }, "".concat(labelStr, " ").concat(required ? ' *' : ''));
  }

  return _react["default"].createElement("div", {
    className: "form-group",
    style: {
      "flexGrow": 1
    }
  }, labelComp, children, errorComp);
};
/**
 * Some components (such as InputDate, InputSwitch, ect.) do not work well with
 * invalid-feedback, so a special component was created to show the error message.
 *
 * @property: { list } error - list of strings containing error messages
 */


exports.FormGroup = FormGroup;

var CustomErrorComponent = function CustomErrorComponent(_ref3) {
  var error = _ref3.error,
      id = _ref3.id;
  return _react["default"].createElement("div", {
    style: {
      'fontSize': '80%',
      'color': '#dc3545'
    }
  }, errorBuilder({
    error: error,
    id: id
  }));
};
/**
 * Singular component for Date Type.
 *
 * See React DatePicker for details on: dateFormat, isClearable
 *
 * should NOT have onKeyDown because the 'enter' key should be reserved for DatePicker operations

 * @property { function } onChange - returns evt:
 *      evt => onChange(evt)
 * @property { string } id
 * @property { string } [labelStr]
 * @property { string } [error]
 * @property { any } value - FlexibleInput component sets default to: null
 * @property { string } dateFormat
 * @property { string } className - FlexibleInput component sets default to: 'form-control'
 * @property { boolean } isClearable - FlexibleInput component sets default to: true
 * @property { object } [customInput] - Can override the following default
 *      settings : { placeholderText: "Click to select a date", fixedHeight: true,
 *          dateFormat: 'YYYY-MM-DD'}. See React DatePicker docs for full list.
 * @property { boolean } required
 * @property { function } customError
 * @property { function } customLabel
 */
// TODO: get classname for invalid from new react-datepicker


var InputDate = function InputDate(_ref4) {
  var _onChange = _ref4.onChange,
      id = _ref4.id,
      labelStr = _ref4.labelStr,
      error = _ref4.error,
      value = _ref4.value,
      dateFormat = _ref4.dateFormat,
      className = _ref4.className,
      isClearable = _ref4.isClearable,
      required = _ref4.required,
      customInput = _ref4.customInput,
      customError = _ref4.customError,
      customLabel = _ref4.customLabel;
  var date;

  if (value) {
    date = new Date(value);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  } else {
    date = '';
  }

  return _react["default"].createElement(FormGroup, {
    labelStr: labelStr,
    htmlFor: id,
    error: error,
    required: required,
    customError: R.defaultTo(CustomErrorComponent, customError),
    customLabel: customLabel
  }, _react["default"].createElement("div", {
    style: {
      display: 'inherit'
    }
  }, _react["default"].createElement(_reactDatepicker["default"], _extends({
    placeholderText: "Click to select a date",
    fixedHeight: true,
    dateFormat: 'yyyy/MM/dd',
    selected: date // YYYY-MM-DD required for Date()
    //className={`${className}${error ? ' is-invalid' : ''}`}
    ,
    onChange: function onChange(evt) {
      if (evt === undefined || evt === null) {
        return _onChange(null);
      }

      return _onChange("".concat(evt.getFullYear(), "-").concat(evt.getUTCMonth() + 1, "-").concat(evt.getUTCDate()));
    },
    isClearable: isClearable
  }, customInput))));
};

exports.InputDate = InputDate;
var inputStringTypeMap = (_inputStringTypeMap = {}, _defineProperty(_inputStringTypeMap, _consts.inputTypes.STRING_TYPE, 'text'), _defineProperty(_inputStringTypeMap, _consts.inputTypes.EMAIL_TYPE, 'email'), _defineProperty(_inputStringTypeMap, _consts.inputTypes.PHONE_TYPE, 'tel'), _defineProperty(_inputStringTypeMap, _consts.inputTypes.URL_TYPE, 'url'), _inputStringTypeMap);
/**
 * Singular component for String Type.
 * @property { string } type - can be 'String', 'Email', 'URL', or 'Phone'. This
 *     dictates the input validation that the input component has.
 * @property { function } onChange - returns evt.target.value:
 *     evt => onChange(evt.target.value)
 * @property { string } id
 * @property { string } [labelStr]
 * @property { string } [error]
 * @property { any } value - FlexibleInput component sets default to: ''
 * @property { string } className - FlexibleInput component sets default to: 'form-control'
 * @property { object } [customInput]
 * @property { boolean } required
 * @property { function } customError
 * @property { function } customLabel
 * @property { boolean } autoFocus; update isAutoFocusInput() when changing
 */

var InputString = function InputString(_ref5) {
  var type = _ref5.type,
      _onChange2 = _ref5.onChange,
      id = _ref5.id,
      labelStr = _ref5.labelStr,
      error = _ref5.error,
      value = _ref5.value,
      className = _ref5.className,
      required = _ref5.required,
      customInput = _ref5.customInput,
      customError = _ref5.customError,
      customLabel = _ref5.customLabel,
      autoFocus = _ref5.autoFocus,
      onKeyDown = _ref5.onKeyDown;
  return _react["default"].createElement(FormGroup, {
    labelStr: labelStr,
    htmlFor: id,
    error: error,
    required: required,
    customError: R.defaultTo(null, customError),
    customLabel: customLabel
  }, _react["default"].createElement("input", _extends({
    autoFocus: autoFocus,
    type: inputStringTypeMap[type],
    onChange: function onChange(evt) {
      return _onChange2(evt.target.value);
    },
    className: "".concat(className).concat(error ? ' is-invalid' : ''),
    id: id,
    value: value,
    onKeyDown: onKeyDown
  }, customInput)));
};
/**
 * Singular component for Password Type.
 *
 * @property { function } onChange - returns evt.target.value from event:
 *     evt => onChange(evt.target.value)
 * @property { string } id
 * @property { string } [labelStr]
 * @property { string } [error]
 * @property { any } value - FlexibleInput component sets default to: ''
 * @property { string } className - FlexibleInput component sets default to: 'form-control'
 * @property { object } [customInput]
 * @property { boolean } required
 * @property { function } customError
 * @property { function } customLabel
 * @property { boolean } autoFocus; update isAutoFocusInput() when changing
 */


exports.InputString = InputString;

var InputPassword = function InputPassword(_ref6) {
  var _onChange3 = _ref6.onChange,
      id = _ref6.id,
      labelStr = _ref6.labelStr,
      error = _ref6.error,
      value = _ref6.value,
      className = _ref6.className,
      required = _ref6.required,
      customInput = _ref6.customInput,
      customError = _ref6.customError,
      customLabel = _ref6.customLabel,
      autoFocus = _ref6.autoFocus,
      onKeyDown = _ref6.onKeyDown;
  return _react["default"].createElement(FormGroup, {
    labelStr: labelStr,
    htmlFor: id,
    error: error,
    required: required,
    customError: R.defaultTo(null, customError),
    customLabel: customLabel
  }, _react["default"].createElement("input", _extends({
    autoFocus: autoFocus,
    type: "password",
    onChange: function onChange(evt) {
      return _onChange3(evt.target.value);
    },
    className: "".concat(className).concat(error ? ' is-invalid' : ''),
    id: id,
    value: value,
    onKeyDown: onKeyDown
  }, customInput)));
};
/**
 * Singular component for Integer Type.
 *
 * @property { function } onChange - returns evt.target.value
 *      evt => onChange(evt.target.value)
 * @property { string } id
 * @property { string } [labelStr]
 * @property { string } [error]
 * @property { any } value - FlexibleInput component sets default to: ''
 * @property { string } className - FlexibleInput component sets default to: 'form-control'
 * @property { object } [customInput] - Can change step increment (default
 *      integer value is 1). For example: {step: 3}
 * @property { boolean } required
 * @property { function } customError
 * @property { function } customLabel
 * @property { boolean } autoFocus; update isAutoFocusInput() when changing
 */


exports.InputPassword = InputPassword;
var MAX_SQL_INT_SIZE = Math.pow(2, 31) - 1;
var MIN_SQL_INT_SIZE = -Math.pow(2, 31);

var InputInt = function InputInt(_ref7) {
  var _onChange4 = _ref7.onChange,
      id = _ref7.id,
      labelStr = _ref7.labelStr,
      error = _ref7.error,
      value = _ref7.value,
      className = _ref7.className,
      required = _ref7.required,
      customInput = _ref7.customInput,
      customError = _ref7.customError,
      customLabel = _ref7.customLabel,
      autoFocus = _ref7.autoFocus,
      onKeyDown = _ref7.onKeyDown;

  if (value > MAX_SQL_INT_SIZE || value < MIN_SQL_INT_SIZE) {
    error = R.append('Number too large.', error);
  }

  return _react["default"].createElement(FormGroup, {
    labelStr: labelStr,
    htmlFor: id,
    error: error,
    required: required,
    customError: R.defaultTo(null, customError),
    customLabel: customLabel
  }, _react["default"].createElement("input", _extends({
    autoFocus: autoFocus,
    type: "number",
    step: 1,
    onChange: function onChange(evt) {
      if (evt.target.value === '') {
        return _onChange4(null);
      }

      return _onChange4(Number(evt.target.value));
    },
    className: "".concat(className).concat(error ? ' is-invalid' : ''),
    id: id,
    onKeyDown: onKeyDown,
    value: value.toString()
  }, customInput)));
};

exports.InputInt = InputInt;

var InputCurrency = function InputCurrency(_ref8) {
  var _onChange5 = _ref8.onChange,
      id = _ref8.id,
      labelStr = _ref8.labelStr,
      error = _ref8.error,
      value = _ref8.value,
      className = _ref8.className,
      required = _ref8.required,
      customInput = _ref8.customInput,
      customError = _ref8.customError,
      customLabel = _ref8.customLabel,
      autoFocus = _ref8.autoFocus,
      onKeyDown = _ref8.onKeyDown;
  return _react["default"].createElement(FormGroup, {
    labelStr: labelStr,
    htmlFor: id,
    error: error,
    required: required,
    customError: R.defaultTo(null, customError),
    customLabel: customLabel
  }, _react["default"].createElement("div", {
    className: "input-group mb-3"
  }, _react["default"].createElement("div", {
    className: "input-group-prepend"
  }, _react["default"].createElement("span", {
    className: "input-group-text"
  }, "$")), _react["default"].createElement(_reactCurrencyInput["default"], _extends({
    autoFocus: autoFocus,
    className: "".concat(className).concat(error ? ' is-invalid' : ''),
    placeholder: '0.00',
    value: value,
    onKeyDown: onKeyDown,
    onChange: function onChange(evt) {
      if (evt === '' || evt === undefined || evt === null) {
        return _onChange5(null);
      }

      return _onChange5(evt.replace(/,/g, ''));
    }
  }, customInput))));
};
/**
 * Singular component for TextArea Type.
 *
 * should NOT have onKeyDown because 'enter' should be reserved for textarea operations
 *
 * @property { function } onChange - returns evt.target.value:
 *     evt => onChange(evt.target.value)
 * @property { string } id
 * @property { string } [labelStr]
 * @property { string } [error]
 * @property { any } value - FlexibleInput component sets default to: ''
 * @property { string } className - FlexibleInput component sets default to: 'form-control'
 * @property { object } [customInput]
 * @property { boolean } required
 * @property { function } customError
 * @property { function } customLabel
 * @property { boolean } autoFocus; update isAutoFocusInput() when changing
 */


exports.InputCurrency = InputCurrency;

var InputTextArea = function InputTextArea(_ref9) {
  var _onChange6 = _ref9.onChange,
      id = _ref9.id,
      labelStr = _ref9.labelStr,
      error = _ref9.error,
      value = _ref9.value,
      className = _ref9.className,
      required = _ref9.required,
      customInput = _ref9.customInput,
      customError = _ref9.customError,
      customLabel = _ref9.customLabel,
      autoFocus = _ref9.autoFocus;
  return _react["default"].createElement(FormGroup, {
    labelStr: labelStr,
    htmlFor: id,
    error: error,
    required: required,
    customError: R.defaultTo(null, customError),
    customLabel: customLabel
  }, _react["default"].createElement("textarea", _extends({
    autoFocus: autoFocus,
    className: "".concat(className).concat(error ? ' is-invalid' : ''),
    value: value,
    onChange: function onChange(evt) {
      return _onChange6(evt.target.value);
    },
    id: id
  }, customInput)));
};
/**
 * Singular component for Radio Type.
 *
 * @property { function } onChange - returns evt.target.value:
 *     evt => onChange(evt.target.value)
 * @property { string } id
 * @property { string } [labelStr]
 * @property { string } [error]
 * @property { any } value - no default set
 * @property { string } className - FlexibleInput component sets default to: 'form-check'
 * @property { any } options
 * @property { boolean } inline - FlexibleInput component sets default to: false
 * @property { object } [customInput]
 * @property { boolean } required
 * @property { function } customError
 * @property { function } customLabel
 */


exports.InputTextArea = InputTextArea;

var InputRadio = function InputRadio(_ref10) {
  var _onChange7 = _ref10.onChange,
      id = _ref10.id,
      labelStr = _ref10.labelStr,
      error = _ref10.error,
      value = _ref10.value,
      className = _ref10.className,
      options = _ref10.options,
      inline = _ref10.inline,
      required = _ref10.required,
      customInput = _ref10.customInput,
      customError = _ref10.customError,
      customLabel = _ref10.customLabel;
  return _react["default"].createElement(FormGroup, {
    labelStr: labelStr,
    htmlFor: id,
    error: error,
    required: required,
    customError: R.defaultTo(CustomErrorComponent, customError),
    customLabel: customLabel
  }, options.map(function (option, idx) {
    return _react["default"].createElement("div", {
      key: "radio-".concat(idx, "-").concat(id),
      className: "".concat(className, " ").concat(inline ? ' form-check-inline' : '')
    }, _react["default"].createElement("input", _extends({
      className: "form-check-input",
      type: "radio",
      id: option.value,
      value: option.value,
      checked: option.value === value,
      onChange: function onChange(evt) {
        return _onChange7(evt.target.value);
      }
    }, customInput)), _react["default"].createElement("label", {
      className: "form-check-label",
      htmlFor: option.value
    }, option.label));
  }));
};
/**
 * Singular component for File Type.
 *
 * @property { function } onChange
 * @property { string } id
 * @property { string } [labelStr]
 * @property { string } [error]
 * @property { string } className - FlexibleInput component sets default to: 'form-control-file'
 * @property { object } [customInput]
 * @property { boolean } required
 * @property { function } customError
 * @property { function } customLabel
 */


exports.InputRadio = InputRadio;

var InputFile = function InputFile(_ref11) {
  var onChange = _ref11.onChange,
      error = _ref11.error,
      id = _ref11.id,
      labelStr = _ref11.labelStr,
      className = _ref11.className,
      required = _ref11.required,
      customInput = _ref11.customInput,
      customError = _ref11.customError,
      customLabel = _ref11.customLabel;
  return _react["default"].createElement(FormGroup, {
    labelStr: labelStr,
    htmlFor: id,
    error: error,
    required: required,
    customError: R.defaultTo(null, customError),
    customLabel: customLabel
  }, _react["default"].createElement("input", _extends({
    type: "file",
    accept: "image/*",
    onChange: onChange,
    className: "".concat(className).concat(error ? ' is-invalid' : ''),
    id: id
  }, customInput)));
};
/**
 * Singular component for Switch Type.
 *
 * See React Switch documentation for details on which attributes to override
 *
 * @property { function } onChange
 * @property { string } id
 * @property { string } [labelStr]
 * @property { string } [error]
 * @property { boolean } inline
 * @property { any } value - FlexibleInput component sets default to: false
 * @property { string } className - FlexibleInput component sets default to: 'form-check'
 * @property { object } [customInput]
 * @property { boolean } required
 * @property { function } customError
 * @property { function } customLabel
 */


exports.InputFile = InputFile;

var InputSwitch = function InputSwitch(_ref12) {
  var _onChange8 = _ref12.onChange,
      value = _ref12.value,
      inline = _ref12.inline,
      id = _ref12.id,
      className = _ref12.className,
      labelStr = _ref12.labelStr,
      error = _ref12.error,
      required = _ref12.required,
      customInput = _ref12.customInput,
      customError = _ref12.customError,
      customLabel = _ref12.customLabel;
  return _react["default"].createElement(FormGroup, {
    labelStr: labelStr,
    htmlFor: id,
    error: error,
    required: required,
    customError: R.defaultTo(CustomErrorComponent, customError),
    customLabel: customLabel
  }, _react["default"].createElement("div", {
    key: "checkbox-".concat(id),
    className: "".concat(className, " ").concat(inline ? ' form-check-inline' : '')
  }, "\xA0", _react["default"].createElement(_rcSwitch["default"], _extends({
    onChange: function onChange(evt) {
      var val = _typeof(evt) === _typeof(false) ? evt : false;
      return _onChange8(val);
    },
    checked: value
  }, customInput))));
};
/**
 * Singular component for Checkbox Type.
 *
 * This component has no customLabel option
 *
 * @property { function } onChange - returns evt.target.checked:
 *     evt => onChange(evt.target.checked)
 * @property { string } id
 * @property { string } [labelStr]
 * @property { string } [error]
 * @property { any } value - FlexibleInput component sets default to: false
 * @property { string } className - FlexibleInput component sets default to: 'form-group form-check'
 * @property { object } [customInput]
 * @property { boolean } required
 * @property { function } customError
 */


exports.InputSwitch = InputSwitch;

var InputCheckbox = function InputCheckbox(_ref13) {
  var _onChange9 = _ref13.onChange,
      value = _ref13.value,
      id = _ref13.id,
      className = _ref13.className,
      labelStr = _ref13.labelStr,
      error = _ref13.error,
      required = _ref13.required,
      customInput = _ref13.customInput,
      customError = _ref13.customError;
  customError = R.defaultTo(CustomErrorComponent, customError);
  return _react["default"].createElement("div", {
    key: "checkbox-".concat(id),
    className: className
  }, _react["default"].createElement("label", {
    className: "form-check-label"
  }, _react["default"].createElement("input", _extends({
    className: "form-check-input",
    type: "checkbox",
    id: id,
    value: value,
    checked: value,
    onChange: function onChange(evt) {
      var val = _typeof(evt.target.checked) === _typeof(false) ? evt.target.checked : false;
      return _onChange9(val);
    }
  }, customInput)), "".concat(labelStr, " ").concat(required ? ' *' : '')), error && customError({
    error: error,
    id: id
  }));
};
/**
 * Singular component for Select Type.
 *
 * See React Select docs for more details on: isClearable, isMulti, options, noOptionsMessage,
 * onMenuOpen
 *
* should NOT have onKeyDown because the 'enter' key should be reserved for Select operations
 *
 * @property { function } onChange
 * @property { string } id
 * @property { string } [labelStr]
 * @property { string } [error]
 * @property { any } value - no default set
 * @property { string } className - FlexibleInput component sets default to: 'basic-single'
 * @property { boolean } isClearable - FlexibleInput component sets default to: true
 * @property { boolean } isMulti - FlexibleInput component sets default to: false
 * @property { any } options
 * @property { function } noOptionsMessage - FlexibleInput component sets default to: () => 'No Options'
 * @property { function } onMenuOpen - See React Select for more details
 * @property { object } [customInput] - See React Select docs for full list of attributes
 * @property { boolean } required
 * @property { function } customError
 * @property { function } customLabel
 */


exports.InputCheckbox = InputCheckbox;

var InputSelect = function InputSelect(_ref14) {
  var labelStr = _ref14.labelStr,
      id = _ref14.id,
      error = _ref14.error,
      className = _ref14.className,
      isClearable = _ref14.isClearable,
      isMulti = _ref14.isMulti,
      value = _ref14.value,
      options = _ref14.options,
      onChange = _ref14.onChange,
      noOptionsMessage = _ref14.noOptionsMessage,
      onMenuOpen = _ref14.onMenuOpen,
      required = _ref14.required,
      customInput = _ref14.customInput,
      customError = _ref14.customError,
      customLabel = _ref14.customLabel;
  return _react["default"].createElement(FormGroup, {
    labelStr: labelStr,
    htmlFor: id,
    error: error,
    required: required,
    customError: R.defaultTo(CustomErrorComponent, customError),
    customLabel: customLabel
  }, _react["default"].createElement(_reactSelect["default"], _extends({
    className: className,
    classNamePrefix: "select",
    isClearable: isClearable,
    isMulti: isMulti,
    value: value,
    options: options,
    onChange: onChange,
    id: id,
    onMenuOpen: onMenuOpen,
    noOptionsMessage: noOptionsMessage
  }, customInput)));
};

exports.InputSelect = InputSelect;