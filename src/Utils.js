import * as R from 'ramda'
import { getField, getFieldDisableCondition, getModel } from './utils/schemaGetters'
import { getType } from './utils/getType'
import { isRel, isCurrency } from './utils/isType'

export const capitalizeFirstChar = str => str.replace(/^./, str => str.toUpperCase())

export const spaceOnCapitalLetter = str => str.replace(/([A-Z])/g, ' $1')

export const underscoreToSpace = str => str.replace(/_/g, ' ')

export const trimWhitespaceBetweenWords = str => str.replace(/\s\s+/g, ' ')

export const humanize = str =>
  R.pipe(spaceOnCapitalLetter, capitalizeFirstChar, underscoreToSpace, trimWhitespaceBetweenWords, R.trim)(str)

export const titleize = title => {
  let strArr = title.split(' ')
  strArr = strArr.map(str => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  })
  return strArr.join(' ')
}

export const getCellOverride = (schema, modelName, fieldName) =>
  R.path([modelName, 'fields', fieldName, 'components', 'cell'], schema)

export const getDetailFieldOverride = (schema, modelName, fieldName) =>
  R.path([modelName, 'fields', fieldName, 'components', 'detail'], schema)

export const getDetailLabelOverride = (schema, modelName, fieldName) =>
  R.path([modelName, 'fields', fieldName, 'components', 'detailLabel'], schema)

export const getDetailValueOverride = (schema, modelName, fieldName) =>
  R.path([modelName, 'fields', fieldName, 'components', 'detailValue'], schema)

export const getInputOverride = (schema, modelName, fieldName) =>
  R.path([modelName, 'fields', fieldName, 'components', 'input'], schema)

export const getCreateOverride = (schema, modelName) => R.path([modelName, 'components', 'create'], schema)

export const getCreateTitleOverride = (schema, modelName) =>
  R.path([modelName, 'components', 'createTitle'], schema)

export const getCreatePageOverride = (schema, modelName) => R.path([modelName, 'components', 'createPage'], schema)

export const getDetailOverride = (schema, modelName) => R.path([modelName, 'components', 'detail'], schema)

export const getDetailTitleOverride = (schema, modelName) =>
  R.path([modelName, 'components', 'detailTitle'], schema)

export const getDetailPageOverride = (schema, modelName) => R.path([modelName, 'components', 'detailPage'], schema)

export const getIndexOverride = (schema, modelName) => R.path([modelName, 'components', 'index'], schema)

export const getIndexTitleOverride = (schema, modelName) => R.path([modelName, 'components', 'indexTitle'], schema)

export const getIndexPageOverride = (schema, modelName) => R.path([modelName, 'components', 'indexPage'], schema)

// override component skipped only if 'null' (undefined by default)
export const skipOverride = component => component === null

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

export const isTableEditable = ({ schema, modelName, data, parentNode, fieldOrder, customProps }) => {
  return !R.isEmpty(
    data.filter(node =>
      isRowEditable({
        schema,
        modelName,
        node,
        parentNode,
        fieldOrder,
        customProps
      })
    )
  )
}

//isRowEditable loops over all displayed fields to determine if the row is editable
export const isRowEditable = ({ schema, modelName, node, parentNode, fieldOrder, customProps }) => {
  if (!fieldOrder) {
    fieldOrder = Object.keys(node)
  }
  for (const index in fieldOrder) {
    const fieldName = R.prop(index, fieldOrder)
    if (
      isFieldEditable({
        schema,
        modelName,
        fieldName,
        node,
        parentNode,
        fieldOrder,
        customProps
      })
    ) {
      return true
    }
  }
  return false
}

export const isFieldEditable = ({ schema, modelName, fieldName, node, parentNode, customProps }) => {
  const editable = R.propOr(!R.equals('id', fieldName), 'editable', getField(schema, modelName, fieldName))
  if (R.type(editable) === 'Boolean') {
    return editable
  } else if (R.type(editable) === 'Function') {
    return editable({ schema, modelName, fieldName, node, parentNode, customProps })
  } else {
    return false
  }
}

export const isTableDeletable = ({ schema, modelName, data, parentNode, customProps }) => {
  return !R.isEmpty(
    data.filter(node =>
      isDeletable({
        schema,
        modelName,
        node,
        parentNode,
        customProps
      })
    )
  )
}

export const isDeletable = ({ schema, modelName, node, parentNode, customProps }) => {
  const deletable = R.propOr(true, 'deletable', getModel(schema, modelName))
  if (R.type(deletable) === 'Boolean') {
    return deletable
  } else if (R.type(deletable) === 'Function') {
    return deletable({ schema, modelName, node, parentNode, customProps })
  } else {
    return false
  }
}

export const isCreatable = ({ schema, modelName, parentNode, data, customProps }) => {
  const creatable = R.propOr(true, 'creatable', getModel(schema, modelName))
  if (R.type(creatable) === 'Boolean') {
    return creatable
  } else if (R.type(creatable) === 'Function') {
    return creatable({ schema, modelName, parentNode, data, customProps })
  } else {
    return false
  }
}

export const shouldDisplay = ({ schema, modelName, id, fieldName, node, displayCondition, customProps }) => {
  if (R.type(displayCondition) === 'Boolean') {
    return displayCondition
  } else if (R.type(displayCondition) === 'Function') {
    return displayCondition({ schema, modelName, id, fieldName, node, customProps })
  } else {
    return true
  }
}

// TODO: improve the way the disabled fields are handled, instead of directly
// holding value at ['stack', index, 'fields', 'fieldName'], hold an object
// with disabled and value key. This will also allow for other metadata to
// be held there if necessary
export const isFieldDisabled = ({ schema, modelName, fieldName, formStack, customProps }) => {
  const stackIndex = R.prop('index', formStack)
  const stack = R.prop('stack', formStack)
  const form = R.prop(stackIndex, stack)

  const type = getType({ schema, modelName, fieldName })

  // check the form to see if 'disabled' flag set true
  let defaultDisable = false
  if (type.includes('ToMany')) {
    defaultDisable = R.path(['fields', fieldName, 0, 'disabled'], form)
  } else {
    defaultDisable = R.path(['fields', fieldName, 'disabled'], form)
  }

  // boolean, function, or null
  const disableCondition = getFieldDisableCondition(schema, modelName, fieldName)

  if (R.type(disableCondition) === 'Function') {
    return disableCondition({ schema, modelName, fieldName, formStack, defaultDisable, customProps })
  }
  if (R.type(disableCondition) === 'Boolean') {
    return disableCondition
  }

  return defaultDisable
}

// note: should not be used w/o checking 'isTableSortable' as well (model lvl req)
export const isSortable = ({ schema, modelName, fieldName }) => {
  // first check if can sort on field level
  const fieldSortable = R.pathOr(true, [modelName, 'fields', fieldName, 'sortable'], schema)
  if (fieldSortable === false) {
    return false
  }
  // repeat above if 'fieldSortable' is function
  if (R.type(fieldSortable) === 'Function' && fieldSortable({ schema, modelName, fieldName }) === false) {
    return false
  }
  // by default, all non-rel fields are sortable
  return !isRel(getField(schema, modelName, fieldName))
}

export const isTableSortable = ({ schema, modelName }) => {
  // first check if can sort on model level
  const tableSortable = R.pathOr(true, [modelName, 'sortable'], schema)
  if (tableSortable === false) {
    return false
  }
  // repeat above if 'tableSortable' is function
  if (R.type(tableSortable) === 'Function' && tableSortable({ schema, modelName }) === false) {
    return false
  }
  // next, check field level sort
  const model = R.prop(modelName, schema)
  const fieldOrder = R.prop('fieldOrder', model)
  const boolList = R.map(fieldName => isSortable({ schema, modelName, fieldName }), fieldOrder)
  return !R.isEmpty(R.filter(R.identity, boolList))
}
