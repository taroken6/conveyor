"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortButton = exports.isSortable = void 0;

var _react = _interopRequireDefault(require("react"));

var consts = _interopRequireWildcard(require("../consts"));

var R = _interopRequireWildcard(require("ramda"));

var _reactSvg = _interopRequireDefault(require("react-svg"));

var _InputType = require("../form/InputType");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// currency sort is not broken, but does not have adequate permissions check
// and can give away cost info indirectly by sorting via cost value
var isSortable = function isSortable(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldName = _ref.fieldName;
  var inputType = (0, _InputType.getInputType)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName
  }); // todo: add back currency once sort permissions added

  return !(inputType === consts.inputTypes.CURRENCY_TYPE);
};

exports.isSortable = isSortable;

var getSortIcon = function getSortIcon(sortKey) {
  switch (sortKey) {
    case undefined:
      return 'sort';

    case 'asc':
      return 'sort-up';

    case 'desc':
      return 'sort-down';
  }
};

var getNextSortKey = function getNextSortKey(sortKey) {
  switch (sortKey) {
    case undefined:
      return consts.ASC;

    case consts.ASC:
      return consts.DESC;

    case consts.DESC:
      return undefined;
  }
};

var SortButton = function SortButton(_ref2) {
  var modelName = _ref2.modelName,
      fieldName = _ref2.fieldName,
      onSort = _ref2.onSort,
      sortKeyObj = _ref2.sortKeyObj;
  var sortKey = undefined;

  if (R.prop('fieldName', sortKeyObj) === fieldName) {
    sortKey = R.prop('sortKey', sortKeyObj);
  }

  var fillColor = sortKey ? 'lightgreen' : 'black';
  return _react["default"].createElement(_reactSvg["default"], {
    src: "/static/img/".concat(getSortIcon(sortKey), ".svg"),
    className: "edit-icon",
    svgStyle: {
      width: '20px',
      height: '20px',
      fill: fillColor
    },
    onClick: function onClick() {
      return onSort({
        modelName: modelName,
        fieldName: fieldName,
        sortKey: getNextSortKey(sortKey)
      });
    }
  });
};

exports.SortButton = SortButton;