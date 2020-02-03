"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optimizeSelect = void 0;

var _reactSelect = require("react-select");

var _react = _interopRequireDefault(require("react"));

var _reactWindow = require("react-window");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var OptimizedMenuList = function OptimizedMenuList(props) {
  var options = props.options,
      children = props.children,
      maxHeight = props.maxHeight,
      getValue = props.getValue;
  if (!children || !Array.isArray(children)) return null;
  var height = 38;

  var _getValue = getValue(),
      _getValue2 = _slicedToArray(_getValue, 1),
      value = _getValue2[0];

  var initialOffset = value ? options.indexOf(value) * height : 0;
  return _react["default"].createElement(_reactWindow.FixedSizeList, {
    width: '' // 100% width
    ,
    height: Math.min(maxHeight, height * children.length),
    itemCount: children.length,
    itemSize: height,
    initialScrollOffset: initialOffset
  }, function (_ref) {
    var index = _ref.index,
        style = _ref.style;
    return _react["default"].createElement("div", {
      className: "select-option-wrapper",
      style: style
    }, children[index]);
  });
};

var OptimizedOption = function OptimizedOption(props) {
  delete props.innerProps.onMouseMove;
  delete props.innerProps.onMouseOver;
  return _react["default"].createElement(_reactSelect.components.Option, props, props.children);
};

var optimizeSelect = {
  components: {
    MenuList: OptimizedMenuList,
    Option: OptimizedOption
  }
};
exports.optimizeSelect = optimizeSelect;