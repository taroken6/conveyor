"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFieldConditions = exports.getEnumChoiceOrder = exports.getEnumChoices = exports.getTooltipFields = exports.getIndexFields = exports.getDetailFields = exports.getHasIndex = exports.getCreateFields = exports.getRequiredFields = exports.getField = exports.getFields = exports.getActions = exports.getModelAttribute = exports.getModel = exports.getModelLabelPlural = exports.getModelLabel = exports.getFieldLabel = void 0;

var R = _interopRequireWildcard(require("ramda"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getFieldLabel = function getFieldLabel(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldName = _ref.fieldName,
      node = _ref.node,
      data = _ref.data,
      customProps = _ref.customProps;
  var displayName = R.pathOr('No Name Found', [modelName, 'fields', fieldName, 'displayName'], schema);

  if (R.type(displayName) === 'Function') {
    return displayName({
      schema: schema,
      modelName: modelName,
      node: node,
      data: data,
      customProps: customProps
    });
  }

  return displayName;
};

exports.getFieldLabel = getFieldLabel;

var getModelLabel = function getModelLabel(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      node = _ref2.node,
      data = _ref2.data,
      customProps = _ref2.customProps;
  var displayName = R.pathOr('No Name Found', [modelName, 'displayName'], schema);

  if (R.type(displayName) === 'Function') {
    return displayName({
      schema: schema,
      modelName: modelName,
      node: node,
      data: data,
      customProps: customProps
    });
  }

  return displayName;
};

exports.getModelLabel = getModelLabel;

var getModelLabelPlural = function getModelLabelPlural(_ref3) {
  var schema = _ref3.schema,
      modelName = _ref3.modelName,
      data = _ref3.data,
      user = _ref3.user,
      customProps = _ref3.customProps;
  var displayName = R.pathOr('No Name Found', [modelName, 'displayNamePlural'], schema);

  if (R.type(displayName) === 'Function') {
    return displayName({
      schema: schema,
      modelName: modelName,
      data: data,
      user: user,
      customProps: customProps
    });
  }

  return displayName;
};

exports.getModelLabelPlural = getModelLabelPlural;

var getModel = function getModel(schema, modelName) {
  return R.prop(modelName, schema);
};

exports.getModel = getModel;

var getModelAttribute = function getModelAttribute(schema, modelName, attributeName) {
  return R.pipe(getModel, R.prop(attributeName))(schema, modelName);
};

exports.getModelAttribute = getModelAttribute;

var getActions = function getActions(schema, modelName) {
  return getModelAttribute(schema, modelName, 'actions');
};

exports.getActions = getActions;

var getFields = function getFields(schema, modelName) {
  return getModelAttribute(schema, modelName, 'fields');
};

exports.getFields = getFields;

var getField = function getField(schema, modelName, fieldName) {
  return R.pipe(getFields, R.prop(fieldName))(schema, modelName);
};

exports.getField = getField;

var getShownFields = function getShownFields(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      type = _ref4.type,
      node = _ref4.node,
      data = _ref4.data,
      user = _ref4.user,
      customProps = _ref4.customProps;
  var fieldOrder = R.prop('fieldOrder', getModel(schema, modelName));
  return R.filter(function (fieldName) {
    var show = R.prop(type, getField(schema, modelName, fieldName));

    if (R.type(show) === 'Function') {
      show = show({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        node: node,
        data: data,
        user: user,
        customProps: customProps
      });
    }

    return show;
  }, fieldOrder);
};

var getRequiredFields = function getRequiredFields(schema, modelName) {
  var customProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return getShownFields({
    schema: schema,
    modelName: modelName,
    type: 'required',
    customProps: customProps
  });
};

exports.getRequiredFields = getRequiredFields;

var getCreateFields = function getCreateFields(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      user = _ref5.user,
      customProps = _ref5.customProps;
  var createFieldOrder = R.prop('createFieldOrder', getModel(schema, modelName));

  if (R.type(createFieldOrder) === 'Function') {
    return createFieldOrder({
      schema: schema,
      modelName: modelName,
      user: user,
      customProps: customProps
    });
  } else if (R.type(createFieldOrder) === 'Array') {
    return createFieldOrder;
  }

  return getShownFields({
    schema: schema,
    modelName: modelName,
    type: 'showCreate',
    user: user,
    customProps: customProps
  });
};

exports.getCreateFields = getCreateFields;

var getHasIndex = function getHasIndex(schema, modelName) {
  return R.prop('hasIndex', getModel(schema, modelName));
};

exports.getHasIndex = getHasIndex;

var getDetailFields = function getDetailFields(_ref6) {
  var schema = _ref6.schema,
      modelName = _ref6.modelName,
      node = _ref6.node,
      customProps = _ref6.customProps;
  var detailFieldOrder = R.prop('detailFieldOrder', getModel(schema, modelName));

  if (R.type(detailFieldOrder) === 'Function') {
    return detailFieldOrder({
      schema: schema,
      modelName: modelName,
      node: node,
      customProps: customProps
    });
  } else if (R.type(detailFieldOrder) === 'Array') {
    return detailFieldOrder;
  }

  return getShownFields({
    schema: schema,
    modelName: modelName,
    type: 'showDetail',
    node: node,
    customProps: customProps
  });
};

exports.getDetailFields = getDetailFields;

var getIndexFields = function getIndexFields(_ref7) {
  var schema = _ref7.schema,
      modelName = _ref7.modelName,
      data = _ref7.data,
      user = _ref7.user,
      customProps = _ref7.customProps;
  var indexFieldOrder = R.prop('indexFieldOrder', getModel(schema, modelName));

  if (R.type(indexFieldOrder) === 'Function') {
    return indexFieldOrder({
      schema: schema,
      modelName: modelName,
      data: data,
      user: user,
      customProps: customProps
    });
  } else if (R.type(indexFieldOrder) === 'Array') {
    return indexFieldOrder;
  }

  return getShownFields({
    schema: schema,
    modelName: modelName,
    type: 'showIndex',
    data: data,
    user: user,
    customProps: customProps
  });
};

exports.getIndexFields = getIndexFields;

var getTooltipFields = function getTooltipFields(schema, modelName) {
  var customProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return getShownFields({
    schema: schema,
    modelName: modelName,
    type: 'showTooltip',
    customProps: customProps
  });
};

exports.getTooltipFields = getTooltipFields;

var getEnumChoices = function getEnumChoices(schema, modelName, fieldName) {
  return R.prop('choices', getField(schema, modelName, fieldName));
};

exports.getEnumChoices = getEnumChoices;

var getEnumChoiceOrder = function getEnumChoiceOrder(schema, modelName, fieldName) {
  return R.prop('choiceOrder', getField(schema, modelName, fieldName));
};

exports.getEnumChoiceOrder = getEnumChoiceOrder;

var getFieldConditions = function getFieldConditions(schema, modelName, fieldName) {
  return R.prop('displayConditions', getField(schema, modelName, fieldName));
};

exports.getFieldConditions = getFieldConditions;