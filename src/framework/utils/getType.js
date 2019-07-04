import { isRel } from './isType'
import { getField } from './schemaGetters'
import * as R from 'ramda'

export const getType = ({ schema, modelName, fieldName }) => {
  const field = getField(schema, modelName, fieldName)
  if (isRel(field)) {
    return R.path(['type', 'type'], field)
  }
  return R.prop('type', field)
}
