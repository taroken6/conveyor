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
  'customProps',
  'customError',
  'customLabel',
  'onKeyDown',
]

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
 * 'FlexibleInput' is the only entry point. You can instantiate the
 * class and reuse it as many times as needed.
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
 *  @example
 *
 *  Example 2: Generate a reusable object
 *
 *
 *  const flexForms = new FlexibleInput({
 *      type: 'String',
 *      value: 'Foo',
 *      onChange: myOnChangeFunc,
 *      id: 'my-unique-id'
 *  })
 *  return flexForms.render()
 *
 *  @example
 *
 *  Example 3: Alter reusable object to create fields with new properties
 *
 *  // It is recommended to pass in a unique 'id' prop for each field.
 *  // In order to do that, change the values using the setValues()
 *  method.
 *
 *
 *  const flexForms = new FlexibleInput({
 *      type: 'String',
 *      value: 'Foo',
 *      onChange: myOnChangeFunc,
 *      id: 'my-unique-id'
 *
 *  })
 *
 *  // all props passed in above remain intact, but 'value' and 'id' are altered:
 *
 *  flexForms.setValues({value:'Bar', id: 'second-unique-id'})
 *
 *  return flexForms.render()
 *
 *  // If the 'type' prop is passed in, all props are cleared and
 *  // default values are set to reflect the new type.
 *
 *  flexForms.setValues({type:'Select'})
 *
 *
 * @example
 *
 * Example 4: Override label and error component with custom logic
 *
 * // You can override the package's error and label components entirely
 * // by passing in your own function. The customError component must take an
 * // 'error' and 'id' prop, and the customLabel must take 'labelStr' and 'required' attributes.
 *
 *  const CustomError = ({error, id}) => <div style={{'fontSize': '80%', 'color': '#dc3545'}}>{`${ makeThisListAString(error) } custom`}</div>
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
 *  @example
 *
 *  Example 5: Radio and Select type requires 'options' prop in the following format:
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
 *
 *  @example
 *
 *  Example 6: Create Custom class that extends FlexibleInput
 *
 * // Create custom components (newUseMap) and add them to your custom class.
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
 * // then use your custom component:
 *
 * return <MyFlex {...props} />
 *
 * // or create a reusable component:
 *
 * const custom = new MyFlex({...props})
 * return custom.render()
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
 * @param { object } [customProps] - Overrides any props passed into the component,
 *      or those set by default in this library. For example, to override default
 *      settings for a "Date" component structure the data like so:
 *      {placeholderText:'Click here', fixedHeight:false}
 * @param { object } [customError] - custom component that takes in an argument
 *      'error' and 'id' and returns an html component in to be displayed below the field
 * @param { object } [customLabel] - custom label to be displayed above the filed
 *      not available for 'Checkbox' type
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

  /**
   * Updates component attributes after instantiating the class.
  */

  setValues (props) {
    if (Object.keys(props).includes('type')) {
      this._clearValues()
      this._setValues(props)
      this._setDefault()
    } else {
      this._setValues(props)
    }
  }

  _clearValues () {
    R.intersection(Object.keys(this), includeProps)
      .forEach(key => {
        this[key] = undefined
        return null
      })
  }

  _setValues (props) {
    R.intersection(Object.keys(props), includeProps)
      .forEach(key => {
        this[key] = props[key]
        return null
      })
  }

  _setDefault () {
    switch (this.type) {
      case inputTypes.STRING_TYPE:
      case inputTypes.EMAIL_TYPE:
      case inputTypes.PHONE_TYPE:
      case inputTypes.URL_TYPE:
      case inputTypes.TEXTAREA_TYPE:
      case inputTypes.INT_TYPE:
      case inputTypes.PASSWORD_TYPE:
      case inputTypes.CURRENCY_TYPE:
        this['value'] = R.defaultTo('', this['value'])
        this['className'] = R.defaultTo('form-control', this['className'])
        break

      case inputTypes.DATE_TYPE:
        // this['dateFormat'] = R.defaultTo('YYYY-MM-DD', this['dateFormat']) //todo: changed
        // this['className'] = R.defaultTo('form-control', this['className']) //todo: changed
        this['isClearable'] = R.defaultTo(true, this['isClearable'])
        break

      case inputTypes.FILE_TYPE:
        this['className'] = R.defaultTo('form-control-file', this['className'])
        break

      case inputTypes.RADIO_TYPE:
        this['inline'] = R.defaultTo(false, this['inline'])
        this['className'] = R.defaultTo('form-check', this['className'])
        break

      case inputTypes.SELECT_TYPE:
        this['className'] = R.defaultTo('basic-single', this['className'])
        this['isClearable'] = R.defaultTo(true, this['isClearable'])
        this['isMulti'] = R.defaultTo(false, this['isMulti'])
        this['noOptionsMessage'] = R.defaultTo(() => 'No Options', this['noOptionsMessage'])
        break

      case inputTypes.CHECKBOX_TYPE:
        this['value'] = R.defaultTo(false, this['value'])
        this['className'] = R.defaultTo('form-group form-check', this['className'])
        break

      case inputTypes.BOOLEAN_TYPE:
        this['value'] = R.defaultTo(false, this['value'])
        this['className'] = R.defaultTo('form-check', this['className'])
        this['inline'] = R.defaultTo(true, this['inline'])
        break
    }
    if (typeof (this['error']) === 'string') {
      this['error'] = [ this['error'] ]
    }
  }

  render () {
    this._setValues(this.props)
    this._setDefault()

    const reducer = (obj, key) => {
      obj[key] = this[key]
      return obj
    }
    const attrs = includeProps.reduce(reducer, {})
    const comp = this.useMap[this.type]

    if (!comp) {
      throw new Error(
        `Invalid type "${this.type}" for form component.`
      )
    }
    return comp(attrs)
  }
}

export default FlexibleInput
