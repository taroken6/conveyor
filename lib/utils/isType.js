'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isManyToMany = exports.isOneToMany = exports.isPassword = exports.isBoolean = exports.isFile = exports.isEnum = exports.isLink = exports.isTextArea = exports.isDate = exports.isCurrency = exports.isPhone = exports.isEmail = exports.isURL = exports.isRel = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

var _consts = require('../consts');

var consts = _interopRequireWildcard(_consts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var isRel = exports.isRel = function isRel(field) {
  return _typeof(R.prop('type', field)) === 'object';
};

var isURL = exports.isURL = function isURL(field) {
  return R.prop('type', field) === 'url';
};

var isEmail = exports.isEmail = function isEmail(field) {
  return R.prop('type', field) === 'email';
};

var isPhone = exports.isPhone = function isPhone(field) {
  return R.prop('type', field) === 'phone';
};

var isCurrency = exports.isCurrency = function isCurrency(field) {
  return R.prop('type', field) === 'currency';
};

var isDate = exports.isDate = function isDate(field) {
  return R.prop('type', field) === 'date';
};

var isTextArea = exports.isTextArea = function isTextArea(field) {
  return R.prop('type', field) === 'text';
};

var isLink = exports.isLink = function isLink(field) {
  return R.prop('type', field) === 'url';
};

var isEnum = exports.isEnum = function isEnum(field) {
  return R.prop('type', field) === 'enum';
};

var isFile = exports.isFile = function isFile(field) {
  return R.prop('type', field) === 'file';
};

var isBoolean = exports.isBoolean = function isBoolean(field) {
  return R.prop('type', field) === 'boolean';
};

var isPassword = exports.isPassword = function isPassword(field) {
  return R.prop('type', field) === 'password';
};

// children relationship
var isOneToMany = exports.isOneToMany = function isOneToMany(field) {
  return R.pathOr(false, ['type', 'type'], field) === consts.relInputTypes.ONE_TO_MANY_TYPE;
};

var isManyToMany = exports.isManyToMany = function isManyToMany(field) {
  return R.pathOr(false, ['type', 'type'], field) === consts.relInputTypes.MANY_TO_MANY_TYPE;
};