"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Search = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _input = _interopRequireDefault(require("./input"));

var _consts = require("./consts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Highlight = function Highlight(_ref) {
  var searchText = _ref.searchText,
      rowLen = _ref.rowLen,
      idx = _ref.idx;

  if (rowLen !== idx + 1) {
    return _react["default"].createElement("span", {
      style: {
        backgroundColor: 'yellow'
      }
    }, searchText);
  }

  return _react["default"].createElement("span", null);
};

var HighlightString = function HighlightString(_ref2) {
  var searchText = _ref2.searchText,
      textToHighlight = _ref2.textToHighlight;
  if (!textToHighlight) return _react["default"].createElement(_react["default"].Fragment, null);
  var escapedText = searchText.replace(/\[|\]|[\\^$*+?.|()]/g, '\\$&');
  var insensitiveSplit = new RegExp(escapedText, 'i');
  var rowLen = textToHighlight.split(insensitiveSplit).length;
  var nonHighlightLength = 0;
  return _react["default"].createElement("div", null, textToHighlight.split(insensitiveSplit).map(function (nonHighlight, idx) {
    nonHighlightLength += nonHighlight.length;
    var highlightStartIndex = nonHighlightLength + idx * escapedText.length;
    return _react["default"].createElement(_react["default"].Fragment, {
      key: idx
    }, _react["default"].createElement("span", null, nonHighlight), _react["default"].createElement(Highlight, {
      searchText: textToHighlight.substring(highlightStartIndex, highlightStartIndex + escapedText.length),
      rowLen: rowLen,
      idx: idx
    }));
  }));
};

var Search = function Search(_ref3) {
  var queryText = _ref3.queryText,
      entries = _ref3.entries,
      onTextChange = _ref3.onTextChange,
      onLinkClick = _ref3.onLinkClick,
      searchDropdown = _ref3.searchDropdown,
      _ref3$searchOnChange = _ref3.searchOnChange,
      searchOnChange = _ref3$searchOnChange === void 0 ? true : _ref3$searchOnChange,
      onTriggerSearch = _ref3.onTriggerSearch,
      _onBlur = _ref3.onBlur;
  var showResults = queryText && entries.length > 0;
  return _react["default"].createElement("div", {
    className: "mr-3 dropdown form-inline",
    onKeyPress: function onKeyPress(evt) {
      if (evt.key === 'Enter') {
        onTriggerSearch({
          queryText: queryText
        });
      }
    }
  }, _react["default"].createElement(_input["default"], {
    type: _consts.inputTypes.STRING_TYPE,
    id: "searchbox",
    className: "form-control border-secondary dropdown-toggle",
    onChange: function onChange(evt) {
      var triggeredActions = [onTextChange({
        queryText: evt
      })];

      if (searchOnChange === true) {
        triggeredActions.push(onTriggerSearch());
      }

      return triggeredActions;
    },
    value: queryText,
    customInput: {
      type: 'search',
      placeholder: 'Search...',
      'data-toggle': 'dropdown',
      onBlur: function onBlur() {
        return setTimeout(_onBlur, 300);
      }
    }
  }), showResults && searchDropdown && _react["default"].createElement("div", {
    className: "dropdown-menu dropdown-menu-right ".concat(entries.length > 0 && 'show'),
    style: {
      maxHeight: '60vh',
      overflowY: 'auto',
      whiteSpace: 'normal',
      position: 'absolute'
    }
  }, entries.map(function (entry, index) {
    return _react["default"].createElement(_reactRouterDom.Link, {
      key: index,
      onClick: function onClick() {
        return onLinkClick();
      },
      className: "dropdown-item",
      to: entry.detailURL,
      style: {
        whiteSpace: 'normal'
      }
    }, _react["default"].createElement(HighlightString, {
      searchText: queryText,
      textToHighlight: entry.name
    }), _react["default"].createElement("div", {
      style: {
        fontSize: '11px',
        paddingLeft: '1em'
      }
    }, entry.modelLabel));
  })));
};

exports.Search = Search;