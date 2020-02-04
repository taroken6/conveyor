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
    R.pathOr([], [modelName, 'fields', fieldName, 'fieldOrderAlt'], tableView) :
    R.pathOr([], [modelName, 'fieldOrderAlt'], tableView)

  // get fieldNames from form object
  const alt = R.map(val => val.value, fieldOrderAltValues)

  // if the result is empty, return 'fieldOrder' as default
  return R.isEmpty(alt) ? fieldOrder : alt
}

export const FieldOrderAlterButton = ({
  active,
  options,
  fieldOrderAltValues,
  fieldOrderChange,
  modelName,
  fieldName // can be undefined
}) => (
  <React.Fragment>
    <button
      className='btn btn-sm btn-outline-primary'
      style={{ marginLeft: '4px' }}
      onClick={() => {
        // if button not clicked previously, populate input w/ all options
        if (!active) {
          return fieldOrderChange({
            modelName, fieldName,
            fieldOrderAltValues: options
          })
        }
        // otherwise, if already in the process, do nothing
        return null
      }}
    >
      <FaListOl color={active ? 'lightgreen' : 'inherit'} />
    </button>
    {active &&
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
  const fieldOrderAltValues = R.path([modelName, 'fields', fieldName, 'fieldOrderAlt'], tableView)

  return (<FieldOrderAlter {...{
    schema, modelName, targetModelName, fieldName, fieldOrder,
    fieldOrderAltValues, fieldOrderChange, node, customProps
  }} />)
}

// field order alternate => for index page
export const FieldOrderAlterIndex = ({ schema, modelName, targetModelName, tableView, fieldOrder, node, customProps }) => {
  const actions = getActions(schema, modelName)
  const fieldOrderChange = R.path(['tableOptions', 'fieldOrderIndexChange'], actions)
  const fieldOrderAltValues = R.path([modelName, 'fieldOrderAlt'], tableView)

  return (<FieldOrderAlter {...{
    schema, modelName, targetModelName, fieldOrder,
    fieldOrderAltValues, fieldOrderChange, node, customProps
  }} />)
}


export const FieldOrderAlter = ({
  schema,
  modelName,
  targetModelName,
  fieldName,  // can be undefined
  fieldOrder,
  fieldOrderAltValues,
  fieldOrderChange,
  node,
  customProps
}) => {
  // if has values, display
  const active = fieldOrderAltValues && !R.isEmpty(fieldOrderAltValues)

  // get dropdown options
  const toOptions = fieldName => ({
    label: getFieldLabel({ schema, modelName: targetModelName, fieldName, node, customProps}),
    value: fieldName
  })

  // fieldOrder here represents the raw field order of all possible fields that can be on the table
  const options = fieldOrder.map(fieldName => toOptions(fieldName))

  return(
    <FieldOrderAlterButton {...{
      active,
      options,
      fieldOrderAltValues,
      fieldOrderChange,
      modelName,
      fieldName
    }}/>
  )
}
