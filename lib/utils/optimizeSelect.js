"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optimizeSelect = void 0;

var _reactSelect = require("react-select");

var _react = _interopRequireDefault(require("react"));

var _reactWindow = require("react-window");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var OptimizedMenuList = function OptimizedMenuList(props) {
  var options = props.options,
      children = props.children,
      maxHeight = props.maxHeight,
      getValue = props.getValue;
  var height = 35;
  var selectedValues = getValue();
  var initialOffset = selectedValues[0] ? options.indexOf(selectedValues[0]) * height : 0;
  return _react["default"].createElement(_reactWindow.FixedSizeList, {
    width: '',
    height: maxHeight,
    itemCount: children.length,
    itemSize: height,
    initialScrollOffset: initialOffset
  }, function (_ref) {
    var index = _ref.index,
        style = _ref.style;
    return _react["default"].createElement("div", {
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