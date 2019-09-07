'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortButton = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _consts = require('../consts');

var consts = _interopRequireWildcard(_consts);

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

var _reactSvg = require('react-svg');

var _reactSvg2 = _interopRequireDefault(_reactSvg);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var SortButton = exports.SortButton = function SortButton(_ref) {
  var modelName = _ref.modelName,
      fieldName = _ref.fieldName,
      onSort = _ref.onSort,
      sortKeyObj = _ref.sortKeyObj;

  var sortKey = undefined;
  if (R.prop('fieldName', sortKeyObj) === fieldName) {
    sortKey = R.prop('sortKey', sortKeyObj);
  }

  var fillColor = sortKey ? 'lightgreen' : 'black';
  return _react2.default.createElement(_reactSvg2.default, {
    src: '/static/img/' + getSortIcon(sortKey) + '.svg',
    className: 'edit-icon',
    svgStyle: { width: '20px', height: '20px', fill: fillColor },
    onClick: function onClick() {
      return onSort({
        modelName: modelName,
        fieldName: fieldName,
        sortKey: getNextSortKey(sortKey)
      });
    }
  });
};