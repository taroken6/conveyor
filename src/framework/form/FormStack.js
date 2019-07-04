import React from 'react'
import * as R from 'ramda'

const FormStack = ({ stack, onChange, onCancel, onModelCreate, ...props }) => {
  if (R.pathOr(0, ['stack', 'length'], stack) === 0) {
    // TODO
    return <p>empty stack</p>
  }

  const stackIndex = R.prop('index', stack)
  const frame = R.path(['stack', stackIndex], stack)
  const modelName = R.prop('modelName', frame)

  // No longer need to explicity add all create forms in one spot
  // Fix in the createForm stack ticket
  const CreateForm = false

  if (CreateForm) {
    return <CreateForm {...{
      form: R.prop('form', frame),
      stackIndex: R.prop('index', stack),
      onChange: payload => onChange({
        index: stackIndex,
        ...payload
      }),
      onCancel: () => onCancel({
        index: stackIndex
      }),
      onModelCreate
    }} />
  } else {
    return <p>{modelName} create form override not set</p>
  }
}
