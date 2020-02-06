import React from 'react'
import * as R from 'ramda'
import { FaListOl } from 'react-icons/fa'
import { getActions, getFieldLabel } from '../utils/schemaGetters'
import FlexibleInput from '../input'
import { inputTypes } from '../consts'

export const getFieldOrderAlternate = ({ tableView, parentModelName, parentFieldName, modelName, fieldOrder, fromIndex }) => {
  /* by default, returns fieldOrder
  returns alternate fieldOrder based on user preference
  if fieldName not passed in, assume table is index table, otherwise detail relationship table */

  // get form object from redux store; 'fieldName' indicates location
  const fieldOrderAltValues = fromIndex ?
    R.pathOr([], [modelName, 'fieldOrderAlt', 'values'], tableView) :
    R.pathOr([], [parentModelName, 'fields', parentFieldName, 'fieldOrderAlt', 'values'], tableView)

  // get fieldNames from form object
  const alt = R.map(val => val.value, fieldOrderAltValues)

  // if the result is empty, return 'fieldOrder' as default
  return R.isEmpty(alt) ? fieldOrder : alt
}

export const FieldOrderButton = ({
  hasValues,
  open,
  options,
  fieldOrderChange,
  fieldOrderToggle,
  modelName, className,
  fieldName // can be undefined
}) =>
  <button
    className={ `btn btn-sm btn-outline-primary ${className}`}
    onClick={() => {
      // if button not clicked previously, populate input w/ all options
      if (!hasValues) {
        return fieldOrderChange({ modelName, fieldName, fieldOrderAltValues: options })
      }
      // otherwise, clicking will 'close' the feature
      return fieldOrderToggle({ modelName, fieldName, open })
    }}
  >
    <FaListOl color={hasValues ? 'lightgreen' : 'inherit'} />
  </button>

export const FieldOrderInput = ({
  hasValues,
  open,
  options,
  fieldOrderAltValues,
  fieldOrderChange,
  modelName,
  fieldName // can be undefined
}) => {
  return (
    <div>
      <div className='d-inline-block' style={{'width': '94%'}}>
        <FlexibleInput
          className={'field-order-alter-input'}
          {...{
            id: `alternate-input-${modelName}-${fieldName}`,
            onChange: evt => fieldOrderChange({ modelName, fieldName, fieldOrderAltValues: evt }),
            value: fieldOrderAltValues,
            type: inputTypes.SELECT_TYPE,
            isMulti: true,
            options
          }}
        />
      </div>
      <button
        style={{'verticalAlign': 'text-bottom'}}
        className='btn btn-sm btn-outline-danger'
        onClick={() => fieldOrderChange({ modelName, fieldName, fieldOrderAltValues: null })}
      >Reset</button>
    </div>
  )
}

// field order alternate => for detail page
export const getFieldOrderAlterDetailProps = ({ schema, modelName, targetModelName, fieldName, tableView, fieldOrder, node, customProps }) => {
  const actions = getActions(schema, modelName)
  const fieldOrderChange = R.path(['tableOptions', 'fieldOrderDetailChange'], actions)
  const fieldOrderToggle = R.path(['tableOptions', 'fieldOrderDetailToggle'], actions)
  const fieldOrderAltValues = R.path([modelName, 'fields', fieldName, 'fieldOrderAlt', 'values'], tableView)
  const open = R.pathOr(true, [modelName, 'fields', fieldName, 'fieldOrderAlt', 'open'], tableView)

    // get dropdown options
  const toOptions = fieldName => ({
    label: getFieldLabel({ schema, modelName: targetModelName, fieldName, node, customProps}),
    value: fieldName
  })

  // fieldOrder here represents the raw field order of all possible fields that can be on the table
  const options = fieldOrder.map(fieldName => toOptions(fieldName))
  const hasValues = fieldOrderAltValues && !R.isEmpty(fieldOrderAltValues)

  return ({ fieldOrderChange, fieldOrderToggle, fieldOrderAltValues, open, options, hasValues })
}
