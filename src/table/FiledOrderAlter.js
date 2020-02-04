import React from 'react'
import * as R from 'ramda'
import { FaListOl } from 'react-icons/fa'
import { getActions, getFieldLabel } from '../utils/schemaGetters'
import FlexibleInput from '../input'
import { inputTypes } from '../consts'

export const getFieldOrderAlternate = ({ tableView, modelName, fieldName=undefined, fieldOrder }) => {
  /* by default, returns fieldOrder
  returns alternate fieldOrder based on user preference
  if fieldName not passed in, assume table is index table, otherwise detail relationship table */

  // get form object from redux store; 'fieldName' indicates location
  const fieldOrderAltValues = fieldName ?
    R.pathOr([], [modelName, 'fields', fieldName, 'fieldOrderAlt', 'values'], tableView) :
    R.pathOr([], [modelName, 'fieldOrderAlt', 'values'], tableView)

  // get fieldNames from form object
  const alt = R.map(val => val.value, fieldOrderAltValues)

  // if the result is empty, return 'fieldOrder' as default
  return R.isEmpty(alt) ? fieldOrder : alt
}

export const FieldOrderAlterButton = ({
  hasValues,
  open,
  options,
  fieldOrderAltValues,
  fieldOrderChange,
  fieldOrderToggle,
  modelName,
  fieldName // can be undefined
}) => (
  <React.Fragment>
    <button
      className='btn btn-sm btn-outline-primary'
      style={{ marginLeft: '4px' }}
      onClick={() => {
        // if button not clicked previously, populate input w/ all options
        if (!hasValues) {
          return fieldOrderChange({
            modelName, fieldName,
            fieldOrderAltValues: options
          })
        }
        return fieldOrderToggle({ modelName, fieldName, open })
      }}
    >
      <FaListOl color={hasValues ? 'lightgreen' : 'inherit'} />
    </button>
    {hasValues && open &&
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
        onClick={() => fieldOrderChange({ modelName, fieldName, fieldOrderAltValues: options })}
      >Reset</button>
    </div>
    }
  </React.Fragment>
)

// field order alternate => for detail page
export const FieldOrderAlterDetail = ({ schema, modelName, targetModelName, fieldName, tableView, fieldOrder, node, customProps }) => {
  const actions = getActions(schema, modelName)
  const fieldOrderChange = R.path(['tableOptions', 'fieldOrderDetailChange'], actions)
  const fieldOrderToggle = R.path(['tableOptions', 'fieldOrderDetailToggle'], actions)
  const fieldOrderAltValues = R.path([modelName, 'fields', fieldName, 'fieldOrderAlt', 'values'], tableView)
  const open = R.pathOr(true, [modelName, 'fields', fieldName, 'fieldOrderAlt', 'open'], tableView)

  return (<FieldOrderAlter {...{
    schema, modelName, targetModelName, fieldName, fieldOrder, open,
    fieldOrderAltValues, fieldOrderChange, fieldOrderToggle, node, customProps
  }} />)
}

// field order alternate => for index page
export const FieldOrderAlterIndex = ({ schema, modelName, targetModelName, tableView, fieldOrder, node, customProps }) => {
  const actions = getActions(schema, modelName)
  const fieldOrderChange = R.path(['tableOptions', 'fieldOrderIndexChange'], actions)
  const fieldOrderToggle = R.path(['tableOptions', 'fieldOrderIndexToggle'], actions)
  const fieldOrderAltValues = R.path([modelName, 'fieldOrderAlt', 'values'], tableView)
  const open = R.pathOr(true, [modelName, 'fieldOrderAlt', 'open'], tableView)

  return (<FieldOrderAlter {...{
    schema, modelName, targetModelName, fieldOrder, open,
    fieldOrderAltValues, fieldOrderChange, fieldOrderToggle, node, customProps
  }} />)
}


export const FieldOrderAlter = ({
  schema,
  modelName,
  targetModelName,
  fieldName,  // can be undefined
  fieldOrder,
  open,
  fieldOrderAltValues,
  fieldOrderChange,
  fieldOrderToggle,
  node,
  customProps
}) => {
  // if has values, display
  const hasValues = fieldOrderAltValues && !R.isEmpty(fieldOrderAltValues)

  // get dropdown options
  const toOptions = fieldName => ({
    label: getFieldLabel({ schema, modelName: targetModelName, fieldName, node, customProps}),
    value: fieldName
  })

  // fieldOrder here represents the raw field order of all possible fields that can be on the table
  const options = fieldOrder.map(fieldName => toOptions(fieldName))

  return(
    <FieldOrderAlterButton {...{
      hasValues,
      open,
      options,
      fieldOrderAltValues,
      fieldOrderChange,
      fieldOrderToggle,
      modelName,
      fieldName
    }}/>
  )
}
