"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailPagination = exports.IndexPagination = exports.Pagination = void 0;

var _react = _interopRequireDefault(require("react"));

var R = _interopRequireWildcard(require("ramda"));

var _schemaGetters = require("./utils/schemaGetters");

var _reactTippy = require("react-tippy");

var _input = _interopRequireDefault(require("./input"));

var _consts = require("./consts");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GotoTooltip = function GotoTooltip(_ref) {
  var modelName = _ref.modelName,
      fieldName = _ref.fieldName,
      onChangePage = _ref.onChangePage,
      onChangeGoto = _ref.onChangeGoto,
      lastIndex = _ref.lastIndex,
      _goto = _ref["goto"],
      canGoto = _ref.canGoto;
  return _react["default"].createElement("div", {
    id: "".concat(modelName).concat(fieldName ? '-' + fieldName : '', "-pg-tooltip"),
    className: "goto-tooltip"
  }, canGoto ? null : _react["default"].createElement("div", {
    className: "mb-2 goto-tooltip-invalid"
  }, "Please enter a valid page number."), _react["default"].createElement("div", {
    className: "d-flex"
  }, _react["default"].createElement("div", {
    className: "mr-2 float-left"
  }, _react["default"].createElement(_input["default"], {
    type: _consts.inputTypes.INT_TYPE,
    id: "".concat(modelName).concat(fieldName ? '-' + fieldName : '', "-goto"),
    value: _goto,
    onChange: function onChange(evt) {
      return onChangeGoto({
        modelName: modelName,
        fieldName: fieldName,
        pageIndex: evt
      });
    },
    customInput: {
      placeholder: 'Go to page...'
    }
  })), _react["default"].createElement("div", {
    className: "float-right"
  }, _react["default"].createElement("button", {
    className: "btn btn-success",
    onClick: function onClick() {
      return onChangePage({
        modelName: modelName,
        fieldName: fieldName,
        // goto is the page number, which will always be 1 greater than the index
        // because index begins at 0 while page number begins at 1
        updatedPageIndex: _goto - 1,
        isValid: 1 <= _goto && _goto <= lastIndex + 1 && Number.isInteger(_goto)
      });
    }
  }, "Go"))));
};

var PaginationLink = function PaginationLink(_ref2) {
  var modelName = _ref2.modelName,
      fieldName = _ref2.fieldName,
      onChangePage = _ref2.onChangePage,
      _ref2$onChangeGoto = _ref2.onChangeGoto,
      onChangeGoto = _ref2$onChangeGoto === void 0 ? null : _ref2$onChangeGoto,
      lastIndex = _ref2.lastIndex,
      _ref2$goto = _ref2["goto"],
      _goto2 = _ref2$goto === void 0 ? null : _ref2$goto,
      canGoto = _ref2.canGoto,
      text = _ref2.text,
      updatedPageIndex = _ref2.updatedPageIndex;

  var link = _react["default"].createElement("a", {
    className: "page-link",
    href: "#",
    onClick: function onClick() {
      return onChangePage({
        modelName: modelName,
        fieldName: fieldName,
        updatedPageIndex: updatedPageIndex
      });
    }
  }, text);

  if (isNaN(text)) {
    return _react["default"].createElement(_reactTippy.Tooltip, {
      html: _react["default"].createElement("span", null, "Page ".concat(updatedPageIndex + 1))
    }, link);
  }

  return _react["default"].createElement(_reactTippy.Tooltip, {
    html: _react["default"].createElement(GotoTooltip, {
      modelName: modelName,
      fieldName: fieldName,
      onChangePage: onChangePage,
      onChangeGoto: onChangeGoto,
      lastIndex: lastIndex,
      "goto": _goto2,
      canGoto: canGoto
    }),
    trigger: "click",
    interactive: true
  }, link);
};

var Pagination = function Pagination(_ref3) {
  var modelName = _ref3.modelName,
      _ref3$fieldName = _ref3.fieldName,
      fieldName = _ref3$fieldName === void 0 ? null : _ref3$fieldName,
      idx = _ref3.idx,
      lastIndex = _ref3.lastIndex,
      _goto3 = _ref3["goto"],
      canGoto = _ref3.canGoto,
      onChangePage = _ref3.onChangePage,
      onChangeGoto = _ref3.onChangeGoto,
      totalDataLength = _ref3.totalDataLength,
      amtPerPage = _ref3.amtPerPage;
  // get previous & last conditions; 'lastIndex' can be null or '0' value
  var hasFirst = idx > 1;
  var hasPrev = idx > 0;
  var hasNext = lastIndex > 0 && idx < lastIndex;
  var hasLast = lastIndex > 0 && idx < lastIndex - 1; // number displayed

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
    fieldName: fieldName,
    onChangePage: onChangePage,
    text: '«',
    updatedPageIndex: 0
  }), hasPrev && _react["default"].createElement(PaginationLink, {
    modelName: modelName,
    fieldName: fieldName,
    onChangePage: onChangePage,
    text: '‹',
    updatedPageIndex: idx - 1
  }), _react["default"].createElement(PaginationLink, {
    modelName: modelName,
    fieldName: fieldName,
    onChangePage: onChangePage,
    onChangeGoto: onChangeGoto,
    lastIndex: lastIndex,
    "goto": _goto3,
    canGoto: canGoto,
    text: "".concat(displayIndex),
    updatedPageIndex: idx
  }), hasNext && _react["default"].createElement(PaginationLink, {
    modelName: modelName,
    fieldName: fieldName,
    onChangePage: onChangePage,
    text: '›',
    updatedPageIndex: idx + 1
  }), hasLast && _react["default"].createElement(PaginationLink, {
    modelName: modelName,
    fieldName: fieldName,
    onChangePage: onChangePage,
    text: '»',
    updatedPageIndex: lastIndex
  }), totalDataLength && amtPerPage && _react["default"].createElement("span", {
    className: "ml-2 my-auto"
  }, idx * amtPerPage + 1, "-", Math.min((idx + 1) * amtPerPage, totalDataLength), " of", ' ', totalDataLength)));
};

exports.Pagination = Pagination;

var IndexPagination = function IndexPagination(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      tableView = _ref4.tableView;
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onChangePage = R.path(['tableOptions', 'changePage'], actions);
  var onChangeGoto = R.path(['tableOptions', 'changeGotoPage'], actions);
  var page = R.path([modelName, 'page'], tableView);

  var _goto4 = R.prop('goto', page);

  var canGoto = R.propOr(true, 'canGoto', page); // current page idx

  var idx = R.propOr(0, 'currentPage', page); // get index of last hypothetical data point

  var lastIndex = R.prop('lastIndex', page);
  var totalDataLength = R.path([modelName, 'page', 'total'], tableView);
  var amtPerPage = R.prop('amtPerPage', tableView);
  return _react["default"].createElement(Pagination, {
    modelName: modelName,
    idx: idx,
    lastIndex: lastIndex,
    totalDataLength: totalDataLength,
    amtPerPage: amtPerPage,
    "goto": _goto4,
    canGoto: canGoto,
    onChangePage: onChangePage,
    onChangeGoto: onChangeGoto
  });
};

exports.IndexPagination = IndexPagination;

var DetailPagination = function DetailPagination(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      fieldName = _ref5.fieldName,
      tableView = _ref5.tableView;
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onChangePage = R.path(['tableOptions', 'changeRelTablePage'], actions);
  var onChangeGoto = R.path(['tableOptions', 'changeRelGotoPage'], actions);
  var page = R.path([modelName, 'fields', fieldName, 'page'], tableView);

  var _goto5 = R.prop('goto', page);

  var canGoto = R.propOr(true, 'canGoto', page); // current page idx

  var idx = R.propOr(0, 'currentPage', page); // get index of last hypothetical data point

  var lastIndex = R.prop('lastIndex', page);
  var totalDataLength = R.path([modelName, 'fields', fieldName, 'page', 'total'], tableView);
  var amtPerPage = R.prop('amtPerPage', tableView);
  return _react["default"].createElement(Pagination, {
    modelName: modelName,
    fieldName: fieldName,
    idx: idx,
    lastIndex: lastIndex,
    totalDataLength: totalDataLength,
    amtPerPage: amtPerPage,
    "goto": _goto5,
    canGoto: canGoto,
    onChangePage: onChangePage,
    onChangeGoto: onChangeGoto
  });
};

exports.DetailPagination = DetailPagination;