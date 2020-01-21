"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RelTooltipContent = void 0;

var _reactTippy = require("react-tippy");

var _react = _interopRequireDefault(require("react"));

var _schemaGetters = require("./utils/schemaGetters");

var R = _interopRequireWildcard(require("ramda"));

var _reactRouterDom = require("react-router-dom");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RelTooltipContent = function RelTooltipContent(_ref) {
  var data = _ref.data;

  if (data.length === 0) {
    return _react["default"].createElement("span", null, "...loading");
  }

  return _react["default"].createElement("table", {
    className: "table table-sm table-bordered table-striped tooltip-table"
  }, _react["default"].createElement("tbody", null, data.map(function (_ref2) {
    var name = _ref2.name,
        value = _ref2.value;
    return _react["default"].createElement("tr", {
      key: "tooltip-".concat(name)
    }, _react["default"].createElement("td", null, name), _react["default"].createElement("td", null, value.map(function (oneValue, idx) {
      return _react["default"].createElement("span", {
        key: "".concat(name, "-").concat(idx)
      }, oneValue.url ? _react["default"].createElement(_reactRouterDom.Link, {
        to: oneValue.url
      }, oneValue.text) : oneValue.text, value.length - 1 > idx && ', ');
    })));
  })));
};
/** @type { React.StatelessComponent<{ fieldName: string, schema: any, id: string, modelName: string, data: {name: string, value: {text: string, url?: string}}[], interactive: boolean, tooltipOpened: function> } */


exports.RelTooltipContent = RelTooltipContent;

var RelTooltip = function RelTooltip(_ref3) {
  var schema = _ref3.schema,
      modelName = _ref3.modelName,
      id = _ref3.id,
      data = _ref3.data,
      children = _ref3.children;
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var tooltipOpened = R.path(['tooltip', 'onTooltipOpen'], actions); // const formattedData =

  return _react["default"].createElement(_reactTippy.Tooltip, {
    useContext: true,
    interactive: true,
    html: _react["default"].createElement(RelTooltipContent, {
      data: data
    }),
    delay: 0,
    theme: "light",
    onShow: function onShow() {
      return tooltipOpened({
        modelName: modelName,
        id: id
      });
    },
    popperOptions: {
      modifiers: {
        preventOverflow: {
          boundariesElement: 'viewport'
        }
      }
    }
  }, children);
};

var _default = RelTooltip;
exports["default"] = _default;