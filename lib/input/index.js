"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.isAutoFocusInput = void 0;

var _react = _interopRequireDefault(require("react"));

var _consts = require("../consts");

var R = _interopRequireWildcard(require("ramda"));

var _inputComponent = require("./inputComponent");

var _defaultTypeMap;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isAutoFocusInput = function isAutoFocusInput(type) {
  switch (type) {
    case _consts.inputTypes.STRING_TYPE:
    case _consts.inputTypes.TEXTAREA_TYPE:
    case _consts.inputTypes.EMAIL_TYPE:
    case _consts.inputTypes.URL_TYPE:
    case _consts.inputTypes.PHONE_TYPE:
    case _consts.inputTypes.PASSWORD_TYPE:
    case _consts.inputTypes.INT_TYPE:
    case _consts.inputTypes.CURRENCY_TYPE:
      return true;

    default:
      return false;
  }
};

exports.isAutoFocusInput = isAutoFocusInput;
var defaultTypeMap = (_defaultTypeMap = {}, _defineProperty(_defaultTypeMap, _consts.inputTypes.STRING_TYPE, _inputComponent.InputString), _defineProperty(_defaultTypeMap, _consts.inputTypes.EMAIL_TYPE, _inputComponent.InputString), _defineProperty(_defaultTypeMap, _consts.inputTypes.PHONE_TYPE, _inputComponent.InputString), _defineProperty(_defaultTypeMap, _consts.inputTypes.URL_TYPE, _inputComponent.InputString), _defineProperty(_defaultTypeMap, _consts.inputTypes.TEXTAREA_TYPE, _inputComponent.InputTextArea), _defineProperty(_defaultTypeMap, _consts.inputTypes.INT_TYPE, _inputComponent.InputInt), _defineProperty(_defaultTypeMap, _consts.inputTypes.CURRENCY_TYPE, _inputComponent.InputCurrency), _defineProperty(_defaultTypeMap, _consts.inputTypes.PASSWORD_TYPE, _inputComponent.InputPassword), _defineProperty(_defaultTypeMap, _consts.inputTypes.DATE_TYPE, _inputComponent.InputDate), _defineProperty(_defaultTypeMap, _consts.inputTypes.FILE_TYPE, _inputComponent.InputFile), _defineProperty(_defaultTypeMap, _consts.inputTypes.RADIO_TYPE, _inputComponent.InputRadio), _defineProperty(_defaultTypeMap, _consts.inputTypes.SELECT_TYPE, _inputComponent.InputSelect), _defineProperty(_defaultTypeMap, _consts.inputTypes.EXISTING_FIELD_SELECT_TYPE, _inputComponent.InputExistingFieldSelect), _defineProperty(_defaultTypeMap, _consts.inputTypes.CHECKBOX_TYPE, _inputComponent.InputCheckbox), _defineProperty(_defaultTypeMap, _consts.inputTypes.BOOLEAN_TYPE, _inputComponent.InputSwitch), _defaultTypeMap);
/**
 * 'FlexibleInput' is the only entry point.
 *
 * @example
 *
 * Example 1: Generate a single instance of your form input.
 *
 *  <FlexibleInput
 *      type={'String'}
 *      value={'Foo'}
 *      onChange={myOnChangeFunc}
 *      id={'my-unique-id'}
 *  />
 *
 *
 * @example
 *
 * Example 2: Override label and error component with custom logic
 *
 * // You can override the package's error and label components entirely
 * // by passing in your own function. The customError component must take an
 * // 'error' and 'id' prop, and the customLabel must take 'labelStr' and 'required' attributes.
 *
 *  const CustomError = ({error, id}) => <div style={{'fontSize': '80%', 'color': '#dc3545'}}>{`${ makeThisListAString(error) } foo`}</div>
 *  //
 *  const CustomLabel = ({labelStr, required}) =>
 *      <label htmlFor={id}>{`Custom ${labelStr} ${required ? ' **' : ''}`}</label>
 *
 *  return (
 *      <FlexibleInput
 *          type={'String'}
 *          value={'Foo'}
 *          onChange={myOnChangeFunc}
 *          id={id}
 *          labelStr={'My Label'}
 *          error={['my error', 'my other error']}
 *          customError={CustomError}
 *          customLabel={CustomLabel}
 *      />
 *  )
 *
 * @example
 *
 *  Example 3: Radio and Select type requires 'options' prop in the following format:
 *
 *  const options = [
 *      {label: 'This is True', value: 'true'},
 *      {label: 'This is False', value: 'false'}
 *  ]
 *  return (
 *      <FlexibleInput
 *          type={'Radio'}
 *          options={options}
 *          value={'false'}
 *          onChange={onChange}
 *          id={id}
 *      />
 *  )
*/

var FlexibleInput = function FlexibleInput(props) {
  /**
   * @param { string } type - One of following type designators:
   *      Int, TextArea, String, Password, Date, File, Radio, Select, Checkbox, Boolean,
   *      Email, Phone, URL, Currency.
   * @param { string } id - Unique input id
   * @param { any } [value] - Display value. Default: varies with type. Date value
   *      can be a moment object or a string.
   * @param { string } [dateFormat] - Optional value for the DateInput component.
   *      Default: 'YYYY-MM-DD'. Date value as a string should be consistent with
   *      dateFormat See moment.js for other format types
   * @param { string } [labelStr] - String used for built-in <label> component.
   *      Not available for "Boolean" type
   * @param { function } onChange
   * @param { boolean } [inline] - Only used for "Radio" type to signify inline
   *      capability. Default: false
   * @param { any } options - Required for "Radio" and "Select" type. For "Select",
   *      if options is left undefined, the parameter "noOptionsMessage" dictates
   *      the drop down message to be given to the user instead of the options.
   *      Options must be an array of "label"/"value" pairs:
   *          [{label: "Hello", value: "hello"}, {label: "World", value: "world"}]
   * @param { string } [className] - Component css class. Default: varies with type.
   * @param { boolean } [isClearable] - Signifies that "Select" and "Date"
   *      type input components can be cleared of data. Default: true. See
   *      documentation of React Select for more information.
   * @param { boolean } [isMulti] - Signifies that multiple options can be chosen
   *      for a "Select" type component. Default: false. See documentation of
   *      React Select for more information.
   * @param { function } [noOptionsMessage] - "Select" component drop down message
   *      displayed if no options available. Default: () => 'No Options'. See
   *      documentation of React Select for more information.
   * @param { function } onMenuOpen - Required for "Select" component to demonstrate
   *      behavior necessary when drop down menu is opened. See documentation of
   *      React Select for more information.
   * @param { list } [error] - List of error messages to be displayed. If provided,
   *      component class contains the string 'is-invalid' and message is
   *      displayed in red. For the following types: "File", "TextArea", "Int",
   *      "Password", "String", "Boolean", "Checkbox", "Select", "Date", "Radio".
   * @param { boolean } [required] - appends  '*' to the end of a label to indicate
   *      that the field is required. Not available for "Boolean" type
   * @param { object } [customInput] - Overrides any props passed into the component,
   *      or those set by default in this library. For example, to override default
   *      settings for a "Date" component structure the data like so:
   *      {placeholderText:'Click here', fixedHeight:false}
   * @param { object } [customError] - custom component that takes in an argument
   *      'error' and 'id' and returns an html component in to be displayed below the field
   * @param { object } [customLabel] - custom label to be displayed above the filed
   *      not available for 'Checkbox' type
   * @param { boolean } [autoFocus] refers to specific fields (see isAutoFocusInput()) that have
   *      autofocus input feature
   *
   * @returns { object } - Single input component
   */
  var params = _objectSpread({}, props);

  switch (params.type) {
    case _consts.inputTypes.STRING_TYPE:
    case _consts.inputTypes.EMAIL_TYPE:
    case _consts.inputTypes.PHONE_TYPE:
    case _consts.inputTypes.URL_TYPE:
    case _consts.inputTypes.TEXTAREA_TYPE:
    case _consts.inputTypes.INT_TYPE:
    case _consts.inputTypes.PASSWORD_TYPE:
    case _consts.inputTypes.CURRENCY_TYPE:
      params['value'] = R.defaultTo('', params['value']);
      params['className'] = R.defaultTo('form-control', params['className']);
      break;

    case _consts.inputTypes.DATE_TYPE:
      // params['dateFormat'] = R.defaultTo('YYYY-MM-DD', params['dateFormat']) //todo: changed
      // params['className'] = R.defaultTo('form-control', params['className']) //todo: changed
      params['isClearable'] = R.defaultTo(true, params['isClearable']);
      break;

    case _consts.inputTypes.FILE_TYPE:
      params['className'] = R.defaultTo('form-control-file', params['className']);
      break;

    case _consts.inputTypes.RADIO_TYPE:
      params['inline'] = R.defaultTo(false, params['inline']);
      params['className'] = R.defaultTo('form-check', params['className']);
      break;

    case _consts.inputTypes.SELECT_TYPE:
      params['className'] = R.defaultTo('basic-single', params['className']);
      params['isClearable'] = R.defaultTo(true, params['isClearable']);
      params['isMulti'] = R.defaultTo(false, params['isMulti']);
      params['noOptionsMessage'] = R.defaultTo(function () {
        return 'No Options';
      }, params['noOptionsMessage']);
      break;

    case _consts.inputTypes.CHECKBOX_TYPE:
      params['value'] = R.defaultTo(false, params['value']);
      params['className'] = R.defaultTo('form-group form-check', params['className']);
      break;

    case _consts.inputTypes.BOOLEAN_TYPE:
      params['value'] = R.defaultTo(false, params['value']);
      params['className'] = R.defaultTo('form-check', params['className']);
      params['inline'] = R.defaultTo(true, params['inline']);
      break;
  }

  if (typeof params['error'] === 'string') {
    params['error'] = [params['error']];
  }

  return defaultTypeMap[params.type](params);
};

var _default = FlexibleInput;
exports["default"] = _default;