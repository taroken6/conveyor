"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageLinkModal = exports.ImageModal = exports.Modal = void 0;

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
      url = _ref2.url,
      errorStatus = _ref2.errorStatus,
      errorString = _ref2.errorString;
  var child;

  if (errorStatus) {
    child = _react["default"].createElement("div", {
      className: "text-center"
    }, errorString);
  } else if (!url) {
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

exports.ImageModal = ImageModal;

var ImageLink = function ImageLink(_ref3) {
  var img = _ref3.img,
      buttonText = _ref3.buttonText,
      customButton = _ref3.customButton;

  if (customButton) {
    return customButton;
  }

  return _react["default"].createElement(_react["default"].Fragment, null, img && _react["default"].createElement("img", {
    className: "rounded",
    src: img,
    width: "30",
    height: "30"
  }), buttonText);
};

var ImageLinkModal = function ImageLinkModal(_ref4) {
  var id = _ref4.id,
      title = _ref4.title,
      url = _ref4.url,
      _ref4$errorStatus = _ref4.errorStatus,
      errorStatus = _ref4$errorStatus === void 0 ? false : _ref4$errorStatus,
      errorString = _ref4.errorString,
      img = _ref4.img,
      onClick = _ref4.onClick,
      _ref4$loading = _ref4.loading,
      loading = _ref4$loading === void 0 ? false : _ref4$loading,
      _ref4$buttonText = _ref4.buttonText,
      buttonText = _ref4$buttonText === void 0 ? 'Click to view' : _ref4$buttonText,
      customButton = _ref4.customButton;

  if ((!url || url === 'None') && !loading) {
    return _react["default"].createElement("span", null, "No Image");
  }

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_reactRouterDom.Link, {
    to: "show-".concat(id),
    "data-toggle": "modal",
    "data-target": '#' + id,
    onClick: onClick
  }, _react["default"].createElement(ImageLink, {
    img: img,
    buttonText: buttonText,
    customButton: customButton
  })), _react["default"].createElement(ImageModal, {
    id: id,
    title: title,
    url: url,
    errorStatus: errorStatus,
    errorString: errorString
  }));
};

exports.ImageLinkModal = ImageLinkModal;