"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterComp = exports.isTableFilterable = exports.isColFilterable = exports.isFilterable = void 0;

var _react = _interopRequireDefault(require("react"));

var _Input = require("../form/Input");

var _InputType = require("../form/InputType");

var _reactSvg = _interopRequireDefault(require("react-svg"));

var _reactTippy = require("react-tippy");

var R = _interopRequireWildcard(require("ramda"));

var _consts = require("../consts");

var _input = _interopRequireDefault(require("../input"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// todo: fix this
// band-aid solution for filter types that are still broken;
// currency filter is not broken, but does not have adequate permissions check
// and can give away cost info indirectly by filtering via cost value
var isFilterable = function isFilterable(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldName = _ref.fieldName;
  var inputType = (0, _InputType.getInputType)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName
  });
  return !(inputType === _consts.inputTypes.ENUM_TYPE || inputType === _consts.inputTypes.RELATIONSHIP_SINGLE || inputType === _consts.inputTypes.RELATIONSHIP_MULTIPLE || inputType === _consts.inputTypes.DATE_TYPE || inputType === _consts.inputTypes.PHONE_TYPE || inputType === _consts.inputTypes.BOOLEAN_TYPE || // todo: add back currency once filter permissions added
  inputType === _consts.inputTypes.CURRENCY_TYPE);
};

exports.isFilterable = isFilterable;

var isColFilterable = function isColFilterable(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      fieldName = _ref2.fieldName,
      tableOptions = _ref2.tableOptions,
      filterable = _ref2.filterable;
  return !!tableOptions && filterable && isFilterable({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName
  });
};

exports.isColFilterable = isColFilterable;

var isTableFilterable = function isTableFilterable(_ref3) {
  var schema = _ref3.schema,
      modelName = _ref3.modelName,
      fieldOrder = _ref3.fieldOrder,
      tableOptions = _ref3.tableOptions,
      filterable = _ref3.filterable;
  var boolList = R.map(function (fieldName) {
    return isColFilterable({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      tableOptions: tableOptions,
      filterable: filterable
    });
  }, fieldOrder);
  return !R.isEmpty(R.filter(R.identity, boolList));
};

exports.isTableFilterable = isTableFilterable;

var FilterRadio = function FilterRadio(_ref4) {
  var modelName = _ref4.modelName,
      fieldName = _ref4.fieldName,
      operator = _ref4.operator,
      onFilterSubmit = _ref4.onFilterSubmit,
      onFilterRadio = _ref4.onFilterRadio,
      options = _ref4.options;
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_input["default"], {
    type: _consts.inputTypes.RADIO_TYPE,
    onChange: function onChange(val) {
      return onFilterRadio({
        modelName: modelName,
        fieldName: fieldName,
        operator: val
      });
    },
    value: operator,
    options: options,
    id: "".concat(modelName, "-").concat(fieldName, "-filter-radio")
  }), _react["default"].createElement("div", {
    className: "btn-group"
  }, _react["default"].createElement("button", {
    className: "btn btn-sm btn-outline-primary",
    onClick: function onClick() {
      return onFilterSubmit({
        modelName: modelName,
        fieldName: fieldName,
        operator: operator
      });
    }
  }, "Apply"), _react["default"].createElement("button", {
    className: "btn btn-sm btn-outline-secondary",
    onClick: function onClick() {
      return onFilterSubmit({
        modelName: modelName,
        fieldName: fieldName,
        operator: null
      });
    }
  }, "Reset")));
};

var stringOptions = [{
  label: 'Includes',
  value: 'INCLUDES'
}, {
  label: 'Equals',
  value: 'EQUALS'
}];
var numberOptions = [{
  label: '<',
  value: 'lt'
}, {
  label: '<=',
  value: 'lte'
}, {
  label: '=',
  value: 'eq'
}, {
  label: '!=',
  value: 'neq'
}, {
  label: '>',
  value: 'gt'
}, {
  label: '>=',
  value: 'gte'
}];
var relOptions = [{
  label: 'Includes',
  value: 'INCLUDES'
}];
var enumOptions = [{
  label: 'Includes',
  value: 'INCLUDES'
}, {
  label: 'Excludes',
  value: 'EXCLUDES'
}];

var FilterApplyButton = function FilterApplyButton(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      fieldName = _ref5.fieldName,
      operator = _ref5.operator,
      onFilterSubmit = _ref5.onFilterSubmit,
      onFilterRadio = _ref5.onFilterRadio;
  var inputType = (0, _InputType.getInputType)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName
  });
  var options;

  switch (inputType) {
    case _consts.inputTypes.INT_TYPE:
    case _consts.inputTypes.FLOAT_TYPE:
    case _consts.inputTypes.CURRENCY_TYPE:
      options = numberOptions;
      break;

    case _consts.inputTypes.ENUM_TYPE:
      options = enumOptions;
      break;

    case _consts.inputTypes.RELATIONSHIP_SINGLE:
    case _consts.inputTypes.RELATIONSHIP_MULTIPLE:
      options = relOptions;
      break;

    default:
      options = stringOptions;
  }

  return _react["default"].createElement(FilterRadio, {
    modelName: modelName,
    fieldName: fieldName,
    operator: operator,
    onFilterSubmit: onFilterSubmit,
    onFilterRadio: onFilterRadio,
    options: options
  });
}; // todo: finish
// case inputTypes.DATE_TYPE:
// case inputTypes.PHONE_TYPE:
// case inputTypes.BOOLEAN_TYPE:


var FilterPopover = function FilterPopover(_ref6) {
  var schema = _ref6.schema,
      modelName = _ref6.modelName,
      fieldName = _ref6.fieldName,
      value = _ref6.value,
      operator = _ref6.operator,
      onFilterChange = _ref6.onFilterChange,
      onFilterSubmit = _ref6.onFilterSubmit,
      onFilterRadio = _ref6.onFilterRadio,
      selectOptions = _ref6.selectOptions,
      onMenuOpen = _ref6.onMenuOpen;
  return _react["default"].createElement("div", {
    style: {
      'minWidth': '350px',
      'textAlign': 'left'
    }
  }, _react["default"].createElement(_Input.InputCore, {
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    value: value,
    onChange: onFilterChange,
    inline: true,
    selectOptions: selectOptions,
    onMenuOpen: onMenuOpen
  }), _react["default"].createElement(FilterApplyButton, {
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    operator: operator,
    onFilterSubmit: onFilterSubmit,
    onFilterRadio: onFilterRadio
  }));
};

var FilterComp = function FilterComp(_ref7) {
  var fieldName = _ref7.fieldName,
      modelName = _ref7.modelName,
      schema = _ref7.schema,
      onFilterChange = _ref7.onFilterChange,
      onFilterSubmit = _ref7.onFilterSubmit,
      onFilterRadio = _ref7.onFilterRadio,
      onMenuOpen = _ref7.onMenuOpen,
      filterInput = _ref7.filterInput,
      selectOptions = _ref7.selectOptions;
  var value = R.prop('value', filterInput);
  var operator = R.prop('operator', filterInput); // 'black' for undefined/null/emtpy str

  var fillColor = R.isEmpty(value) || R.isNil(value) ? 'black' : 'lightgreen';
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_reactTippy.Tooltip, {
    theme: "light",
    interactive: "true",
    position: "bottom",
    trigger: "click",
    html: FilterPopover({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      value: value,
      operator: operator,
      onFilterChange: onFilterChange,
      onFilterSubmit: onFilterSubmit,
      onFilterRadio: onFilterRadio,
      selectOptions: selectOptions,
      onMenuOpen: onMenuOpen
    })
  }, _react["default"].createElement(_reactSvg["default"], {
    src: "/static/img/filter.svg",
    className: "header-icon",
    svgStyle: {
      width: '12px',
      height: '12px',
      fill: fillColor
    }
  })));
};

exports.FilterComp = FilterComp;
