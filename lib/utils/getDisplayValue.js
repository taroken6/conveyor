"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _schemaGetters = require("./schemaGetters");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// displayValue may be calculated by either a function or by looking up displayField in the node dict
var getDisplayValue = function getDisplayValue(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      _ref$parentModelName = _ref.parentModelName,
      parentModelName = _ref$parentModelName === void 0 ? null : _ref$parentModelName,
      node = _ref.node,
      customProps = _ref.customProps;
  var model = (0, _schemaGetters.getModel)(schema, modelName);
  var displayField = R.propOr('name', 'displayField', model);

  if (R.type(displayField) === 'Function') {
    return displayField({
      schema: schema,
      modelName: modelName,
      parentModelName: parentModelName,
      node: node,
      customProps: customProps
    });
  }

  return R.prop(displayField, node);
};

var _default = getDisplayValue;
exports["default"] = _default;