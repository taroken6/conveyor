/* global FileReader */

import React from 'react'
import * as R from 'ramda'
import FlexibleInput from 'flexible-forms'
import { InputType, getInputType } from './InputType'
import InputSelectRelationship from './InputSelectRelationship'
import { getInputOverride, isCreatable } from '../Utils'
import { getActions, getEnumChoices, getEnumChoiceOrder, getField } from '../utils/schemaGetters'
import * as Logger from '../../lib/Logger'
import { arrayBufferToStoreValue } from '../utils/fileConverters'
import { getFieldLabel } from '../Detail'
import CreateButton from '../CreateButton'

export const relationshipLabelFactory = ({ schema, modelName, fieldName, onClick, ...props }) => {
  const id = `input-${modelName}-${fieldName}`
  const required = R.prop('required', getField(schema, modelName, fieldName))
  const creatable = isCreatable({ schema, modelName, ...props })
  const Label = ({ labelStr }) => (
    <label htmlFor={id}>
      <span>{labelStr}</span>
      { required && ' *'}
      { creatable && <CreateButton {...{
        onClick
      }} /> }
    </label>
  )

  return Label
}

export const DisabledInput = ({ value, label }) => (
  <React.Fragment>
    <span>{label}</span>
    {
      // TODO: Move into css files within the framework
    }
    <div style={{ paddingBottom: '10px', paddingTop: '10px' }} >
      <div style={{ padding: '7px 7px 7px 12px', backgroundColor: '#E0E0E0' }} className='border rounded primary'>
        {value}
      </div>
    </div>
  </React.Fragment>
)

const Input = ({
  schema,
  modelName,
  fieldName,
  value,
  error,
  inline,
  onChange,
  selectOptions,
  disabled,
  customLabel,
  ...props
}) => {
  const InputOverride = getInputOverride(schema, modelName, fieldName)

  const actions = getActions(schema, modelName)
  const onMenuOpen = R.path(['input', 'onMenuOpen'], actions)

  if (InputOverride) {
    return <InputOverride
      {...{
        schema,
        modelName,
        fieldName,
        value,
        error,
        inline,
        onChange,
        customLabel,
        selectOptions,
        disabled,
        onMenuOpen,
        ...props
      }} />
  }

  if (disabled) {
    const label = getFieldLabel({
      schema,
      modelName,
      fieldName,
      data: R.path(['formStack', 'originData'], props)
    })

    return <DisabledInput {...{ value, label }} />
  }
  return <InputCore {...{
    schema,
    modelName,
    fieldName,
    value,
    error,
    inline,
    onChange,
    selectOptions,
    disabled,
    customLabel,
    onMenuOpen,
    ...props
  }} />
}

export const InputCore = ({
  schema,
  modelName,
  fieldName,
  value,
  error,
  inline,
  onChange,
  selectOptions,
  customLabel,
  onMenuOpen,
  ...props
}) => {
  const inputType = getInputType({ schema, modelName, fieldName })

  const defaultHandleOnChange = val => onChange({
    fieldName,
    value: val
  })
  const fieldLabel = getFieldLabel({ schema, modelName, fieldName, data: {} })
  const defaultProps = {
    id: `input-${modelName}-${fieldName}`,
    type: inputType,
    onChange: defaultHandleOnChange,
    labelStr: inline ? null : fieldLabel,
    value,
    error,
    required: R.prop('required', getField(schema, modelName, fieldName))
  }
  const enumChoices = getEnumChoices(schema, modelName, fieldName)
  const enumChoiceOrder = getEnumChoiceOrder(schema, modelName, fieldName)

  const onChangeFile = evt => {
    const fileReader = new FileReader()

    const onloadend = () => {
      // handle result of read
      if (!fileReader.error) {
        const content = fileReader.result
        // since cannot save ArrayBuffer to store, convert value
        const converted = arrayBufferToStoreValue(content)
        defaultHandleOnChange(converted)
      } else {
        // TODO handle error
        Logger.log('FileReader error', fileReader.error)
      }
    }

    if (evt.target.files.length > 0) {
      // initiate read
      fileReader.onloadend = onloadend
      fileReader.readAsArrayBuffer(evt.target.files[0])
    }
  }

  switch (inputType) {
    case InputType.FlexibleForms.STRING_TYPE:
    case InputType.FlexibleForms.INT_TYPE:
    case InputType.FlexibleForms.TEXTAREA_TYPE:
    case InputType.FlexibleForms.DATE_TYPE:
    case InputType.FlexibleForms.URL_TYPE:
    case InputType.FlexibleForms.EMAIL_TYPE:
    case InputType.FlexibleForms.PHONE_TYPE:
    case InputType.FlexibleForms.BOOLEAN_TYPE:
    case InputType.FlexibleForms.CURRENCY_TYPE:
    case InputType.FlexibleForms.PASSWORD_TYPE:
      return <FlexibleInput {...defaultProps} />
    case InputType.FlexibleForms.FILE_TYPE:
      return <FlexibleInput {...{
        ...defaultProps,
        onChange: onChangeFile
      }} />
    case InputType.FLOAT:
      return <FlexibleInput {...{
        ...defaultProps,
        type: InputType.FlexibleForms.INT_TYPE,
        customProps: { step: 'any' }
      }} />
    case InputType.ENUM:
      return <FlexibleInput {...{
        ...defaultProps,
        type: InputType.FlexibleForms.SELECT_TYPE,
        options: enumChoiceOrder.map(choice => (
          { label: enumChoices[choice], value: choice }
        )),
        customProps: { step: 'any' }
      }} />
    case InputType.RELATIONSHIP_SINGLE:
    case InputType.RELATIONSHIP_MULTIPLE:
      return <InputSelectRelationship {...{
        ...R.dissoc('type', defaultProps),
        isMulti: inputType === InputType.RELATIONSHIP_MULTIPLE,
        customLabel,
        onMenuOpen: (evt) => onMenuOpen({ modelName, fieldName }),
        options: R.path([modelName, fieldName], selectOptions)
      }} />
    default:
      return <p>{fieldName} default input</p>
  }
}

export default Input
