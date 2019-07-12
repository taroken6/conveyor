'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInputType = undefined;

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

var _consts = require('../consts');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var getInputType = exports.getInputType = function getInputType(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldName = _ref.fieldName;

  var field = R.pathOr({}, [modelName, 'fields', fieldName], schema);
  var type = R.prop('type', field);

  if (R.type(type) === 'Object') {
    var pattern = R.prop('type', type);
    if (R.endsWith('ToOne', pattern)) {
      return _consts.inputTypes.RELATIONSHIP_SINGLE;
    }
    if (R.endsWith('ToMany', pattern)) {
      return _consts.inputTypes.RELATIONSHIP_MULTIPLE;
    }
  }
  return type;
};