"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Breadcrumbs = void 0;

var _react = _interopRequireDefault(require("react"));

var R = _interopRequireWildcard(require("ramda"));

var _schemaGetters = require("../utils/schemaGetters");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Breadcrumbs = function Breadcrumbs(_ref) {
  var schema = _ref.schema,
      formStack = _ref.formStack,
      customProps = _ref.customProps;
  var stack = R.prop('stack', formStack);
  var index = R.prop('index', formStack);
  return _react["default"].createElement("nav", {
    "aria-label": "breadcrumbs",
    style: {
      width: '100%'
    }
  }, _react["default"].createElement("ol", {
    className: "breadcrumb"
  }, stack.map(function (crumb, idx) {
    var modelName = R.prop('modelName', crumb);
    var actions = (0, _schemaGetters.getActions)(schema, modelName);
    var modelDisplayName = (0, _schemaGetters.getModelLabel)({
      schema: schema,
      modelName: modelName,
      formStack: formStack,
      customProps: customProps
    });
    var onBreadcrumbClick = R.path(['create', 'onBreadcrumbClick'], actions);
    return _react["default"].createElement("li", {
      className: "breadcrumb-item ".concat(index === idx && 'active'),
      key: "create-breadcrumb-".concat(idx)
    }, index === idx && modelDisplayName, index !== idx && _react["default"].createElement("a", {
      href: "#",
      onClick: function onClick(evt) {
        return onBreadcrumbClick({
          index: idx
        });
      }
    }, modelDisplayName));
  })));
};

exports.Breadcrumbs = Breadcrumbs;