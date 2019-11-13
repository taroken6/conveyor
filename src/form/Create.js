import React from 'react'
import { Redirect } from 'react-router-dom'
import * as R from 'ramda'
import Input, { relationshipLabelFactory } from './Input'
import { getActions, getField, getCreateFields, getModelLabel, getFieldConditions } from '../utils/schemaGetters'
import { Breadcrumbs } from './Breadcrumbs'
import { getType } from '../utils/getType'
import { isAutoFocusInput } from '../input/index'
import { getInputType } from '../form/InputType'
import { getCreateOverride, skipOverride, getCreateTitleOverride, getCreatePageOverride, shouldDisplay, isFieldDisabled } from '../Utils'

const getFieldErrorCreate = ({ formStack, stackIndex, fieldName }) => (
  R.path(['stack', stackIndex, 'errors', fieldName], formStack)
)

export const makeCreateLabel = ({ schema, modelName, fieldName, user, customProps }) => {
  const type = R.prop('type', getField(schema, modelName, fieldName))
  if (R.type(type) !== 'Object') {
    return null
  }
  const actions = getActions(schema, modelName)
  const onStackCreate = R.path(['create', 'onStackCreate'], actions)
  const targetModel = R.path([modelName, 'fields', fieldName, 'type', 'target'], schema)

  const onClick = () => onStackCreate({ modelName: targetModel })

  const CreateLabel = relationshipLabelFactory({ schema, modelName, fieldName, onClick, user, customProps })
  return CreateLabel
}

const getDisabledValue = ({ schema, modelName, fieldName, form }) => {
  const type = getType({ schema, modelName, fieldName })

  if (type.includes('ToMany')) {
    return R.path(['fields', fieldName, 0, 'label'], form)
  } else {
    return R.path(['fields', fieldName, 'label'], form)
  }
}

const DefaultCreateTitle = ({ schema, modelName, formStack, customProps }) => {
  const stackIndex = R.prop('index', formStack)
  const stack = R.prop('stack', formStack)
  const form = R.prop(stackIndex, stack)
  return (
    <h1>Create {getModelLabel({ schema, modelName, form, formStack, customProps })}</h1>
  )
}

const DefaultCreatePage = ({
  schema,
  modelName,
  formStack,
  selectOptions,
  user,
  customProps
}) => {
  const stackIndex = R.prop('index', formStack)
  const originFieldName = R.prop('originFieldName', formStack)
  const stack = R.prop('stack', formStack)
  const form = R.prop(stackIndex, stack)
  customProps = R.assoc('form', form, customProps)

  const origin = R.prop('originModelName', formStack)

  const fieldOrder = getCreateFields({ schema, modelName, user, customProps })
  if (origin && stackIndex === 0) {
    const index = fieldOrder.indexOf(originFieldName)
    if (index !== -1) {
      fieldOrder.splice(index, 1)
    }
    fieldOrder.splice(0, 0, originFieldName)
  }

  const actions = getActions(schema, modelName)
  const onChange = R.path(['create', 'onInputChange'], actions)
  const onCancel = R.path(['create', 'onCancel'], actions)
  const onSave = R.path(['create', 'onSave'], actions)
  const disableButtons = stackIndex !== stack.length - 1
  let autoFocusAdded = false

  const onKeyDown = evt => {
    if (evt.key === 'Enter') {
      return onSave({ modelName })
    }
  }
  return (
    <React.Fragment>
      <div>* Indicates a Required Field</div>
      <br />
      <div>
        {fieldOrder.map(fieldName => {
          const displayCondition = R.prop('create', getFieldConditions(schema, modelName, fieldName))
          if (shouldDisplay({schema, modelName, fieldName, user, displayCondition, customProps}) === false) {
              return null
          }

          const disabled = isFieldDisabled({
            schema,
            modelName,
            fieldName,
            form,
            customProps
          })
          const value = disabled
            ? getDisabledValue({ schema, modelName, fieldName, form })
            : R.path(['fields', fieldName], form)
          const error = getFieldErrorCreate({
            formStack,
            stackIndex,
            fieldName
          })
          let autoFocus = false
          if (
            !autoFocusAdded &&
            isAutoFocusInput(getInputType({ schema, modelName, fieldName }))
          ) {
            autoFocus = true
            autoFocusAdded = true
          }
          return (
            <Input
              key={fieldName}
              {...{
                schema,
                modelName,
                fieldName,
                value,
                error,
                selectOptions,
                onChange,
                disabled,
                formStack,
                customLabel: makeCreateLabel({
                  schema,
                  modelName,
                  fieldName,
                  user,
                  customProps
                }),
                autoFocus,
                onKeyDown,
                customProps
              }}
            />
          )
        })}
      </div>
      {disableButtons && (
        <p className='text-danger'>
          Cannot save or cancel until all subsequent creates are resolved.
        </p>
      )}
      <div className='btn-group'>
        <button
          className='btn btn-success'
          role='button'
          onClick={() => onSave({ modelName })}
          disabled={disableButtons}
        >
          Submit
        </button>
        <button
          className='btn'
          role='button'
          onClick={() => onCancel()}
          disabled={disableButtons}
        >
          Cancel
        </button>
      </div>
    </React.Fragment>
  )
}

const DefaultCreate = ({
  schema,
  modelName,
  formStack,
  selectOptions,
  user,
  customProps
}) => {
  const CreateTitleOverride = getCreateTitleOverride(schema, modelName)
  const CreatePageOverride = getCreatePageOverride(schema, modelName)

  const CreateTitle = CreateTitleOverride || DefaultCreateTitle
  const CreatePage = CreatePageOverride || DefaultCreatePage

  if (skipOverride(CreateTitleOverride) && skipOverride(CreatePageOverride)) {
    return null
  }

  return (
    <div className='container'>
      <Breadcrumbs
        schema={schema}
        formStack={formStack}
        customProps={customProps}
      />
      {skipOverride(CreateTitleOverride) ? null : (
        <CreateTitle
          {...{
            schema,
            modelName,
            formStack,
            selectOptions,
            user,
            customProps
          }}
        />
      )}
      {skipOverride(CreatePageOverride) ? null : (
        <CreatePage
          {...{
            schema,
            modelName,
            formStack,
            selectOptions,
            user,
            customProps
          }}
        />
      )}
    </div>
  )
}

const Create = ({
  schema,
  modelName,
  formStack,
  selectOptions,
  user,
  customProps
}) => {
  const CreateOverride = getCreateOverride(schema, modelName)

  const CreateComponent = CreateOverride || DefaultCreate

  if (R.prop('index', formStack) === -1) {
    return <Redirect to={R.propOr('/', 'originPath', formStack)} />
  }

  return skipOverride(CreateOverride) ? null : (
    <CreateComponent
      {...{ schema, modelName, formStack, selectOptions, user, customProps }}
    />
  )
}

export default Create
