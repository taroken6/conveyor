"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isManyToMany = exports.isOneToMany = exports.isPassword = exports.isBoolean = exports.isFile = exports.isEnum = exports.isLink = exports.isTextArea = exports.isDate = exports.isCurrency = exports.isPhone = exports.isEmail = exports.isURL = exports.isRel = void 0;

var R = _interopRequireWildcard(require("ramda"));

var consts = _interopRequireWildcard(require("../consts"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isRel = function isRel(field) {
  return _typeof(R.prop('type', field)) === 'object';
};

exports.isRel = isRel;

var isURL = function isURL(field) {
  return R.prop('type', field) === 'url';
};

exports.isURL = isURL;

var isEmail = function isEmail(field) {
  return R.prop('type', field) === 'email';
};

exports.isEmail = isEmail;

var isPhone = function isPhone(field) {
  return R.prop('type', field) === 'phone';
};

exports.isPhone = isPhone;

var isCurrency = function isCurrency(field) {
  return R.prop('type', field) === 'currency';
};

exports.isCurrency = isCurrency;

var isDate = function isDate(field) {
  return R.prop('type', field) === 'date';
};

exports.isDate = isDate;

var isTextArea = function isTextArea(field) {
  return R.prop('type', field) === 'text';
};

exports.isTextArea = isTextArea;

var isLink = function isLink(field) {
  return R.prop('type', field) === 'url';
};

exports.isLink = isLink;

var isEnum = function isEnum(field) {
  return R.prop('type', field) === 'enum';
};

exports.isEnum = isEnum;

var isFile = function isFile(field) {
  return R.prop('type', field) === 'file';
};

exports.isFile = isFile;

var isBoolean = function isBoolean(field) {
  return R.prop('type', field) === 'boolean';
};

exports.isBoolean = isBoolean;

var isPassword = function isPassword(field) {
  return R.prop('type', field) === 'password';
}; // children relationship


exports.isPassword = isPassword;

var isOneToMany = function isOneToMany(field) {
  return R.pathOr(false, ['type', 'type'], field) === consts.relInputTypes.ONE_TO_MANY_TYPE;
};

exports.isOneToMany = isOneToMany;

var isManyToMany = function isManyToMany(field) {
  return R.pathOr(false, ['type', 'type'], field) === consts.relInputTypes.MANY_TO_MANY_TYPE;
};

exports.isManyToMany = isManyToMany;