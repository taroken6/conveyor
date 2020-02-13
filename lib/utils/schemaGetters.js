"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSearchable = exports.getOptionsOverride = exports.getDropDownDisableCondition = exports.getCollapsable = exports.getFieldDisableCondition = exports.getFieldConditions = exports.getEnumChoiceOrder = exports.getEnumChoices = exports.getTooltipFields = exports.getIndexFields = exports.getDetailFields = exports.getSingleton = exports.getHasDetail = exports.getHasIndex = exports.getCreateFields = exports.getRequiredFields = exports.getField = exports.getFields = exports.getActions = exports.getModelAttribute = exports.getModel = exports.getModelLabelPlural = exports.getModelLabel = exports.getFieldLabel = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _Utils = require("../Utils");

var _pluralize = _interopRequireDefault(require("pluralize"));

var _consts = require("../consts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getFieldLabel = function getFieldLabel(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldName = _ref.fieldName,
      node = _ref.node,
      data = _ref.data,
      customProps = _ref.customProps;
  var displayName = R.pathOr((0, _Utils.humanize)(fieldName), [modelName, 'fields', fieldName, 'displayName'], schema);

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
      formStack = _ref2.formStack,
      customProps = _ref2.customProps;
  var defaultValue = (0, _Utils.titleize)((0, _Utils.humanize)(modelName));
  var displayName = R.pathOr(defaultValue, [modelName, 'displayName'], schema);

  if (R.type(displayName) === 'Function') {
    return displayName({
      schema: schema,
      modelName: modelName,
      node: node,
      data: data,
      formStack: formStack,
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
  var defaultValue = (0, _pluralize["default"])((0, _Utils.titleize)(modelName));
  var displayName = R.pathOr(defaultValue, [modelName, 'displayNamePlural'], schema);

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
    var show;

    switch (type) {
      case 'showCreate':
      case 'showDetail':
        show = R.propOr(!R.equals('id', fieldName), type, getField(schema, modelName, fieldName));
        break;

      case 'showIndex':
      case 'showTooltip':
        show = R.propOr(false, type, getField(schema, modelName, fieldName));
        break;

      default:
        show = R.prop(type, getField(schema, modelName, fieldName));
    }

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
      formStack = _ref5.formStack,
      user = _ref5.user,
      customProps = _ref5.customProps;
  var createFieldOrder = R.prop('createFieldOrder', getModel(schema, modelName));
  var defaultOrder = getShownFields({
    schema: schema,
    modelName: modelName,
    type: 'showCreate',
    user: user,
    customProps: customProps
  });

  if (R.type(createFieldOrder) === 'Function') {
    return createFieldOrder({
      schema: schema,
      modelName: modelName,
      formStack: formStack,
      user: user,
      defaultOrder: defaultOrder,
      customProps: customProps
    });
  } else if (R.type(createFieldOrder) === 'Array') {
    return createFieldOrder;
  }

  return defaultOrder;
};

exports.getCreateFields = getCreateFields;

var getHasIndex = function getHasIndex(schema, modelName) {
  return R.propOr(true, 'hasIndex', getModel(schema, modelName));
};

exports.getHasIndex = getHasIndex;

var getHasDetail = function getHasDetail(schema, modelName) {
  return R.propOr(true, 'hasDetail', getModel(schema, modelName));
};

exports.getHasDetail = getHasDetail;

var getSingleton = function getSingleton(schema, modelName) {
  return R.propOr(false, 'singleton', getModel(schema, modelName));
};

exports.getSingleton = getSingleton;

var getDetailFields = function getDetailFields(_ref6) {
  var schema = _ref6.schema,
      modelName = _ref6.modelName,
      node = _ref6.node,
      customProps = _ref6.customProps;
  var detailFieldOrder = R.prop('detailFieldOrder', getModel(schema, modelName));
  var defaultOrder = getShownFields({
    schema: schema,
    modelName: modelName,
    type: 'showDetail',
    node: node,
    customProps: customProps
  });

  if (R.type(detailFieldOrder) === 'Function') {
    return detailFieldOrder({
      schema: schema,
      modelName: modelName,
      node: node,
      defaultOrder: defaultOrder,
      customProps: customProps
    });
  } else if (R.type(detailFieldOrder) === 'Array') {
    return detailFieldOrder;
  }

  return defaultOrder;
};

exports.getDetailFields = getDetailFields;

var getIndexFields = function getIndexFields(_ref7) {
  var schema = _ref7.schema,
      modelName = _ref7.modelName,
      data = _ref7.data,
      user = _ref7.user,
      customProps = _ref7.customProps;
  var indexFieldOrder = R.prop('indexFieldOrder', getModel(schema, modelName));
  var defaultOrder = getShownFields({
    schema: schema,
    modelName: modelName,
    type: 'showIndex',
    data: data,
    user: user,
    customProps: customProps
  });

  if (R.type(indexFieldOrder) === 'Function') {
    return indexFieldOrder({
      schema: schema,
      modelName: modelName,
      data: data,
      user: user,
      defaultOrder: defaultOrder,
      customProps: customProps
    });
  } else if (R.type(indexFieldOrder) === 'Array') {
    return indexFieldOrder;
  }

  return defaultOrder;
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
}; // return null if no condition exists, to differentiate from boolean


exports.getFieldConditions = getFieldConditions;

var getFieldDisableCondition = function getFieldDisableCondition(schema, modelName, fieldName) {
  return R.propOr(null, 'disabled', getField(schema, modelName, fieldName));
};

exports.getFieldDisableCondition = getFieldDisableCondition;

var getCollapsable = function getCollapsable(schema, modelName, fieldName) {
  // cannot set default as false ("R.propOr(true...") because boolean always eval as true here
  var collapsable = R.prop('collapsable', getField(schema, modelName, fieldName)); // by default, all fields collapsable

  if (collapsable === undefined) {
    return true;
  }

  return collapsable;
};

exports.getCollapsable = getCollapsable;

var getDropDownDisableCondition = function getDropDownDisableCondition(schema, modelName, fieldName) {
  return R.propOr(null, 'disabledDropDown', getField(schema, modelName, fieldName));
};

exports.getDropDownDisableCondition = getDropDownDisableCondition;

var getOptionsOverride = function getOptionsOverride(_ref8) {
  var schema = _ref8.schema,
      modelName = _ref8.modelName,
      fieldName = _ref8.fieldName,
      options = _ref8.options,
      formStack = _ref8.formStack,
      value = _ref8.value,
      modelStore = _ref8.modelStore;
  var disabledDropDownCond = getDropDownDisableCondition(schema, modelName, fieldName);

  if (disabledDropDownCond) {
    options = disabledDropDownCond({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      options: options,
      formStack: formStack,
      value: value,
      modelStore: modelStore
    });
  }

  return options;
};

exports.getOptionsOverride = getOptionsOverride;

var getSearchable = function getSearchable(schema, modelName) {
  return R.propOr(false, 'searchable', getModel(schema, modelName));
};

exports.getSearchable = getSearchable;