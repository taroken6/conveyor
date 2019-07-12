'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Breadcrumbs = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

var _schemaGetters = require('../utils/schemaGetters');

var _Detail = require('../Detail');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Breadcrumbs = exports.Breadcrumbs = function Breadcrumbs(_ref) {
  var schema = _ref.schema,
      formStack = _ref.formStack;

  var stack = R.prop('stack', formStack);
  var index = R.prop('index', formStack);
  return _react2.default.createElement(
    'nav',
    { 'aria-label': 'breadcrumbs', style: { width: '100%' } },
    _react2.default.createElement(
      'ol',
      { className: 'breadcrumb' },
      stack.map(function (crumb, idx) {
        var modelName = R.prop('modelName', crumb);
        var actions = (0, _schemaGetters.getActions)(schema, modelName);
        var modelDisplayname = (0, _Detail.getModelLabel)({ schema: schema, modelName: modelName });
        var onBreadcrumbClick = R.path(['create', 'onBreadcrumbClick'], actions);
        return _react2.default.createElement(
          'li',
          { className: 'breadcrumb-item ' + (index === idx && 'active'), key: 'create-breadcrumb-' + idx },
          index === idx && modelDisplayname,
          index !== idx && _react2.default.createElement(
            'a',
            { href: '#', onClick: function onClick(evt) {
                return onBreadcrumbClick({ index: idx });
              } },
            modelDisplayname
          )
        );
      })
    )
  );
};