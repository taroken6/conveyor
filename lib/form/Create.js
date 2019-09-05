'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCreateLabel = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _schemaGetters = require('../utils/schemaGetters');

var _Breadcrumbs = require('./Breadcrumbs');

var _getType = require('../utils/getType');

var _Detail = require('../Detail');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var getFieldErrorCreate = function getFieldErrorCreate(_ref) {
  var formStack = _ref.formStack,
      stackIndex = _ref.stackIndex,
      fieldName = _ref.fieldName;
  return R.path(['stack', stackIndex, 'errors', fieldName], formStack);
};

var makeCreateLabel = exports.makeCreateLabel = function makeCreateLabel(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      fieldName = _ref2.fieldName,
      props = _objectWithoutProperties(_ref2, ['schema', 'modelName', 'fieldName']);

  var type = R.prop('type', (0, _schemaGetters.getField)(schema, modelName, fieldName));
  if (R.type(type) !== 'Object') {
    return null;
  }
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onStackCreate = R.path(['create', 'onStackCreate'], actions);
  var targetModel = R.path([modelName, 'fields', fieldName, 'type', 'target'], schema);

  var onClick = function onClick() {
    return onStackCreate({ modelName: targetModel });
  };

  var CreateLabel = (0, _Input.relationshipLabelFactory)({ schema: schema, modelName: modelName, fieldName: fieldName, onClick: onClick, ...props });
  return CreateLabel;
};

// TODO: improve the way the disabled fields are handled, instead of directly
// holding value at ['stack', index, 'fields', 'fieldName'], hold an object
// with disabled and value key. This will also allow for other metadata to
// be held there if necessary
var isFieldDisabled = function isFieldDisabled(_ref3) {
  var schema = _ref3.schema,
      modelName = _ref3.modelName,
      fieldName = _ref3.fieldName,
      form = _ref3.form;

  var type = (0, _getType.getType)({ schema: schema, modelName: modelName, fieldName: fieldName });

  if (type.includes('ToMany')) {
    return R.path(['fields', fieldName, 0, 'disabled'], form);
  } else {
    return R.path(['fields', fieldName, 'disabled'], form);
  }
};

var getDisabledValue = function getDisabledValue(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      fieldName = _ref4.fieldName,
      form = _ref4.form;

  var type = (0, _getType.getType)({ schema: schema, modelName: modelName, fieldName: fieldName });

  if (type.includes('ToMany')) {
    return R.path(['fields', fieldName, 0, 'label'], form);
  } else {
    return R.path(['fields', fieldName, 'label'], form);
  }
};

var Create = function Create(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      formStack = _ref5.formStack,
      selectOptions = _ref5.selectOptions,
      getEnumOptions = _ref5.getEnumOptions,
      props = _objectWithoutProperties(_ref5, ['schema', 'modelName', 'formStack', 'selectOptions', 'getEnumOptions']);

  var stackIndex = R.prop('index', formStack);
  var originFieldName = R.prop('originFieldName', formStack);

  if (stackIndex === -1) {
    return _react2.default.createElement(_reactRouterDom.Redirect, { to: R.propOr('/', 'originPath', formStack) });
  }
  var origin = R.prop('originModelName', formStack);

  var fieldOrder = (0, _schemaGetters.getCreateFields)({ schema: schema, modelName: modelName, ...props });
  if (origin && stackIndex === 0) {
    var index = fieldOrder.indexOf(originFieldName);
    if (index !== -1) {
      fieldOrder.splice(index, 1);
    }
    fieldOrder.splice(0, 0, originFieldName);
  }
  var stack = R.prop('stack', formStack);
  var form = R.prop(stackIndex, stack);
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onChange = R.path(['create', 'onInputChange'], actions);
  var onCancel = R.path(['create', 'onCancel'], actions);
  var onSave = R.path(['create', 'onSave'], actions);
  var disableButtons = stackIndex !== stack.length - 1;

  return _react2.default.createElement(
    'div',
    { className: 'container' },
    _react2.default.createElement(_Breadcrumbs.Breadcrumbs, { schema: schema, formStack: formStack }),
    _react2.default.createElement(
      'h1',
      null,
      'Create ',
      (0, _Detail.getModelLabel)({ schema: schema, modelName: modelName, form: form })
    ),
    _react2.default.createElement(
      'div',
      null,
      '* Indicates a Required Field'
    ),
    _react2.default.createElement('br', null),
    _react2.default.createElement(
      'div',
      null,
      fieldOrder.map(function (fieldName) {
        var disabled = isFieldDisabled({ schema: schema, modelName: modelName, fieldName: fieldName, form: form });
        var value = disabled ? getDisabledValue({ schema: schema, modelName: modelName, fieldName: fieldName, form: form }) : R.path(['fields', fieldName], form);
        var error = getFieldErrorCreate({ formStack: formStack, stackIndex: stackIndex, fieldName: fieldName });

        return _react2.default.createElement(_Input2.default, _extends({ key: fieldName }, {
          schema: schema,
          modelName: modelName,
          fieldName: fieldName,
          value: value,
          error: error,
          selectOptions: selectOptions,
          getEnumOptions: getEnumOptions,
          onChange: onChange,
          disabled: disabled,
          formStack: formStack,
          customLabel: makeCreateLabel({ schema: schema, modelName: modelName, fieldName: fieldName, ...props }),
          ...props
        }));
      })
    ),
    disableButtons && _react2.default.createElement(
      'p',
      { className: 'text-danger' },
      'Cannot save or cancel until all subsequent creates are resolved.'
    ),
    _react2.default.createElement(
      'div',
      { className: 'btn-group' },
      _react2.default.createElement(
        'button',
        {
          className: 'btn btn-success',
          role: 'button',
          onClick: function onClick() {
            return onSave({ modelName: modelName });
          },
          disabled: disableButtons
        },
        'Submit'
      ),
      _react2.default.createElement(
        'button',
        {
          className: 'btn',
          role: 'button',
          onClick: function onClick() {
            return onCancel();
          },
          disabled: disableButtons
        },
        'Cancel'
      )
    )
  );
};

exports.default = Create;