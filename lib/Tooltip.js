'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RelTooltipContent = undefined;

var _reactTippy = require('react-tippy');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _schemaGetters = require('./utils/schemaGetters');

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

var _reactRouterDom = require('react-router-dom');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RelTooltipContent = exports.RelTooltipContent = function RelTooltipContent(_ref) {
  var data = _ref.data;

  if (data.length === 0) {
    return _react2.default.createElement(
      'span',
      null,
      '...loading'
    );
  }
  return _react2.default.createElement(
    'table',
    { className: 'table table-sm table-bordered table-striped tooltip-table' },
    _react2.default.createElement(
      'tbody',
      null,
      data.map(function (_ref2) {
        var name = _ref2.name,
            value = _ref2.value;
        return _react2.default.createElement(
          'tr',
          { key: 'tooltip-' + name },
          _react2.default.createElement(
            'td',
            null,
            name
          ),
          _react2.default.createElement(
            'td',
            null,
            value.map(function (oneValue, idx) {
              return _react2.default.createElement(
                'span',
                { key: name + '-' + idx },
                oneValue.url ? _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: oneValue.url },
                  oneValue.text
                ) : oneValue.text,
                value.length - 1 > idx && ', '
              );
            })
          )
        );
      })
    )
  );
};

/** @type { React.StatelessComponent<{ fieldName: string, schema: any, id: string, modelName: string, html: any, data: {name: string, value: {text: string, url?: string}}[], interactive: boolean, tooltipOpened: function> } */
var RelTooltip = function RelTooltip(_ref3) {
  var schema = _ref3.schema,
      modelName = _ref3.modelName,
      id = _ref3.id,
      data = _ref3.data,
      children = _ref3.children,
      html = _ref3.html;

  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var tooltipOpened = R.path(['tooltip', 'onTooltipOpen'], actions);
  // const formattedData =
  return _react2.default.createElement(
    _reactTippy.Tooltip,
    {
      useContext: true,
      interactive: true,
      html: _react2.default.createElement(RelTooltipContent, { data: data }),
      delay: 0,
      theme: 'light',
      onShow: function onShow() {
        return tooltipOpened({ modelName: modelName, id: id });
      },
      popperOptions: {
        modifiers: {
          preventOverflow: {
            boundariesElement: 'viewport'
          }
        }
      }
    },
    children
  );
};

exports.default = RelTooltip;