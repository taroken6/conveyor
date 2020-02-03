"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getType = void 0;

var _isType = require("./isType");

var _schemaGetters = require("./schemaGetters");

var R = _interopRequireWildcard(require("ramda"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getType = function getType(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldName = _ref.fieldName;
  var field = (0, _schemaGetters.getField)(schema, modelName, fieldName);

  if ((0, _isType.isRel)(field)) {
    return R.path(['type', 'type'], field);
  }

  return R.prop('type', field);
};

exports.getType = getType;