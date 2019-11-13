const INT_TYPE = 'int'
const TEXTAREA_TYPE = 'text'
const STRING_TYPE = 'string' // keep name
const EMAIL_TYPE = 'email'
const PHONE_TYPE = 'phone'
const URL_TYPE = 'url'
const PASSWORD_TYPE = 'password'
const DATE_TYPE = 'date'
const FILE_TYPE = 'file'
const RADIO_TYPE = 'radio'
const SELECT_TYPE = 'select'
const CREATABLE_STRING_SELECT_TYPE = 'creatable_string_select'
const CHECKBOX_TYPE = 'checkbox'
const BOOLEAN_TYPE = 'boolean'
const CURRENCY_TYPE = 'currency'

export const inputTypes = {
  STRING_TYPE,
  FLOAT_TYPE: 'float',
  INT_TYPE,
  DATE_TYPE,
  TEXTAREA_TYPE,
  ENUM_TYPE: 'enum',
  URL_TYPE,
  PHONE_TYPE,
  EMAIL_TYPE,
  BOOLEAN_TYPE,
  CURRENCY_TYPE,
  FILE_TYPE,
  SELECT_TYPE,
  RELATIONSHIP_SINGLE: 'relSingle',
  RELATIONSHIP_MULTIPLE: 'relMultiple',
  CREATABLE_STRING_SELECT_TYPE,
  PASSWORD_TYPE,
  RADIO_TYPE,
  CHECKBOX_TYPE // not used
}

export const relInputTypes = {
  ONE_TO_MANY_TYPE: 'OneToMany',
  MANY_TO_ONE_TYPE: 'ManyToOne',
  ONE_TO_ONE_TYPE: 'OneToOne',
  MANY_TO_MANY_TYPE: 'ManyToMany'
}

export const ASC = 'asc'
export const DESC = 'desc'
