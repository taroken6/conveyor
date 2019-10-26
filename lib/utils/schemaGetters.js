"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEnumChoiceOrder = exports.getEnumChoices = exports.getTooltipFields = exports.getIndexFields = exports.getDetailFields = exports.getHasIndex = exports.getCreateFields = exports.getRequiredFields = exports.getField = exports.getFields = exports.getActions = exports.getModelAttribute = exports.getModel = exports.getModelLabelPlural = exports.getModelLabel = exports.getFieldLabel = void 0;

var R = _interopRequireWildcard(require("ramda"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var getFieldLabel = function getFieldLabel(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldName = _ref.fieldName,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? {} : _ref$data;
  var displayName = R.pathOr('No Name Found', [modelName, 'fields', fieldName, 'displayName'], schema);

  if (R.type(displayName) === 'Function') {
    return displayName({
      schema: schema,
      modelName: modelName,
      data: data
    });
  }

  return displayName;
};

exports.getFieldLabel = getFieldLabel;

var getModelLabel = function getModelLabel(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      data = _ref2.data,
      props = _objectWithoutProperties(_ref2, ["schema", "modelName", "data"]);

  var displayName = R.pathOr('No Name Found', [modelName, 'displayName'], schema);

  if (R.type(displayName) === 'Function') {
    return displayName(_objectSpread({
      schema: schema,
      modelName: modelName,
      data: data
    }, props));
  }

  return displayName;
};

exports.getModelLabel = getModelLabel;

var getModelLabelPlural = function getModelLabelPlural(_ref3) {
  var schema = _ref3.schema,
      modelName = _ref3.modelName,
      data = _ref3.data,
      user = _ref3.user,
      props = _objectWithoutProperties(_ref3, ["schema", "modelName", "data", "user"]);

  var displayName = R.pathOr('No Name Found', [modelName, 'displayNamePlural'], schema);

  if (R.type(displayName) === 'Function') {
    return displayName(_objectSpread({
      schema: schema,
      modelName: modelName,
      data: data,
      user: user
    }, props));
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
      _ref4$node = _ref4.node,
      node = _ref4$node === void 0 ? {} : _ref4$node;
  var fieldOrder = R.prop('fieldOrder', getModel(schema, modelName));
  return R.filter(function (fieldName) {
    var show = R.prop(type, getField(schema, modelName, fieldName));

    if (R.type(show) === 'Function') {
      show = show({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        node: node
      });
    }

    return show;
  }, fieldOrder);
};

var getRequiredFields = function getRequiredFields(schema, modelName) {
  return getShownFields({
    schema: schema,
    modelName: modelName,
    type: 'required'
  });
};

exports.getRequiredFields = getRequiredFields;

var getCreateFields = function getCreateFields(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      user = _ref5.user,
      props = _objectWithoutProperties(_ref5, ["schema", "modelName", "user"]);

  var createFieldOrder = R.prop('createFieldOrder', getModel(schema, modelName));

  if (R.type(createFieldOrder) === 'Function') {
    return createFieldOrder(_objectSpread({
      schema: schema,
      modelName: modelName,
      user: user
    }, props));
  } else if (R.type(createFieldOrder) === 'Array') {
    return createFieldOrder;
  }

  return getShownFields({
    schema: schema,
    modelName: modelName,
    type: 'showCreate'
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
      props = _objectWithoutProperties(_ref6, ["schema", "modelName", "node"]);

  var detailFieldOrder = R.prop('detailFieldOrder', getModel(schema, modelName));

  if (R.type(detailFieldOrder) === 'Function') {
    return detailFieldOrder(_objectSpread({
      schema: schema,
      modelName: modelName,
      node: node
    }, props));
  } else if (R.type(detailFieldOrder) === 'Array') {
    return detailFieldOrder;
  }

  return getShownFields({
    schema: schema,
    modelName: modelName,
    type: 'showDetail',
    node: node
  });
};

exports.getDetailFields = getDetailFields;

var getIndexFields = function getIndexFields(_ref7) {
  var schema = _ref7.schema,
      modelName = _ref7.modelName,
      data = _ref7.data,
      user = _ref7.user,
      props = _objectWithoutProperties(_ref7, ["schema", "modelName", "data", "user"]);

  var indexFieldOrder = R.prop('indexFieldOrder', getModel(schema, modelName));

  if (R.type(indexFieldOrder) === 'Function') {
    return indexFieldOrder(_objectSpread({
      schema: schema,
      modelName: modelName,
      data: data,
      user: user
    }, props));
  } else if (R.type(indexFieldOrder) === 'Array') {
    return indexFieldOrder;
  }

  return getShownFields({
    schema: schema,
    modelName: modelName,
    type: 'showIndex'
  });
};

exports.getIndexFields = getIndexFields;

var getTooltipFields = function getTooltipFields(schema, modelName) {
  return getShownFields({
    schema: schema,
    modelName: modelName,
    type: 'showTooltip'
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