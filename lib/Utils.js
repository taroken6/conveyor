"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldDisplay = exports.isCreatable = exports.isDeletable = exports.isTableDeletable = exports.isFieldEditable = exports.isRowEditable = exports.isTableEditable = exports.getEnumLabel = exports.skipOverride = exports.getInputOverride = exports.getDetailValueOverride = exports.getDetailLabelOverride = exports.getDetailOverride = exports.getCellOverride = exports.titleize = exports.humanize = exports.trimWhitespaceBetweenWords = exports.underscoreToSpace = exports.spaceOnCapitalLetter = exports.capitalizeFirstChar = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _schemaGetters = require("./utils/schemaGetters");

var _rxjs = require("rxjs");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var capitalizeFirstChar = function capitalizeFirstChar(str) {
  return str.replace(/^./, function (str) {
    return str.toUpperCase();
  });
};

exports.capitalizeFirstChar = capitalizeFirstChar;

var spaceOnCapitalLetter = function spaceOnCapitalLetter(str) {
  return str.replace(/([A-Z])/g, ' $1');
};

exports.spaceOnCapitalLetter = spaceOnCapitalLetter;

var underscoreToSpace = function underscoreToSpace(str) {
  return str.replace(/_/g, ' ');
};

exports.underscoreToSpace = underscoreToSpace;

var trimWhitespaceBetweenWords = function trimWhitespaceBetweenWords(str) {
  return str.replace(/\s\s+/g, ' ');
};

exports.trimWhitespaceBetweenWords = trimWhitespaceBetweenWords;

var humanize = function humanize(str) {
  return R.pipe(spaceOnCapitalLetter, capitalizeFirstChar, underscoreToSpace, trimWhitespaceBetweenWords, R.trim)(str);
};

exports.humanize = humanize;

var titleize = function titleize(title) {
  var strArr = title.split(' ');
  strArr = strArr.map(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  return strArr.join(' ');
};

exports.titleize = titleize;

var getCellOverride = function getCellOverride(schema, modelName, fieldName) {
  return R.path([modelName, 'fields', fieldName, 'components', 'cell'], schema);
};

exports.getCellOverride = getCellOverride;

var getDetailOverride = function getDetailOverride(schema, modelName, fieldName) {
  return R.path([modelName, 'fields', fieldName, 'components', 'detail'], schema);
};

exports.getDetailOverride = getDetailOverride;

var getDetailLabelOverride = function getDetailLabelOverride(schema, modelName, fieldName) {
  return R.path([modelName, 'fields', fieldName, 'components', 'detailLabel'], schema);
};

exports.getDetailLabelOverride = getDetailLabelOverride;

var getDetailValueOverride = function getDetailValueOverride(schema, modelName, fieldName) {
  return R.path([modelName, 'fields', fieldName, 'components', 'detailValue'], schema);
};

exports.getDetailValueOverride = getDetailValueOverride;

var getInputOverride = function getInputOverride(schema, modelName, fieldName) {
  return R.path([modelName, 'fields', fieldName, 'components', 'input'], schema);
}; // override component skipped only if 'null' (undefined by default)


exports.getInputOverride = getInputOverride;

var skipOverride = function skipOverride(component) {
  return component === null;
};

exports.skipOverride = skipOverride;

var getEnumLabel = function getEnumLabel(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldName = _ref.fieldName,
      value = _ref.value;

  if (value === null) {
    return 'N/A';
  }

  var field = (0, _schemaGetters.getField)(schema, modelName, fieldName);
  return R.pathOr('Value Not Found', ['choices', value], field);
};
/**
 * IMPORTANT:
 *
 * For isTableEditable, isRowEditable, isFieldEditable, is TableDeletable,
 * isDeletable, & isCreatable
 *
 * modelName must match any 'node' (or data[n]) __typename
 * parent 'node' must be labeled 'parentNode'
 */


exports.getEnumLabel = getEnumLabel;

var isTableEditable = function isTableEditable(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      data = _ref2.data,
      user = _ref2.user,
      parentNode = _ref2.parentNode,
      customProps = _ref2.customProps;
  return !R.isEmpty(data.filter(function (node) {
    return isRowEditable({
      schema: schema,
      modelName: modelName,
      user: user,
      node: node,
      parentNode: parentNode,
      customProps: customProps
    });
  }));
}; //isRowEditable loops over all displayed fields to determine if the row is editable


exports.isTableEditable = isTableEditable;

var isRowEditable = function isRowEditable(_ref3) {
  var schema = _ref3.schema,
      modelName = _ref3.modelName,
      node = _ref3.node,
      parentNode = _ref3.parentNode,
      user = _ref3.user,
      fieldOrder = _ref3.fieldOrder,
      customProps = _ref3.customProps;

  for (var index in fieldOrder) {
    var fieldName = R.prop(index, fieldOrder);

    if (isFieldEditable({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      node: node,
      parentNode: parentNode,
      user: user,
      customProps: customProps
    })) {
      return true;
    }
  }

  return false;
};

exports.isRowEditable = isRowEditable;

var isFieldEditable = function isFieldEditable(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      fieldName = _ref4.fieldName,
      node = _ref4.node,
      parentNode = _ref4.parentNode,
      user = _ref4.user,
      customProps = _ref4.customProps;
  var editable = R.propOr(!R.equals('id', fieldName), 'editable', (0, _schemaGetters.getField)(schema, modelName, fieldName));

  if (R.type(editable) === 'Boolean') {
    return editable;
  } else if (R.type(editable) === 'Function') {
    return editable({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      node: node,
      parentNode: parentNode,
      user: user,
      customProps: customProps
    });
  } else {
    return false;
  }
};

exports.isFieldEditable = isFieldEditable;

var isTableDeletable = function isTableDeletable(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      data = _ref5.data,
      parentNode = _ref5.parentNode,
      user = _ref5.user,
      customProps = _ref5.customProps;
  return !R.isEmpty(data.filter(function (node) {
    return isDeletable({
      schema: schema,
      modelName: modelName,
      node: node,
      parentNode: parentNode,
      user: user,
      customProps: customProps
    });
  }));
};

exports.isTableDeletable = isTableDeletable;

var isDeletable = function isDeletable(_ref6) {
  var schema = _ref6.schema,
      modelName = _ref6.modelName,
      node = _ref6.node,
      parentNode = _ref6.parentNode,
      user = _ref6.user,
      customProps = _ref6.customProps;
  var deletable = R.propOr(true, 'deletable', (0, _schemaGetters.getModel)(schema, modelName));

  if (R.type(deletable) === 'Boolean') {
    return deletable;
  } else if (R.type(deletable) === 'Function') {
    return deletable({
      schema: schema,
      modelName: modelName,
      node: node,
      parentNode: parentNode,
      user: user,
      customProps: customProps
    });
  } else {
    return false;
  }
};

exports.isDeletable = isDeletable;

var isCreatable = function isCreatable(_ref7) {
  var schema = _ref7.schema,
      modelName = _ref7.modelName,
      user = _ref7.user,
      parentNode = _ref7.parentNode,
      data = _ref7.data,
      customProps = _ref7.customProps;
  var creatable = R.propOr(true, 'creatable', (0, _schemaGetters.getModel)(schema, modelName));

  if (R.type(creatable) === 'Boolean') {
    return creatable;
  } else if (R.type(creatable) === 'Function') {
    return creatable({
      schema: schema,
      modelName: modelName,
      user: user,
      parentNode: parentNode,
      data: data,
      customProps: customProps
    });
  } else {
    return false;
  }
};

exports.isCreatable = isCreatable;

var shouldDisplay = function shouldDisplay(_ref8) {
  var schema = _ref8.schema,
      modelName = _ref8.modelName,
      id = _ref8.id,
      fieldName = _ref8.fieldName,
      node = _ref8.node,
      displayCondition = _ref8.displayCondition,
      customProps = _ref8.customProps;

  if (R.type(displayCondition) === 'Boolean') {
    return displayCondition;
  } else if (R.type(displayCondition) === 'Function') {
    return displayCondition({
      schema: schema,
      modelName: modelName,
      id: id,
      fieldName: fieldName,
      node: node,
      customProps: customProps
    });
  } else {
    return true;
  }
};

exports.shouldDisplay = shouldDisplay;