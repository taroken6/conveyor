"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pagination = void 0;

var _react = _interopRequireDefault(require("react"));

var R = _interopRequireWildcard(require("ramda"));

var _schemaGetters = require("./utils/schemaGetters");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PaginationLink = function PaginationLink(_ref) {
  var modelName = _ref.modelName,
      changePage = _ref.changePage,
      text = _ref.text,
      updatedPageIndex = _ref.updatedPageIndex;
  return _react["default"].createElement("li", {
    className: "page-item"
  }, _react["default"].createElement("a", {
    className: "page-link",
    href: "#",
    onClick: function onClick() {
      return changePage({
        modelName: modelName,
        updatedPageIndex: updatedPageIndex
      });
    }
  }, text));
};

var Pagination = function Pagination(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      tableView = _ref2.tableView;
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var changePage = R.path(['tableOptions', 'changePage'], actions); // current page idx

  var idx = R.pathOr(0, ['page', modelName], tableView); // get index of last hypothetical data point

  var lastIndex = R.path(['lastIndexPagination', modelName], tableView); // get previous & last conditions; 'lastIndex' can be null or '0' value

  var hasFirst = idx > 1;
  var hasPrev = idx > 0;
  var hasNext = lastIndex > 0 && idx < lastIndex;
  var hasLast = lastIndex > 0 && idx < lastIndex - 1; // number displayed to user

  var displayIndex = idx + 1; // no pagination

  if (!hasFirst && !hasPrev && !hasNext && !hasLast) {
    return null;
  }

  return _react["default"].createElement("nav", {
    "aria-label": "Page navigation example"
  }, _react["default"].createElement("ul", {
    className: "pagination"
  }, hasFirst && _react["default"].createElement(PaginationLink, {
    modelName: modelName,
    changePage: changePage,
    text: '«',
    updatedPageIndex: 0
  }), hasPrev && _react["default"].createElement(PaginationLink, {
    modelName: modelName,
    changePage: changePage,
    text: '‹',
    updatedPageIndex: idx - 1
  }), _react["default"].createElement(PaginationLink, {
    modelName: modelName,
    changePage: changePage,
    text: "".concat(displayIndex),
    updatedPageIndex: idx
  }), hasNext && _react["default"].createElement(PaginationLink, {
    modelName: modelName,
    changePage: changePage,
    text: '›',
    updatedPageIndex: idx + 1
  }), hasLast && _react["default"].createElement(PaginationLink, {
    modelName: modelName,
    changePage: changePage,
    text: '»',
    updatedPageIndex: lastIndex
  })));
};

exports.Pagination = Pagination;