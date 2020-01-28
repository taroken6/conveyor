import * as R from 'ramda'
import * as consts from '../consts'

export const isRel = (field) => {
  return typeof (R.prop('type', field)) === 'object'
}

export const isURL = (field) => R.prop('type', field) === 'url'

export const isEmail = (field) => R.prop('type', field) === 'email'

export const isPhone = (field) => R.prop('type', field) === 'phone'

export const isCurrency = (field) => R.prop('type', field) === 'currency'

export const isDate = field => R.prop('type', field) === 'date'

export const isTextArea = field => R.prop('type', field) === 'text'

export const isLink = field => R.prop('type', field) === 'url'

export const isEnum = field => R.prop('type', field) === 'enum'

export const isFile = field => R.prop('type', field) === 'file'

export const isBoolean = field => R.prop('type', field) === 'boolean'

export const isPassword = field => R.prop('type', field) === 'password'

// children relationship
export const isOneToMany = (field) => {
  return (R.pathOr(false, ['type', 'type'], field) === consts.inputTypes.ONE_TO_MANY_TYPE)
}

export const isManyToMany = (field) => {
  return (R.pathOr(false, ['type', 'type'], field) === consts.inputTypes.MANY_TO_MANY_TYPE)
}
