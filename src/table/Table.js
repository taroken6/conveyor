import React from 'react'
import Field from './Field'
import { THead } from './Header'
import { getCellOverride, isTableDeletable, isFieldEditable, isTableEditable, isRowEditable } from '../Utils'
import * as R from 'ramda'
import DetailLink from '../DetailLink'
import { Link } from 'react-router-dom'
import { getModel, getActions } from '../utils/schemaGetters'
import { DeleteDetail } from '../delete/DeleteDetail'

import {
  RowEditButton,
  EditSaveButton,
  EditCancelButton,
  EditInput,
  isEditing,
  getFieldEditData,
  getFieldErrorEdit
} from '../Edit'
import getDisplayValue from '../utils/getDisplayValue'

export const DetailViewButton = ({ modelName, id }) => (
  <Link
    to={`/${modelName}/${id}`}
    className='btn btn-sm btn-outline-primary'
  >View</Link>
)

export const DeleteButton = ({
  schema,
  modelName,
  id,
  onDelete,
  modalId,
  parentId,
  parentModelName,
  modalData
}) => {
  const actions = getActions(schema, modelName)
  const onDeleteWarning = R.path(['delete', 'onDeleteWarning'], actions)

  return (
    <div>
      <button
        className='btn btn-sm btn-outline-danger'
        data-toggle='modal'
        data-target={'#' + modalId}
        onClick={() => onDeleteWarning({ modelName, id })}
      >Delete</button>
      <DeleteDetail {...{
        schema,
        id,
        modalId,
        title: 'Confirm Delete',
        modelName,
        onDelete,
        parentId,
        parentModelName,
        modalStore: R.prop('Delete', modalData)

      }} />
    </div>
  )
}

export const showButtonColumn = ({ deletable, editable, detailField }) => {
  /* Check if any of the possible buttons are being displayed */
  return deletable || editable || R.isNil(detailField)
}

export const TableButtonGroup = ({
  schema,
  modelName,
  node,
  detailField,
  editable,
  parentId,
  idx,
  modalData,
  parentModelName,
  parentFieldName,
  deletable,
  onDelete
}) => {
  return (<div className='btn-group'>
    {
      // If detailField is null then use the detailButton
      R.isNil(detailField) && <DetailViewButton {...{ modelName, id: node.id }} />
    }
    {
      editable && <RowEditButton {...{
        schema,
        modelName,
        id: node.id,
        node
      }} />
    }
    {
      deletable && <DeleteButton {...{
        schema,
        modelName,
        onDelete,
        parentId,
        parentModelName,
        id: node.id,
        modalId: 'confirm-delete-' + modelName + parentFieldName + idx,
        modalData
      }} />
    }
  </div>)
}

export const TableRowWithEdit = ({ modelName, fieldName, parentModelName, node, schema, detailField, editData, tooltipData, selectOptions, headerIdx, user }) => {
  if (isEditing(editData, modelName, node.id) && isFieldEditable({ schema, modelName, fieldName, node, user })) {
    const fieldEditData = getFieldEditData(editData, modelName, fieldName, node.id)
    const error = getFieldErrorEdit(editData, modelName, fieldName, node.id)
    return (
      <EditInput {...{
        schema,
        modelName,
        fieldName,
        node,
        editData: fieldEditData,
        error,
        selectOptions
      }} />
    )
  }
  const Override = getCellOverride(schema, modelName, fieldName)
  if (Override) {
    return (
      <Override
        {...{ schema, modelName, fieldName, parentModelName, data: node, id: node.id }}
      />
    )
  }
  // Add DetailLink to the field that is marked as the displayField
  if (detailField === fieldName) {
    const displayString = getDisplayValue({ schema, modelName, data: node })
    return (
      <DetailLink {...{ modelName, id: node.id }} >
        {displayString}
      </DetailLink>
    )
  }
  return (
    <Field
      {...{
        schema,
        modelName,
        fieldName,
        parentModelName,
        node,
        tooltipData,
        id: node.id
      }}
    />
  )
}

export const TableButtonCell = ({ modelName, parentModelName, node, schema, detailField, editData, onEditSubmit, onEditCancel, deletable, editable, parentId, modalData, parentFieldName, onDelete, idx }) => {
  return (
    isEditing(editData, modelName, node.id)
    ? <div className='table-btn-group'>
      <div className='btn-group'>
        <EditSaveButton {...{
          onClick: (evt) => onEditSubmit({ modelName, id: node.id })
        }} />
        <EditCancelButton {...{
          onClick: (evt) => onEditCancel({ modelName, id: node.id })
        }} />
      </div>
    </div> : <TableButtonGroup {...{
      schema,
      modelName,
      node,
      detailField,
      deletable,
      editable,
      parentId,
      idx,
      modalData,
      parentModelName,
      parentFieldName,
      onDelete
    }} />
  )
}

export const TBody = ({
  schema,
  modelName,
  data, // ordered list
  fieldOrder,
  onDelete,
  onEditSubmit,
  parentId,
  parentModelName,
  parentFieldName,
  detailField,
  getModalStore,
  tooltipData,
  modalData,
  editData,
  tableEditable,
  deletable,
  selectOptions,
  user,
  ...props
}) => {
  // todo: fixed 'props' passing down 'node' as a value and overriding 'node' later on
  const actions = getActions(schema, modelName)
  const onEditCancel = R.path(['edit', 'onTableEditCancel'], actions)
  return (<tbody>
    {data.map((node, idx) => {
      const editable = isRowEditable({ schema, modelName, node, user, ...props })
      // do not pass '...props' into below component because contains 'node' from parent object: will conflict with new 'node' from data.map()
      return (
        <tr key={`table-tr-${node.id}`}>
          {fieldOrder.map((fieldName, headerIdx) => (
            <td key={`${node.id}-${headerIdx}`}>
              <TableRowWithEdit key={`table-td-${node.id}-${headerIdx}`} {...{
                modelName, fieldName, parentModelName, node, schema, detailField, editData, tooltipData, selectOptions, headerIdx, user
              }} />
            </td>
          ))}
          { showButtonColumn({ deletable, editable: tableEditable, detailField }) &&
          <td key={`${node.id}-edit-delete`}>
            { <TableButtonCell {...{
              modelName, parentModelName, node, schema, detailField, editData, onEditSubmit, onEditCancel, deletable, editable, parentId, modalData, parentFieldName, onDelete, idx
            }} /> }
          </td>
          }
        </tr>
      )
    })}
  </tbody>
  )
}

export const calcDetailField = ({schema, modelName, fieldOrder}) => {
  const model = getModel(schema, modelName)
  const schemaDefinedLinkField = R.prop('tableLinkField', model)

  // If the schema explicitly defines a field that is not found, raise an error
  if (schemaDefinedLinkField && !fieldOrder.includes(schemaDefinedLinkField)) {
    throw new Error('Schema attribute for displayField does not exist in fieldOrder.')
  }
  // If the schema does not define a displayField then check if there is a name field
  return schemaDefinedLinkField || (fieldOrder.includes('name') ? 'name' : null)
}

/* Generic Overidable Table. To Override th/td pass in Table with <thead>/<tbody> component overriden. */
export const Table = ({
  schema,
  modelName,
  data, // ordered list
  fieldOrder,
  onDelete,
  onEditSubmit,
  modalData,
  editData,
  selectOptions,
  parentId,
  parentModelName,
  parentFieldName,
  tooltipData,
  Head = THead,
  Body = TBody,
  ...props
}) => {
  if (!data) { return <div>...Loading</div> }

  if (data.length === 0) { return <div>N/A</div> }

  const deletable = isTableDeletable({ schema, modelName, data, ...props })
  const detailField = calcDetailField({schema, modelName, fieldOrder})
  const editable = isTableEditable({ schema, modelName, data, ...props })
  const sortable = R.path([modelName, 'sortable'], schema)

  return (
    <table className='table table-striped table-bordered table-hover'>
      <Head {...{
        schema,
        modelName,
        fieldOrder,
        data,
        deletable,
        editable,
        detailField,
        sortable,
        ...props
      }} />
      <Body {...{
        schema,
        modelName,
        data,
        onDelete,
        onEditSubmit,
        fieldOrder,
        detailField,
        tooltipData,
        parentId,
        parentModelName,
        parentFieldName,
        modalData,
        selectOptions,
        editData,
        deletable,
        tableEditable: editable,
        ...props
      }} />
    </table>
  )
}
