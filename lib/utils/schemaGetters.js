'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEnumChoiceOrder = exports.getEnumChoices = exports.getTooltipFields = exports.getIndexFields = exports.getDetailFields = exports.getHasIndex = exports.getCreateFields = exports.getRequiredFields = exports.getField = exports.getFields = exports.getActions = exports.getModelAttribute = exports.getModel = undefined;

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var getModel = exports.getModel = function getModel(schema, modelName) {
  return R.prop(modelName, schema);
};

var getModelAttribute = exports.getModelAttribute = function getModelAttribute(schema, modelName, attributeName) {
  return R.pipe(getModel, R.prop(attributeName))(schema, modelName);
};

var getActions = exports.getActions = function getActions(schema, modelName) {
  return getModelAttribute(schema, modelName, 'actions');
};

var getFields = exports.getFields = function getFields(schema, modelName) {
  return getModelAttribute(schema, modelName, 'fields');
};

var getField = exports.getField = function getField(schema, modelName, fieldName) {
  return R.pipe(getFields, R.prop(fieldName))(schema, modelName);
};

var getShownFields = function getShownFields(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      type = _ref.type,
      _ref$node = _ref.node,
      node = _ref$node === undefined ? {} : _ref$node;

  var fieldOrder = R.prop('fieldOrder', getModel(schema, modelName));
  return R.filter(function (fieldName) {
    var show = R.prop(type, getField(schema, modelName, fieldName));
    if (R.type(show) === 'Function') {
      show = show({
        schema: schema, modelName: modelName, fieldName: fieldName, node: node
      });
    }
    return show;
  }, fieldOrder);
};

var getRequiredFields = exports.getRequiredFields = function getRequiredFields(schema, modelName) {
  return getShownFields({ schema: schema, modelName: modelName, type: 'required' });
};

var getCreateFields = exports.getCreateFields = function getCreateFields(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName;

  var createFieldOrder = R.prop('createFieldOrder', getModel(schema, modelName));
  if (R.type(createFieldOrder) === 'Function') {
    return createFieldOrder({ schema: schema, modelName: modelName });
  } else if (R.type(createFieldOrder) === 'Array') {
    return createFieldOrder;
  }
  return getShownFields({ schema: schema, modelName: modelName, type: 'showCreate' });
};

var getHasIndex = exports.getHasIndex = function getHasIndex(schema, modelName) {
  return R.prop('hasIndex', getModel(schema, modelName));
};

var getDetailFields = exports.getDetailFields = function getDetailFields(_ref3) {
  var schema = _ref3.schema,
      modelName = _ref3.modelName,
      node = _ref3.node;

  var detailFieldOrder = R.prop('detailFieldOrder', getModel(schema, modelName));
  if (R.type(detailFieldOrder) === 'Function') {
    return detailFieldOrder({ schema: schema, modelName: modelName });
  } else if (R.type(detailFieldOrder) === 'Array') {
    return detailFieldOrder;
  }return getShownFields({ schema: schema, modelName: modelName, type: 'showDetail', node: node });
};

var getIndexFields = exports.getIndexFields = function getIndexFields(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName;

  var indexFieldOrder = R.prop('indexFieldOrder', getModel(schema, modelName));
  if (R.type(indexFieldOrder) === 'Function') {
    return indexFieldOrder({ schema: schema, modelName: modelName });
  } else if (R.type(indexFieldOrder) === 'Array') {
    return indexFieldOrder;
  }return getShownFields({ schema: schema, modelName: modelName, type: 'showIndex' });
};

var getTooltipFields = exports.getTooltipFields = function getTooltipFields(schema, modelName) {
  return getShownFields({ schema: schema, modelName: modelName, type: 'showTooltip' });
};
var getEnumChoices = exports.getEnumChoices = function getEnumChoices(schema, modelName, fieldName) {
  return R.prop('choices', getField(schema, modelName, fieldName));
};

var getEnumChoiceOrder = exports.getEnumChoiceOrder = function getEnumChoiceOrder(schema, modelName, fieldName) {
  return R.prop('choiceOrder', getField(schema, modelName, fieldName));
};