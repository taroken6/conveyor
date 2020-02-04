"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterComp = exports.FilterModalButton = exports.FilterModal = exports.isTableFilterable = void 0;

var _react = _interopRequireDefault(require("react"));

var _Input = require("../form/Input");

var _fa = require("react-icons/fa");

var R = _interopRequireWildcard(require("ramda"));

var _consts = require("../consts");

var _input = _interopRequireDefault(require("../input"));

var _Modal = require("../Modal");

var _schemaGetters = require("../utils/schemaGetters.js");

var _getType = require("../utils/getType");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isFilterable = function isFilterable(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldName = _ref.fieldName,
      user = _ref.user;
  // first check if can filter on field level
  var fieldFilterable = R.pathOr(true, [modelName, 'fields', fieldName, 'filterable'], schema);

  if (fieldFilterable === false) {
    return false;
  } // repeat above if 'fieldFilterable' is function


  if (R.type(fieldFilterable) === 'Function' && fieldFilterable({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    user: user
  }) === false) {
    return false;
  } // next, filter out field types which don't work with magql


  var inputType = (0, _getType.getType)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName
  });
  return !(R.isNil(inputType) || inputType === _consts.inputTypes.CREATABLE_STRING_SELECT_TYPE || inputType === _consts.inputTypes.ONE_TO_MANY_TYPE || inputType === _consts.inputTypes.MANY_TO_MANY_TYPE || inputType === _consts.inputTypes.PHONE_TYPE || inputType === _consts.inputTypes.ID_TYPE);
};

var isTableFilterable = function isTableFilterable(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      user = _ref2.user;
  // first check if can filter on model level
  var tableFilterable = R.pathOr(true, [modelName, 'filterable'], schema);

  if (tableFilterable === false) {
    return false;
  } // repeat above if 'tableFilterable' is function


  if (R.type(tableFilterable) === 'Function' && tableFilterable({
    schema: schema,
    modelName: modelName,
    user: user
  }) === false) {
    return false;
  } // next, check field level filter


  var model = R.prop(modelName, schema);
  var fieldOrder = R.prop('fieldOrder', model);
  var boolList = R.map(function (fieldName) {
    return isFilterable({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      user: user
    });
  }, fieldOrder);
  return !R.isEmpty(R.filter(R.identity, boolList));
};

exports.isTableFilterable = isTableFilterable;

var getFilterableFields = function getFilterableFields(_ref3) {
  var modelName = _ref3.modelName,
      schema = _ref3.schema,
      user = _ref3.user;
  var fields = R.pathOr([], [modelName, 'fieldOrder'], schema);
  var filterables = fields.filter(function (fieldName) {
    return isFilterable({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      user: user
    });
  });
  return filterables;
};

var FilterButtons = function FilterButtons(_ref4) {
  var modelName = _ref4.modelName,
      onFilterSubmit = _ref4.onFilterSubmit,
      clearFilters = _ref4.clearFilters,
      addFilter = _ref4.addFilter;
  return _react["default"].createElement("div", {
    className: "mt-3"
  }, _react["default"].createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: function onClick() {
      return addFilter({
        modelName: modelName
      });
    }
  }, "+ Add Rule"), _react["default"].createElement("div", {
    className: "d-inline float-right"
  }, _react["default"].createElement("div", {
    className: "btn-group"
  }, _react["default"].createElement("button", {
    className: "btn btn-success btn-sm",
    onClick: function onClick() {
      return onFilterSubmit({
        modelName: modelName
      });
    }
  }, "Apply"), _react["default"].createElement("button", {
    className: "btn btn-outline-danger btn-sm",
    onClick: function onClick() {
      clearFilters({
        modelName: modelName
      });
      onFilterSubmit({
        modelName: modelName
      });
    }
  }, "Reset"))));
};

var formatFilter = function formatFilter(_ref5) {
  var fieldName = _ref5.fieldName,
      index = _ref5.index,
      modelName = _ref5.modelName,
      schema = _ref5.schema,
      data = _ref5.data,
      _onChange = _ref5.onChange,
      selectOptions = _ref5.selectOptions,
      filterOrder = _ref5.filterOrder,
      _onFilterChange = _ref5.onFilterChange,
      onFilterSubmit = _ref5.onFilterSubmit,
      onFilterDropdown = _ref5.onFilterDropdown,
      filterInputs = _ref5.filterInputs,
      deleteFilter = _ref5.deleteFilter,
      user = _ref5.user;
  var filterInput = R.prop(fieldName, filterInputs);
  var filterables = getFilterableFields({
    modelName: modelName,
    schema: schema,
    user: user
  });

  var toOptions = function toOptions(fieldName) {
    return {
      label: (0, _schemaGetters.getFieldLabel)({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        data: data
      }),
      value: fieldName
    };
  };

  var unfiltered = filterables.filter(function (fieldName) {
    return !filterOrder.includes(fieldName);
  });
  var options = unfiltered.map(function (fieldName) {
    return toOptions(fieldName);
  });
  var value = R.isNil(fieldName) || R.isEmpty(fieldName) ? {
    label: null,
    value: null
  } : toOptions(filterOrder[index]);
  return _react["default"].createElement("li", {
    key: "".concat(index, "-").concat(modelName, "-").concat(fieldName, "-format-filter"),
    className: "list-group-item filter"
  }, _react["default"].createElement("div", {
    className: "filter-fieldname-dropdown"
  }, _react["default"].createElement("div", {
    className: "w-100"
  }, _react["default"].createElement(_input["default"], {
    type: _consts.inputTypes.SELECT_TYPE,
    onChange: function onChange(evt) {
      return _onChange({
        modelName: modelName,
        fieldName: R.prop('value', evt),
        index: index
      });
    },
    value: value,
    options: options,
    id: "".concat(index, "-").concat(modelName, "-filter-dropdown"),
    isClearable: false,
    customInput: {
      noOptionsMessage: function noOptionsMessage() {
        return '(no filterable fields)';
      },
      placeholder: 'Select field...'
    }
  }))), _react["default"].createElement("div", {
    className: "filter-rest align-middle"
  }, _react["default"].createElement("div", {
    className: "w-100"
  }, _react["default"].createElement(FilterComp, {
    fieldName: fieldName,
    modelName: modelName,
    schema: schema,
    onFilterChange: function onFilterChange(evt) {
      return _onFilterChange(_objectSpread({
        modelName: modelName
      }, evt));
    },
    onFilterSubmit: onFilterSubmit,
    onFilterDropdown: onFilterDropdown,
    filterInput: filterInput,
    selectOptions: selectOptions
  }))), _react["default"].createElement("div", {
    className: "filter-close filter-padded align-middle"
  }, _react["default"].createElement("button", {
    className: "btn btn-sm btn-danger btn-block",
    onClick: function onClick() {
      return deleteFilter({
        modelName: modelName,
        index: index
      });
    }
  }, "X")));
};

var ActiveFilters = function ActiveFilters(_ref6) {
  var modelName = _ref6.modelName,
      schema = _ref6.schema,
      data = _ref6.data,
      addFilter = _ref6.addFilter,
      deleteFilter = _ref6.deleteFilter,
      onChange = _ref6.onChange,
      selectOptions = _ref6.selectOptions,
      filterOrder = _ref6.filterOrder,
      clearFilters = _ref6.clearFilters,
      onFilterChange = _ref6.onFilterChange,
      onFilterSubmit = _ref6.onFilterSubmit,
      onFilterDropdown = _ref6.onFilterDropdown,
      filterInputs = _ref6.filterInputs,
      user = _ref6.user;
  return _react["default"].createElement("div", {
    id: 'active-filters-' + modelName,
    className: "mb-2"
  }, _react["default"].createElement("ul", {
    className: "list-group"
  }, R.isEmpty(filterOrder) || R.isNil(filterOrder) ? _react["default"].createElement("li", {
    key: "no-active-filters",
    className: "list-group-item text-muted",
    style: {
      cursor: 'pointer'
    },
    onClick: function onClick() {
      return addFilter({
        modelName: modelName
      });
    }
  }, "Add a rule to get started...") : filterOrder.map(function (fieldName, index) {
    return formatFilter({
      fieldName: fieldName,
      index: index,
      modelName: modelName,
      schema: schema,
      data: data,
      onChange: onChange,
      selectOptions: selectOptions,
      filterOrder: filterOrder,
      onFilterChange: onFilterChange,
      onFilterSubmit: onFilterSubmit,
      onFilterDropdown: onFilterDropdown,
      filterInputs: filterInputs,
      deleteFilter: deleteFilter,
      user: user
    });
  })), _react["default"].createElement(FilterButtons, {
    modelName: modelName,
    onFilterSubmit: onFilterSubmit,
    clearFilters: clearFilters,
    addFilter: addFilter
  }));
};

var FilterModal = function FilterModal(_ref7) {
  var schema = _ref7.schema,
      modelName = _ref7.modelName,
      selectOptions = _ref7.selectOptions,
      data = _ref7.data,
      filterOrder = _ref7.filterOrder,
      filterInputs = _ref7.filterInputs,
      user = _ref7.user;
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var tableOptions = R.prop('tableOptions', actions);
  var addFilter = R.prop('addFilter', tableOptions);
  var deleteFilter = R.prop('deleteFilter', tableOptions);
  var clearFilters = R.prop('clearFilters', tableOptions);
  var changeField = R.prop('changeField', tableOptions);
  var onFilterChange = R.prop('filterChange', tableOptions);
  var onFilterSubmit = R.prop('filterSubmit', tableOptions);
  var onFilterDropdown = R.prop('filterDropdown', tableOptions);
  return _react["default"].createElement(_Modal.Modal, {
    id: 'filter-' + modelName,
    title: 'Filters - ' + modelName,
    children: _react["default"].createElement(ActiveFilters, {
      modelName: modelName,
      schema: schema,
      data: data,
      addFilter: addFilter,
      deleteFilter: deleteFilter,
      onChange: changeField,
      selectOptions: selectOptions,
      filterOrder: filterOrder,
      clearFilters: clearFilters,
      onFilterChange: onFilterChange,
      onFilterSubmit: onFilterSubmit,
      onFilterDropdown: onFilterDropdown,
      filterInputs: filterInputs,
      user: user
    })
  });
};

exports.FilterModal = FilterModal;

var FilterModalButton = function FilterModalButton(_ref8) {
  var modelName = _ref8.modelName,
      filtersAreActive = _ref8.filtersAreActive;
  return _react["default"].createElement("button", {
    className: "btn btn-sm btn-outline-primary",
    "data-toggle": "modal",
    "data-target": '#filter-' + modelName
  }, "Filter", _react["default"].createElement(_fa.FaFilter, {
    className: "filter-icon-".concat(filtersAreActive ? 'active' : 'inactive', " ml-2"),
    color: filtersAreActive ? 'lightgreen' : 'black'
  }));
};

exports.FilterModalButton = FilterModalButton;
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
}];
var dateOptions = [{
  label: 'Before',
  value: 'BEFORE'
}];
var booleanOptions = [{
  label: 'Equals',
  value: 'EQUALS'
}];

var FilterOptions = function FilterOptions(_ref9) {
  var schema = _ref9.schema,
      modelName = _ref9.modelName,
      fieldName = _ref9.fieldName,
      operator = _ref9.operator,
      onFilterDropdown = _ref9.onFilterDropdown;
  var inputType = (0, _getType.getType)({
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

    case _consts.inputTypes.DATE_TYPE:
      options = dateOptions;
      break;

    case _consts.inputTypes.BOOLEAN_TYPE:
      options = booleanOptions;
      break;

    case _consts.inputTypes.ONE_TO_ONE_TYPE:
    case _consts.inputTypes.MANY_TO_ONE_TYPE:
    case _consts.inputTypes.ONE_TO_MANY_TYPE:
    case _consts.inputTypes.MANY_TO_MANY_TYPE:
      options = relOptions;
      break;

    default:
      options = stringOptions;
  }

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_input["default"], {
    type: _consts.inputTypes.SELECT_TYPE,
    onChange: function onChange(val) {
      return onFilterDropdown({
        modelName: modelName,
        fieldName: fieldName,
        operator: val
      });
    },
    value: operator,
    options: options,
    id: "".concat(modelName, "-").concat(fieldName, "-filter-radio"),
    isClearable: false
  }));
}; // todo: finish
// case inputTypes.DATE_TYPE:
// case inputTypes.PHONE_TYPE:
// case inputTypes.BOOLEAN_TYPE:


var FilterComp = function FilterComp(_ref10) {
  var fieldName = _ref10.fieldName,
      modelName = _ref10.modelName,
      schema = _ref10.schema,
      onFilterChange = _ref10.onFilterChange,
      onFilterSubmit = _ref10.onFilterSubmit,
      onFilterDropdown = _ref10.onFilterDropdown,
      filterInput = _ref10.filterInput,
      selectOptions = _ref10.selectOptions;

  if (R.isNil(fieldName) || R.isEmpty(fieldName)) {
    return _react["default"].createElement("div", {
      className: "ml-1 mt-1 filter-padded"
    }, "Select a field");
  }

  var value = R.prop('value', filterInput);
  var operator = R.prop('operator', filterInput);
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onMenuOpen = R.path(['input', 'onMenuOpen'], actions);
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", {
    className: "filter-operator-dropdown"
  }, _react["default"].createElement(FilterOptions, {
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    operator: operator,
    onFilterSubmit: onFilterSubmit,
    onFilterDropdown: onFilterDropdown
  })), _react["default"].createElement("div", {
    className: "filter-input"
  }, _react["default"].createElement(_Input.InputCore, {
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    value: value,
    onChange: onFilterChange,
    inline: true,
    selectOptions: selectOptions,
    onMenuOpen: onMenuOpen,
    customInput: {
      placeholder: 'Enter value...'
    }
  })));
};

exports.FilterComp = FilterComp;