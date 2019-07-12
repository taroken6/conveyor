import * as R from 'ramda'
import { getField, getModel } from './utils/schemaGetters'
import { identity } from 'rxjs'

export const capitalizeFirstChar = (str) => str.replace(/^./, str => str.toUpperCase())

export const spaceOnCapitalLetter = (str) => str.replace(/([A-Z])/g, ' $1')

export const humanize = str => R.pipe(
  spaceOnCapitalLetter,
  capitalizeFirstChar
)(str)

export const getCellOverride = (schema, modelName, fieldName) => (
  R.path([modelName, 'fields', fieldName, 'components', 'cell'], schema)
)

export const getDetailOverride = (schema, modelName, fieldName) => (
  R.path([modelName, 'fields', fieldName, 'components', 'detail'], schema)
)

export const getDetailLabelOverride = (schema, modelName, fieldName) => (
  R.path([modelName, 'fields', fieldName, 'components', 'detailLabel'], schema)
)

export const getDetailValueOverride = (schema, modelName, fieldName) => (
  R.path([modelName, 'fields', fieldName, 'components', 'detailValue'], schema)
)

export const getInputOverride = (schema, modelName, fieldName) => (
  R.path([modelName, 'fields', fieldName, 'components', 'input'], schema)
)

export const getEnumLabel = ({ schema, modelName, fieldName, value }) => {
  if (value === null) {
    return 'N/A'
  }
  const field = getField(schema, modelName, fieldName)
  return R.pathOr('Value Not Found', ['choices', value], field)
}

export const isTableEditable = ({ schema, modelName, data, ...props }) => (
  !R.isEmpty(data.filter(rowData => isRowEditable({ schema, modelName, rowData, ...props })))
)

export const isRowEditable = ({ schema, modelName, rowData, ...props }) => (
  R.pipe(
    R.mapObjIndexed((_value, fieldName) => isFieldEditable({ schema, modelName, fieldName, rowData, ...props })),
    R.filter(identity),
    filteredNode => !R.isEmpty(filteredNode)
  )(rowData)
)

export const isFieldEditable = ({ schema, modelName, fieldName, ...props }) => {
  const editable = R.prop('editable', getField(schema, modelName, fieldName))
  if (R.type(editable) === 'Boolean') {
    return editable
  } else if (R.type(editable) === 'Function') {
    return editable({ schema, modelName, ...props })
  } else {
    return false
  }
}

export const isDeletable = ({ schema, modelName, ...props }) => {
  const deletable = R.prop('deletable', getModel(schema, modelName))
  if (R.type(deletable) === 'Boolean') {
    return deletable
  } else if (R.type(deletable) === 'Function') {
    return deletable({ schema, modelName, ...props })
  } else {
    return false
  }
}

export const isCreatable = ({ schema, modelName, ...props }) => {
  const creatable = R.prop('creatable', getModel(schema, modelName))
  if (R.type(creatable) === 'Boolean') {
    return creatable
  } else if (R.type(creatable) === 'Function') {
    return creatable({ schema, modelName, ...props })
  } else {
    return false
  }
}
