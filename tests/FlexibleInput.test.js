import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import FlexibleInput from '../src/input/index'
import { isAutoFocusInput } from '../src/input/index'
import { inputTypes } from '../src/consts'

configure({ adapter: new Adapter() })

// Mount component
const setupFlexibleInput = props => {
  const wrapper = mount(<FlexibleInput {...props} />)

  return { props, wrapper }
}

// Tests
describe('FlexibleInput component', () => {
  it('should render InputDate component with defaulted props when type is date', () => {
    const { wrapper } = setupFlexibleInput({ type: inputTypes.DATE_TYPE })
    expect(wrapper.find('DatePicker')).toHaveLength(1)
    expect(wrapper.find('DatePicker').prop('isClearable')).toBe(true)
  })
  it('should render InputString component with defaulted props when type is string', () => {
    const { wrapper } = setupFlexibleInput({ type: inputTypes.STRING_TYPE })
    expect(wrapper.find('input')).toHaveLength(1)
    expect(wrapper.find('input').prop('type')).toBe('text')
    expect(
      wrapper.find('input').prop('value') === '' &&
        wrapper.find('input').prop('className') === 'form-control'
    ).toBe(true)
  })
  it('should render InputString component with defaulted props when type is email', () => {
    const { wrapper } = setupFlexibleInput({ type: inputTypes.EMAIL_TYPE })
    expect(wrapper.find('input')).toHaveLength(1)
    expect(wrapper.find('input').prop('type')).toBe('email')
    expect(
      wrapper.find('input').prop('value') === '' &&
        wrapper.find('input').prop('className') === 'form-control'
    ).toBe(true)
  })
  it('should render InputString component with defaulted props when type is phone', () => {
    const { wrapper } = setupFlexibleInput({ type: inputTypes.PHONE_TYPE })
    expect(wrapper.find('input')).toHaveLength(1)
    expect(wrapper.find('input').prop('type')).toBe('tel')
    expect(
      wrapper.find('input').prop('value') === '' &&
        wrapper.find('input').prop('className') === 'form-control'
    ).toBe(true)
  })
  it('should render InputString component with defaulted props when type is url', () => {
    const { wrapper } = setupFlexibleInput({ type: inputTypes.URL_TYPE })
    expect(wrapper.find('input')).toHaveLength(1)
    expect(wrapper.find('input').prop('type')).toBe('url')
    expect(
      wrapper.find('input').prop('value') === '' &&
        wrapper.find('input').prop('className') === 'form-control'
    ).toBe(true)
  })
  it('should render InputPassword component with defaulted props when type is password', () => {
    const { wrapper } = setupFlexibleInput({ type: inputTypes.PASSWORD_TYPE })
    expect(wrapper.find('input')).toHaveLength(1)
    expect(wrapper.find('input').prop('type')).toBe('password')
    expect(
      wrapper.find('input').prop('value') === '' &&
        wrapper.find('input').prop('className') === 'form-control'
    ).toBe(true)
  })
  it('should render InputInt component with defaulted props when type is int', () => {
    const { wrapper } = setupFlexibleInput({ type: inputTypes.INT_TYPE })
    expect(wrapper.find('input')).toHaveLength(1)
    expect(wrapper.find('input').prop('type')).toBe('number')
    expect(
      wrapper.find('input').prop('value') === '' &&
        wrapper.find('input').prop('className') === 'form-control'
    ).toBe(true)
  })
  it('should render InputCurrency component with defaulted props when type is currency', () => {
    const { wrapper } = setupFlexibleInput({ type: inputTypes.CURRENCY_TYPE })
    expect(wrapper.find('CurrencyInput')).toHaveLength(1)
    expect(
      wrapper.find('CurrencyInput').prop('value') === '' &&
        wrapper.find('CurrencyInput').prop('className') === 'form-control'
    ).toBe(true)
  })
  it('should render InputTextArea component with defaulted props when type is text', () => {
    const { wrapper } = setupFlexibleInput({ type: inputTypes.TEXTAREA_TYPE })
    expect(wrapper.find('textarea')).toHaveLength(1)
    expect(
      wrapper.find('textarea').prop('value') === '' &&
        wrapper.find('textarea').prop('className') === 'form-control'
    ).toBe(true)
  })
  it('should render InputRadio component with defaulted props when type is radio', () => {
    const { wrapper } = setupFlexibleInput({
      type: inputTypes.RADIO_TYPE,
      options: [{ label: 'test', value: 'false' }]
    })
    expect(wrapper.find('input')).toHaveLength(1)
    expect(wrapper.find('input').prop('type')).toBe('radio')
    expect(
      !wrapper
        .find('input')
        .parent()
        .hasClass('form-check-inline') &&
        wrapper
          .find('input')
          .parent()
          .hasClass('form-check')
    ).toBe(true)
  })
  it('should render InputFile component with defaulted props when type is file', () => {
    const { wrapper } = setupFlexibleInput({
      type: inputTypes.FILE_TYPE
    })
    expect(wrapper.find('input')).toHaveLength(1)
    expect(wrapper.find('input').prop('type')).toBe('file')
    expect(wrapper.find('input').hasClass('form-control-file')).toBe(true)
  })
  it('should render InputSwitch component with defaulted props when type is boolean', () => {
    const { wrapper } = setupFlexibleInput({
      type: inputTypes.BOOLEAN_TYPE
    })
    expect(wrapper.find('Switch')).toHaveLength(1)
    expect(
      wrapper
        .find('Switch')
        .parent()
        .hasClass('form-check') &&
        wrapper
          .find('Switch')
          .parent()
          .hasClass('form-check-inline') &&
        wrapper.find('Switch').prop('checked') === false
    ).toBe(true)
  })
  it('should render InputCheckbox component with defaulted props when type is checkbox', () => {
    const { wrapper } = setupFlexibleInput({
      type: inputTypes.CHECKBOX_TYPE
    })
    expect(wrapper.find('input')).toHaveLength(1)
    expect(wrapper.find('input').prop('type')).toBe('checkbox')
    expect(
      wrapper.find('input').prop('value') === false &&
        wrapper.find('div').hasClass('form-group form-check')
    ).toBe(true)
  })
  it('should render InputSelect component with defaulted props when type is select', () => {
    const { wrapper } = setupFlexibleInput({
      type: inputTypes.SELECT_TYPE
    })
    expect(wrapper.find('Select')).toHaveLength(1)
    expect(
      wrapper.find('Select').prop('isClearable') === true &&
        wrapper.find('Select').prop('isMulti') === false &&
        wrapper.find('Select').prop('noOptionsMessage')() === 'No Options' &&
        wrapper.find('Select').hasClass('basic-single')
    ).toBe(true)
  })
  it('should render InputSelect component with defaulted props when type is select', () => {
    const { wrapper } = setupFlexibleInput({
      type: inputTypes.SELECT_TYPE
    })
    expect(wrapper.find('Select')).toHaveLength(1)
    expect(
      wrapper.find('Select').prop('isClearable') === true &&
        wrapper.find('Select').prop('isMulti') === false &&
        wrapper.find('Select').prop('noOptionsMessage')() === 'No Options' &&
        wrapper.find('Select').hasClass('basic-single')
    ).toBe(true)
  })
  it('should render InputString component with error when error is supplied with type string', () => {
    const { wrapper } = setupFlexibleInput({
      type: inputTypes.STRING_TYPE,
      error: 'Example Error'
    })
    expect(
      wrapper
        .find('div')
        .at(1)
        .text()
    ).toBe('Example Error')
  })
})

describe('isAutoFocusInput function', () => {
  it('should return true if type is string, textarea, email, url, phone, password, int, or currency', () => {
    expect(isAutoFocusInput(inputTypes.STRING_TYPE)).toBe(true)
    expect(isAutoFocusInput(inputTypes.TEXTAREA_TYPE)).toBe(true)
    expect(isAutoFocusInput(inputTypes.EMAIL_TYPE)).toBe(true)
    expect(isAutoFocusInput(inputTypes.URL_TYPE)).toBe(true)
    expect(isAutoFocusInput(inputTypes.PHONE_TYPE)).toBe(true)
    expect(isAutoFocusInput(inputTypes.PASSWORD_TYPE)).toBe(true)
    expect(isAutoFocusInput(inputTypes.INT_TYPE)).toBe(true)
    expect(isAutoFocusInput(inputTypes.CURRENCY_TYPE)).toBe(true)
  })
  it('should return false if any other type', () => {
    expect(isAutoFocusInput(inputTypes.DATE_TYPE)).toBe(false)
    expect(isAutoFocusInput(inputTypes.FILE_TYPE)).toBe(false)
    expect(isAutoFocusInput(inputTypes.RADIO_TYPE)).toBe(false)
    expect(isAutoFocusInput(inputTypes.SELECT_TYPE)).toBe(false)
    expect(isAutoFocusInput(inputTypes.CHECKBOX_TYPE)).toBe(false)
    expect(isAutoFocusInput(inputTypes.BOOLEAN_TYPE)).toBe(false)
  })
})
