"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Field = exports.FieldToMany = exports.FieldToOne = exports.getRelSchemaEntry = void 0;

var _react = _interopRequireDefault(require("react"));

var _getType = require("../utils/getType");

var consts = _interopRequireWildcard(require("../consts"));

var R = _interopRequireWildcard(require("ramda"));

var _DetailLink = _interopRequireDefault(require("../DetailLink"));

var _rcSwitch = _interopRequireDefault(require("rc-switch"));

var _Utils = require("../Utils");

var _schemaGetters = require("../utils/schemaGetters");

var _getDisplayValue = _interopRequireDefault(require("../utils/getDisplayValue"));

var _Modal = require("../Modal");

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// gets the schema of the relationship model, based on field meta
var getRelSchemaEntry = function getRelSchemaEntry(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldName = _ref.fieldName;
  var fieldTargetModel = R.path([modelName, 'fields', fieldName, 'type', 'target'], schema);
  return (0, _schemaGetters.getModel)(schema, fieldTargetModel);
};

exports.getRelSchemaEntry = getRelSchemaEntry;

var FieldString = function FieldString(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      fieldName = _ref2.fieldName,
      node = _ref2.node;
  var value = R.prop(fieldName, node);
  var displayString = R.isNil(value) || value === '' ? 'N/A' : value;
  return _react["default"].createElement("span", null, displayString);
};

var FieldBoolean = function FieldBoolean(_ref3) {
  var schema = _ref3.schema,
      modelName = _ref3.modelName,
      fieldName = _ref3.fieldName,
      node = _ref3.node;
  var displayBool = R.propOr(false, fieldName, node); // need propOr(false...

  return _react["default"].createElement(_rcSwitch["default"], {
    checked: displayBool
  });
}; // Render a link to the value. If the value does not start with any of the prefixes,
// append the first prefix. Produces HTTPS URLs by default.


var FieldLink = function FieldLink(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      fieldName = _ref4.fieldName,
      node = _ref4.node,
      _ref4$prefix = _ref4.prefix,
      prefix = _ref4$prefix === void 0 ? ['https://', 'http://'] : _ref4$prefix;
  // Ensure prefix is a list, allowing a single string instead of a list.
  prefix = R.pipe(R.prepend(prefix), R.flatten)([]);
  var href = R.prop(fieldName, node);

  if (!href) {
    return _react["default"].createElement("span", null, "N/A");
  }

  var displayString = href;

  if (!R.any(function (item) {
    return R.startsWith(item, href);
  }, prefix)) {
    href = prefix[0] + href;
  }

  return _react["default"].createElement("a", {
    href: href
  }, displayString);
};

var FieldCurrency = function FieldCurrency(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      fieldName = _ref5.fieldName,
      node = _ref5.node;
  var num = R.prop(fieldName, node);
  var displayString = num ? '$ ' + num : 'N/A';
  return _react["default"].createElement("span", null, displayString);
};

var FieldEnum = function FieldEnum(_ref6) {
  var schema = _ref6.schema,
      modelName = _ref6.modelName,
      fieldName = _ref6.fieldName,
      node = _ref6.node;
  var value = R.prop(fieldName, node);

  if (value) {
    return _react["default"].createElement("span", null, (0, _Utils.getEnumLabel)({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      value: value
    }));
  }

  return _react["default"].createElement("span", null, 'N/A');
};

var FieldImageModal = function FieldImageModal(_ref7) {
  var schema = _ref7.schema,
      modelName = _ref7.modelName,
      fieldName = _ref7.fieldName,
      id = _ref7.id,
      node = _ref7.node,
      customProps = _ref7.customProps;
  var url = R.prop(fieldName, node);
  var label = (0, _schemaGetters.getFieldLabel)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    node: node,
    customProps: customProps
  });
  var modalId = "img-modal-".concat(fieldName);
  return _react["default"].createElement(_Modal.ImageLinkModal, {
    id: modalId,
    title: label,
    url: url
  });
};

var FieldToOne = function FieldToOne(_ref8) {
  var schema = _ref8.schema,
      modelName = _ref8.modelName,
      fieldName = _ref8.fieldName,
      parentModelName = _ref8.parentModelName,
      node = _ref8.node,
      tooltipData = _ref8.tooltipData,
      customProps = _ref8.customProps;
  var relSchemaEntry = getRelSchemaEntry({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName
  });
  var relModelName = R.prop('modelName', relSchemaEntry);
  var displayString = (0, _getDisplayValue["default"])({
    schema: schema,
    modelName: relModelName,
    parentModelName: parentModelName,
    node: node,
    customProps: customProps
  });
  var relId = R.prop('id', node);

  if (!displayString) {
    return _react["default"].createElement("span", null, "N/A");
  }

  var displayTooltip = (0, _schemaGetters.getTooltipFields)(schema, relModelName).length !== 0;

  if (displayTooltip) {
    return _react["default"].createElement(_Tooltip["default"], {
      schema: schema,
      modelName: relModelName,
      id: relId,
      data: R.pathOr([], [relModelName, relId], tooltipData)
    }, _react["default"].createElement(_DetailLink["default"], {
      modelName: relModelName,
      id: relId
    }, displayString));
  } else {
    return _react["default"].createElement(_DetailLink["default"], {
      modelName: relModelName,
      id: relId
    }, displayString);
  }
};

exports.FieldToOne = FieldToOne;

var FieldToMany = function FieldToMany(_ref9) {
  var schema = _ref9.schema,
      modelName = _ref9.modelName,
      fieldName = _ref9.fieldName,
      parentModelName = _ref9.parentModelName,
      tooltipData = _ref9.tooltipData,
      node = _ref9.node;
  var multiRelField = R.prop(fieldName, node);

  var relListWithLink = function relListWithLink(field, idx, obj) {
    return _react["default"].createElement(_react["default"].Fragment, {
      key: "fragment-".concat(field.id)
    }, _react["default"].createElement(FieldToOne, _extends({
      key: "field-m2o-".concat(field.id)
    }, {
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      parentModelName: parentModelName,
      tooltipData: tooltipData,
      node: field
    })), idx !== obj.length - 1 && _react["default"].createElement("span", null, ', '));
  };

  return _react["default"].createElement("span", null, multiRelField && multiRelField.length > 0 ? multiRelField.map(relListWithLink) : 'N/A');
};

exports.FieldToMany = FieldToMany;

var Field = function Field(_ref10) {
  var schema = _ref10.schema,
      modelName = _ref10.modelName,
      fieldName = _ref10.fieldName,
      parentModelName = _ref10.parentModelName,
      tooltipData = _ref10.tooltipData,
      node = _ref10.node,
      id = _ref10.id,
      customProps = _ref10.customProps;
  var props = {
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    tooltipData: tooltipData,
    parentModelName: parentModelName,
    node: node,
    id: id,
    customProps: customProps
  };
  var type = (0, _getType.getType)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName
  });

  switch (type) {
    case consts.inputTypes.STRING_TYPE:
    case consts.inputTypes.FLOAT_TYPE:
    case consts.inputTypes.INT_TYPE:
    case consts.inputTypes.DATE_TYPE:
    case consts.inputTypes.TEXTAREA_TYPE:
    case consts.inputTypes.CREATABLE_STRING_SELECT_TYPE:
      return _react["default"].createElement(FieldString, props);

    case consts.inputTypes.ENUM_TYPE:
      return _react["default"].createElement(FieldEnum, props);

    case consts.inputTypes.URL_TYPE:
      return _react["default"].createElement(FieldLink, props);

    case consts.inputTypes.FILE_TYPE:
      return _react["default"].createElement(FieldImageModal, props);

    case consts.inputTypes.PHONE_TYPE:
      return _react["default"].createElement(FieldLink, _objectSpread({
        prefix: 'tel:'
      }, props));

    case consts.inputTypes.EMAIL_TYPE:
      return _react["default"].createElement(FieldLink, _objectSpread({
        prefix: 'mailto:'
      }, props));

    case consts.inputTypes.BOOLEAN_TYPE:
      return _react["default"].createElement(FieldBoolean, props);

    case consts.inputTypes.CURRENCY_TYPE:
      return _react["default"].createElement(FieldCurrency, props);

    case consts.relInputTypes.MANY_TO_ONE_TYPE:
      return _react["default"].createElement(FieldToOne, _objectSpread({}, props, {
        node: R.prop(fieldName, node),
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        tooltipData: tooltipData
      }));

    case consts.relInputTypes.MANY_TO_MANY_TYPE:
    case consts.relInputTypes.ONE_TO_MANY_TYPE:
      return _react["default"].createElement(FieldToMany, props);

    case consts.relInputTypes.ONE_TO_ONE_TYPE:
      return _react["default"].createElement("span", null, "OneToOne");

    default:
      return _react["default"].createElement("span", null, "NO TYPE");
  }
};

exports.Field = Field;
var _default = Field;
exports["default"] = _default;