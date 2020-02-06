"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveDetail = exports.DeleteDetail = void 0;

var _react = _interopRequireDefault(require("react"));

var R = _interopRequireWildcard(require("ramda"));

var _Modal = require("../Modal");

var _isType = require("../utils/isType");

var _Utils = require("../Utils");

var _schemaGetters = require("../utils/schemaGetters");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var exclusionCondition = function exclusionCondition(key) {
  return !R.includes(key, ['__typename', 'id']);
};

var getHeaders = function getHeaders(schema, modelName, node) {
  return R.pipe(R.pickBy(function (_, key) {
    return exclusionCondition(key);
  }), R.keys())(node);
};

var getRowFields = function getRowFields(schema, modelName, node, nodeOrder) {
  var fieldDefinitions = (0, _schemaGetters.getFields)(schema, modelName);

  if (!nodeOrder) {
    nodeOrder = Object.keys(node);
  }

  var fields = nodeOrder.map(function (key) {
    var value = R.prop(key, node);
    var override = R.path([modelName, 'deleteModal', 'rows', key], schema);

    if (override) {
      return override({
        schema: schema,
        modelName: modelName,
        node: node,
        fieldName: key
      });
    }

    if (value === Object(value)) {
      var targetModel = R.path([key, 'type', 'target'], fieldDefinitions);
      return getRowFields(schema, targetModel, value);
    }

    if (exclusionCondition(key)) {
      var fieldDefinition = R.prop(key, fieldDefinitions);

      if ((0, _isType.isEnum)(fieldDefinition)) {
        return (0, _Utils.getEnumLabel)({
          schema: schema,
          modelName: modelName,
          fieldName: key,
          value: value
        });
      } else {
        return value;
      }
    }
  });
  return R.pipe(R.flatten, R.reject(function (val) {
    return val === undefined;
  }))(fields);
};

var Row = function Row(_ref) {
  var schema = _ref.schema,
      nodeModelName = _ref.nodeModelName,
      node = _ref.node,
      editedHeaderFields = _ref.editedHeaderFields;
  var fields = getRowFields(schema, nodeModelName, node, editedHeaderFields);
  return _react["default"].createElement("tr", null, fields.map(function (field, index) {
    return _react["default"].createElement("td", {
      key: index
    }, field);
  }));
};

var HeaderRow = function HeaderRow(_ref2) {
  var headers = _ref2.headers;
  return _react["default"].createElement("tr", null, headers.map(function (head, index) {
    return _react["default"].createElement("th", {
      key: index
    }, head);
  }));
};

var ReviewTable = function ReviewTable(_ref3) {
  var schema = _ref3.schema,
      table = _ref3.table,
      customProps = _ref3.customProps;
  var headers = [];
  var editedHeaderFields;

  if (!R.isEmpty(table)) {
    var node = table[0];
    var nodeModelName = R.prop('__typename', node); // get headers from schema

    var customHeaders = R.path([nodeModelName, 'deleteModal', 'headers'], schema);

    if (!customHeaders) {
      // pick fields that 'node' contains & order them by 'fieldOrder'
      var headerFields = getHeaders(schema, nodeModelName, node);
      var fieldOrder = R.propOr([], 'fieldOrder', (0, _schemaGetters.getModel)(schema, nodeModelName));
      editedHeaderFields = R.filter(R.identity, fieldOrder.map(function (field) {
        return R.includes(field, headerFields) ? field : undefined;
      }));
    } else {
      editedHeaderFields = customHeaders;
    } // turn fieldNames in to labels


    headers = editedHeaderFields.map(function (fieldName) {
      return (0, _schemaGetters.getFieldLabel)({
        schema: schema,
        modelName: nodeModelName,
        fieldName: fieldName,
        customProps: customProps
      });
    });
  }

  var tableDisplayName = (0, _schemaGetters.getModelLabel)({
    schema: schema,
    modelName: R.propOr('', '__typename', R.head(table)),
    customProps: customProps
  });
  return _react["default"].createElement("div", {
    className: "mt-2"
  }, _react["default"].createElement("h5", {
    className: "d-inline"
  }, tableDisplayName), _react["default"].createElement("table", {
    className: "table table-striped table-bordered"
  }, _react["default"].createElement("tbody", null, _react["default"].createElement(HeaderRow, {
    headers: headers
  }), table && table.map(function (node, index) {
    return _react["default"].createElement(Row, _extends({
      key: "".concat(index, "-").concat(node.id)
    }, {
      schema: schema,
      nodeModelName: R.prop('__typename', node),
      node: node,
      editedHeaderFields: editedHeaderFields
    }));
  }))));
};

var DeleteDetail = function DeleteDetail(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      id = _ref4.id,
      modalId = _ref4.modalId,
      _ref4$title = _ref4.title,
      title = _ref4$title === void 0 ? 'Confirm Delete' : _ref4$title,
      onDelete = _ref4.onDelete,
      modalData = _ref4.modalData,
      parentModelName = _ref4.parentModelName,
      parentId = _ref4.parentId,
      customProps = _ref4.customProps;
  var modalStore = R.prop('Delete', modalData);
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onCancelDelete = R.path(['delete', 'onCancelDelete'], actions);
  return _react["default"].createElement(_Modal.Modal, {
    id: modalId,
    title: title
  }, _react["default"].createElement("span", null, _react["default"].createElement("strong", null, "The following entries will be deleted:")), !modalStore && _react["default"].createElement("div", {
    className: 'text-center'
  }, "...loading"), modalStore && modalStore.map(function (table, index) {
    return _react["default"].createElement(ReviewTable, _extends({
      key: "".concat(index, "-").concat(R.propOr('', '__typename', R.head(table)))
    }, {
      schema: schema,
      table: table,
      customProps: customProps
    }));
  }), _react["default"].createElement("div", {
    className: "modal-footer justify-content-center mt-3"
  }, _react["default"].createElement("div", {
    className: "btn-group"
  }, _react["default"].createElement("button", {
    className: "btn btn-small btn-outline-secondary ",
    "data-dismiss": "modal",
    onClick: function onClick() {
      return onCancelDelete();
    }
  }, "Cancel"), _react["default"].createElement("button", {
    className: "btn btn-small btn-outline-danger ",
    "data-dismiss": "modal",
    onClick: function onClick() {
      return onDelete({
        id: id,
        parentModel: parentModelName,
        parentId: parentId,
        modelName: modelName
      });
    }
  }, "Confirm Delete"))));
};

exports.DeleteDetail = DeleteDetail;

var RemoveDetail = function RemoveDetail(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      id = _ref5.id,
      modalId = _ref5.modalId,
      _ref5$title = _ref5.title,
      title = _ref5$title === void 0 ? 'Confirm Removal' : _ref5$title,
      onRemove = _ref5.onRemove,
      parentModelName = _ref5.parentModelName,
      parentFieldName = _ref5.parentFieldName,
      parentId = _ref5.parentId,
      node = _ref5.node,
      customProps = _ref5.customProps;
  // const modalStore = R.prop('Remove', modalData)
  var name = R.path(['type', 'name'], node);
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onCancelRemove = R.path(['remove', 'onCancelRemove'], actions); // or wherever onCancelRemove is

  var parentField = (0, _schemaGetters.getFieldLabel)({
    schema: schema,
    modelName: parentModelName,
    fieldName: parentFieldName,
    customProps: customProps
  });
  console.log('parentField', parentField);
  return _react["default"].createElement(_Modal.Modal, {
    id: modalId,
    title: title
  }, _react["default"].createElement("span", null, _react["default"].createElement("strong", null, "Do you want to remove ".concat(name, " from ").concat(parentField, "?")), " Note: ".concat(name, " will not be deleted, but the relationship will be cut.")), _react["default"].createElement("div", {
    className: "modal-footer justify-content-center mt-3"
  }, _react["default"].createElement("div", {
    className: "btn-group"
  }, _react["default"].createElement("button", {
    className: "btn btn-small btn-outline-secondary ",
    "data-dismiss": "modal",
    onClick: function onClick() {
      return onCancelRemove();
    }
  }, "Cancel"), _react["default"].createElement("button", {
    className: "btn btn-small btn-outline-danger ",
    "data-dismiss": "modal",
    onClick: function onClick() {
      return onRemove({
        id: id,
        parentModel: parentModelName,
        parentId: parentId,
        modelName: modelName
      });
    }
  }, "Confirm Removal"))));
};

exports.RemoveDetail = RemoveDetail;