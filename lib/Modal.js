'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageLinkModal = exports.ImageModal = exports.Modal = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modal = exports.Modal = function Modal(_ref) {
  var id = _ref.id,
      title = _ref.title,
      children = _ref.children;
  return _react2.default.createElement(
    'div',
    { className: 'modal fade', id: id, tabIndex: -1 },
    _react2.default.createElement(
      'div',
      { className: 'modal-dialog modal-lg' },
      _react2.default.createElement(
        'div',
        { className: 'modal-content' },
        _react2.default.createElement(
          'div',
          { className: 'modal-header' },
          _react2.default.createElement(
            'h5',
            { className: 'modal-title' },
            title
          ),
          _react2.default.createElement(
            'button',
            { type: 'button', className: 'close', 'data-dismiss': 'modal' },
            '\xD7'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'modal-body' },
          children
        )
      )
    )
  );
};

var ImageModal = exports.ImageModal = function ImageModal(_ref2) {
  var id = _ref2.id,
      title = _ref2.title,
      url = _ref2.url,
      errorStatus = _ref2.errorStatus,
      errorString = _ref2.errorString;

  var child = void 0;
  if (errorStatus) {
    child = _react2.default.createElement(
      'div',
      { className: 'text-center' },
      errorString
    );
  } else if (!url) {
    child = _react2.default.createElement(
      'div',
      { className: 'text-center' },
      '...generating image'
    );
  } else {
    child = _react2.default.createElement(
      'div',
      { className: 'text-center' },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'a',
          { href: url, target: '_blank', rel: 'noopener noreferrer' },
          _react2.default.createElement('img', { className: 'img-fluid', src: url + '?ts=' + Date.now() })
        )
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'a',
          { className: 'text-secondary', href: url, target: '_blank', rel: 'noopener noreferrer' },
          'Click to view the original image.'
        )
      )
    );
  }
  return _react2.default.createElement(
    Modal,
    { id: id, title: title },
    child
  );
};

var ImageLink = function ImageLink(_ref3) {
  var img = _ref3.img,
      buttonText = _ref3.buttonText,
      customButton = _ref3.customButton;

  if (customButton) {
    return customButton;
  }
  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    img && _react2.default.createElement('img', { className: 'rounded', src: img, width: '30', height: '30' }),
    buttonText
  );
};

var ImageLinkModal = exports.ImageLinkModal = function ImageLinkModal(_ref4) {
  var id = _ref4.id,
      title = _ref4.title,
      url = _ref4.url,
      _ref4$errorStatus = _ref4.errorStatus,
      errorStatus = _ref4$errorStatus === undefined ? false : _ref4$errorStatus,
      errorString = _ref4.errorString,
      img = _ref4.img,
      onClick = _ref4.onClick,
      _ref4$loading = _ref4.loading,
      loading = _ref4$loading === undefined ? false : _ref4$loading,
      _ref4$buttonText = _ref4.buttonText,
      buttonText = _ref4$buttonText === undefined ? 'Click to view' : _ref4$buttonText,
      customButton = _ref4.customButton;

  if ((!url || url === 'None') && !loading) {
    return _react2.default.createElement(
      'span',
      null,
      'No Image'
    );
  }

  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: 'show-' + id, 'data-toggle': 'modal', 'data-target': '#' + id, onClick: onClick },
      _react2.default.createElement(ImageLink, {
        img: img,
        buttonText: buttonText,
        customButton: customButton
      })
    ),
    _react2.default.createElement(ImageModal, { id: id, title: title, url: url, errorStatus: errorStatus, errorString: errorString })
  );
};