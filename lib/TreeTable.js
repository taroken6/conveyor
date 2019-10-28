"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRows = exports.formatCSS = exports.toggleState = void 0;

var _react = _interopRequireDefault(require("react"));

var R = _interopRequireWildcard(require("ramda"));

var _reactSvg = _interopRequireDefault(require("react-svg"));

var _reactTippy = require("react-tippy");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var toggleState = {
  EXPAND: 'expand',
  // expanded row
  MINIMIZE: 'minimize',
  // row can be expanded
  HIDDEN: 'hidden' // row has no children

}; // specify CSS for first column and rest of columns

exports.toggleState = toggleState;

var formatCSS = function formatCSS(first, rest) {
  return {
    firstCSS: first,
    restCSS: rest
  };
};

exports.formatCSS = formatCSS;

var makeOnClick = function makeOnClick(stateNode, toggleRow) {
  if (stateNode.toggle === toggleState.HIDDEN) {
    return false;
  }

  var onClick = function onClick(e) {
    e.stopPropagation();
    toggleRow(stateNode.id);
  };

  return onClick;
}; // returns only the nodes of tree.state to be rendered


var filterTree = function filterTree(tree) {
  var traverse = function traverse(stateNode) {
    var retNode = _objectSpread({}, stateNode, {
      children: []
    }); // initially exclude children


    if (stateNode.toggle === toggleState.EXPAND) {
      retNode.children = stateNode.children.map(traverse);
    }

    return retNode;
  };

  return R.prop('state', tree).map(traverse);
};

var Indentation = function Indentation(_ref) {
  var depth = _ref.depth;
  var padding = depth * 20;
  return _react["default"].createElement("span", {
    style: {
      paddingLeft: "".concat(padding, "px")
    }
  });
};

var ToggleContainer = function ToggleContainer(_ref2) {
  var stateNode = _ref2.stateNode,
      toggleRow = _ref2.toggleRow,
      children = _ref2.children;

  if (stateNode.toggle === toggleState.HIDDEN) {
    return _react["default"].createElement(_react["default"].Fragment, null, children);
  }

  var tooltip = '';

  if (stateNode.toggle === toggleState.MINIMIZE) {
    tooltip = 'Show';
  } else if (stateNode.toggle === toggleState.EXPAND) {
    tooltip = 'Hide';
  }

  var handleClick = makeOnClick(stateNode, toggleRow);

  var component = _react["default"].createElement("div", {
    style: {
      cursor: 'pointer'
    },
    onClick: handleClick
  }, children);

  return _react["default"].createElement(_reactTippy.Tooltip, {
    title: tooltip,
    delay: 1000,
    hideDelay: 0,
    position: 'left',
    popperOptions: {
      modifiers: {
        preventOverflow: {
          boundariesElement: 'viewport'
        }
      }
    }
  }, component);
};

var Toggle = function Toggle(_ref3) {
  var stateNode = _ref3.stateNode,
      toggleRow = _ref3.toggleRow,
      iconPath = _ref3.iconPath;
  var svgStyle = {
    width: '18px',
    height: '18px'
  };
  var component;

  switch (stateNode.toggle) {
    case toggleState.EXPAND:
      component = _react["default"].createElement(_reactSvg["default"], {
        src: iconPath('angle-down'),
        svgStyle: svgStyle
      });
      break;

    case toggleState.MINIMIZE:
      component = _react["default"].createElement(_reactSvg["default"], {
        src: iconPath('angle-right'),
        svgStyle: svgStyle
      });
      break;

    case toggleState.HIDDEN:
      component = _react["default"].createElement(_reactSvg["default"], {
        src: iconPath('angle-right'),
        svgStyle: svgStyle,
        svgClassName: "invisible"
      });
      break;
  }

  return _react["default"].createElement(ToggleContainer, {
    stateNode: stateNode,
    toggleRow: toggleRow
  }, component);
}; // render a single row


var renderRow = function renderRow(_ref4) {
  var tree = _ref4.tree,
      stateNode = _ref4.stateNode,
      toggleRow = _ref4.toggleRow,
      iconPath = _ref4.iconPath,
      columnFields = _ref4.columnFields,
      renderFieldProps = _ref4.renderFieldProps,
      renderField = _ref4.renderField,
      rowCSS = _ref4.rowCSS;
  var nodeID = R.prop('id', stateNode);
  var node = R.path(['nodes', nodeID], tree);
  var fields = columnFields.map(function (columnField) {
    return renderField(_objectSpread({}, renderFieldProps, {
      tree: tree,
      node: node,
      columnField: columnField,
      stateNode: stateNode
    }));
  }).filter(function (col) {
    return col !== null;
  });
  var handleClick = makeOnClick(stateNode, toggleRow);
  var firstColCSS = R.prop('firstCSS', rowCSS);
  var restColCSS = R.prop('restCSS', rowCSS);
  return _react["default"].createElement("tr", null, _react["default"].createElement("td", {
    className: firstColCSS ? firstColCSS(node) : '',
    onClick: handleClick || undefined
  }, _react["default"].createElement("div", {
    style: {
      display: 'flex'
    }
  }, _react["default"].createElement(Indentation, {
    depth: stateNode.depth
  }), _react["default"].createElement(Toggle, {
    stateNode: stateNode,
    toggleRow: toggleRow,
    iconPath: iconPath
  }), fields[0])), fields.slice(1).map(function (field, index) {
    return _react["default"].createElement("td", {
      className: restColCSS ? restColCSS(node) : '',
      key: index
    }, field);
  }));
}; // returns a list of <tr> elements


var getRows = function getRows(_ref5) {
  var tree = _ref5.tree,
      props = _objectWithoutProperties(_ref5, ["tree"]);

  var renderRows = function renderRows(stateNode) {
    var row = {
      key: R.prop('id', stateNode),
      component: renderRow(_objectSpread({
        tree: tree,
        stateNode: stateNode
      }, props))
    };
    var childRows = stateNode.children.map(renderRows);
    return [row, childRows];
  };

  var filteredTree = filterTree(tree); // get row components

  var rows = R.flatten(filteredTree.map(renderRows));
  return rows.map(function (row) {
    return _react["default"].createElement(_react["default"].Fragment, {
      key: row.key
    }, row.component);
  });
};

exports.getRows = getRows;