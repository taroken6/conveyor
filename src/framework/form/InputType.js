import * as R from 'ramda'
import { FlexibleConsts } from 'flexible-forms'

export const InputType = {
  FlexibleForms: FlexibleConsts,
  ENUM: 'ENUM',
  FLOAT: 'FLOAT',
  RELATIONSHIP_SINGLE: 'RELATIONSHIP_SINGLE',
  RELATIONSHIP_MULTIPLE: 'RELATIONSHIP_MULTIPLE'
}

export const getInputType = ({ schema, modelName, fieldName }) => {
  const field = R.pathOr({}, [modelName, 'fields', fieldName], schema)
  const type = R.prop('type', field)

  switch (type) {
    case 'string':
      return InputType.FlexibleForms.STRING_TYPE
    case 'float':
      return InputType.FLOAT
    case 'int':
      return InputType.FlexibleForms.INT_TYPE
    case 'text':
      return InputType.FlexibleForms.TEXTAREA_TYPE
    case 'enum':
      return InputType.ENUM
    case 'date':
      return InputType.FlexibleForms.DATE_TYPE
    case 'url':
      return InputType.FlexibleForms.URL_TYPE
    case 'email':
      return InputType.FlexibleForms.EMAIL_TYPE
    case 'phone':
      return InputType.FlexibleForms.PHONE_TYPE
    case 'boolean':
      return InputType.FlexibleForms.BOOLEAN_TYPE
    case 'file':
      return InputType.FlexibleForms.FILE_TYPE
    case 'currency':
      return InputType.FlexibleForms.CURRENCY_TYPE
    case 'password':
      return InputType.FlexibleForms.PASSWORD_TYPE
  }

  if (R.type(type) === 'Object') {
    const pattern = R.prop('type', type)
    if (R.endsWith('ToOne', pattern)) {
      return InputType.RELATIONSHIP_SINGLE
    }
    if (R.endsWith('ToMany', pattern)) {
      return InputType.RELATIONSHIP_MULTIPLE
    }
  }
}
