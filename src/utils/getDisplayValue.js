import * as R from 'ramda'
import { getModel } from './schemaGetters'

// displayValue may be calculated by either a function or by looking up displayField in the node dict
const getDisplayValue = ({ schema, modelName, parentModelName = null, node, ...props }) => {
  const model = getModel(schema, modelName)
  const displayField = R.prop('displayField', model)
  if (R.type(displayField) === 'Function') {
    return displayField({ schema, modelName, parentModelName, node, ...props })
  }
  return R.prop(displayField, node)
}

export default getDisplayValue
