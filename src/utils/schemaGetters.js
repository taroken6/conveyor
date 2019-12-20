import * as R from 'ramda'
import { titleize, humanize } from '../Utils'
import pluralize from 'pluralize'

// This is an example of our naming issue, node and data should not both be passed here
export const getFieldLabel = ({ schema, modelName, fieldName, node, data, customProps }) => {
  const displayName = R.pathOr(
    humanize(fieldName),
    [modelName, 'fields', fieldName, 'displayName'],
    schema
  )
  if (R.type(displayName) === 'Function') {
    return displayName({ schema, modelName, node, data, customProps })
  }
  return displayName
}

export const getModelLabel = ({ schema, modelName, node, data, formStack, customProps }) => {
  const defaultValue = titleize(humanize(modelName))
  const displayName = R.pathOr(defaultValue, [modelName, 'displayName'], schema)
  if (R.type(displayName) === 'Function') {
    return displayName({ schema, modelName, node, data, formStack, customProps })
  }
  return displayName
}

export const getModelLabelPlural = ({ schema, modelName, data, user, customProps }) => {
  const defaultValue = pluralize(titleize(modelName))
  const displayName = R.pathOr(defaultValue, [modelName, 'displayNamePlural'], schema)
  if (R.type(displayName) === 'Function') {
    return displayName({ schema, modelName, data, user, customProps })
  }
  return displayName
}

export const getModel = (schema, modelName) => (
  R.prop(modelName, schema)
)

export const getModelAttribute = (schema, modelName, attributeName) => (
  R.pipe(
    getModel,
    R.prop(attributeName)
  )(schema, modelName)
)

export const getActions = (schema, modelName) => {
  return getModelAttribute(schema, modelName, 'actions')
}

export const getFields = (schema, modelName) => (
  getModelAttribute(schema, modelName, 'fields')
)

export const getField = (schema, modelName, fieldName) => (
  R.pipe(
    getFields,
    R.prop(fieldName)
  )(schema, modelName)
)

const getShownFields = ({ schema, modelName, type, node, data, user, customProps }) => {
  const fieldOrder = R.prop('fieldOrder', getModel(schema, modelName))
  return R.filter(fieldName => {
    let show
    switch (type) {
      case 'showCreate':
      case 'showDetail':
        show = R.propOr(
          !R.equals('id', fieldName),
          type,
          getField(schema, modelName, fieldName)
        )
        break
      case 'showIndex':
      case 'showTooltip':
        show = R.propOr(false, type, getField(schema, modelName, fieldName))
        break
      default:
        show = R.prop(type, getField(schema, modelName, fieldName))
    }
    if (R.type(show) === 'Function') {
      show = show({
        schema, modelName, fieldName, node, data, user, customProps
      })
    }
    return show
  }, fieldOrder)
}

export const getRequiredFields = (schema, modelName, customProps = null) => {
  return getShownFields({ schema, modelName, type: 'required', customProps })
}

export const getCreateFields = ({ schema, modelName, formStack, user, customProps }) => {
  const createFieldOrder = R.prop('createFieldOrder', getModel(schema, modelName))
  const defaultOrder = getShownFields({ schema, modelName, type: 'showCreate', user, customProps })
  if (R.type(createFieldOrder) === 'Function') {
    return createFieldOrder({ schema, modelName, formStack, user, defaultOrder, customProps })
  }
  else if (R.type(createFieldOrder) === 'Array') {
    return createFieldOrder
  }
  return defaultOrder
}

export const getHasIndex = (schema, modelName) => {
  return R.propOr(true, 'hasIndex', getModel(schema, modelName))
}

export const getSingleton = (schema, modelName) => {
  return R.propOr(false, 'singleton', getModel(schema, modelName))
}

export const getDetailFields = ({ schema, modelName, node, customProps }) => {
  const detailFieldOrder = R.prop('detailFieldOrder', getModel(schema, modelName))
  const defaultOrder = getShownFields({ schema, modelName, type: 'showDetail', node, customProps })
  if (R.type(detailFieldOrder) === 'Function') {
    return detailFieldOrder({ schema, modelName, node, defaultOrder, customProps })
  }
  else if (R.type(detailFieldOrder) === 'Array') {
    return detailFieldOrder
  }
  return defaultOrder
}

export const getIndexFields = ({ schema, modelName, data, user, customProps }) => {
  const indexFieldOrder = R.prop('indexFieldOrder', getModel(schema, modelName))
  const defaultOrder = getShownFields({ schema, modelName, type: 'showIndex', data, user, customProps })
  if (R.type(indexFieldOrder) === 'Function') {
    return indexFieldOrder({ schema, modelName, data, user, defaultOrder, customProps })
  }
  else if (R.type(indexFieldOrder) === 'Array') {
    return indexFieldOrder
  }
  return defaultOrder
}

export const getTooltipFields = (schema, modelName, customProps = null) => {
  return getShownFields({ schema, modelName, type: 'showTooltip', customProps })
}
export const getEnumChoices = (schema, modelName, fieldName) => {
  return R.prop('choices', getField(schema, modelName, fieldName))
}

export const getEnumChoiceOrder = (schema, modelName, fieldName) => {
  return R.prop('choiceOrder', getField(schema, modelName, fieldName))
}

export const getFieldConditions = (schema, modelName, fieldName) => {
  return R.prop('displayConditions', getField(schema, modelName, fieldName))
}

// return null if no condition exists, to differentiate from boolean
export const getFieldDisableCondition = (schema, modelName, fieldName) => {
  return R.propOr(null, 'disabled', getField(schema, modelName, fieldName))
}

export const getHideable = (schema, modelName, fieldName) => {
  // cannot set default as false ("R.propOr(true...") because boolean always eval as true here
  const hideable = R.prop('hideable', getField(schema, modelName, fieldName))
  // by default, all fields hideable
  if (hideable === undefined) { return true }
  return hideable
}

export const getDropDownDisableCondition = (schema, modelName, fieldName) => {
  return R.propOr(null, 'disabledDropDown', getField(schema, modelName, fieldName))
}

export const getOptionsOverride = ({schema, modelName, fieldName, options, formStack, value, modelStore }) => {
  const disabledDropDownCond = getDropDownDisableCondition(schema, modelName, fieldName)
  if (disabledDropDownCond) {
    options = disabledDropDownCond({
      schema, modelName, fieldName, options, formStack, value, modelStore
    })
  }
  return options
}
