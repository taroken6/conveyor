'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = exports.TBody = exports.TableButtonGroup = exports.showButtonColumn = exports.DeleteButton = exports.DetailViewButton = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _Header = require('./Header');

var _Utils = require('../Utils');

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

var _DetailLink = require('../DetailLink');

var _DetailLink2 = _interopRequireDefault(_DetailLink);

var _reactRouterDom = require('react-router-dom');

var _schemaGetters = require('../utils/schemaGetters');

var _DeleteDetail = require('../delete/DeleteDetail');

var _Edit = require('../Edit');

var _getDisplayValue = require('../utils/getDisplayValue');

var _getDisplayValue2 = _interopRequireDefault(_getDisplayValue);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DetailViewButton = exports.DetailViewButton = function DetailViewButton(_ref) {
  var modelName = _ref.modelName,
      id = _ref.id;
  return _react2.default.createElement(
    _reactRouterDom.Link,
    {
      to: '/' + modelName + '/' + id,
      className: 'btn btn-sm btn-outline-primary'
    },
    'View'
  );
};

var DeleteButton = exports.DeleteButton = function DeleteButton(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      id = _ref2.id,
      onDelete = _ref2.onDelete,
      modalId = _ref2.modalId,
      parentId = _ref2.parentId,
      parentModelName = _ref2.parentModelName,
      modalData = _ref2.modalData;

  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onDeleteWarning = R.path(['delete', 'onDeleteWarning'], actions);

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'button',
      {
        className: 'btn btn-sm btn-outline-danger',
        'data-toggle': 'modal',
        'data-target': '#' + modalId,
        onClick: function onClick() {
          return onDeleteWarning({ model: modelName, id: id });
        }
      },
      'Delete'
    ),
    _react2.default.createElement(_DeleteDetail.DeleteDetail, {
      schema: schema,
      id: id,
      modalId: modalId,
      title: 'Confirm Delete',
      modelName: modelName,
      onDelete: onDelete,
      parentId: parentId,
      parentModelName: parentModelName,
      modalStore: R.prop('Delete', modalData)

    })
  );
};

var showButtonColumn = exports.showButtonColumn = function showButtonColumn(_ref3) {
  var deletable = _ref3.deletable,
      editable = _ref3.editable,
      detailField = _ref3.detailField;

  /* Check if any of the possible buttons are being displayed */
  return deletable || editable || R.isNil(detailField);
};

var TableButtonGroup = exports.TableButtonGroup = function TableButtonGroup(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      node = _ref4.node,
      detailField = _ref4.detailField,
      editable = _ref4.editable,
      parentId = _ref4.parentId,
      idx = _ref4.idx,
      modalData = _ref4.modalData,
      parentModelName = _ref4.parentModelName,
      parentFieldName = _ref4.parentFieldName,
      deletable = _ref4.deletable,
      onDelete = _ref4.onDelete;

  return _react2.default.createElement(
    'div',
    { className: 'btn-group' },

    // If detailField is null then use the detailButton
    R.isNil(detailField) && _react2.default.createElement(DetailViewButton, { modelName: modelName, id: node.id }),
    editable && _react2.default.createElement(_Edit.RowEditButton, {
      schema: schema,
      modelName: modelName,
      id: node.id,
      node: node
    }),
    deletable && _react2.default.createElement(DeleteButton, {
      schema: schema,
      modelName: modelName,
      onDelete: onDelete,
      parentId: parentId,
      parentModelName: parentModelName,
      id: node.id,
      modalId: 'confirm-delete-' + modelName + parentFieldName + idx,
      modalData: modalData
    })
  );
};

var TBody = exports.TBody = function TBody(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      data = _ref5.data,
      fieldOrder = _ref5.fieldOrder,
      onDelete = _ref5.onDelete,
      onEditSubmit = _ref5.onEditSubmit,
      parentId = _ref5.parentId,
      parentModelName = _ref5.parentModelName,
      parentFieldName = _ref5.parentFieldName,
      detailField = _ref5.detailField,
      getModalStore = _ref5.getModalStore,
      tooltipData = _ref5.tooltipData,
      modalData = _ref5.modalData,
      editData = _ref5.editData,
      tableEditable = _ref5.tableEditable,
      deletable = _ref5.deletable,
      selectOptions = _ref5.selectOptions,
      props = _objectWithoutProperties(_ref5, ['schema', 'modelName', 'data', 'fieldOrder', 'onDelete', 'onEditSubmit', 'parentId', 'parentModelName', 'parentFieldName', 'detailField', 'getModalStore', 'tooltipData', 'modalData', 'editData', 'tableEditable', 'deletable', 'selectOptions']);

  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onEditCancel = R.path(['edit', 'onTableEditCancel'], actions);
  return _react2.default.createElement(
    'tbody',
    null,
    data.map(function (node, idx) {
      var editable = (0, _Utils.isRowEditable)({ schema: schema, modelName: modelName, rowData: node, ...props });
      return _react2.default.createElement(
        'tr',
        { key: 'table-tr-' + node.id },
        fieldOrder.map(function (fieldName, headerIdx) {
          if ((0, _Edit.isEditing)(editData, modelName, node.id) && (0, _Utils.isFieldEditable)({ schema: schema, modelName: modelName, fieldName: fieldName, rowData: node, ...props })) {
            var fieldEditData = (0, _Edit.getFieldEditData)(editData, modelName, fieldName, node.id);
            var error = (0, _Edit.getFieldErrorEdit)(editData, modelName, fieldName, node.id);
            return _react2.default.createElement(
              'td',
              { key: node.id + '-' + headerIdx },
              _react2.default.createElement(_Edit.EditInput, {
                schema: schema,
                modelName: modelName,
                fieldName: fieldName,
                node: node,
                editData: fieldEditData,
                error: error,
                selectOptions: selectOptions
              })
            );
          }
          var Override = (0, _Utils.getCellOverride)(schema, modelName, fieldName);
          if (Override) {
            return _react2.default.createElement(
              'td',
              { key: node.id + '-' + headerIdx },
              _react2.default.createElement(Override, { schema: schema, modelName: modelName, fieldName: fieldName, parentModelName: parentModelName, data: node, id: node.id })
            );
          }
          // Add DetailLink to the field that is marked as the displayField
          if (detailField === fieldName) {
            var displayString = (0, _getDisplayValue2.default)({ schema: schema, modelName: modelName, data: node });
            return _react2.default.createElement(
              'td',
              { key: node.id + '-' + headerIdx + '-detail' },
              _react2.default.createElement(
                _DetailLink2.default,
                { modelName: modelName, id: node.id },
                displayString
              )
            );
          }
          return _react2.default.createElement(
            'td',
            { key: node.id + '-' + headerIdx },
            _react2.default.createElement(_Field2.default, {
              schema: schema,
              modelName: modelName,
              fieldName: fieldName,
              parentModelName: parentModelName,
              node: node,
              tooltipData: tooltipData,
              id: node.id
            })
          );
        }),
        showButtonColumn({ deletable: deletable, editable: tableEditable, detailField: detailField }) && _react2.default.createElement(
          'td',
          { key: node.id + '-edit-delete' },
          (0, _Edit.isEditing)(editData, modelName, node.id) ? _react2.default.createElement(
            'div',
            { className: 'table-btn-group' },
            _react2.default.createElement(
              'div',
              { className: 'btn-group' },
              _react2.default.createElement(_Edit.EditSaveButton, {
                onClick: function onClick(evt) {
                  return onEditSubmit({ modelName: modelName, id: node.id });
                }
              }),
              _react2.default.createElement(_Edit.EditCancelButton, {
                onClick: function onClick(evt) {
                  return onEditCancel({ modelName: modelName, id: node.id });
                }
              })
            )
          ) : _react2.default.createElement(TableButtonGroup, {
            schema: schema,
            modelName: modelName,
            node: node,
            detailField: detailField,
            deletable: deletable,
            editable: editable,
            parentId: parentId,
            idx: idx,
            modalData: modalData,
            parentModelName: parentModelName,
            parentFieldName: parentFieldName,
            onDelete: onDelete
          })
        )
      );
    })
  );
};

/* Generic Overidable Table. To Override th/td pass in Table with <thead>/<tbody> component overriden. */
var Table = exports.Table = function Table(_ref6) {
  var schema = _ref6.schema,
      modelName = _ref6.modelName,
      data = _ref6.data,
      fieldOrder = _ref6.fieldOrder,
      onDelete = _ref6.onDelete,
      onEditSubmit = _ref6.onEditSubmit,
      modalData = _ref6.modalData,
      editData = _ref6.editData,
      selectOptions = _ref6.selectOptions,
      parentId = _ref6.parentId,
      parentModelName = _ref6.parentModelName,
      parentFieldName = _ref6.parentFieldName,
      tooltipData = _ref6.tooltipData,
      _ref6$Head = _ref6.Head,
      Head = _ref6$Head === undefined ? _Header.THead : _ref6$Head,
      _ref6$Body = _ref6.Body,
      Body = _ref6$Body === undefined ? TBody : _ref6$Body,
      props = _objectWithoutProperties(_ref6, ['schema', 'modelName', 'data', 'fieldOrder', 'onDelete', 'onEditSubmit', 'modalData', 'editData', 'selectOptions', 'parentId', 'parentModelName', 'parentFieldName', 'tooltipData', 'Head', 'Body']);

  if (!data) {
    return _react2.default.createElement(
      'div',
      null,
      '...Loading'
    );
  }

  if (data.length === 0) {
    return _react2.default.createElement(
      'div',
      null,
      'N/A'
    );
  }

  var model = (0, _schemaGetters.getModel)(schema, modelName);
  var schemaDefinedLinkField = R.prop('tableLinkField', model);
  var deletable = (0, _Utils.isDeletable)({ schema: schema, modelName: modelName, ...props });

  // If the schema explicitly defines a field that is not found, raise an error
  if (schemaDefinedLinkField && !fieldOrder.includes(schemaDefinedLinkField)) {
    throw new Error('Schema attribute for displayField does not exist in fieldOrder.');
  }

  // If the schema does not define a displayField then check if there is a name field
  var detailField = schemaDefinedLinkField || (fieldOrder.includes('name') ? 'name' : null);

  var editable = (0, _Utils.isTableEditable)({ schema: schema, modelName: modelName, data: data, ...props });

  return _react2.default.createElement(
    'table',
    { className: 'table table-striped table-bordered table-hover' },
    _react2.default.createElement(Head, {
      schema: schema,
      modelName: modelName,
      fieldOrder: fieldOrder,
      data: data,
      deletable: deletable,
      editable: editable,
      detailField: detailField,
      ...props
    }),
    _react2.default.createElement(Body, {
      schema: schema,
      modelName: modelName,
      data: data,
      onDelete: onDelete,
      onEditSubmit: onEditSubmit,
      fieldOrder: fieldOrder,
      detailField: detailField,
      tooltipData: tooltipData,
      parentId: parentId,
      parentModelName: parentModelName,
      parentFieldName: parentFieldName,
      modalData: modalData,
      selectOptions: selectOptions,
      editData: editData,
      deletable: deletable,
      tableEditable: editable,
      ...props
    })
  );
};