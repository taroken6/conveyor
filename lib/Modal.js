"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageLinkModal = exports.Modal = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Modal = function Modal(_ref) {
  var id = _ref.id,
      title = _ref.title,
      children = _ref.children;
  return _react["default"].createElement("div", {
    className: "modal fade",
    id: id,
    tabIndex: -1
  }, _react["default"].createElement("div", {
    className: "modal-dialog modal-lg"
  }, _react["default"].createElement("div", {
    className: "modal-content"
  }, _react["default"].createElement("div", {
    className: "modal-header"
  }, _react["default"].createElement("h5", {
    className: "modal-title"
  }, title), _react["default"].createElement("button", {
    type: "button",
    className: "close",
    "data-dismiss": "modal"
  }, "\xD7")), _react["default"].createElement("div", {
    className: "modal-body"
  }, children))));
};

exports.Modal = Modal;

var ImageModal = function ImageModal(_ref2) {
  var id = _ref2.id,
      title = _ref2.title,
      url = _ref2.url;
  var child;

  if (!url) {
    child = _react["default"].createElement("div", {
      className: "text-center"
    }, '...generating image');
  } else {
    child = _react["default"].createElement("div", {
      className: "text-center"
    }, _react["default"].createElement("div", null, _react["default"].createElement("a", {
      href: url,
      target: "_blank",
      rel: "noopener noreferrer"
    }, _react["default"].createElement("img", {
      className: "img-fluid",
      src: "".concat(url, "?ts=").concat(Date.now())
    }))), _react["default"].createElement("div", null, _react["default"].createElement("a", {
      className: "text-secondary",
      href: url,
      target: "_blank",
      rel: "noopener noreferrer"
    }, "Click to view the original image.")));
  }

  return _react["default"].createElement(Modal, {
    id: id,
    title: title
  }, child);
};

var ImageLinkModal = function ImageLinkModal(_ref3) {
  var id = _ref3.id,
      title = _ref3.title,
      url = _ref3.url;

  if (!url || url === 'None') {
    return _react["default"].createElement("span", null, "No Image");
  }

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_reactRouterDom.Link, {
    to: "show-".concat(id),
    "data-toggle": "modal",
    "data-target": '#' + id
  }, "Click to view"), _react["default"].createElement(ImageModal, {
    id: id,
    title: title,
    url: url
  }));
};

exports.ImageLinkModal = ImageLinkModal;