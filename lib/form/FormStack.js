'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FormStack = function FormStack(_ref) {
  var stack = _ref.stack,
      _onChange = _ref.onChange,
      _onCancel = _ref.onCancel,
      onModelCreate = _ref.onModelCreate,
      props = _objectWithoutProperties(_ref, ['stack', 'onChange', 'onCancel', 'onModelCreate']);

  if (R.pathOr(0, ['stack', 'length'], stack) === 0) {
    // TODO
    return _react2.default.createElement(
      'p',
      null,
      'empty stack'
    );
  }

  var stackIndex = R.prop('index', stack);
  var frame = R.path(['stack', stackIndex], stack);
  var modelName = R.prop('modelName', frame);

  // No longer need to explicity add all create forms in one spot
  // Fix in the createForm stack ticket
  var CreateForm = false;

  if (CreateForm) {
    return _react2.default.createElement(CreateForm, {
      form: R.prop('form', frame),
      stackIndex: R.prop('index', stack),
      onChange: function onChange(payload) {
        return _onChange({
          index: stackIndex,
          ...payload
        });
      },
      onCancel: function onCancel() {
        return _onCancel({
          index: stackIndex
        });
      },
      onModelCreate: onModelCreate
    });
  } else {
    return _react2.default.createElement(
      'p',
      null,
      modelName,
      ' create form override not set'
    );
  }
};