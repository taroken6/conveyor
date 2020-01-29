"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DetailFields = exports.partitionDetailFields = exports.DefaultDetailTable = exports.DefaultDetailO2MTableTitle = exports.DefaultDetailTableTitleWrapper = exports.DetailCreateButton = exports.DefaultDetailAttribute = exports.DefaultDetailLabel = exports.CollapseTableButton = void 0;

var _react = _interopRequireDefault(require("react"));

var R = _interopRequireWildcard(require("ramda"));

var _Table = require("./table/Table");

var _isType = require("./utils/isType");

var _Field = _interopRequireWildcard(require("./table/Field"));

var _Utils = require("./Utils");

var _schemaGetters = require("./utils/schemaGetters");

var _Tabs = require("./Tabs");

var _getType = require("./utils/getType");

var _CreateButton = _interopRequireDefault(require("./CreateButton"));

var _Edit = require("./Edit");

var _Popover = require("./Popover");

var _getDisplayValue = _interopRequireDefault(require("./utils/getDisplayValue"));

var _Input = _interopRequireDefault(require("./form/Input"));

var _reactRouterDom = require("react-router-dom");

require("../css/index.css");

var _consts = require("./consts");

var _reactSvg = _interopRequireDefault(require("react-svg"));

var _DeleteDetail = require("./delete/DeleteDetail");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var LabelInfoPopover = function LabelInfoPopover(_ref) {
  var LabelInfoComponent = _ref.LabelInfoComponent,
      fieldLabel = _ref.fieldLabel;
  return _react["default"].createElement(_Popover.Popover, {
    Content: _react["default"].createElement(_Popover.PopoverContent, null, _react["default"].createElement(LabelInfoComponent, null)),
    labelValue: fieldLabel
  });
};

var CollapseTableButton = function CollapseTableButton(_ref2) {
  var modelName = _ref2.modelName,
      fieldName = _ref2.fieldName,
      id = _ref2.id,
      collapse = _ref2.collapse,
      hideTableChange = _ref2.hideTableChange;
  var image = collapse ? 'angle-right' : 'angle-down';
  return _react["default"].createElement(_reactSvg["default"], {
    src: "/static/img/".concat(image, ".svg"),
    className: "hide-icon-".concat(collapse ? 'angle-right' : 'angle-down'),
    onClick: function onClick() {
      return hideTableChange({
        modelName: modelName,
        fieldName: fieldName,
        id: id,
        collapse: collapse
      });
    },
    svgStyle: {
      width: '20px',
      height: '20px',
      fill: 'black'
    }
  });
};

exports.CollapseTableButton = CollapseTableButton;

var DefaultDetailLabel = function DefaultDetailLabel(_ref3) {
  var schema = _ref3.schema,
      modelName = _ref3.modelName,
      fieldName = _ref3.fieldName,
      node = _ref3.node,
      customProps = _ref3.customProps;
  var LabelInfoComponent = R.path(['components', 'labelInfo'], (0, _schemaGetters.getField)(schema, modelName, fieldName));

  if ((0, _Utils.skipOverride)(LabelInfoComponent)) {
    return null;
  }

  var fieldLabel = (0, _schemaGetters.getFieldLabel)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    node: node,
    customProps: customProps
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

var DefaultDetailAttribute = function DefaultDetailAttribute(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      fieldName = _ref4.fieldName,
      node = _ref4.node,
      editData = _ref4.editData,
      tooltipData = _ref4.tooltipData,
      selectOptions = _ref4.selectOptions,
      modelStore = _ref4.modelStore,
      id = _ref4.id,
      path = _ref4.path,
      user = _ref4.user,
      customProps = _ref4.customProps;
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var LabelOverride = (0, _Utils.getDetailLabelOverride)(schema, modelName, fieldName);
  var ValueOverride = (0, _Utils.getDetailValueOverride)(schema, modelName, fieldName);
  var DetailLabel = LabelOverride || DefaultDetailLabel;
  var DetailValue = ValueOverride || _Field["default"];
  var editable = (0, _Utils.isFieldEditable)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    node: node,
    user: user,
    customProps: customProps
  });
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
    var creatable = (0, _Utils.isCreatable)({
      schema: schema,
      modelName: relModelName,
      parentNode: node,
      user: user,
      customProps: customProps
    });
    var targetInverseFieldName = R.prop('backref', fieldType);
    var targetModelName = R.prop('target', fieldType);
    var error = (0, _Edit.getFieldErrorEdit)(editData, modelName, fieldName, node.id);
    return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("dt", {
      className: "col-sm-3 text-sm-right"
    }, (0, _Utils.skipOverride)(LabelOverride) ? null : _react["default"].createElement(DetailLabel, {
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      node: node,
      customProps: customProps
    })), _react["default"].createElement("dd", {
      className: "col-sm-9"
    }, _react["default"].createElement("div", {
      className: "detail-edit d-inline-block pull-left"
    }, _react["default"].createElement(_Edit.EditInput, {
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      node: node,
      editData: fieldEditData,
      error: error,
      selectOptions: selectOptions,
      modelStore: modelStore
    })), _react["default"].createElement("div", {
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
      node: node,
      customProps: customProps
    })), _react["default"].createElement("dd", {
      className: "col-sm-9"
    }, (0, _Utils.skipOverride)(ValueOverride) ? null : _react["default"].createElement(DetailValue, {
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      node: node,
      id: id,
      tooltipData: tooltipData,
      customProps: customProps
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

var DetailCreateButton = function DetailCreateButton(_ref5) {
  var schema = _ref5.schema,
      targetModelName = _ref5.targetModelName,
      path = _ref5.path,
      targetInverseFieldName = _ref5.targetInverseFieldName,
      node = _ref5.node;
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

var DefaultDetailTableTitleWrapper = function DefaultDetailTableTitleWrapper(_ref6) {
  var children = _ref6.children;
  return _react["default"].createElement("div", {
    style: {
      marginBottom: '10px'
    }
  }, _react["default"].createElement("h4", {
    className: "d-inline"
  }, children));
};

exports.DefaultDetailTableTitleWrapper = DefaultDetailTableTitleWrapper;

var DefaultDetailO2MTableTitle = function DefaultDetailO2MTableTitle(_ref7) {
  var schema = _ref7.schema,
      modelName = _ref7.modelName,
      fieldName = _ref7.fieldName,
      id = _ref7.id,
      targetInverseFieldName = _ref7.targetInverseFieldName,
      targetModelName = _ref7.targetModelName,
      path = _ref7.path,
      node = _ref7.node,
      user = _ref7.user,
      collapsable = _ref7.collapsable,
      collapse = _ref7.collapse,
      hideTableChange = _ref7.hideTableChange,
      customProps = _ref7.customProps;
  var creatable = (0, _Utils.isCreatable)({
    schema: schema,
    modelName: targetModelName,
    parentNode: node,
    user: user,
    customProps: customProps
  });
  return _react["default"].createElement(DefaultDetailTableTitleWrapper, null, collapsable && _react["default"].createElement(CollapseTableButton, {
    modelName: modelName,
    fieldName: fieldName,
    id: id,
    collapse: collapse,
    hideTableChange: hideTableChange
  }), _react["default"].createElement(DefaultDetailLabel, {
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    node: node,
    customProps: customProps
  }), creatable && _react["default"].createElement(DetailCreateButton, {
    schema: schema,
    targetModelName: targetModelName,
    path: path,
    targetInverseFieldName: targetInverseFieldName,
    node: node
  }));
};

exports.DefaultDetailO2MTableTitle = DefaultDetailO2MTableTitle;

var DefaultDetailM2MTableTitle = function DefaultDetailM2MTableTitle(_ref8) {
  var schema = _ref8.schema,
      modelName = _ref8.modelName,
      id = _ref8.id,
      fieldName = _ref8.fieldName,
      node = _ref8.node,
      targetInverseFieldName = _ref8.targetInverseFieldName,
      path = _ref8.path,
      targetModelName = _ref8.targetModelName,
      user = _ref8.user,
      collapsable = _ref8.collapsable,
      collapse = _ref8.collapse,
      hideTableChange = _ref8.hideTableChange,
      customProps = _ref8.customProps;
  var editable = (0, _Utils.isFieldEditable)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    node: node,
    user: user,
    customProps: customProps
  });
  return _react["default"].createElement("div", {
    style: {
      marginBottom: '10px'
    }
  }, _react["default"].createElement("h4", {
    className: "d-inline"
  }, collapsable && _react["default"].createElement(CollapseTableButton, {
    modelName: modelName,
    fieldName: fieldName,
    id: id,
    collapse: collapse,
    hideTableChange: hideTableChange
  }), (0, _schemaGetters.getFieldLabel)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    node: node,
    customProps: customProps
  })), editable && _react["default"].createElement("div", {
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

var DefaultDetailM2MFieldLabel = function DefaultDetailM2MFieldLabel(_ref9) {
  var schema = _ref9.schema,
      modelName = _ref9.modelName,
      fieldName = _ref9.fieldName,
      node = _ref9.node,
      targetInverseFieldName = _ref9.targetInverseFieldName,
      path = _ref9.path,
      targetModelName = _ref9.targetModelName,
      user = _ref9.user,
      customProps = _ref9.customProps;
  var creatable = (0, _Utils.isCreatable)({
    schema: schema,
    modelName: targetModelName,
    user: user,
    parentNode: node,
    customProps: customProps
  });
  var required = R.prop('required', (0, _schemaGetters.getField)(schema, modelName, fieldName));

  var Label = function Label() {
    return _react["default"].createElement("div", {
      style: {
        marginBottom: '10px'
      }
    }, _react["default"].createElement("h4", {
      className: "d-inline"
    }, (0, _schemaGetters.getFieldLabel)({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      node: node,
      customProps: customProps
    })), required && ' *', creatable && _react["default"].createElement(DetailCreateButton, {
      schema: schema,
      targetModelName: targetModelName,
      path: path,
      targetInverseFieldName: targetInverseFieldName,
      node: node
    }));
  };

  return Label;
};

var DefaultDetailTable = function DefaultDetailTable(_ref10) {
  var schema = _ref10.schema,
      modelName = _ref10.modelName,
      id = _ref10.id,
      fieldName = _ref10.fieldName,
      node = _ref10.node,
      path = _ref10.path,
      editData = _ref10.editData,
      selectOptions = _ref10.selectOptions,
      modelStore = _ref10.modelStore,
      tooltipData = _ref10.tooltipData,
      user = _ref10.user,
      tableView = _ref10.tableView,
      modalData = _ref10.modalData,
      customProps = _ref10.customProps;
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
  var collapse = R.path([modelName, 'fields', fieldName, 'collapse'], tableView);
  var hideTableChange = R.path(['tableOptions', 'hideTableChange'], actions);
  var collapsable = (0, _schemaGetters.getCollapsable)(schema, modelName, fieldName);

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
    }, (0, _Utils.skipOverride)(LabelOverride) ? null : _react["default"].createElement(DetailLabel, {
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      id: id,
      targetInverseFieldName: targetInverseFieldName,
      node: node,
      path: path,
      targetModelName: targetModelName,
      user: user,
      collapsable: collapsable,
      collapse: collapse,
      hideTableChange: hideTableChange,
      customProps: customProps
    }), (0, _Utils.skipOverride)(ValueOverride) ? null : _react["default"].createElement(DetailValue, _extends({
      key: "Table-".concat(id, "-").concat(targetModelName, "-").concat(fieldName)
    }, {
      schema: schema,
      parentId: id,
      parentModelName: modelName,
      parentFieldName: fieldName,
      modelName: targetModelName,
      editData: editData,
      selectOptions: selectOptions,
      modelStore: modelStore,
      tooltipData: tooltipData,
      node: node,
      data: data,
      onDelete: onDelete,
      onEditSubmit: function onEditSubmit(_ref11) {
        var props = _extends({}, _ref11);

        return _onEditSubmit(_objectSpread({
          parentModelName: modelName,
          parentId: id
        }, props));
      },
      fieldOrder: fieldOrder,
      user: user,
      tableView: tableView,
      collapse: collapse,
      modalData: modalData,
      customProps: customProps
    })));
  } else if (type === 'ManyToMany') {
    if ((0, _Edit.isFieldEditing)(editData, modelName, id, fieldName)) {
      var _actions = (0, _schemaGetters.getActions)(schema, modelName);

      var onEditInputChange = R.path(['edit', 'onEditInputChange'], _actions);
      var onSaveClick = R.path(['edit', 'onDetailAttributeSubmit'], _actions);
      var onCancelClick = R.path(['edit', 'onAttributeEditCancel'], _actions);

      var _LabelOverride2 = (0, _Utils.getDetailLabelOverride)(schema, modelName, fieldName);

      var _DetailLabel2 = _LabelOverride2 || DefaultDetailM2MFieldLabel({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        node: node,
        targetInverseFieldName: targetInverseFieldName,
        path: path,
        targetModelName: targetModelName,
        user: user,
        customProps: customProps
      });

      return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_Input["default"], {
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        node: node,
        value: (0, _Edit.getFieldEditData)(editData, modelName, fieldName, id),
        error: (0, _Edit.getFieldErrorEdit)(editData, modelName, fieldName, id),
        selectOptions: selectOptions,
        modelStore: modelStore,
        customLabel: _DetailLabel2,
        onChange: function onChange(_ref12) {
          var props = _extends({}, _ref12);

          return onEditInputChange(_objectSpread({
            id: id,
            modelName: modelName
          }, props));
        },
        customProps: customProps
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
    }, (0, _Utils.skipOverride)(_LabelOverride) ? null : _react["default"].createElement(_DetailLabel, {
      schema: schema,
      modelName: modelName,
      id: id,
      fieldName: fieldName,
      node: node,
      targetInverseFieldName: targetInverseFieldName,
      path: path,
      targetModelName: targetModelName,
      user: user,
      collapsable: collapsable,
      collapse: collapse,
      hideTableChange: hideTableChange,
      customProps: customProps
    }), (0, _Utils.skipOverride)(ValueOverride) ? null : _react["default"].createElement(DetailValue, _extends({
      key: "Table-".concat(id, "-").concat(targetModelName, "-").concat(fieldName)
    }, {
      schema: schema,
      parentId: id,
      parentModelName: modelName,
      parentFieldName: fieldName,
      modelName: targetModelName,
      editData: editData,
      selectOptions: selectOptions,
      modelStore: modelStore,
      tooltipData: tooltipData,
      node: node,
      data: data,
      onDelete: onDelete,
      onEditSubmit: function onEditSubmit(_ref13) {
        var props = _extends({}, _ref13);

        return _onEditSubmit(_objectSpread({
          parentModelName: modelName,
          parentId: id
        }, props));
      },
      fieldOrder: fieldOrder,
      user: user,
      tableView: tableView,
      collapse: collapse,
      modalData: modalData
    })));
  }
};

exports.DefaultDetailTable = DefaultDetailTable;

var partitionDetailFields = function partitionDetailFields(_ref14) {
  var schema = _ref14.schema,
      modelName = _ref14.modelName,
      node = _ref14.node,
      _ref14$include = _ref14.include,
      include = _ref14$include === void 0 ? null : _ref14$include,
      customProps = _ref14.customProps;
  var detailFields = (0, _schemaGetters.getDetailFields)({
    schema: schema,
    modelName: modelName,
    node: node,
    customProps: customProps
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

var DefaultDetailPageTitle = function DefaultDetailPageTitle(_ref15) {
  var schema = _ref15.schema,
      modelName = _ref15.modelName,
      node = _ref15.node,
      modalData = _ref15.modalData,
      user = _ref15.user,
      customProps = _ref15.customProps;
  var model = (0, _schemaGetters.getModelLabel)({
    schema: schema,
    modelName: modelName,
    node: node,
    user: user,
    customProps: customProps
  });
  var label = (0, _getDisplayValue["default"])({
    schema: schema,
    modelName: modelName,
    node: node,
    customProps: customProps
  });
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onDelete = R.path(['delete', 'onDetailDeleteFromDetailPage'], actions);
  var onDeleteWarning = R.path(['delete', 'onDeleteWarning'], actions);
  var modalId = 'confirm-delete-' + modelName;
  var id = R.prop('id', node);
  var HeaderLink = (0, _schemaGetters.getHasIndex)(schema, modelName) ? _react["default"].createElement(_reactRouterDom.Link, {
    to: '/' + modelName
  }, model) : model;
  return _react["default"].createElement("div", null, _react["default"].createElement("h2", {
    className: "d-inline"
  }, HeaderLink, ":", _react["default"].createElement("b", null, " ", label)), (0, _Utils.isDeletable)({
    schema: schema,
    modelName: modelName,
    node: node,
    user: user,
    customProps: customProps
  }) && _react["default"].createElement("div", {
    className: "float-right"
  }, _react["default"].createElement(_Table.DeleteButton, {
    modalId: modalId,
    onDeleteWarning: onDeleteWarning,
    modelName: modelName,
    id: id
  }), _react["default"].createElement(_DeleteDetail.DeleteDetail, {
    schema: schema,
    id: id,
    modalId: modalId,
    modelName: modelName,
    onDelete: onDelete,
    modalData: modalData,
    customProps: customProps
  })));
};

var DetailFields = function DetailFields(_ref16) {
  var schema = _ref16.schema,
      modelName = _ref16.modelName,
      id = _ref16.id,
      node = _ref16.node,
      modalData = _ref16.modalData,
      tableFields = _ref16.tableFields,
      descriptionList = _ref16.descriptionList,
      editData = _ref16.editData,
      tooltipData = _ref16.tooltipData,
      selectOptions = _ref16.selectOptions,
      modelStore = _ref16.modelStore,
      path = _ref16.path,
      user = _ref16.user,
      tableView = _ref16.tableView,
      customProps = _ref16.customProps;

  if (!node) {
    return _react["default"].createElement("div", {
      className: "container"
    }, "Loading...");
  }

  if (!tableFields && !descriptionList) {
    var _partitionDetailField = partitionDetailFields({
      schema: schema,
      modelName: modelName,
      node: node,
      customProps: customProps
    });

    var _partitionDetailField2 = _slicedToArray(_partitionDetailField, 2);

    tableFields = _partitionDetailField2[0];
    descriptionList = _partitionDetailField2[1];
  }

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("dl", {
    className: "row"
  }, descriptionList.map(function (fieldName) {
    var displayCondition = R.prop('detail', (0, _schemaGetters.getFieldConditions)(schema, modelName, fieldName));

    if ((0, _Utils.shouldDisplay)({
      schema: schema,
      modelName: modelName,
      id: id,
      fieldName: fieldName,
      node: node,
      displayCondition: displayCondition,
      customProps: customProps
    }) === false) {
      return null;
    }

    var override = (0, _Utils.getDetailFieldOverride)(schema, modelName, fieldName);

    if ((0, _Utils.skipOverride)(override)) {
      return null;
    }

    var DetailAttribute = override || DefaultDetailAttribute; // same props go into DetailTable & DetailAttribute (even if not used) override gets all same props

    return _react["default"].createElement(DetailAttribute, _extends({
      key: "DetailAttribute-".concat(id, "-").concat(modelName, "-").concat(fieldName)
    }, {
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      node: node,
      selectOptions: selectOptions,
      modelStore: modelStore,
      editData: editData,
      tooltipData: tooltipData,
      modalData: modalData,
      path: path,
      id: id,
      user: user,
      tableView: tableView,
      customProps: customProps
    }));
  })), tableFields.map(function (fieldName) {
    var displayCondition = R.prop('detail', (0, _schemaGetters.getFieldConditions)(schema, modelName, fieldName));

    if ((0, _Utils.shouldDisplay)({
      schema: schema,
      modelName: modelName,
      id: id,
      fieldName: fieldName,
      node: node,
      displayCondition: displayCondition,
      customProps: customProps
    }) === false) {
      return null;
    }

    var override = (0, _Utils.getDetailFieldOverride)(schema, modelName, fieldName);

    if ((0, _Utils.skipOverride)(override)) {
      return null;
    }

    var DetailTable = override || DefaultDetailTable; // same props go into DetailTable & DetailAttribute (even if not used) override gets all same props

    return _react["default"].createElement(DetailTable, _extends({
      key: "DetailTable-".concat(id, "-").concat(modelName, "-").concat(fieldName)
    }, {
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      node: node,
      selectOptions: selectOptions,
      modelStore: modelStore,
      editData: editData,
      tooltipData: tooltipData,
      modalData: modalData,
      path: path,
      id: id,
      user: user,
      tableView: tableView,
      customProps: customProps
    }));
  }));
};

exports.DetailFields = DetailFields;

var Wrapper = function Wrapper(_ref17) {
  var children = _ref17.children;
  return _react["default"].createElement("div", {
    className: "container"
  }, _react["default"].createElement("div", {
    className: "row"
  }, _react["default"].createElement("div", {
    className: "col"
  }, children)));
};

var DefaultDetail = function DefaultDetail(_ref18) {
  var schema = _ref18.schema,
      modelName = _ref18.modelName,
      id = _ref18.id,
      node = _ref18.node,
      modalData = _ref18.modalData,
      editData = _ref18.editData,
      path = _ref18.path,
      match = _ref18.match,
      tooltipData = _ref18.tooltipData,
      user = _ref18.user,
      tableView = _ref18.tableView,
      selectOptions = _ref18.selectOptions,
      modelStore = _ref18.modelStore,
      customProps = _ref18.customProps;
  var DetailTitleOverride = (0, _Utils.getDetailTitleOverride)(schema, modelName);
  var DetailPageOverride = (0, _Utils.getDetailPageOverride)(schema, modelName);
  var tabs = (0, _schemaGetters.getModelAttribute)(schema, modelName, 'tabs');
  var DefaultDetailPage = tabs && tabs.length > 0 ? _Tabs.RecursiveTab : DetailFields;
  var DetailTitle = DetailTitleOverride || DefaultDetailPageTitle;
  var DetailPage = DetailPageOverride || DefaultDetailPage;

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

  if ((0, _Utils.skipOverride)(DetailTitleOverride) && (0, _Utils.skipOverride)(DetailPageOverride)) {
    return null;
  }

  return _react["default"].createElement(Wrapper, null, (0, _Utils.skipOverride)(DetailTitleOverride) ? null : _react["default"].createElement(DetailTitle, {
    schema: schema,
    modelName: modelName,
    id: id,
    node: node,
    modalData: modalData,
    editData: editData,
    path: path,
    match: match,
    tooltipData: tooltipData,
    user: user,
    selectOptions: selectOptions,
    customProps: customProps
  }), (0, _Utils.skipOverride)(DetailPageOverride) ? null : _react["default"].createElement(DetailPage, {
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
    user: user,
    tableView: tableView,
    selectOptions: selectOptions,
    modelStore: modelStore,
    customProps: customProps
  }));
};

var Detail = function Detail(_ref19) {
  var schema = _ref19.schema,
      modelName = _ref19.modelName,
      id = _ref19.id,
      node = _ref19.node,
      modalData = _ref19.modalData,
      editData = _ref19.editData,
      path = _ref19.path,
      match = _ref19.match,
      tooltipData = _ref19.tooltipData,
      user = _ref19.user,
      tableView = _ref19.tableView,
      selectOptions = _ref19.selectOptions,
      modelStore = _ref19.modelStore,
      customProps = _ref19.customProps;
  var DetailOverride = (0, _Utils.getDetailOverride)(schema, modelName);
  var DetailComponent = DetailOverride || DefaultDetail;
  return (0, _Utils.skipOverride)(DetailOverride) ? null : _react["default"].createElement(DetailComponent, {
    schema: schema,
    modelName: modelName,
    id: id,
    node: node,
    modalData: modalData,
    editData: editData,
    path: path,
    match: match,
    tooltipData: tooltipData,
    user: user,
    tableView: tableView,
    selectOptions: selectOptions,
    modelStore: modelStore,
    customProps: customProps
  });
};

var _default = Detail;
exports["default"] = _default;