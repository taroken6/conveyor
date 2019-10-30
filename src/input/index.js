import React from 'react'
import { inputTypes } from '../consts'
import * as R from 'ramda'
import {
  InputDate,
  InputString,
  InputPassword,
  InputInt,
  InputCurrency,
  InputTextArea,
  InputRadio,
  InputFile,
  InputSwitch,
  InputCheckbox,
  InputSelect
} from './inputComponent'

<<<<<<< HEAD
=======
const includeProps = [
  'type',
  'id',
  'value',
  'dateFormat',
  'labelStr',
  'onChange',
  'inline',
  'options',
  'className',
  'isClearable',
  'isMulti',
  'noOptionsMessage',
  'onMenuOpen',
  'error',
  'required',
  'customInput',
  'customError',
  'customLabel',
  'autoFocus',
  'onKeyDown',
]

>>>>>>> master
export const isAutoFocusInput = (type) => {
  switch(type) {
    case inputTypes.STRING_TYPE:
    case inputTypes.TEXTAREA_TYPE:
    case inputTypes.EMAIL_TYPE:
    case inputTypes.URL_TYPE:
    case inputTypes.PHONE_TYPE:
    case inputTypes.PASSWORD_TYPE:
    case inputTypes.INT_TYPE:
    case inputTypes.CURRENCY_TYPE:
      return true
    default:
      return false
  }
}

const defaultTypeMap = {
  [inputTypes.STRING_TYPE]: InputString,
  [inputTypes.EMAIL_TYPE]: InputString,
  [inputTypes.PHONE_TYPE]: InputString,
  [inputTypes.URL_TYPE]: InputString,
  [inputTypes.TEXTAREA_TYPE]: InputTextArea,
  [inputTypes.INT_TYPE]: InputInt,
  [inputTypes.CURRENCY_TYPE]: InputCurrency,
  [inputTypes.PASSWORD_TYPE]: InputPassword,
  [inputTypes.DATE_TYPE]: InputDate,
  [inputTypes.FILE_TYPE]: InputFile,
  [inputTypes.RADIO_TYPE]: InputRadio,
  [inputTypes.SELECT_TYPE]: InputSelect,
  [inputTypes.CHECKBOX_TYPE]: InputCheckbox,
  [inputTypes.BOOLEAN_TYPE]: InputSwitch
}

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
<<<<<<< HEAD
 * Example 2: Override label and error component with custom logic
=======
 * Example 4: Override label and error component
>>>>>>> master
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
<<<<<<< HEAD
*/

const FlexibleInput = props => {
=======
 *
 *  @example
 *
 *  Example 6: Make Custom class that extends FlexibleInput
 *
 * // make your own components (newUseMap) and add them to the class.
 *
 * const newUseMap = {
 *     'input1': input1,
 *     'input2': input2,
 * }
 *
 * export class MyFlex extends FlexibleInput {

 *     constructor (props) {
 *         super(props)
 *         this.useMap = {
 *             ...this.useMap,
 *             ...newUseMap,
 *         }
 *     }
 * }
 *
 * // then use your component:
 *
 * return <MyFlex {...props} />
 *
 * // or create a reusable component:
 *
 * const c = new MyFlex({...props})
 * return c.render()
*/

class FlexibleInput extends React.Component {
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
 * @param { object } [customError] - component that takes in an argument
 *      'error' and 'id' and returns an html component in to be displayed below the field
 * @param { object } [customLabel] - label component to be displayed above the filed
 *      not available for 'Checkbox' type
 * @param { boolean } [autoFocus] refers to specific fields (see isAutoFocusInput()) that have
 *      autofocus input feature
 *
 * @returns { object } - Single input component
*/

  constructor (props) {
    super(props)
    this._setValues(props)
    this._setDefault()
    this.useMap = {
      ...defaultTypeMap
    }
  }

>>>>>>> master
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
   * @param { object } [customProps] - Overrides any props passed into the component,
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

  const params = { ...props }

  switch (params.type) {
    case inputTypes.STRING_TYPE:
    case inputTypes.EMAIL_TYPE:
    case inputTypes.PHONE_TYPE:
    case inputTypes.URL_TYPE:
    case inputTypes.TEXTAREA_TYPE:
    case inputTypes.INT_TYPE:
    case inputTypes.PASSWORD_TYPE:
    case inputTypes.CURRENCY_TYPE:
      params['value'] = R.defaultTo('', params['value'])
      params['className'] = R.defaultTo('form-control', params['className'])
      break

    case inputTypes.DATE_TYPE:
      // params['dateFormat'] = R.defaultTo('YYYY-MM-DD', params['dateFormat']) //todo: changed
      // params['className'] = R.defaultTo('form-control', params['className']) //todo: changed
      params['isClearable'] = R.defaultTo(true, params['isClearable'])
      break

    case inputTypes.FILE_TYPE:
      params['className'] = R.defaultTo(
        'form-control-file',
        params['className']
      )
      break

    case inputTypes.RADIO_TYPE:
      params['inline'] = R.defaultTo(false, params['inline'])
      params['className'] = R.defaultTo('form-check', params['className'])
      break

    case inputTypes.SELECT_TYPE:
      params['className'] = R.defaultTo('basic-single', params['className'])
      params['isClearable'] = R.defaultTo(true, params['isClearable'])
      params['isMulti'] = R.defaultTo(false, params['isMulti'])
      params['noOptionsMessage'] = R.defaultTo(
        () => 'No Options',
        params['noOptionsMessage']
      )
      break

    case inputTypes.CHECKBOX_TYPE:
      params['value'] = R.defaultTo(false, params['value'])
      params['className'] = R.defaultTo(
        'form-group form-check',
        params['className']
      )
      break

    case inputTypes.BOOLEAN_TYPE:
      params['value'] = R.defaultTo(false, params['value'])
      params['className'] = R.defaultTo('form-check', params['className'])
      params['inline'] = R.defaultTo(true, params['inline'])
      break
  }

  if (typeof params['error'] === 'string') {
    params['error'] = [params['error']]
  }

  return defaultTypeMap[params.type]
}

export default FlexibleInput
