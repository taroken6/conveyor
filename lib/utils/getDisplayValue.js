'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

var _schemaGetters = require('./schemaGetters');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// displayValue may be calculated by either a function or by looking up displayField in the data dict
var getDisplayValue = function getDisplayValue(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      _ref$parentModelName = _ref.parentModelName,
      parentModelName = _ref$parentModelName === undefined ? null : _ref$parentModelName,
      data = _ref.data,
      props = _objectWithoutProperties(_ref, ['schema', 'modelName', 'parentModelName', 'data']);

  var model = (0, _schemaGetters.getModel)(schema, modelName);
  var displayField = R.prop('displayField', model);
  if (R.type(displayField) === 'Function') {
    return displayField({ schema: schema, modelName: modelName, parentModelName: parentModelName, data: data, ...props });
  }
  return R.prop(displayField, data);
};

exports.default = getDisplayValue;