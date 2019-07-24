'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailFields = exports.partitionDetailFields = exports.DefaultDetailTable = exports.DefaultDetailO2MTableTitle = exports.DefaultDetailTableTitleWrapper = exports.DetailCreateButton = exports.DefaultDetailAttribute = exports.DefaultDetailLabel = exports.getModelLabel = exports.getFieldLabel = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

var _Table = require('./table/Table');

var _isType = require('./utils/isType');

var _Field = require('./table/Field');

var _Field2 = _interopRequireDefault(_Field);

var _Utils = require('./Utils');

var _schemaGetters = require('./utils/schemaGetters');

var _Tabs = require('./Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _getType = require('./utils/getType');

var _CreateButton = require('./CreateButton');

var _CreateButton2 = _interopRequireDefault(_CreateButton);

var _Edit = require('./Edit');

var _Popover = require('./Popover');

var _getDisplayValue = require('./utils/getDisplayValue');

var _getDisplayValue2 = _interopRequireDefault(_getDisplayValue);

var _Input = require('./form/Input');

var _Input2 = _interopRequireDefault(_Input);

var _reactRouterDom = require('react-router-dom');

require('../css/index.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var getFieldLabel = exports.getFieldLabel = function getFieldLabel(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldName = _ref.fieldName,
      _ref$data = _ref.data,
      data = _ref$data === undefined ? {} : _ref$data;

  var displayName = R.pathOr('No Name Found', [modelName, 'fields', fieldName, 'displayName'], schema);
  if (R.type(displayName) === 'Function') {
    return displayName({ schema: schema, modelName: modelName, data: data });
  }
  return displayName;
};

var getModelLabel = exports.getModelLabel = function getModelLabel(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      data = _ref2.data;

  var displayName = R.pathOr('No Name Found', [modelName, 'displayName'], schema);
  if (R.type(displayName) === 'Function') {
    return displayName({ schema: schema, modelName: modelName, data: data });
  }
  return displayName;
};

var LabelInfoPopover = function LabelInfoPopover(_ref3) {
  var LabelInfoComponent = _ref3.LabelInfoComponent,
      fieldLabel = _ref3.fieldLabel;
  return _react2.default.createElement(_Popover.Popover, {
    Content: _react2.default.createElement(
      _Popover.PopoverContent,
      null,
      _react2.default.createElement(LabelInfoComponent, null)
    ),
    labelValue: fieldLabel
  });
};

var DefaultDetailLabel = exports.DefaultDetailLabel = function DefaultDetailLabel(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      fieldName = _ref4.fieldName,
      data = _ref4.data;

  var LabelInfoComponent = R.path(['components', 'labelInfo'], (0, _schemaGetters.getField)(schema, modelName, fieldName));
  var fieldLabel = getFieldLabel({ schema: schema, modelName: modelName, fieldName: fieldName, data: data });
  if (LabelInfoComponent) {
    return _react2.default.createElement(LabelInfoPopover, { LabelInfoComponent: LabelInfoComponent, fieldLabel: fieldLabel });
  }
  return _react2.default.createElement(
    'span',
    null,
    fieldLabel
  );
};

var DefaultDetailAttribute = exports.DefaultDetailAttribute = function DefaultDetailAttribute(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      fieldName = _ref5.fieldName,
      node = _ref5.node,
      editData = _ref5.editData,
      tooltipData = _ref5.tooltipData,
      selectOptions = _ref5.selectOptions,
      id = _ref5.id,
      path = _ref5.path,
      props = _objectWithoutProperties(_ref5, ['schema', 'modelName', 'fieldName', 'node', 'editData', 'tooltipData', 'selectOptions', 'id', 'path']);

  var actions = (0, _schemaGetters.getActions)(schema, modelName);

  var DetailLabel = (0, _Utils.getDetailLabelOverride)(schema, modelName, fieldName) || DefaultDetailLabel;
  var DetailValue = (0, _Utils.getDetailValueOverride)(schema, modelName, fieldName) || _Field2.default;

  var editable = (0, _Utils.isFieldEditable)({ schema: schema, modelName: modelName, fieldName: fieldName, rowData: node, id: id, ...props });

  if ((0, _Edit.isFieldEditing)(editData, modelName, node.id, fieldName) !== false) {
    var fieldType = R.prop('type', (0, _schemaGetters.getField)(schema, modelName, fieldName));
    var onEditCancelClick = R.path(['edit', 'onAttributeEditCancel'], actions);
    var onEditSubmitClick = R.path(['edit', 'onDetailAttributeSubmit'], actions);
    var onFileSubmit = R.path(['edit', 'onFileSubmit'], actions);

    var fieldEditData = (0, _Edit.getFieldEditData)(editData, modelName, fieldName, node.id);
    var creatable = (0, _Utils.isCreatable)({ schema: schema, modelName: modelName, ...props });
    var targetInverseFieldName = R.prop('backref', fieldType);
    var targetModelName = R.prop('target', fieldType);
    var error = (0, _Edit.getFieldErrorEdit)(editData, modelName, fieldName, node.id);

    return _react2.default.createElement(
      _react2.default.Fragment,
      null,
      _react2.default.createElement(
        'dt',
        { className: 'col-sm-3 text-sm-right' },
        _react2.default.createElement(DetailLabel, { schema: schema, modelName: modelName, fieldName: fieldName, data: node })
      ),
      _react2.default.createElement(
        'dd',
        { className: 'col-sm-9' },
        _react2.default.createElement(_Edit.InlineInput, {
          schema: schema,
          modelName: modelName,
          fieldName: fieldName,
          node: node,
          editData: fieldEditData,
          error: error,
          selectOptions: selectOptions
        }),
        _react2.default.createElement(
          'div',
          { className: 'inline-btn-group' },
          _react2.default.createElement(_Edit.EditSaveButton, {
            onClick: fieldType === 'file' ? function (evt) {
              return onFileSubmit({ modelName: modelName, fieldName: fieldName, id: id });
            } : function (evt) {
              return onEditSubmitClick({ modelName: modelName, fieldName: fieldName, id: id });
            }
          }),
          _react2.default.createElement(_Edit.EditCancelButton, {
            onClick: function onClick(evt) {
              return onEditCancelClick({ modelName: modelName, id: id, fieldName: fieldName });
            },
            modelName: modelName,
            id: id
          }),
          R.type(fieldType) === 'Object' && creatable && _react2.default.createElement(DetailCreateButton, {
            schema: schema,
            modelName: modelName,
            targetInverseFieldName: targetInverseFieldName,
            targetModelName: targetModelName,
            path: path,
            node: node
          })
        )
      )
    );
  } else {
    var onEdit = R.path(['edit', 'onAttributeEdit'], actions);
    return _react2.default.createElement(
      _react2.default.Fragment,
      null,
      _react2.default.createElement(
        'dt',
        { className: 'col-sm-3 text-sm-right' },
        _react2.default.createElement(DetailLabel, { schema: schema, modelName: modelName, fieldName: fieldName, data: node })
      ),
      _react2.default.createElement(
        'dd',
        { className: 'col-sm-9' },
        _react2.default.createElement(DetailValue, {
          schema: schema, modelName: modelName, fieldName: fieldName, node: node, id: id, tooltipData: tooltipData
        }),
        editable && _react2.default.createElement(_Edit.InlineEditButton, {
          onEditClick: function onEditClick(evt) {
            return onEdit({
              modelName: modelName,
              fieldName: fieldName,
              id: id,
              value: R.prop(fieldName, node)
            });
          }
        })
      )
    );
  }
};

var DetailCreateButton = exports.DetailCreateButton = function DetailCreateButton(_ref6) {
  var schema = _ref6.schema,
      modelName = _ref6.modelName,
      targetModelName = _ref6.targetModelName,
      path = _ref6.path,
      targetInverseFieldName = _ref6.targetInverseFieldName,
      node = _ref6.node;

  var onCreateClick = R.path(['create', 'onDetailCreate'], (0, _schemaGetters.getActions)(schema, targetModelName));

  var onClick = function onClick() {
    return onCreateClick({
      modelName: targetModelName,
      path: path,
      targetInverseFieldName: targetInverseFieldName,
      node: node
    });
  };
  return _react2.default.createElement(_CreateButton2.default, { onClick: onClick });
};

var DefaultDetailTableTitleWrapper = exports.DefaultDetailTableTitleWrapper = function DefaultDetailTableTitleWrapper(_ref7) {
  var children = _ref7.children;

  return _react2.default.createElement(
    'div',
    { style: { marginBottom: '10px' } },
    _react2.default.createElement(
      'h4',
      { className: 'd-inline' },
      children
    )
  );
};

var DefaultDetailO2MTableTitle = exports.DefaultDetailO2MTableTitle = function DefaultDetailO2MTableTitle(_ref8) {
  var schema = _ref8.schema,
      modelName = _ref8.modelName,
      fieldName = _ref8.fieldName,
      targetInverseFieldName = _ref8.targetInverseFieldName,
      targetModelName = _ref8.targetModelName,
      path = _ref8.path,
      node = _ref8.node,
      props = _objectWithoutProperties(_ref8, ['schema', 'modelName', 'fieldName', 'targetInverseFieldName', 'targetModelName', 'path', 'node']);

  var creatable = (0, _Utils.isCreatable)({ schema: schema, modelName: targetModelName, node: node, ...props });

  return _react2.default.createElement(
    DefaultDetailTableTitleWrapper,
    null,
    _react2.default.createElement(DefaultDetailLabel, { schema: schema, modelName: modelName, fieldName: fieldName, data: node }),
    creatable && _react2.default.createElement(DetailCreateButton, {
      schema: schema,
      modelName: modelName,
      targetModelName: targetModelName,
      path: path,
      targetInverseFieldName: targetInverseFieldName,
      node: node
    })
  );
};

var DefaultDetailM2MTableTitle = function DefaultDetailM2MTableTitle(_ref9) {
  var schema = _ref9.schema,
      modelName = _ref9.modelName,
      id = _ref9.id,
      fieldName = _ref9.fieldName,
      node = _ref9.node,
      targetInverseFieldName = _ref9.targetInverseFieldName,
      path = _ref9.path,
      targetModelName = _ref9.targetModelName,
      props = _objectWithoutProperties(_ref9, ['schema', 'modelName', 'id', 'fieldName', 'node', 'targetInverseFieldName', 'path', 'targetModelName']);

  var editable = (0, _Utils.isFieldEditable)({ schema: schema, modelName: modelName, fieldName: fieldName, ...props });
  return _react2.default.createElement(
    'div',
    { style: { marginBottom: '10px' } },
    _react2.default.createElement(
      'h4',
      { className: 'd-inline' },
      getFieldLabel({ schema: schema, modelName: modelName, fieldName: fieldName, data: node, ...props })
    ),
    editable && _react2.default.createElement(
      'div',
      { className: 'pl-2 d-inline' },
      _react2.default.createElement(_Edit.TableEditButton, {
        schema: schema,
        modelName: modelName,
        id: id,
        fieldName: fieldName,
        targetInverseFieldName: targetInverseFieldName,
        node: node,
        path: path,
        targetModelName: targetModelName
      })
    )
  );
};

var DefaultDetailTable = exports.DefaultDetailTable = function DefaultDetailTable(_ref10) {
  var schema = _ref10.schema,
      modelName = _ref10.modelName,
      id = _ref10.id,
      fieldName = _ref10.fieldName,
      node = _ref10.node,
      path = _ref10.path,
      editData = _ref10.editData,
      selectOptions = _ref10.selectOptions,
      tooltipData = _ref10.tooltipData,
      props = _objectWithoutProperties(_ref10, ['schema', 'modelName', 'id', 'fieldName', 'node', 'path', 'editData', 'selectOptions', 'tooltipData']);

  var fieldType = R.path([modelName, 'fields', fieldName, 'type'], schema);
  var targetInverseFieldName = R.prop('backref', fieldType);
  var targetModelName = R.prop('target', fieldType);
  var data = R.propOr(null, fieldName, node);
  var fieldOrder = R.path([modelName, 'fields', fieldName, 'type', 'tableFields'], schema);
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onDelete = R.path(['delete', 'onDetailDelete'], actions);
  var _onEditSubmit = R.path(['edit', 'onDetailTableEditSubmit'], actions);
  var type = (0, _getType.getType)({ schema: schema, modelName: modelName, fieldName: fieldName });

  if (!data) {
    return _react2.default.createElement(
      'div',
      { className: 'container' },
      'Loading...'
    );
  }

  var DetailValue = (0, _Utils.getDetailValueOverride)(schema, modelName, fieldName) || _Table.Table;

  if (type.includes('OneToMany')) {
    var DetailLabel = (0, _Utils.getDetailLabelOverride)(schema, modelName, fieldName) || DefaultDetailO2MTableTitle;
    return _react2.default.createElement(
      _react2.default.Fragment,
      { key: 'Fragment-' + id + '-' + targetModelName + '-' + fieldName },
      _react2.default.createElement(
        DetailLabel,
        {
          schema: schema,
          modelName: modelName,
          fieldName: fieldName,
          targetInverseFieldName: targetInverseFieldName,
          node: node,
          id: id,
          path: path,
          targetModelName: targetModelName,
          ...props
        },
        getFieldLabel({ schema: schema, modelName: modelName, fieldName: fieldName, data: node })
      ),
      _react2.default.createElement(DetailValue, _extends({
        key: 'Table-' + id + '-' + targetModelName + '-' + fieldName
      }, {
        schema: schema,
        parentId: id,
        parentModelName: modelName,
        parentFieldName: fieldName,
        modelName: targetModelName,
        editData: editData,
        selectOptions: selectOptions,
        tooltipData: tooltipData,
        node: node,
        data: data,
        onDelete: onDelete,
        onEditSubmit: function onEditSubmit(_ref11) {
          var props = _objectWithoutProperties(_ref11, []);

          return _onEditSubmit({
            parentModelName: modelName,
            parentId: id,
            ...props
          });
        },
        fieldOrder: fieldOrder,
        ...props
      }))
    );
  } else if (type === 'ManyToMany') {
    if ((0, _Edit.isFieldEditing)(editData, modelName, id, fieldName)) {
      var _actions = (0, _schemaGetters.getActions)(schema, modelName);
      var onEditInputChange = R.path(['edit', 'onEditInputChange'], _actions);
      var onSaveClick = R.path(['edit', 'onDetailAttributeSubmit'], _actions);
      var onCancelClick = R.path(['edit', 'onAttributeEditCancel'], _actions);
      var onDetailCreate = R.path(['create', 'onDetailCreate'], _actions);

      var onClick = function onClick() {
        return onDetailCreate({
          modelName: targetModelName,
          path: path,
          targetInverseFieldName: targetInverseFieldName,
          node: node
        });
      };
      var DetailRelLabel = (0, _Input.relationshipLabelFactory)({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        onClick: onClick,
        ...props
      });

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(_Input2.default, {
          schema: schema,
          modelName: modelName,
          fieldName: fieldName,
          value: (0, _Edit.getFieldEditData)(editData, modelName, fieldName, id),
          error: (0, _Edit.getFieldErrorEdit)(editData, modelName, fieldName, id),
          selectOptions: selectOptions,
          customLabel: DetailRelLabel,
          onChange: function onChange(_ref12) {
            var props = _objectWithoutProperties(_ref12, []);

            return onEditInputChange({
              id: id,
              modelName: modelName,
              ...props
            });
          }
        }),
        _react2.default.createElement(
          'div',
          { className: 'table-btn-padding' },
          _react2.default.createElement(_Edit.EditSaveButton, {
            onClick: function onClick(evt) {
              return onSaveClick({
                modelName: modelName,
                id: id,
                fieldName: fieldName
              });
            }
          }),
          _react2.default.createElement(_Edit.EditCancelButton, {
            onClick: function onClick(evt) {
              return onCancelClick({
                modelName: modelName,
                id: id,
                fieldName: fieldName
              });
            }
          })
        )
      );
    }

    var _DetailLabel = (0, _Utils.getDetailLabelOverride)(schema, modelName, fieldName) || DefaultDetailM2MTableTitle;
    return _react2.default.createElement(
      _react2.default.Fragment,
      { key: 'Fragment-' + id + '-' + targetModelName + '-' + fieldName },
      _react2.default.createElement(_DetailLabel, { schema: schema,
        modelName: modelName,
        id: id,
        fieldName: fieldName,
        node: node,
        targetInverseFieldName: targetInverseFieldName,
        path: path,
        targetModelName: targetModelName,
        ...props
      }),
      _react2.default.createElement(DetailValue, _extends({
        key: 'Table-' + id + '-' + targetModelName + '-' + fieldName
      }, {
        schema: schema,
        parentId: id,
        parentModelName: modelName,
        parentFieldName: fieldName,
        modelName: targetModelName,
        editData: editData,
        selectOptions: selectOptions,
        data: data,
        onDelete: onDelete,
        onEditSubmit: function onEditSubmit(_ref13) {
          var props = _objectWithoutProperties(_ref13, []);

          return _onEditSubmit({
            parentModelName: modelName,
            parentId: id,
            ...props
          });
        },
        fieldOrder: fieldOrder,
        ...props
      }))
    );
  }
};

var partitionDetailFields = exports.partitionDetailFields = function partitionDetailFields(_ref14) {
  var schema = _ref14.schema,
      modelName = _ref14.modelName,
      node = _ref14.node,
      _ref14$include = _ref14.include,
      include = _ref14$include === undefined ? null : _ref14$include;

  var detailFields = (0, _schemaGetters.getDetailFields)({ schema: schema, modelName: modelName, node: node });

  if (include) {
    detailFields = detailFields.filter(function (fieldName) {
      return R.includes(fieldName, include);
    });
  }
  return R.partition(function (fieldName) {
    var detailAttribute = R.prop('detailAttribute', (0, _schemaGetters.getField)(schema, modelName, fieldName));
    if (!R.isNil(detailAttribute)) {
      return !detailAttribute;
    }
    return (0, _isType.isOneToMany)(R.path([modelName, 'fields', fieldName], schema)) || (0, _isType.isManyToMany)(R.path([modelName, 'fields', fieldName], schema));
  }, detailFields);
};

var DefaultDetailPageTitle = function DefaultDetailPageTitle(_ref15) {
  var schema = _ref15.schema,
      modelName = _ref15.modelName,
      node = _ref15.node,
      modalData = _ref15.modalData,
      props = _objectWithoutProperties(_ref15, ['schema', 'modelName', 'node', 'modalData']);

  var model = getModelLabel({ schema: schema, modelName: modelName, data: node });
  var label = (0, _getDisplayValue2.default)({ schema: schema, modelName: modelName, data: node });
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onDelete = R.path(['delete', 'onDetailDeleteFromDetailPage'], actions);
  var HeaderLink = (0, _schemaGetters.getHasIndex)(schema, modelName) ? _react2.default.createElement(
    _reactRouterDom.Link,
    { to: '/' + modelName },
    model
  ) : model;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h2',
      { className: 'd-inline' },
      HeaderLink,
      ':',
      _react2.default.createElement(
        'b',
        null,
        ' ',
        label
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'float-right' },
      _react2.default.createElement(_Table.DeleteButton, {
        schema: schema,
        modelName: modelName,
        id: node.id,
        onDelete: onDelete,
        modalId: 'confirm-delete-' + modelName,
        modalData: modalData })
    )
  );
};

var DetailFields = exports.DetailFields = function DetailFields(_ref16) {
  var schema = _ref16.schema,
      modelName = _ref16.modelName,
      id = _ref16.id,
      node = _ref16.node,
      tableFields = _ref16.tableFields,
      descriptionList = _ref16.descriptionList,
      editData = _ref16.editData,
      tooltipData = _ref16.tooltipData,
      selectOptions = _ref16.selectOptions,
      path = _ref16.path,
      props = _objectWithoutProperties(_ref16, ['schema', 'modelName', 'id', 'node', 'tableFields', 'descriptionList', 'editData', 'tooltipData', 'selectOptions', 'path']);

  if (!node) {
    return _react2.default.createElement(
      'div',
      { className: 'container' },
      'Loading...'
    );
  }

  if (!tableFields && !descriptionList) {
    var _partitionDetailField = partitionDetailFields({ schema: schema, modelName: modelName, node: node });

    var _partitionDetailField2 = _slicedToArray(_partitionDetailField, 2);

    tableFields = _partitionDetailField2[0];
    descriptionList = _partitionDetailField2[1];
  }

  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement(
      'dl',
      { className: 'row' },
      descriptionList.map(function (fieldName) {
        var DetailAttribute = (0, _Utils.getDetailOverride)(schema, modelName, fieldName) || DefaultDetailAttribute;
        return _react2.default.createElement(DetailAttribute, _extends({ key: 'DetailAttribute-' + id + '-' + modelName + '-' + fieldName
        }, {
          schema: schema,
          modelName: modelName,
          fieldName: fieldName,
          node: node,
          selectOptions: selectOptions,
          editData: editData,
          path: path,
          tooltipData: tooltipData,
          id: id,
          ...props
        }));
      })
    ),
    tableFields.map(function (fieldName) {
      var DetailTable = (0, _Utils.getDetailOverride)(schema, modelName, fieldName) || DefaultDetailTable;
      return _react2.default.createElement(DetailTable, _extends({
        key: 'DetailTable-' + id + '-' + modelName + '-' + fieldName
      }, {
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        selectOptions: selectOptions,
        tooltipData: tooltipData,
        node: node,
        editData: editData,
        path: path,
        id: id,
        ...props
      }));
    })
  );
};

var Wrapper = function Wrapper(_ref17) {
  var children = _ref17.children;
  return _react2.default.createElement(
    'div',
    { className: 'container' },
    _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(
        'div',
        { className: 'col' },
        children
      )
    )
  );
};

var Detail = function Detail(_ref18) {
  var schema = _ref18.schema,
      modelName = _ref18.modelName,
      id = _ref18.id,
      node = _ref18.node,
      modalData = _ref18.modalData,
      editData = _ref18.editData,
      path = _ref18.path,
      match = _ref18.match,
      tooltipData = _ref18.tooltipData,
      _ref18$Title = _ref18.Title,
      Title = _ref18$Title === undefined ? DefaultDetailPageTitle : _ref18$Title,
      props = _objectWithoutProperties(_ref18, ['schema', 'modelName', 'id', 'node', 'modalData', 'editData', 'path', 'match', 'tooltipData', 'Title']);

  if (!node) {
    return _react2.default.createElement(
      'div',
      { className: 'container' },
      'Loading...'
    );
  }

  if (R.prop('result', node) === null) {
    return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/' + modelName });
  }

  var tabs = (0, _schemaGetters.getModelAttribute)(schema, modelName, 'tabs');

  if (tabs && tabs.length > 0) {
    return _react2.default.createElement(
      Wrapper,
      null,
      _react2.default.createElement(Title, { schema: schema, modelName: modelName, node: node, modalData: modalData }),
      _react2.default.createElement(_Tabs2.default, {
        schema: schema,
        modelName: modelName,
        id: id,
        node: node,
        modalData: modalData,
        editData: editData,
        tooltipData: tooltipData,
        match: match,
        tabs: tabs,
        path: path,
        fields: [],
        ...props
      })
    );
  }

  return _react2.default.createElement(
    Wrapper,
    null,
    _react2.default.createElement(Title, { schema: schema, modelName: modelName, node: node, modalData: modalData }),
    _react2.default.createElement(DetailFields, { schema: schema, modelName: modelName, id: id, node: node, modalData: modalData, editData: editData, tooltipData: tooltipData, path: path, ...props })
  );
};

exports.default = Detail;