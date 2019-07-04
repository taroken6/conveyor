import * as R from 'ramda'
import { inputTypes } from '../../framework/consts'

export const getInputType = ({ schema, modelName, fieldName }) => {
  const field = R.pathOr({}, [modelName, 'fields', fieldName], schema)
  const type = R.prop('type', field)

  if (R.type(type) === 'Object') {
    const pattern = R.prop('type', type)
    if (R.endsWith('ToOne', pattern)) {
      return inputTypes.RELATIONSHIP_SINGLE
    }
    if (R.endsWith('ToMany', pattern)) {
      return inputTypes.RELATIONSHIP_MULTIPLE
    }
  }
  return type
}
