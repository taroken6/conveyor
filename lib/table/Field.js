'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Field = exports.FieldToMany = exports.FieldToOne = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getType = require('../utils/getType');

var _consts = require('../consts');

var consts = _interopRequireWildcard(_consts);

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

var _DetailLink = require('../DetailLink');

var _DetailLink2 = _interopRequireDefault(_DetailLink);

var _rcSwitch = require('rc-switch');

var _rcSwitch2 = _interopRequireDefault(_rcSwitch);

var _Utils = require('../Utils');

var _schemaGetters = require('../utils/schemaGetters');

var _getDisplayValue = require('../utils/getDisplayValue');

var _getDisplayValue2 = _interopRequireDefault(_getDisplayValue);

var _Modal = require('../Modal');

var _Detail = require('../Detail');

var _Tooltip = require('../Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// gets the schema of the relationship model, based on field meta
var getRelSchemaEntry = function getRelSchemaEntry(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldName = _ref.fieldName;

  var fieldTargetModel = R.path([modelName, 'fields', fieldName, 'type', 'target'], schema);

  return (0, _schemaGetters.getModel)(schema, fieldTargetModel);
};

var FieldString = function FieldString(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      fieldName = _ref2.fieldName,
      node = _ref2.node;

  var value = R.prop(fieldName, node);
  var displayString = R.isNil(value) || value === '' ? 'N/A' : value;

  return _react2.default.createElement(
    'span',
    null,
    displayString
  );
};

var FieldBoolean = function FieldBoolean(_ref3) {
  var schema = _ref3.schema,
      modelName = _ref3.modelName,
      fieldName = _ref3.fieldName,
      node = _ref3.node;

  var displayBool = R.propOr(false, fieldName, node); // need propOr(false...
  return _react2.default.createElement(_rcSwitch2.default, {
    checked: displayBool
  });
};

var FieldLink = function FieldLink(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      fieldName = _ref4.fieldName,
      node = _ref4.node,
      _ref4$prefix = _ref4.prefix,
      prefix = _ref4$prefix === undefined ? 'http://' : _ref4$prefix;

  var displayString = R.prop(fieldName, node);
  if (!displayString) {
    return _react2.default.createElement(
      'span',
      null,
      'N/A'
    );
  }

  return _react2.default.createElement(
    'a',
    { href: prefix + displayString },
    displayString
  );
};

var FieldCurrency = function FieldCurrency(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      fieldName = _ref5.fieldName,
      node = _ref5.node;

  var num = R.prop(fieldName, node);
  var displayString = num ? '$ ' + num : 'N/A';

  return _react2.default.createElement(
    'span',
    null,
    displayString
  );
};

var FieldEnum = function FieldEnum(_ref6) {
  var schema = _ref6.schema,
      modelName = _ref6.modelName,
      fieldName = _ref6.fieldName,
      node = _ref6.node;

  var value = R.prop(fieldName, node);
  if (value) {
    return _react2.default.createElement(
      'span',
      null,
      (0, _Utils.getEnumLabel)({ schema: schema, modelName: modelName, fieldName: fieldName, value: value })
    );
  }
  return _react2.default.createElement(
    'span',
    null,
    'N/A'
  );
};

var FieldImageModal = function FieldImageModal(_ref7) {
  var schema = _ref7.schema,
      modelName = _ref7.modelName,
      fieldName = _ref7.fieldName,
      id = _ref7.id,
      node = _ref7.node;

  var url = R.prop(fieldName, node);
  var label = (0, _Detail.getFieldLabel)({ schema: schema, modelName: modelName, fieldName: fieldName, data: node });
  var modalId = 'img-modal-' + fieldName;

  return _react2.default.createElement(_Modal.ImageLinkModal, { id: modalId, title: label, url: url });
};

var FieldToOne = exports.FieldToOne = function FieldToOne(_ref8) {
  var schema = _ref8.schema,
      modelName = _ref8.modelName,
      fieldName = _ref8.fieldName,
      parentModelName = _ref8.parentModelName,
      node = _ref8.node,
      tooltipData = _ref8.tooltipData;

  var relSchemaEntry = getRelSchemaEntry({ schema: schema, modelName: modelName, fieldName: fieldName });

  var relModelName = R.prop('modelName', relSchemaEntry);

  var displayString = (0, _getDisplayValue2.default)({ schema: schema, modelName: relModelName, parentModelName: parentModelName, data: node });
  var relId = R.prop('id', node);

  if (!displayString) {
    return _react2.default.createElement(
      'span',
      null,
      'N/A'
    );
  }

  var displayTooltip = (0, _schemaGetters.getTooltipFields)(schema, relModelName).length !== 0;
  if (displayTooltip) {
    return _react2.default.createElement(
      _Tooltip2.default,
      {
        schema: schema,
        modelName: relModelName,
        id: relId,
        data: R.pathOr([], [relModelName, relId], tooltipData)
      },
      _react2.default.createElement(
        _DetailLink2.default,
        {
          modelName: relModelName,
          id: relId
        },
        displayString
      )
    );
  } else {
    return _react2.default.createElement(
      _DetailLink2.default,
      {
        modelName: relModelName,
        id: relId },
      displayString
    );
  }
};

var FieldToMany = exports.FieldToMany = function FieldToMany(_ref9) {
  var schema = _ref9.schema,
      modelName = _ref9.modelName,
      fieldName = _ref9.fieldName,
      parentModelName = _ref9.parentModelName,
      tooltipData = _ref9.tooltipData,
      node = _ref9.node,
      props = _objectWithoutProperties(_ref9, ['schema', 'modelName', 'fieldName', 'parentModelName', 'tooltipData', 'node']);

  var multiRelField = R.prop(fieldName, node);

  var relListWithLink = function relListWithLink(field, idx, obj) {
    return _react2.default.createElement(
      _react2.default.Fragment,
      { key: 'fragment-' + field.id },
      _react2.default.createElement(FieldToOne, _extends({
        key: 'field-m2o-' + field.id
      }, { schema: schema, modelName: modelName, fieldName: fieldName, parentModelName: parentModelName, tooltipData: tooltipData, node: field })),
      idx !== obj.length - 1 && _react2.default.createElement(
        'span',
        null,
        ', '
      )
    );
  };

  return _react2.default.createElement(
    'span',
    null,
    multiRelField && multiRelField.length > 0 ? multiRelField.map(relListWithLink) : 'N/A'
  );
};

var Field = exports.Field = function Field(_ref10) {
  var schema = _ref10.schema,
      modelName = _ref10.modelName,
      fieldName = _ref10.fieldName,
      parentModelName = _ref10.parentModelName,
      tooltipData = _ref10.tooltipData,
      node = _ref10.node,
      id = _ref10.id;

  var props = {
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    tooltipData: tooltipData,
    parentModelName: parentModelName,
    node: node,
    id: id
  };

  var type = (0, _getType.getType)({ schema: schema, modelName: modelName, fieldName: fieldName });

  switch (type) {
    case consts.inputTypes.STRING_TYPE:
    case consts.inputTypes.FLOAT_TYPE:
    case consts.inputTypes.INT_TYPE:
    case consts.inputTypes.DATE_TYPE:
    case consts.inputTypes.TEXTAREA_TYPE:
      return _react2.default.createElement(FieldString, props);
    case consts.inputTypes.ENUM_TYPE:
      return _react2.default.createElement(FieldEnum, props);
    case consts.inputTypes.URL_TYPE:
      return _react2.default.createElement(FieldLink, props);
    case consts.inputTypes.FILE_TYPE:
      return _react2.default.createElement(FieldImageModal, props);
    case consts.inputTypes.PHONE_TYPE:
      return _react2.default.createElement(FieldLink, { prefix: 'tel:', ...props });
    case consts.inputTypes.EMAIL_TYPE:
      return _react2.default.createElement(FieldLink, { prefix: 'mailto:', ...props });
    case consts.inputTypes.BOOLEAN_TYPE:
      return _react2.default.createElement(FieldBoolean, props);
    case consts.inputTypes.CURRENCY_TYPE:
      return _react2.default.createElement(FieldCurrency, props);
    case consts.relInputTypes.MANY_TO_ONE_TYPE:
      return _react2.default.createElement(FieldToOne, {
        ...props,
        node: R.prop(fieldName, node),
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        tooltipData: tooltipData
      });
    case consts.relInputTypes.MANY_TO_MANY_TYPE:
    case consts.relInputTypes.ONE_TO_MANY_TYPE:
      return _react2.default.createElement(FieldToMany, props);
    case consts.relInputTypes.ONE_TO_ONE_TYPE:
      return _react2.default.createElement(
        'span',
        null,
        'OneToOne'
      );
    default:
      return _react2.default.createElement(
        'span',
        null,
        'NO TYPE'
      );
  }
};

exports.default = Field;