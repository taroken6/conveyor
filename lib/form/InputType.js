"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInputType = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _consts = require("../consts");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getInputType = function getInputType(_ref) {
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

exports.getInputType = getInputType;