import React from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import CurrencyInput from 'react-currency-input'
import Switch from 'rc-switch'
import * as R from 'ramda'
import { inputTypes } from '../consts'

const errorBuilder = ({ error, id }) => error.map(r => <div key={`${r}-${id}-error`}>{r}<br /></div>)

export const FormGroup = ({ labelStr, htmlFor, error, children, required, customError = null, customLabel = null }) => {
  let errorComp
  if (!customError && error) {
    errorComp = <div className='invalid-feedback'>{errorBuilder({ error, id: htmlFor })}</div>
  } else if (customError && error) {
    errorComp = customError({ error, id: htmlFor })
  }

  let labelComp
  if (customLabel) {
    labelComp = customLabel({ labelStr, required })
  } else if (labelStr) {
    labelComp = <label htmlFor={htmlFor}>{`${labelStr} ${required ? ' *' : ''}`}</label>
  }

  return (
    <div className='form-group'>
      {labelComp}
      {children}
      {errorComp}
    </div>
  )
}

/**
 * Some components (such as InputDate, InputSwitch, ect.) do not work well with
 * invalid-feedback, so a custom component was created to show the error message.
 *
 * @property: { list } error - list of strings containing error messages
 */

const CustomErrorComponent = ({ error, id }) =>
  <div style={{ 'fontSize': '80%', 'color': '#dc3545' }}>{errorBuilder({ error, id })}</div>

/**
 * Singular component for Date Type.
 *
 * See React DatePicker for details on: dateFormat, isClearable

 * @property { function } onChange - returns evt:
 *      evt => onChange(evt)
 * @property { string } id
 * @property { string } [labelStr]
 * @property { string } [error]
 * @property { any } value - FlexibleInput component sets default to: null
 * @property { string } dateFormat
 * @property { string } className - FlexibleInput component sets default to: 'form-control'
 * @property { boolean } isClearable - FlexibleInput component sets default to: true
 * @property { object } [customProps] - Can override the following default
 *      settings : { placeholderText: "Click to select a date", fixedHeight: true,
 *          dateFormat: 'YYYY-MM-DD'}. See React DatePicker docs for full list.
 * @property { boolean } required
 * @property { function } customError
 * @property { function } customLabel
 */

// TODO: get classname for invalid from new react-datepicker
export const InputDate = ({ onChange, id, labelStr, error, value, dateFormat, className, isClearable, required, customProps, customError, customLabel }) => {
  console.log('---conv value: ', value)


  let date
  if (value) {
    date = new Date(value)
  } else {
    date = ''
  }
  console.log('---conv date:', date)

  date.setMinutes( date.getMinutes() + date.getTimezoneOffset() )
  console.log('---timezone', date.getTimezoneOffset())
  console.log('---timexone2', date.getMinutes() + date.getTimezoneOffset())
  console.log('---conv date2:', date)
  return (
  <FormGroup labelStr={labelStr} htmlFor={id} error={error} required={required}
    customError={R.defaultTo(CustomErrorComponent, customError)}
    customLabel={customLabel}>
    <div style={{ display: 'inherit' }}>
      <DatePicker
        placeholderText='Click to select a date'
        fixedHeight={true}
        dateFormat={'yyyy/MM/dd'}
        selected={date} // YYYY-MM-DD required for Date()
        //className={`${className}${error ? ' is-invalid' : ''}`}
        onChange={evt => {
          if (evt === undefined || evt === null) {
            return (onChange(null))
          }
          console.log('---evt', evt)
          console.log('changes', `${evt.getFullYear()}-${(evt.getUTCMonth() + 1)}-${evt.getUTCDate()}`)
          return onChange(
            `${evt.getFullYear()}-${(evt.getUTCMonth() + 1)}-${evt.getUTCDate()}`
          )
        }}
        isClearable={isClearable}
        {...customProps}
      />
    </div>
  </FormGroup>
)}

const inputStringTypeMap = {
  [inputTypes.STRING_TYPE]: 'text',
  [inputTypes.EMAIL_TYPE]: 'email',
  [inputTypes.PHONE_TYPE]: 'tel',
  [inputTypes.URL_TYPE]: 'url'
}

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
 * @property { object } [customProps]
 * @property { boolean } required
 * @property { function } customError
 * @property { function } customLabel
 */

export const InputString = ({ type, onChange, id, labelStr, error, value, className, required, customProps, customError, customLabel }) => (
  <FormGroup labelStr={labelStr} htmlFor={id} error={error} required={required}
    customError={R.defaultTo(null, customError)}
    customLabel={customLabel}>
    <input
      type={inputStringTypeMap[type]}
      onChange={evt => onChange(evt.target.value)}
      className={`${className}${error ? ' is-invalid' : ''}`}
      id={id}
      value={value}
      {...customProps}
    />
  </FormGroup>
)

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
 * @property { object } [customProps]
 * @property { boolean } required
 * @property { function } customError
 * @property { function } customLabel
 */

export const InputPassword = ({ onChange, id, labelStr, error, value, className, required, customProps, customError, customLabel }) => (
  <FormGroup labelStr={labelStr} htmlFor={id} error={error} required={required}
    customError={R.defaultTo(null, customError)}
    customLabel={customLabel}>
    <input
      type='password'
      onChange={evt => onChange(evt.target.value)}
      className={`${className}${error ? ' is-invalid' : ''}`}
      id={id}
      value={value}
      {...customProps}
    />
  </FormGroup>
)

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
 * @property { object } [customProps] - Can change step increment (default
 *      integer value is 1). For example: {step: 3}
 * @property { boolean } required
 * @property { function } customError
 * @property { function } customLabel
 */

export const InputInt = ({ onChange, id, labelStr, error, value, className, required, customProps, customError, customLabel }) => (
  <FormGroup labelStr={labelStr} htmlFor={id} error={error} required={required}
    customError={R.defaultTo(null, customError)}
    customLabel={customLabel}>
    <input
      type='number'
      step={1}
      onChange={evt => {
        if (evt.target.value === '') {
          return onChange(null)
        }
        return (
          onChange(evt.target.value)
        )
      }}
      className={`${className}${error ? ' is-invalid' : ''}`}
      id={id}
      value={value}
      {...customProps}
    />
  </FormGroup>
)

export const InputCurrency = ({ onChange, id, labelStr, error, value, className, required, customProps, customError, customLabel }) => (
  <FormGroup labelStr={labelStr} htmlFor={id} error={error} required={required}
    customError={R.defaultTo(null, customError)}
    customLabel={customLabel}>
    <div className='input-group mb-3'>
      <div className='input-group-prepend'>
        <span className='input-group-text'>$</span>
      </div>
      <CurrencyInput
        className={`${className}${error ? ' is-invalid' : ''}`}
        placeholder={'0.00'}
        value={value}
        onChange={evt => {
          if (evt === '' || evt === undefined || evt === null) {
            return (onChange(null))
          }
          return onChange((evt).replace(/,/g, ''))
        }}
        {...customProps}
      />
    </div>
  </FormGroup>
)

/**
 * Singular component for TextArea Type.
 *
 * @property { function } onChange - returns evt.target.value:
 *     evt => onChange(evt.target.value)
 * @property { string } id
 * @property { string } [labelStr]
 * @property { string } [error]
 * @property { any } value - FlexibleInput component sets default to: ''
 * @property { string } className - FlexibleInput component sets default to: 'form-control'
 * @property { object } [customProps]
 * @property { boolean } required
 * @property { function } customError
 * @property { function } customLabel
 */

export const InputTextArea = ({ onChange, id, labelStr, error, value, className, required, customProps, customError, customLabel }) => (
  <FormGroup labelStr={labelStr} htmlFor={id} error={error} required={required}
    customError={R.defaultTo(null, customError)}
    customLabel={customLabel}>
    <textarea
      className={`${className}${error ? ' is-invalid' : ''}`}
      value={value}
      onChange={evt => onChange(evt.target.value)}
      id={id}
      {...customProps}
    />
  </FormGroup>
)

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
 * @property { object } [customProps]
 * @property { boolean } required
 * @property { function } customError
 * @property { function } customLabel
 */

export const InputRadio = ({ onChange, id, labelStr, error, value, className, options, inline, required, customProps, customError, customLabel }) => (
  <FormGroup labelStr={labelStr} htmlFor={id} error={error} required={required}
    customError={R.defaultTo(CustomErrorComponent, customError)}
    customLabel={customLabel}>
    {options.map((option, idx) => (
      <div key={`radio-${idx}-${id}`} className={`${className} ${inline ? ' form-check-inline' : ''}`}>
        <input
          className='form-check-input'
          type='radio'
          id={option.value}
          value={option.value}
          checked={option.value === value}
          onChange={evt => onChange(evt.target.value)}
          {...customProps}
        />
        <label className='form-check-label' htmlFor={option.value}>{option.label}</label>
      </div>
    ))}
  </FormGroup>
)

/**
 * Singular component for File Type.
 *
 * @property { function } onChange
 * @property { string } id
 * @property { string } [labelStr]
 * @property { string } [error]
 * @property { string } className - FlexibleInput component sets default to: 'form-control-file'
 * @property { object } [customProps]
 * @property { boolean } required
 * @property { function } customError
 * @property { function } customLabel
 */

export const InputFile = ({ onChange, error, id, labelStr, className, required, customProps, customError, customLabel }) => {
  return (
    <FormGroup labelStr={labelStr} htmlFor={id} error={error} required={required}
      customError={R.defaultTo(null, customError)}
      customLabel={customLabel}>
      <input
        type='file'
        accept='image/*'
        onChange={onChange}
        className={`${className}${error ? ' is-invalid' : ''}`}
        id={id}
        {...customProps}
      />
    </FormGroup>
  )
}

/**
 * Singular component for Switch Type.
 *
 * See React Switch documentation for details on which custom props to override
 *
 * @property { function } onChange
 * @property { string } id
 * @property { string } [labelStr]
 * @property { string } [error]
 * @property { boolean } inline
 * @property { any } value - FlexibleInput component sets default to: false
 * @property { string } className - FlexibleInput component sets default to: 'form-check'
 * @property { object } [customProps]
 * @property { boolean } required
 * @property { function } customError
 * @property { function } customLabel
 */

export const InputSwitch = ({ onChange, value, inline, id, className, labelStr, error, required, customProps, customError, customLabel }) => (
  <FormGroup labelStr={labelStr} htmlFor={id} error={error} required={required}
    customError={R.defaultTo(CustomErrorComponent, customError)}
    customLabel={customLabel}>
    <div key={`checkbox-${id}`} className={`${className} ${inline ? ' form-check-inline' : ''}`}>
      &nbsp;<Switch
        onChange={evt => {
          const val = (typeof (evt) === typeof (false)) ? evt : false
          return onChange(val)
        }}
        checked={value}
        {...customProps}
      />
    </div>
  </FormGroup>
)

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
 * @property { object } [customProps]
 * @property { boolean } required
 * @property { function } customError
 */

export const InputCheckbox = ({ onChange, value, id, className, labelStr, error, required, customProps, customError }) => {
  customError = R.defaultTo(CustomErrorComponent, customError)
  return (
    <div key={`checkbox-${id}`} className={className}>
      <label className='form-check-label'>
        <input
          className='form-check-input'
          type='checkbox'
          id={id}
          value={value}
          checked={value}
          onChange={evt => {
            const val = (typeof (evt.target.checked) === typeof (false)) ? evt.target.checked : false
            return onChange(val)
          }}
          {...customProps}
        />{`${labelStr} ${required ? ' *' : ''}`}
      </label>
      {error && customError({ error, id })}
    </div>
  )
}

/**
 * Singular component for Select Type.
 *
 * See React Select docs for more details on: isClearable, isMulti, options, noOptionsMessage,
 * onMenuOpen
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
 * @property { object } [customProps] - See React Select docs for full list of attributes
 * @property { boolean } required
 * @property { function } customError
 * @property { function } customLabel
 */

export const InputSelect = ({ labelStr, id, error, className, isClearable, isMulti, value, options, onChange, noOptionsMessage, onMenuOpen, required, customProps, customError, customLabel }) => (
  <FormGroup labelStr={labelStr} htmlFor={id} error={error} required={required}
    customError={R.defaultTo(CustomErrorComponent, customError)}
    customLabel={customLabel}>
    <Select
      className={className}
      classNamePrefix='select'
      isClearable={isClearable}
      isMulti={isMulti}
      value={value}
      options={options}
      onChange={onChange}
      id={id}
      onMenuOpen={onMenuOpen}
      noOptionsMessage={noOptionsMessage}
      {...customProps}
    />
  </FormGroup>
)
