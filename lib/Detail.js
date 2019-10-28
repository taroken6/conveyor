"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DetailFields = exports.partitionDetailFields = exports.DefaultDetailTable = exports.DefaultDetailO2MTableTitle = exports.DefaultDetailTableTitleWrapper = exports.DetailCreateButton = exports.DefaultDetailAttribute = exports.DefaultDetailLabel = void 0;

var _react = _interopRequireDefault(require("react"));

var R = _interopRequireWildcard(require("ramda"));

var _Table = require("./table/Table");

var _isType = require("./utils/isType");

var _Field = _interopRequireWildcard(require("./table/Field"));

var _Utils = require("./Utils");

var _schemaGetters = require("./utils/schemaGetters");

var _Tabs = _interopRequireDefault(require("./Tabs"));

var _getType = require("./utils/getType");

var _CreateButton = _interopRequireDefault(require("./CreateButton"));

var _Edit = require("./Edit");

var _Popover = require("./Popover");

var _getDisplayValue = _interopRequireDefault(require("./utils/getDisplayValue"));

var _Input = _interopRequireDefault(require("./form/Input"));

var _reactRouterDom = require("react-router-dom");

require("../css/index.css");

var _consts = require("./consts");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var LabelInfoPopover = function LabelInfoPopover(_ref) {
  var LabelInfoComponent = _ref.LabelInfoComponent,
      fieldLabel = _ref.fieldLabel;
  return _react["default"].createElement(_Popover.Popover, {
    Content: _react["default"].createElement(_Popover.PopoverContent, null, _react["default"].createElement(LabelInfoComponent, null)),
    labelValue: fieldLabel
  });
};

var DefaultDetailLabel = function DefaultDetailLabel(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      fieldName = _ref2.fieldName,
      data = _ref2.data;
  var LabelInfoComponent = R.path(['components', 'labelInfo'], (0, _schemaGetters.getField)(schema, modelName, fieldName));

  if ((0, _Utils.skipOverride)(LabelInfoComponent)) {
    return null;
  }

  var fieldLabel = (0, _schemaGetters.getFieldLabel)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    data: data
  });

  if (LabelInfoComponent) {
    return _react["default"].createElement(LabelInfoPopover, {
      LabelInfoComponent: LabelInfoComponent,
      fieldLabel: fieldLabel
    });
  }

  return _react["default"].createElement("span", null, fieldLabel);
};

exports.DefaultDetailLabel = DefaultDetailLabel;

var DefaultDetailAttribute = function DefaultDetailAttribute(_ref3) {
  var schema = _ref3.schema,
      modelName = _ref3.modelName,
      fieldName = _ref3.fieldName,
      node = _ref3.node,
      editData = _ref3.editData,
      tooltipData = _ref3.tooltipData,
      selectOptions = _ref3.selectOptions,
      id = _ref3.id,
      path = _ref3.path,
      props = _objectWithoutProperties(_ref3, ["schema", "modelName", "fieldName", "node", "editData", "tooltipData", "selectOptions", "id", "path"]);

  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var LabelOverride = (0, _Utils.getDetailLabelOverride)(schema, modelName, fieldName);
  var ValueOverride = (0, _Utils.getDetailValueOverride)(schema, modelName, fieldName);
  var DetailLabel = LabelOverride || DefaultDetailLabel;
  var DetailValue = ValueOverride || _Field["default"];
  var editable = (0, _Utils.isFieldEditable)(_objectSpread({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    node: node,
    id: id
  }, props));
  var fieldType = R.prop('type', (0, _schemaGetters.getField)(schema, modelName, fieldName));

  if ((0, _Utils.skipOverride)(LabelOverride) && (0, _Utils.skipOverride)(ValueOverride)) {
    return null;
  }

  if ((0, _Edit.isFieldEditing)(editData, modelName, node.id, fieldName) !== false) {
    var relSchemaEntry = (0, _Field.getRelSchemaEntry)({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName
    });
    var relModelName = R.prop('modelName', relSchemaEntry);
    var onEditCancelClick = R.path(['edit', 'onAttributeEditCancel'], actions);
    var onEditSubmitClick = R.path(['edit', 'onDetailAttributeSubmit'], actions);
    var onFileSubmit = R.path(['edit', 'onFileSubmit'], actions);
    var fieldEditData = (0, _Edit.getFieldEditData)(editData, modelName, fieldName, node.id);
    var creatable = (0, _Utils.isCreatable)(_objectSpread({
      schema: schema,
      modelName: relModelName,
      parentNode: node
    }, props));
    var targetInverseFieldName = R.prop('backref', fieldType);
    var targetModelName = R.prop('target', fieldType);
    var error = (0, _Edit.getFieldErrorEdit)(editData, modelName, fieldName, node.id);
    return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("dt", {
      className: "col-sm-3 text-sm-right"
    }, (0, _Utils.skipOverride)(LabelOverride) ? null : _react["default"].createElement(DetailLabel, {
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      data: node
    })), _react["default"].createElement("dd", {
      className: "col-sm-9"
    }, _react["default"].createElement(_Edit.InlineInput, {
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      node: node,
      editData: fieldEditData,
      error: error,
      selectOptions: selectOptions
    }), _react["default"].createElement("div", {
      className: "inline-btn-group"
    }, _react["default"].createElement(_Edit.EditSaveButton, {
      onClick: fieldType === 'file' ? function (evt) {
        return onFileSubmit({
          modelName: modelName,
          fieldName: fieldName,
          id: id
        });
      } : function (evt) {
        return onEditSubmitClick({
          modelName: modelName,
          fieldName: fieldName,
          id: id
        });
      }
    }), _react["default"].createElement(_Edit.EditCancelButton, {
      onClick: function onClick(evt) {
        return onEditCancelClick({
          modelName: modelName,
          id: id,
          fieldName: fieldName
        });
      },
      modelName: modelName,
      id: id
    }), R.type(fieldType) === 'Object' && creatable && _react["default"].createElement(DetailCreateButton, {
      schema: schema,
      modelName: modelName,
      targetInverseFieldName: targetInverseFieldName,
      targetModelName: targetModelName,
      path: path,
      node: node
    }))));
  } else {
    var onEdit = R.path(['edit', 'onAttributeEdit'], actions);

    var _onFileDelete = R.path(['delete', 'onFileDelete'], actions);

    var isFileType = fieldType === _consts.inputTypes.FILE_TYPE;
    var hasValue = R.propOr(false, fieldName, node);
    return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("dt", {
      className: "col-sm-3 text-sm-right"
    }, (0, _Utils.skipOverride)(LabelOverride) ? null : _react["default"].createElement(DetailLabel, {
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      data: node
    })), _react["default"].createElement("dd", {
      className: "col-sm-9"
    }, (0, _Utils.skipOverride)(ValueOverride) ? null : _react["default"].createElement(DetailValue, {
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      node: node,
      id: id,
      tooltipData: tooltipData
    }), editable && _react["default"].createElement(_Edit.InlineEditButton, {
      onEditClick: function onEditClick(evt) {
        return onEdit({
          modelName: modelName,
          fieldName: fieldName,
          id: id,
          value: R.prop(fieldName, node)
        });
      }
    }), editable && isFileType && hasValue && _react["default"].createElement(_Edit.FileDelete, {
      id: id,
      fieldName: fieldName,
      onFileDelete: function onFileDelete() {
        return _onFileDelete({
          modelName: modelName,
          fieldName: fieldName,
          id: id
        });
      }
    })));
  }
};

exports.DefaultDetailAttribute = DefaultDetailAttribute;

var DetailCreateButton = function DetailCreateButton(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      targetModelName = _ref4.targetModelName,
      path = _ref4.path,
      targetInverseFieldName = _ref4.targetInverseFieldName,
      node = _ref4.node;
  var onCreateClick = R.path(['create', 'onDetailCreate'], (0, _schemaGetters.getActions)(schema, targetModelName));

  var onClick = function onClick() {
    return onCreateClick({
      modelName: targetModelName,
      path: path,
      targetInverseFieldName: targetInverseFieldName,
      node: node
    });
  };

  return _react["default"].createElement(_CreateButton["default"], {
    onClick: onClick
  });
};

exports.DetailCreateButton = DetailCreateButton;

var DefaultDetailTableTitleWrapper = function DefaultDetailTableTitleWrapper(_ref5) {
  var children = _ref5.children;
  return _react["default"].createElement("div", {
    style: {
      marginBottom: '10px'
    }
  }, _react["default"].createElement("h4", {
    className: "d-inline"
  }, children));
};

exports.DefaultDetailTableTitleWrapper = DefaultDetailTableTitleWrapper;

var DefaultDetailO2MTableTitle = function DefaultDetailO2MTableTitle(_ref6) {
  var schema = _ref6.schema,
      modelName = _ref6.modelName,
      fieldName = _ref6.fieldName,
      targetInverseFieldName = _ref6.targetInverseFieldName,
      targetModelName = _ref6.targetModelName,
      path = _ref6.path,
      node = _ref6.node,
      props = _objectWithoutProperties(_ref6, ["schema", "modelName", "fieldName", "targetInverseFieldName", "targetModelName", "path", "node"]);

  var creatable = (0, _Utils.isCreatable)(_objectSpread({
    schema: schema,
    modelName: targetModelName,
    parentNode: node
  }, props));
  return _react["default"].createElement(DefaultDetailTableTitleWrapper, null, _react["default"].createElement(DefaultDetailLabel, {
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    data: node
  }), creatable && _react["default"].createElement(DetailCreateButton, {
    schema: schema,
    modelName: modelName,
    targetModelName: targetModelName,
    path: path,
    targetInverseFieldName: targetInverseFieldName,
    node: node
  }));
};

exports.DefaultDetailO2MTableTitle = DefaultDetailO2MTableTitle;

var DefaultDetailM2MTableTitle = function DefaultDetailM2MTableTitle(_ref7) {
  var schema = _ref7.schema,
      modelName = _ref7.modelName,
      id = _ref7.id,
      fieldName = _ref7.fieldName,
      node = _ref7.node,
      targetInverseFieldName = _ref7.targetInverseFieldName,
      path = _ref7.path,
      targetModelName = _ref7.targetModelName,
      props = _objectWithoutProperties(_ref7, ["schema", "modelName", "id", "fieldName", "node", "targetInverseFieldName", "path", "targetModelName"]);

  var editable = (0, _Utils.isFieldEditable)(_objectSpread({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    node: node
  }, props));
  return _react["default"].createElement("div", {
    style: {
      marginBottom: '10px'
    }
  }, _react["default"].createElement("h4", {
    className: "d-inline"
  }, (0, _schemaGetters.getFieldLabel)(_objectSpread({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    data: node
  }, props))), editable && _react["default"].createElement("div", {
    className: "pl-2 d-inline"
  }, _react["default"].createElement(_Edit.TableEditButton, {
    schema: schema,
    modelName: modelName,
    id: id,
    fieldName: fieldName,
    targetInverseFieldName: targetInverseFieldName,
    node: node,
    path: path,
    targetModelName: targetModelName
  })));
};

var DefaultDetailM2MFieldLabel = function DefaultDetailM2MFieldLabel(_ref8) {
  var schema = _ref8.schema,
      modelName = _ref8.modelName,
      fieldName = _ref8.fieldName,
      node = _ref8.node,
      targetInverseFieldName = _ref8.targetInverseFieldName,
      path = _ref8.path,
      targetModelName = _ref8.targetModelName,
      props = _objectWithoutProperties(_ref8, ["schema", "modelName", "fieldName", "node", "targetInverseFieldName", "path", "targetModelName"]);

  var creatable = (0, _Utils.isCreatable)(_objectSpread({
    schema: schema,
    modelName: targetModelName
  }, props));
  var required = R.prop('required', (0, _schemaGetters.getField)(schema, modelName, fieldName));

  var Label = function Label() {
    return _react["default"].createElement("div", {
      style: {
        marginBottom: '10px'
      }
    }, _react["default"].createElement("h4", {
      className: "d-inline"
    }, (0, _schemaGetters.getFieldLabel)(_objectSpread({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      data: node
    }, props))), required && ' *', creatable && _react["default"].createElement(DetailCreateButton, {
      schema: schema,
      modelName: modelName,
      targetModelName: targetModelName,
      path: path,
      targetInverseFieldName: targetInverseFieldName,
      node: node
    }));
  };

  return Label;
};

var DefaultDetailTable = function DefaultDetailTable(_ref9) {
  var schema = _ref9.schema,
      modelName = _ref9.modelName,
      id = _ref9.id,
      fieldName = _ref9.fieldName,
      node = _ref9.node,
      path = _ref9.path,
      editData = _ref9.editData,
      selectOptions = _ref9.selectOptions,
      tooltipData = _ref9.tooltipData,
      props = _objectWithoutProperties(_ref9, ["schema", "modelName", "id", "fieldName", "node", "path", "editData", "selectOptions", "tooltipData"]);

  var fieldType = R.path([modelName, 'fields', fieldName, 'type'], schema);
  var targetInverseFieldName = R.prop('backref', fieldType);
  var targetModelName = R.prop('target', fieldType);
  var data = R.propOr(null, fieldName, node);
  var fieldOrder = R.path([modelName, 'fields', fieldName, 'type', 'tableFields'], schema);
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onDelete = R.path(['delete', 'onDetailDelete'], actions);

  var _onEditSubmit = R.path(['edit', 'onDetailTableEditSubmit'], actions);

  var type = (0, _getType.getType)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName
  });

  if (!data) {
    return _react["default"].createElement("div", {
      className: "container"
    }, "Loading...");
  }

  var ValueOverride = (0, _Utils.getDetailValueOverride)(schema, modelName, fieldName);
  var DetailValue = ValueOverride || _Table.Table;

  if (type.includes('OneToMany')) {
    var LabelOverride = (0, _Utils.getDetailLabelOverride)(schema, modelName, fieldName);
    var DetailLabel = LabelOverride || DefaultDetailO2MTableTitle;
    return _react["default"].createElement(_react["default"].Fragment, {
      key: "Fragment-".concat(id, "-").concat(targetModelName, "-").concat(fieldName)
    }, (0, _Utils.skipOverride)(LabelOverride) ? null : _react["default"].createElement(DetailLabel, _objectSpread({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      targetInverseFieldName: targetInverseFieldName,
      node: node,
      id: id,
      path: path,
      targetModelName: targetModelName
    }, props), (0, _schemaGetters.getFieldLabel)({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      data: node
    })), (0, _Utils.skipOverride)(ValueOverride) ? null : _react["default"].createElement(DetailValue, _extends({
      key: "Table-".concat(id, "-").concat(targetModelName, "-").concat(fieldName)
    }, _objectSpread({
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
      onEditSubmit: function onEditSubmit(_ref10) {
        var props = _extends({}, _ref10);

        return _onEditSubmit(_objectSpread({
          parentModelName: modelName,
          parentId: id
        }, props));
      },
      fieldOrder: fieldOrder
    }, props))));
  } else if (type === 'ManyToMany') {
    if ((0, _Edit.isFieldEditing)(editData, modelName, id, fieldName)) {
      var _actions = (0, _schemaGetters.getActions)(schema, modelName);

      var onEditInputChange = R.path(['edit', 'onEditInputChange'], _actions);
      var onSaveClick = R.path(['edit', 'onDetailAttributeSubmit'], _actions);
      var onCancelClick = R.path(['edit', 'onAttributeEditCancel'], _actions);

      var _LabelOverride2 = (0, _Utils.getDetailLabelOverride)(schema, modelName, fieldName);

      var _DetailLabel2 = _LabelOverride2 || DefaultDetailM2MFieldLabel(_objectSpread({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        node: node,
        targetInverseFieldName: targetInverseFieldName,
        path: path,
        targetModelName: targetModelName
      }, props));

      return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_Input["default"], {
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        value: (0, _Edit.getFieldEditData)(editData, modelName, fieldName, id),
        error: (0, _Edit.getFieldErrorEdit)(editData, modelName, fieldName, id),
        selectOptions: selectOptions,
        customLabel: _DetailLabel2,
        onChange: function onChange(_ref11) {
          var props = _extends({}, _ref11);

          return onEditInputChange(_objectSpread({
            id: id,
            modelName: modelName
          }, props));
        },
        node: node
      }), _react["default"].createElement("div", {
        className: "table-btn-padding"
      }, _react["default"].createElement(_Edit.EditSaveButton, {
        onClick: function onClick(evt) {
          return onSaveClick({
            modelName: modelName,
            id: id,
            fieldName: fieldName
          });
        }
      }), _react["default"].createElement(_Edit.EditCancelButton, {
        onClick: function onClick(evt) {
          return onCancelClick({
            modelName: modelName,
            id: id,
            fieldName: fieldName
          });
        }
      })));
    }

    var _LabelOverride = (0, _Utils.getDetailLabelOverride)(schema, modelName, fieldName);

    var _DetailLabel = _LabelOverride || DefaultDetailM2MTableTitle;

    if ((0, _Utils.skipOverride)(_LabelOverride) && (0, _Utils.skipOverride)(ValueOverride)) {
      return null;
    }

    return _react["default"].createElement(_react["default"].Fragment, {
      key: "Fragment-".concat(id, "-").concat(targetModelName, "-").concat(fieldName)
    }, (0, _Utils.skipOverride)(_LabelOverride) ? null : _react["default"].createElement(_DetailLabel, _objectSpread({
      schema: schema,
      modelName: modelName,
      id: id,
      fieldName: fieldName,
      node: node,
      targetInverseFieldName: targetInverseFieldName,
      path: path,
      targetModelName: targetModelName
    }, props)), (0, _Utils.skipOverride)(ValueOverride) ? null : _react["default"].createElement(DetailValue, _extends({
      key: "Table-".concat(id, "-").concat(targetModelName, "-").concat(fieldName)
    }, _objectSpread({
      schema: schema,
      parentId: id,
      parentModelName: modelName,
      parentFieldName: fieldName,
      modelName: targetModelName,
      editData: editData,
      selectOptions: selectOptions,
      data: data,
      onDelete: onDelete,
      onEditSubmit: function onEditSubmit(_ref12) {
        var props = _extends({}, _ref12);

        return _onEditSubmit(_objectSpread({
          parentModelName: modelName,
          parentId: id
        }, props));
      },
      fieldOrder: fieldOrder
    }, props))));
  }
};

exports.DefaultDetailTable = DefaultDetailTable;

var partitionDetailFields = function partitionDetailFields(_ref13) {
  var schema = _ref13.schema,
      modelName = _ref13.modelName,
      node = _ref13.node,
      _ref13$include = _ref13.include,
      include = _ref13$include === void 0 ? null : _ref13$include;
  var detailFields = (0, _schemaGetters.getDetailFields)({
    schema: schema,
    modelName: modelName,
    node: node
  });

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

exports.partitionDetailFields = partitionDetailFields;

var DefaultDetailPageTitle = function DefaultDetailPageTitle(_ref14) {
  var schema = _ref14.schema,
      modelName = _ref14.modelName,
      node = _ref14.node,
      modalData = _ref14.modalData,
      props = _objectWithoutProperties(_ref14, ["schema", "modelName", "node", "modalData"]);

  var model = (0, _schemaGetters.getModelLabel)({
    schema: schema,
    modelName: modelName,
    data: node
  });
  var label = (0, _getDisplayValue["default"])({
    schema: schema,
    modelName: modelName,
    data: node
  });
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onDelete = R.path(['delete', 'onDetailDeleteFromDetailPage'], actions);
  var HeaderLink = (0, _schemaGetters.getHasIndex)(schema, modelName) ? _react["default"].createElement(_reactRouterDom.Link, {
    to: '/' + modelName
  }, model) : model;
  return _react["default"].createElement("div", null, _react["default"].createElement("h2", {
    className: "d-inline"
  }, HeaderLink, ":", _react["default"].createElement("b", null, " ", label)), (0, _Utils.isDeletable)(_objectSpread({
    schema: schema,
    modelName: modelName,
    node: node
  }, props)) && _react["default"].createElement("div", {
    className: "float-right"
  }, _react["default"].createElement(_Table.DeleteButton, {
    schema: schema,
    modelName: modelName,
    id: node.id,
    onDelete: onDelete,
    modalId: 'confirm-delete-' + modelName,
    modalData: modalData
  })));
};

var DetailFields = function DetailFields(_ref15) {
  var schema = _ref15.schema,
      modelName = _ref15.modelName,
      id = _ref15.id,
      node = _ref15.node,
      tableFields = _ref15.tableFields,
      descriptionList = _ref15.descriptionList,
      editData = _ref15.editData,
      tooltipData = _ref15.tooltipData,
      selectOptions = _ref15.selectOptions,
      path = _ref15.path,
      props = _objectWithoutProperties(_ref15, ["schema", "modelName", "id", "node", "tableFields", "descriptionList", "editData", "tooltipData", "selectOptions", "path"]);

  if (!node) {
    return _react["default"].createElement("div", {
      className: "container"
    }, "Loading...");
  }

  if (!tableFields && !descriptionList) {
    var _partitionDetailField = partitionDetailFields({
      schema: schema,
      modelName: modelName,
      node: node
    });

    var _partitionDetailField2 = _slicedToArray(_partitionDetailField, 2);

    tableFields = _partitionDetailField2[0];
    descriptionList = _partitionDetailField2[1];
  }

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("dl", {
    className: "row"
  }, descriptionList.map(function (fieldName) {
    var override = (0, _Utils.getDetailOverride)(schema, modelName, fieldName);

    if ((0, _Utils.skipOverride)(override)) {
      return null;
    }

    var DetailAttribute = override || DefaultDetailAttribute;
    return _react["default"].createElement(DetailAttribute, _extends({
      key: "DetailAttribute-".concat(id, "-").concat(modelName, "-").concat(fieldName)
    }, _objectSpread({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      node: node,
      selectOptions: selectOptions,
      editData: editData,
      path: path,
      tooltipData: tooltipData,
      id: id
    }, props)));
  })), tableFields.map(function (fieldName) {
    var override = (0, _Utils.getDetailOverride)(schema, modelName, fieldName);

    if ((0, _Utils.skipOverride)(override)) {
      return null;
    }

    var DetailTable = override || DefaultDetailTable;
    return _react["default"].createElement(DetailTable, _extends({
      key: "DetailTable-".concat(id, "-").concat(modelName, "-").concat(fieldName)
    }, _objectSpread({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      selectOptions: selectOptions,
      tooltipData: tooltipData,
      node: node,
      editData: editData,
      path: path,
      id: id
    }, props)));
  }));
};

exports.DetailFields = DetailFields;

var Wrapper = function Wrapper(_ref16) {
  var children = _ref16.children;
  return _react["default"].createElement("div", {
    className: "container"
  }, _react["default"].createElement("div", {
    className: "row"
  }, _react["default"].createElement("div", {
    className: "col"
  }, children)));
};

var Detail = function Detail(_ref17) {
  var schema = _ref17.schema,
      modelName = _ref17.modelName,
      id = _ref17.id,
      node = _ref17.node,
      modalData = _ref17.modalData,
      editData = _ref17.editData,
      path = _ref17.path,
      match = _ref17.match,
      tooltipData = _ref17.tooltipData,
      _ref17$Title = _ref17.Title,
      Title = _ref17$Title === void 0 ? DefaultDetailPageTitle : _ref17$Title,
      props = _objectWithoutProperties(_ref17, ["schema", "modelName", "id", "node", "modalData", "editData", "path", "match", "tooltipData", "Title"]);

  if (!node) {
    return _react["default"].createElement("div", {
      className: "container"
    }, "Loading...");
  }

  if (R.prop('result', node) === null) {
    return _react["default"].createElement(_reactRouterDom.Redirect, {
      to: "/".concat(modelName)
    });
  }

  var tabs = (0, _schemaGetters.getModelAttribute)(schema, modelName, 'tabs');

  if (tabs && tabs.length > 0) {
    return _react["default"].createElement(Wrapper, null, _react["default"].createElement(Title, _objectSpread({
      schema: schema,
      modelName: modelName,
      node: node,
      modalData: modalData
    }, props)), _react["default"].createElement(_Tabs["default"], _objectSpread({
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
      fields: []
    }, props)));
  }

  return _react["default"].createElement(Wrapper, null, _react["default"].createElement(Title, _objectSpread({
    schema: schema,
    modelName: modelName,
    node: node,
    modalData: modalData
  }, props)), _react["default"].createElement(DetailFields, _objectSpread({
    schema: schema,
    modelName: modelName,
    id: id,
    node: node,
    modalData: modalData,
    editData: editData,
    tooltipData: tooltipData,
    path: path
  }, props)));
};

var _default = Detail;
exports["default"] = _default;