"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _schemaGetters = require("./schemaGetters");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

// displayValue may be calculated by either a function or by looking up displayField in the node dict
var getDisplayValue = function getDisplayValue(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      _ref$parentModelName = _ref.parentModelName,
      parentModelName = _ref$parentModelName === void 0 ? null : _ref$parentModelName,
      node = _ref.node;
  var model = (0, _schemaGetters.getModel)(schema, modelName);
  var displayField = R.prop('displayField', model);

  if (R.type(displayField) === 'Function') {
    return displayField({
      schema: schema,
      modelName: modelName,
      parentModelName: parentModelName,
      node: node
    });
  }

  return R.prop(displayField, node);
};

var _default = getDisplayValue;
exports["default"] = _default;