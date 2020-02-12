"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDetailFieldFooterShown = exports.isFooterShown = exports.isTableSortable = exports.isSortable = exports.isFieldDisabled = exports.shouldDisplay = exports.isCreatable = exports.isDeletable = exports.isTableDeletable = exports.isFieldEditable = exports.isRowEditable = exports.isTableEditable = exports.getEnumLabel = exports.skipOverride = exports.getIndexPageOverride = exports.getIndexTitleOverride = exports.getIndexOverride = exports.getDetailPageOverride = exports.getDetailTitleOverride = exports.getDetailOverride = exports.getCreatePageOverride = exports.getCreateTitleOverride = exports.getCreateOverride = exports.getInputOverride = exports.getDetailValueOverride = exports.getDetailLabelOverride = exports.getDetailFieldOverride = exports.getCellOverride = exports.titleize = exports.humanize = exports.trimWhitespaceBetweenWords = exports.underscoreToSpace = exports.spaceOnCapitalLetter = exports.capitalizeFirstChar = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _schemaGetters = require("./utils/schemaGetters");

var _getType = require("./utils/getType");

var _isType = require("./utils/isType");

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

var getDetailFieldOverride = function getDetailFieldOverride(schema, modelName, fieldName) {
  return R.path([modelName, 'fields', fieldName, 'components', 'detail'], schema);
};

exports.getDetailFieldOverride = getDetailFieldOverride;

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
};

exports.getInputOverride = getInputOverride;

var getCreateOverride = function getCreateOverride(schema, modelName) {
  return R.path([modelName, 'components', 'create'], schema);
};

exports.getCreateOverride = getCreateOverride;

var getCreateTitleOverride = function getCreateTitleOverride(schema, modelName) {
  return R.path([modelName, 'components', 'createTitle'], schema);
};

exports.getCreateTitleOverride = getCreateTitleOverride;

var getCreatePageOverride = function getCreatePageOverride(schema, modelName) {
  return R.path([modelName, 'components', 'createPage'], schema);
};

exports.getCreatePageOverride = getCreatePageOverride;

var getDetailOverride = function getDetailOverride(schema, modelName) {
  return R.path([modelName, 'components', 'detail'], schema);
};

exports.getDetailOverride = getDetailOverride;

var getDetailTitleOverride = function getDetailTitleOverride(schema, modelName) {
  return R.path([modelName, 'components', 'detailTitle'], schema);
};

exports.getDetailTitleOverride = getDetailTitleOverride;

var getDetailPageOverride = function getDetailPageOverride(schema, modelName) {
  return R.path([modelName, 'components', 'detailPage'], schema);
};

exports.getDetailPageOverride = getDetailPageOverride;

var getIndexOverride = function getIndexOverride(schema, modelName) {
  return R.path([modelName, 'components', 'index'], schema);
};

exports.getIndexOverride = getIndexOverride;

var getIndexTitleOverride = function getIndexTitleOverride(schema, modelName) {
  return R.path([modelName, 'components', 'indexTitle'], schema);
};

exports.getIndexTitleOverride = getIndexTitleOverride;

var getIndexPageOverride = function getIndexPageOverride(schema, modelName) {
  return R.path([modelName, 'components', 'indexPage'], schema);
}; // override component skipped only if 'null' (undefined by default)


exports.getIndexPageOverride = getIndexPageOverride;

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
      fieldOrder = _ref2.fieldOrder,
      customProps = _ref2.customProps;
  return !R.isEmpty(data.filter(function (node) {
    return isRowEditable({
      schema: schema,
      modelName: modelName,
      user: user,
      node: node,
      parentNode: parentNode,
      fieldOrder: fieldOrder,
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

  if (!fieldOrder) {
    fieldOrder = Object.keys(node);
  }

  for (var index in fieldOrder) {
    var fieldName = R.prop(index, fieldOrder);

    if (isFieldEditable({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      node: node,
      parentNode: parentNode,
      user: user,
      fieldOrder: fieldOrder,
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
}; // TODO: improve the way the disabled fields are handled, instead of directly
// holding value at ['stack', index, 'fields', 'fieldName'], hold an object
// with disabled and value key. This will also allow for other metadata to
// be held there if necessary


exports.shouldDisplay = shouldDisplay;

var isFieldDisabled = function isFieldDisabled(_ref9) {
  var schema = _ref9.schema,
      modelName = _ref9.modelName,
      fieldName = _ref9.fieldName,
      formStack = _ref9.formStack,
      customProps = _ref9.customProps;
  var stackIndex = R.prop('index', formStack);
  var stack = R.prop('stack', formStack);
  var form = R.prop(stackIndex, stack);
  var type = (0, _getType.getType)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName
  }); // check the form to see if 'disabled' flag set true

  var defaultDisable = false;

  if (type.includes('ToMany')) {
    defaultDisable = R.path(['fields', fieldName, 0, 'disabled'], form);
  } else {
    defaultDisable = R.path(['fields', fieldName, 'disabled'], form);
  } // boolean, function, or null


  var disableCondition = (0, _schemaGetters.getFieldDisableCondition)(schema, modelName, fieldName);

  if (R.type(disableCondition) === 'Function') {
    return disableCondition({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      formStack: formStack,
      defaultDisable: defaultDisable,
      customProps: customProps
    });
  }

  if (R.type(disableCondition) === 'Boolean') {
    return disableCondition;
  }

  return defaultDisable;
}; // note: should not be used w/o checking 'isTableSortable' as well (model lvl req)


exports.isFieldDisabled = isFieldDisabled;

var isSortable = function isSortable(_ref10) {
  var schema = _ref10.schema,
      modelName = _ref10.modelName,
      fieldName = _ref10.fieldName,
      user = _ref10.user;
  // first check if can sort on field level
  var fieldSortable = R.pathOr(true, [modelName, 'fields', fieldName, 'sortable'], schema);

  if (fieldSortable === false) {
    return false;
  } // repeat above if 'fieldSortable' is function


  if (R.type(fieldSortable) === 'Function' && fieldSortable({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    user: user
  }) === false) {
    return false;
  } // by default, all non-rel fields are sortable


  return !(0, _isType.isRel)((0, _schemaGetters.getField)(schema, modelName, fieldName));
};

exports.isSortable = isSortable;

var isTableSortable = function isTableSortable(_ref11) {
  var schema = _ref11.schema,
      modelName = _ref11.modelName,
      user = _ref11.user;
  // first check if can sort on model level
  var tableSortable = R.pathOr(true, [modelName, 'sortable'], schema);

  if (tableSortable === false) {
    return false;
  } // repeat above if 'tableSortable' is function


  if (R.type(tableSortable) === 'Function' && tableSortable({
    schema: schema,
    modelName: modelName,
    user: user
  }) === false) {
    return false;
  } // next, check field level sort


  var model = R.prop(modelName, schema);
  var fieldOrder = R.prop('fieldOrder', model);
  var boolList = R.map(function (fieldName) {
    return isSortable({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      user: user
    });
  }, fieldOrder);
  return !R.isEmpty(R.filter(R.identity, boolList));
}; // index, field level


exports.isTableSortable = isTableSortable;

var isFooterShown = function isFooterShown(_ref12) {
  var schema = _ref12.schema,
      modelName = _ref12.modelName,
      fieldName = _ref12.fieldName,
      user = _ref12.user;
  var fieldFooterShown = R.pathOr(false, [modelName, 'fields', fieldName, 'showFooter'], schema);

  if (fieldFooterShown === true) {
    return true;
  }

  if (R.type(fieldFooterShown) === 'Function' && fieldFooterShown({
    schema: schema,
    modelName: modelName,
    user: user
  }) === true) {
    return true;
  } // todo: get rid of 'isCurrency' here because its confusing and will return by default true (if field is currency)
  //  when in reality the schema may be saying otherwise (false); also simplify all the 'showFooter' functions
  // by default totals are shown for currency fields


  return fieldFooterShown;
}; // detail, field level


exports.isFooterShown = isFooterShown;

var isDetailFieldFooterShown = function isDetailFieldFooterShown(_ref13) {
  var schema = _ref13.schema,
      parentModelName = _ref13.parentModelName,
      parentFieldName = _ref13.parentFieldName,
      modelName = _ref13.modelName,
      fieldName = _ref13.fieldName,
      user = _ref13.user;
  var detailFooterShown = isFooterShown({
    schema: schema,
    modelName: parentModelName,
    fieldName: parentFieldName,
    user: user
  });
  if (detailFooterShown) return true;
  if (R.type(detailFooterShown) === 'Function' && detailFooterShown({
    schema: schema,
    parentModelName: parentModelName,
    parentFieldName: parentFieldName,
    modelName: modelName,
    fieldName: fieldName,
    user: user
  })) return true;
  return detailFooterShown;
};

exports.isDetailFieldFooterShown = isDetailFieldFooterShown;