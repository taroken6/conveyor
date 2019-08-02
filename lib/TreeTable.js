'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRows = exports.formatCSS = exports.toggleState = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

var _reactSvg = require('react-svg');

var _reactSvg2 = _interopRequireDefault(_reactSvg);

var _reactTippy = require('react-tippy');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var toggleState = exports.toggleState = {
  EXPAND: 'expand', // expanded row
  MINIMIZE: 'minimize', // row can be expanded
  HIDDEN: 'hidden' // row has no children


  // specify CSS for first column and rest of columns
};var formatCSS = exports.formatCSS = function formatCSS(first, rest) {
  return {
    firstCSS: first,
    restCSS: rest
  };
};

var makeOnClick = function makeOnClick(stateNode, toggleRow) {
  if (stateNode.toggle === toggleState.HIDDEN) {
    return false;
  }

  var onClick = function onClick(e) {
    e.stopPropagation();
    toggleRow(stateNode.id);
  };
  return onClick;
};

// returns only the nodes of tree.state to be rendered
var filterTree = function filterTree(tree) {
  var traverse = function traverse(stateNode) {
    var retNode = { ...stateNode, children: [] // initially exclude children
    };if (stateNode.toggle === toggleState.EXPAND) {
      retNode.children = stateNode.children.map(traverse);
    }
    return retNode;
  };

  return R.prop('state', tree).map(traverse);
};

var Indentation = function Indentation(_ref) {
  var depth = _ref.depth;

  var padding = depth * 20;
  return _react2.default.createElement('span', { style: { paddingLeft: padding + 'px' } });
};

var ToggleContainer = function ToggleContainer(_ref2) {
  var stateNode = _ref2.stateNode,
      toggleRow = _ref2.toggleRow,
      children = _ref2.children;

  if (stateNode.toggle === toggleState.HIDDEN) {
    return _react2.default.createElement(
      _react2.default.Fragment,
      null,
      children
    );
  }

  var tooltip = '';
  if (stateNode.toggle === toggleState.MINIMIZE) {
    tooltip = 'Show';
  } else if (stateNode.toggle === toggleState.EXPAND) {
    tooltip = 'Hide';
  }

  var handleClick = makeOnClick(stateNode, toggleRow);

  var component = _react2.default.createElement(
    'div',
    { style: { cursor: 'pointer' }, onClick: handleClick },
    children
  );

  return _react2.default.createElement(
    _reactTippy.Tooltip,
    {
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
    },
    component
  );
};

var Toggle = function Toggle(_ref3) {
  var stateNode = _ref3.stateNode,
      toggleRow = _ref3.toggleRow,
      iconPath = _ref3.iconPath;

  var svgStyle = { width: '18px', height: '18px' };

  var component = void 0;
  switch (stateNode.toggle) {
    case toggleState.EXPAND:
      component = _react2.default.createElement(_reactSvg2.default, { src: iconPath('angle-down'), svgStyle: svgStyle });
      break;
    case toggleState.MINIMIZE:
      component = _react2.default.createElement(_reactSvg2.default, { src: iconPath('angle-right'), svgStyle: svgStyle });
      break;
    case toggleState.HIDDEN:
      component = _react2.default.createElement(_reactSvg2.default, { src: iconPath('angle-right'), svgStyle: svgStyle, svgClassName: 'invisible' });
      break;
  }

  return _react2.default.createElement(
    ToggleContainer,
    { stateNode: stateNode, toggleRow: toggleRow },
    component
  );
};

// render a single row
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
    return renderField({ ...renderFieldProps, tree: tree, node: node, columnField: columnField, stateNode: stateNode });
  }).filter(function (col) {
    return col !== null;
  });

  var handleClick = makeOnClick(stateNode, toggleRow);
  var firstColCSS = R.prop('firstCSS', rowCSS);
  var restColCSS = R.prop('restCSS', rowCSS);

  return _react2.default.createElement(
    'tr',
    null,
    _react2.default.createElement(
      'td',
      { className: firstColCSS ? firstColCSS(node) : '', onClick: handleClick || undefined },
      _react2.default.createElement(
        'div',
        { style: { display: 'flex' } },
        _react2.default.createElement(Indentation, { depth: stateNode.depth }),
        _react2.default.createElement(Toggle, { stateNode: stateNode, toggleRow: toggleRow, iconPath: iconPath }),
        fields[0]
      )
    ),
    fields.slice(1).map(function (field, index) {
      return _react2.default.createElement(
        'td',
        { className: restColCSS ? restColCSS(node) : '', key: index },
        field
      );
    })
  );
};

// returns a list of <tr> elements
var getRows = exports.getRows = function getRows(_ref5) {
  var tree = _ref5.tree,
      props = _objectWithoutProperties(_ref5, ['tree']);

  var renderRows = function renderRows(stateNode) {
    var row = {
      key: R.prop('id', stateNode),
      component: renderRow({
        tree: tree, stateNode: stateNode, ...props
      })
    };

    var childRows = stateNode.children.map(renderRows);
    return [row, childRows];
  };

  var filteredTree = filterTree(tree);

  // get row components
  var rows = R.flatten(filteredTree.map(renderRows));

  return rows.map(function (row) {
    return _react2.default.createElement(
      _react2.default.Fragment,
      { key: row.key },
      row.component
    );
  });
};