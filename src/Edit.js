import React from 'react'
import * as R from 'ramda'
import { getActions } from './utils/schemaGetters'
import Input from './form/Input'
import ReactSVG from 'react-svg'

export const InlineEditButton = ({ onEditClick }) =>
  <ReactSVG
    src='/static/img/edit.svg'
    className='edit-icon'
    svgStyle={{ width: '20px', height: '20px' }}
    onClick={onEditClick}
  />

export const getFieldEditData = (editData, modelName, fieldName, id) => (
  R.path([modelName, id, fieldName, 'currentValue'], editData)
)

export const getFieldErrorEdit = (editData, modelName, fieldName, id) => (
  R.path([modelName, id, fieldName, 'errors'], editData)
)

export const isEditing = (editData, modelName, id) =>
  R.pathOr(false, [modelName, id], editData)

export const isFieldEditing = (editData, modelName, id, fieldName) => {
  const idEditData = R.pathOr({}, [modelName, id], editData)
  return fieldName in idEditData
}

const EditButton = ({ onClick }) => {
  return (
    <button
      className='btn btn-sm btn-outline-success'
      onClick={onClick}>
            Edit
    </button>
  )
}

export const RowEditButton = ({ schema, modelName, id, node }) => {
  const actions = getActions(schema, modelName)
  const onEditClick = R.path(['edit', 'onTableRowEdit'], actions)
  return (
    <EditButton {...{ onClick: () => onEditClick({ modelName, id, node }) }} />
  )
}

export const TableEditButton = ({ schema, modelName, id, fieldName, node }) => {
  const actions = getActions(schema, modelName)
  const onEditClick = R.path(['edit', 'onAttributeEdit'], actions)

  return <EditButton {...{ onClick: () => onEditClick({ modelName, id, fieldName, value: R.prop(fieldName, node) }) }} />
}

export const EditSaveButton = ({ onClick }) => {
  return (
    <button className='btn btn-sm btn-success'
      onClick={onClick}
    >Save</button>
  )
}

export const EditCancelButton = ({ onClick }) => {
  return (
    <button className='btn btn-sm btn'
      onClick={onClick}
    >Cancel</button>
  )
}

export const EditInput = ({ schema, modelName, fieldName, node, editData, error, selectOptions }) => {
  const actions = getActions(schema, modelName)
  const onEditInputChange = R.path(['edit', 'onEditInputChange'], actions)
  return <Input key={fieldName} {...{
    selectOptions,
    schema,
    onChange: ({ ...props }) => onEditInputChange({ id: node.id, modelName, ...props }),
    fieldName,
    modelName,
    value: editData,
    error,
    inline: true
  }} />
}

export const InlineInput = ({ ...props }) => {
  return <div className='detail-edit d-inline-block pull-left'>
    <EditInput {...{ ...props }} />
  </div>
}
