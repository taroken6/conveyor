"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortButton = exports.getNextSortKey = void 0;

var _react = _interopRequireDefault(require("react"));

var consts = _interopRequireWildcard(require("../consts"));

var R = _interopRequireWildcard(require("ramda"));

var _fa = require("react-icons/fa");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSortIcon = function getSortIcon(sortKey) {
  switch (sortKey) {
    case undefined:
      return _fa.FaSort;

    case 'asc':
      return _fa.FaSortUp;

    case 'desc':
      return _fa.FaSortDown;
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

exports.getNextSortKey = getNextSortKey;

var SortButton = function SortButton(_ref) {
  var modelName = _ref.modelName,
      fieldName = _ref.fieldName,
      onSort = _ref.onSort,
      sortKeyObj = _ref.sortKeyObj;
  var sortKey;

  if (R.prop('fieldName', sortKeyObj) === fieldName) {
    sortKey = R.prop('sortKey', sortKeyObj);
  }

  var SortIcon = getSortIcon(sortKey);
  var fillColor = sortKey ? 'lightgreen' : 'black';
  return _react["default"].createElement(SortIcon, {
    className: "header-icon-".concat(sortKey ? 'active' : 'inactive'),
    color: fillColor,
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