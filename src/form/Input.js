/* global FileReader */

import React from 'react'
import * as R from 'ramda'
import FlexibleInput from '../input/index'
import { getInputType } from './InputType'
import { inputTypes } from '../consts'
import { getInputOverride, isCreatable, skipOverride } from '../Utils'
import { getActions, getEnumChoices, getEnumChoiceOrder, getField, getFieldLabel } from '../utils/schemaGetters'
import { arrayBufferToStoreValue } from '../utils/fileConverters'
import CreateButton from '../CreateButton'
import { getRelSchemaEntry } from '../table/Field'

export const relationshipLabelFactory = ({ schema, modelName, fieldName, onClick, user, customProps }) => {
  const relSchemaEntry = getRelSchemaEntry({ schema, modelName, fieldName })
  const relModelName = R.prop('modelName', relSchemaEntry)
  const id = `input-${modelName}-${fieldName}`
  const required = R.prop('required', getField(schema, modelName, fieldName))
  const creatable = isCreatable({ schema, modelName: relModelName, user, customProps })

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
      // TODO: Move into css files
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
  formStack,
  autoFocus,
  onKeyDown,
  customProps
}) => {
  const InputOverride = getInputOverride(schema, modelName, fieldName)

  const actions = getActions(schema, modelName)
  const onMenuOpen = R.path(['input', 'onMenuOpen'], actions)

  if (skipOverride(InputOverride)) {
    return null
  }

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
        formStack,
        autoFocus,
        onKeyDown,
        customProps
      }} />
  }

  if (disabled) {
    const label = getFieldLabel({
      schema,
      modelName,
      fieldName,
      node: R.path(['originData'], formStack), customProps
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
    autoFocus,
    onKeyDown,
    customProps,
  }} />
}

export const getOnChange = ({ inputType, onChange, fieldName }) => {
  const defaultHandleOnChange = val => onChange({
    fieldName,
    value: val
  })
  if (inputType !== inputTypes.FILE_TYPE) {
    return defaultHandleOnChange
  }

  return (evt => {
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
      }
    }

    if (evt.target.files.length > 0) {
      // initiate read
      fileReader.onloadend = onloadend
      fileReader.readAsArrayBuffer(evt.target.files[0])
    }
  })
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
  customInput,
  autoFocus,
  onKeyDown,
  customProps
}) => {
  const inputType = getInputType({ schema, modelName, fieldName })

  const defaultHandleOnChange = getOnChange({ inputType, onChange, fieldName })
  const fieldLabel = getFieldLabel({ schema, modelName, fieldName, customProps })
  const defaultProps = {
    id: `input-${modelName}-${fieldName}`,
    type: inputType,
    onChange: defaultHandleOnChange,
    labelStr: inline ? null : fieldLabel,
    value,
    error,
    required: R.prop('required', getField(schema, modelName, fieldName)),
    customInput,
    autoFocus,
    onKeyDown
  }
  const enumChoices = getEnumChoices(schema, modelName, fieldName)
  const enumChoiceOrder = getEnumChoiceOrder(schema, modelName, fieldName)

  switch (inputType) {
    case inputTypes.STRING_TYPE:
    case inputTypes.INT_TYPE:
    case inputTypes.TEXTAREA_TYPE:
    case inputTypes.DATE_TYPE:
    case inputTypes.URL_TYPE:
    case inputTypes.EMAIL_TYPE:
    case inputTypes.PHONE_TYPE:
    case inputTypes.BOOLEAN_TYPE:
    case inputTypes.CURRENCY_TYPE:
    case inputTypes.PASSWORD_TYPE:
    case inputTypes.FILE_TYPE:
      return <FlexibleInput {...defaultProps} />
    case inputTypes.FLOAT_TYPE:
      return <FlexibleInput {...{
        ...defaultProps,
        type: inputTypes.INT_TYPE,
        customInput: { step: 'any' }
      }} />
    case inputTypes.ENUM_TYPE:
      return <FlexibleInput {...{
        ...defaultProps,
        type: inputTypes.SELECT_TYPE,
        options: enumChoiceOrder.map(choice => (
          { label: enumChoices[choice], value: choice }
        )),
        customInput: { step: 'any' }
      }} />
    case inputTypes.RELATIONSHIP_SINGLE:
    case inputTypes.RELATIONSHIP_MULTIPLE:
      return <FlexibleInput {...{
        ...R.dissoc('type', defaultProps),
        type: inputTypes.SELECT_TYPE,
        isMulti: inputType === inputTypes.RELATIONSHIP_MULTIPLE,
        customLabel,
        onMenuOpen: (evt) => onMenuOpen({ modelName, fieldName }),
        options: R.path([modelName, fieldName], selectOptions)
      }} />
    default:
      return <p>{fieldName} default input</p>
  }
}

export default Input
