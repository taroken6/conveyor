import * as R from 'ramda'
import { getModel } from './schemaGetters'

const getDisplayValue = ({ schema, modelName, node, customProps }) => {
  const model = getModel(schema, modelName)
  const displayField = R.propOr('name', 'displayField', model)
  if (R.type(displayField) === 'Function') {
    return displayField({ schema, modelName, node, customProps })
  }
  return R.prop(displayField, node)
}

export default getDisplayValue
