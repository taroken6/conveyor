import * as R from 'ramda'

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

const getShownFields = ({ schema, modelName, type, node = {} }) => {
  const fieldOrder = R.prop('fieldOrder', getModel(schema, modelName))
  return R.filter(fieldName => {
    let show = R.prop(type, getField(schema, modelName, fieldName))
    if (R.type(show) === 'Function') {
      show = show({
        schema, modelName, fieldName, node
      })
    }
    return show
  }, fieldOrder)
}

export const getRequiredFields = (schema, modelName) => {
  return getShownFields({ schema, modelName, type: 'required' })
}

export const getCreateFields = (schema, modelName) => {
  return getShownFields({ schema, modelName, type: 'showCreate' })
}

export const getHasIndex = (schema, modelName) => {
  return R.prop('hasIndex', getModel(schema, modelName))
}

export const getDetailFields = ({ schema, modelName, node }) => {
  return getShownFields({ schema, modelName, type: 'showDetail', node })
}

export const getIndexFields = (schema, modelName) => {
  return getShownFields({ schema, modelName, type: 'showIndex' })
}

export const getTooltipFields = (schema, modelName) => {
  return getShownFields({ schema, modelName, type: 'showTooltip' })
}
export const getEnumChoices = (schema, modelName, fieldName) => {
  return R.prop('choices', getField(schema, modelName, fieldName))
}

export const getEnumChoiceOrder = (schema, modelName, fieldName) => {
  return R.prop('choiceOrder', getField(schema, modelName, fieldName))
}
