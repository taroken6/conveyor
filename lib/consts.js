'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var INT_TYPE = 'int';
var TEXTAREA_TYPE = 'text';
var STRING_TYPE = 'string'; // keep name
var EMAIL_TYPE = 'email';
var PHONE_TYPE = 'phone';
var URL_TYPE = 'url';
var PASSWORD_TYPE = 'password';
var DATE_TYPE = 'date';
var FILE_TYPE = 'file';
var RADIO_TYPE = 'radio';
var SELECT_TYPE = 'select';
var CHECKBOX_TYPE = 'checkbox';
var BOOLEAN_TYPE = 'boolean';
var CURRENCY_TYPE = 'currency';

var inputTypes = exports.inputTypes = {
  STRING_TYPE: STRING_TYPE,
  FLOAT_TYPE: 'float',
  INT_TYPE: INT_TYPE,
  DATE_TYPE: DATE_TYPE,
  TEXTAREA_TYPE: TEXTAREA_TYPE,
  ENUM_TYPE: 'enum',
  URL_TYPE: URL_TYPE,
  PHONE_TYPE: PHONE_TYPE,
  EMAIL_TYPE: EMAIL_TYPE,
  BOOLEAN_TYPE: BOOLEAN_TYPE,
  CURRENCY_TYPE: CURRENCY_TYPE,
  FILE_TYPE: FILE_TYPE,
  SELECT_TYPE: SELECT_TYPE,
  RELATIONSHIP_SINGLE: 'relSingle',
  RELATIONSHIP_MULTIPLE: 'relMultiple',
  PASSWORD_TYPE: PASSWORD_TYPE,
  RADIO_TYPE: RADIO_TYPE,
  CHECKBOX_TYPE: CHECKBOX_TYPE // not used
};

var relInputTypes = exports.relInputTypes = {
  ONE_TO_MANY_TYPE: 'OneToMany',
  MANY_TO_ONE_TYPE: 'ManyToOne',
  ONE_TO_ONE_TYPE: 'OneToOne',
  MANY_TO_MANY_TYPE: 'ManyToMany'
};

var ASC = exports.ASC = 'asc';
var DESC = exports.DESC = 'desc';