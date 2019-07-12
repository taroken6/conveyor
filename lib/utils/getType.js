'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getType = undefined;

var _isType = require('./isType');

var _schemaGetters = require('./schemaGetters');

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var getType = exports.getType = function getType(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldName = _ref.fieldName;

  var field = (0, _schemaGetters.getField)(schema, modelName, fieldName);
  if ((0, _isType.isRel)(field)) {
    return R.path(['type', 'type'], field);
  }
  return R.prop('type', field);
};