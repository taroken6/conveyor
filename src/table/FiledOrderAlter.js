import React from 'react'
import * as R from 'ramda'
import { FaListOl } from 'react-icons/fa'
import { getActions, getFieldLabel } from '../utils/schemaGetters'
import FlexibleInput from "../input";
import { inputTypes } from '../consts'



export const getFieldOrderAlternate = ({ tableView, modelName, fieldName=undefined, fieldOrder }) => {
    /* by default, returns fieldOrder
    returns alternate fieldOrder based on user preference
    if fieldName not passed in, assume table is index table, otherwise detail relationship table */

    console.log('===tableView', tableView)
    console.log('===', modelName, fieldName, fieldOrder)

    // get form object from redux store; 'fieldName' indicates location
    const fieldOrderValues = fieldName ?
      R.pathOr([], [modelName, 'fields', fieldName, 'fieldOrderAlt'], tableView) :
      R.pathOr([], [modelName, 'fieldOrderAlt'], tableView)

    // get fieldNames from form object
    let alt = R.map(val => val.value, fieldOrderValues)

    // if the result is empty, return 'fieldOrder' as default
    alt = R.isEmpty(alt) ? fieldOrder : alt

    // return alternate fieldOrder list
    return alt
}

export const FieldOrderAlterButton = ({
    active,
    options,
    fieldOrderValues,
    fieldOrderChange,
    fieldOrderReset,
    modelName,
    fieldName // can be undefined
}) => (
  <React.Fragment>
      <button
        className='btn btn-sm btn-outline-primary'
        onClick={() => {
            // if button not clicked previously, populate input w/ all options
            if (!active) {
                return fieldOrderChange({
                    modelName, fieldName,
                    fieldOrderValues: options
                })
            }
            // otherwise, if already in the process, do nothing
            return null
        }}
      >
        <FaListOl color={active ? 'lightgreen' : 'black'} />
      </button>
      <FlexibleInput
        {...{
          id: `fieldOrderAlt-input-${modelName}-${fieldName}`,
          onChange: evt => fieldOrderChange({ modelName, fieldName, fieldOrderValues: evt }),
          value: fieldOrderValues,
          type: inputTypes.SELECT_TYPE,
          isMulti: true,
          // initially populate the field with
          // onMenuOpen: evt => fieldOrderChange({ modelName, fieldName, fieldOrderValues: options }),
          options
        }}
      />
  </React.Fragment>
)

// field order alternate => for detail page
export const FieldOrderAlterDetail = ({ schema, modelName, fieldName, tableView, fieldOrder, node, customProps }) => {
  const actions = getActions(schema, modelName)
  const fieldOrderChange = R.path(['tableOptions', 'fieldOrderDetailChange'], actions)
  const fieldOrderReset = R.path(['tableOptions', 'fieldOrderDetailReset'], actions)
  const fieldOrderValues = R.path([modelName, 'fields', fieldName, 'fieldOrderAlt'], tableView)

  return (<FieldOrderAlter {...{
    schema, modelName, fieldName, fieldOrder,
    fieldOrderValues, fieldOrderChange, fieldOrderReset, node, customProps
  }} />)
}

// field order alternate => for index page
export const FieldOrderAlterIndex = ({ schema, modelName, tableView, fieldOrder, node, customProps }) => {
  const actions = getActions(schema, modelName)
  const fieldOrderChange = R.path(['tableOptions', 'fieldOrderIndexChange'], actions)
  const fieldOrderReset = R.path(['tableOptions', 'fieldOrderIndexReset'], actions)
  const fieldOrderValues = R.path([modelName, 'fieldOrderAlt'], tableView)

  return (<FieldOrderAlter {...{
    schema, modelName, fieldOrder,
    fieldOrderValues, fieldOrderChange, fieldOrderReset, node, customProps
  }} />)
}


export const FieldOrderAlter = ({
  schema,
  modelName,
  fieldName,
  fieldOrder,
  fieldOrderValues,
  fieldOrderChange,
  fieldOrderReset,
  node,
  customProps
}) => {
    // if has values, display
    const active = fieldOrderValues && !R.isEmpty(fieldOrderValues)

    // todo: fix this it doesn't always get right name
    // get dropdown options
    const toOptions = fieldName => ({
      label: getFieldLabel({ schema, modelName, fieldName, node, customProps}),
      value: fieldName
    })

    // fieldOrder here represents the raw field order of all possible fields that can be on the table
    const options = fieldOrder.map(fieldName => toOptions(fieldName))

    return(
        <FieldOrderAlterButton {...{
            active,
            options,
            fieldOrderValues,
            fieldOrderChange,
            fieldOrderReset,
            modelName,
            fieldName
        }}/>
    )
}
