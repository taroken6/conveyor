import * as R from 'ramda'
import { getModel } from './schemaGetters'

// displayValue may be calculated by either a function or by looking up displayField in the data dict
const getDisplayValue = ({ schema, modelName, parentModelName = null, data, ...props }) => {
  const model = getModel(schema, modelName)
  const displayField = R.prop('displayField', model)
  if (R.type(displayField) === 'Function') {
    return displayField({ schema, modelName, parentModelName, data, ...props })
  }
  return R.prop(displayField, data)
}

export default getDisplayValue
