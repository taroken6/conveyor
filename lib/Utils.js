'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCreatable = exports.isDeletable = exports.isFieldEditable = exports.isRowEditable = exports.isTableEditable = exports.getEnumLabel = exports.getInputOverride = exports.getDetailValueOverride = exports.getDetailLabelOverride = exports.getDetailOverride = exports.getCellOverride = exports.humanize = exports.spaceOnCapitalLetter = exports.capitalizeFirstChar = undefined;

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

var _schemaGetters = require('./utils/schemaGetters');

var _rxjs = require('rxjs');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var capitalizeFirstChar = exports.capitalizeFirstChar = function capitalizeFirstChar(str) {
  return str.replace(/^./, function (str) {
    return str.toUpperCase();
  });
};

var spaceOnCapitalLetter = exports.spaceOnCapitalLetter = function spaceOnCapitalLetter(str) {
  return str.replace(/([A-Z])/g, ' $1');
};

var humanize = exports.humanize = function humanize(str) {
  return R.pipe(spaceOnCapitalLetter, capitalizeFirstChar)(str);
};

var getCellOverride = exports.getCellOverride = function getCellOverride(schema, modelName, fieldName) {
  return R.path([modelName, 'fields', fieldName, 'components', 'cell'], schema);
};

var getDetailOverride = exports.getDetailOverride = function getDetailOverride(schema, modelName, fieldName) {
  return R.path([modelName, 'fields', fieldName, 'components', 'detail'], schema);
};

var getDetailLabelOverride = exports.getDetailLabelOverride = function getDetailLabelOverride(schema, modelName, fieldName) {
  return R.path([modelName, 'fields', fieldName, 'components', 'detailLabel'], schema);
};

var getDetailValueOverride = exports.getDetailValueOverride = function getDetailValueOverride(schema, modelName, fieldName) {
  return R.path([modelName, 'fields', fieldName, 'components', 'detailValue'], schema);
};

var getInputOverride = exports.getInputOverride = function getInputOverride(schema, modelName, fieldName) {
  return R.path([modelName, 'fields', fieldName, 'components', 'input'], schema);
};

var getEnumLabel = exports.getEnumLabel = function getEnumLabel(_ref) {
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

var isTableEditable = exports.isTableEditable = function isTableEditable(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      data = _ref2.data,
      props = _objectWithoutProperties(_ref2, ['schema', 'modelName', 'data']);

  return !R.isEmpty(data.filter(function (rowData) {
    return isRowEditable({ schema: schema, modelName: modelName, rowData: rowData, ...props });
  }));
};

var isRowEditable = exports.isRowEditable = function isRowEditable(_ref3) {
  var schema = _ref3.schema,
      modelName = _ref3.modelName,
      rowData = _ref3.rowData,
      props = _objectWithoutProperties(_ref3, ['schema', 'modelName', 'rowData']);

  return R.pipe(R.mapObjIndexed(function (_value, fieldName) {
    return isFieldEditable({ schema: schema, modelName: modelName, fieldName: fieldName, rowData: rowData, ...props });
  }), R.filter(_rxjs.identity), function (filteredNode) {
    return !R.isEmpty(filteredNode);
  })(rowData);
};

var isFieldEditable = exports.isFieldEditable = function isFieldEditable(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      fieldName = _ref4.fieldName,
      props = _objectWithoutProperties(_ref4, ['schema', 'modelName', 'fieldName']);

  var editable = R.prop('editable', (0, _schemaGetters.getField)(schema, modelName, fieldName));
  if (R.type(editable) === 'Boolean') {
    return editable;
  } else if (R.type(editable) === 'Function') {
    return editable({ schema: schema, modelName: modelName, ...props });
  } else {
    return false;
  }
};

var isDeletable = exports.isDeletable = function isDeletable(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      props = _objectWithoutProperties(_ref5, ['schema', 'modelName']);

  var deletable = R.prop('deletable', (0, _schemaGetters.getModel)(schema, modelName));
  if (R.type(deletable) === 'Boolean') {
    return deletable;
  } else if (R.type(deletable) === 'Function') {
    return deletable({ schema: schema, modelName: modelName, ...props });
  } else {
    return false;
  }
};

var isCreatable = exports.isCreatable = function isCreatable(_ref6) {
  var schema = _ref6.schema,
      modelName = _ref6.modelName,
      props = _objectWithoutProperties(_ref6, ['schema', 'modelName']);

  var creatable = R.prop('creatable', (0, _schemaGetters.getModel)(schema, modelName));
  if (R.type(creatable) === 'Boolean') {
    return creatable;
  } else if (R.type(creatable) === 'Function') {
    return creatable({ schema: schema, modelName: modelName, ...props });
  } else {
    return false;
  }
};