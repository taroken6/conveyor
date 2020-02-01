import React from 'react'
import * as R from 'ramda'
import { FaListOl } from 'react-icons/fa'
import {getActions, getFieldLabel} from "../utils/schemaGetters";



export const getFieldOrderAlternate = ({ tableView, modelName, fieldName=undefined, fieldOrder }) => {
    /* by default, returns fieldOrder
    returns alternate fieldOrder based on user preference
    if fieldName not passed in, assume table is index table, otherwise detail relationship table */

    console.log('===tableView', tableView)
    console.log('===', modelName, fieldName, fieldOrder)

    // return alternate fieldOrder list
    const a = R.pipe(
        // get form object from redux store; 'fieldName' indicates location
        fieldName ?
            R.path([modelName, 'fieldOrderAlt', 'values'], tableView):
            R.path([modelName, 'fields', fieldName, 'fieldOrderAlt', 'values'], tableView),
        // get fieldNames from form object
        R.map(val => val.value),
        // filter out the ones not included in 'fieldOrder'
        R.filter(val => R.includes(val, fieldOrder)),
        // if the result is empty, return 'fieldOrder' as default
        (values) => R.isEmpty(values) ? fieldOrder : values
    )
    console.log('=====result fieldORder', a)
    return a
}

export const FieldOrderAlterButton = ({
    active,
    options,
    fieldOrderValues,
    fieldOrderChange,
    fieldOrderReset,
    modelName,
    fieldName
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
        <FaListOl
          color={active ? 'lightgreen' : 'black'}
        />
      </button>
  </React.Fragment>
)

export const FieldOrderAlter = ({ schema, modelName, fieldName, tableView, fieldOrder, node, customProps }) => {

    const actions = getActions(schema, modelName)
    const fieldOrderChange = R.path(['tableOptions', 'fieldOrderChange'], actions)
    const fieldOrderReset = R.path(['tableOptions', 'fieldOrderReset'], actions)

    // if fieldName does not exist (from index) fieldOrderValues change
    const fieldOrderValues = fieldName ?
        R.path([modelName, 'fields', fieldName, 'fieldOrderAlt', 'values'], tableView) :
        R.path([modelName, 'fieldOrderAlt', 'values'], tableView)

    // if has values, display
    const active = R.isEmpty(fieldOrderValues)

    // get dropdown options
    const toOptions = fieldName => ({
      label: getFieldLabel({ schema, modelName, fieldName, node, customProps}),
      value: fieldName
    })

    // fieldOrder here represents the raw field order of all possible fields that can be on the table
    const options = fieldOrder.map(fieldName => toOptions(fieldName))

    console.log('---values', fieldOrderValues)
    console.log('---hasValues', active)
    console.log('----modelName', modelName, fieldName, fieldOrder)

    return(
        <FieldOrderAlterButton {{
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
