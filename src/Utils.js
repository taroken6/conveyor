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

// override component skipped only if 'null' (undefined by default)
export const skipOverride = (component) => component === null

export const getEnumLabel = ({ schema, modelName, fieldName, value }) => {
  if (value === null) {
    return 'N/A'
  }
  const field = getField(schema, modelName, fieldName)
  return R.pathOr('Value Not Found', ['choices', value], field)
}

/**
 * IMPORTANT:
 *
 * For isTableEditable, isRowEditable, isFieldEditable, is TableDeletable,
 * isDeletable, & isCreatable
 *
 * modelName must match any 'node' (or data[n]) __typename
 * parent 'node' must be labeled 'parentNode'
 */

export const isTableEditable = ({ schema, modelName, data, user, parentNode, ...props }) => {
  // no parent node passed down to row below
  props = R.dissoc('node', props)
  return (
    !R.isEmpty(data.filter(node => isRowEditable({
      schema,
      modelName,
      user,
      node,
      parentNode,
      ...props
    })))
  )
}

export const isRowEditable = ({ schema, modelName, node, parentNode, user, ...props }) => (
  R.pipe(
    R.mapObjIndexed((_value, fieldName) => isFieldEditable({
      schema,
      modelName,
      fieldName,
      node,
      parentNode,
      user,
      ...props
    })),
    R.filter(identity),
    filteredNode => !R.isEmpty(filteredNode)
  )(node)
)

export const isFieldEditable = ({ schema, modelName, fieldName, node, parentNode, user, ...props }) => {
  const editable = R.prop('editable', getField(schema, modelName, fieldName))
  if (R.type(editable) === 'Boolean') {
    return editable
  } else if (R.type(editable) === 'Function') {
    return editable({ schema, modelName, fieldName, node, parentNode, user, ...props })
  } else {
    return false
  }
}

export const isTableDeletable = ({ schema, modelName, data, parentNode, user, ...props }) => {
  // no parent node passed down to row below
  props = R.dissoc('node', props)
  return (
    !R.isEmpty(data.filter(node => isDeletable({
      schema,
      modelName,
      node,
      parentNode,
      user,
      ...props
    })))
  )
}

export const isDeletable = ({ schema, modelName, node, parentNode, user, ...props }) => {
  const deletable = R.prop('deletable', getModel(schema, modelName))
  if (R.type(deletable) === 'Boolean') {
    return deletable
  } else if (R.type(deletable) === 'Function') {
    return deletable({ schema, modelName, node, parentNode, user, ...props })
  } else {
    return false
  }
}

export const isCreatable = ({ schema, modelName, user, parentNode, data, ...props }) => {
  const creatable = R.prop('creatable', getModel(schema, modelName))
  if (R.type(creatable) === 'Boolean') {
    return creatable
  } else if (R.type(creatable) === 'Function') {
    return creatable({ schema, modelName, user, parentNode, data, ...props })
  } else {
    return false
  }
}
