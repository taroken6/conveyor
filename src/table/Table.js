import React from 'react'
import Field from './Field'
import { THead } from './Header'
import { getCellOverride, isDeletable, isFieldEditable, isTableEditable, isRowEditable } from '../Utils'
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
  ...props
}) => {
  const actions = getActions(schema, modelName)
  const onEditCancel = R.path(['edit', 'onTableEditCancel'], actions)
  return (<tbody>
    {data.map((node, idx) => {
      const editable = isRowEditable({ schema, modelName, rowData: node, ...props })
      return (
        <tr key={`table-tr-${node.id}`}>
          {fieldOrder.map((fieldName, headerIdx) => {
            if (isEditing(editData, modelName, node.id) && isFieldEditable({ schema, modelName, fieldName, rowData: node, ...props })) {
              const fieldEditData = getFieldEditData(editData, modelName, fieldName, node.id)
              const error = getFieldErrorEdit(editData, modelName, fieldName, node.id)
              return (<td key={`${node.id}-${headerIdx}`}>
                <EditInput {...{
                  schema,
                  modelName,
                  fieldName,
                  node,
                  editData: fieldEditData,
                  error,
                  selectOptions
                }} /></td>
              )
            }
            const Override = getCellOverride(schema, modelName, fieldName)
            if (Override) {
              return (<td key={`${node.id}-${headerIdx}`}>
                <Override
                  {...{ schema, modelName, fieldName, parentModelName, data: node, id: node.id }}
                />
              </td>)
            }
            // Add DetailLink to the field that is marked as the displayField
            if (detailField === fieldName) {
              const displayString = getDisplayValue({ schema, modelName, data: node })
              return (<td key={`${node.id}-${headerIdx}-detail`}>
                <DetailLink {...{ modelName, id: node.id }} >
                  {displayString}
                </DetailLink>
              </td>)
            }
            return (<td key={`${node.id}-${headerIdx}`}>
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
            </td>)
          })}
          { showButtonColumn({ deletable, editable: tableEditable, detailField }) &&
          <td key={`${node.id}-edit-delete`}>
            {isEditing(editData, modelName, node.id)
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
            }
          </td>
          }
        </tr>
      )
    })}
  </tbody>
  )
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

  const model = getModel(schema, modelName)
  const schemaDefinedLinkField = R.prop('tableLinkField', model)
  const deletable = isDeletable({ schema, modelName, ...props })

  // If the schema explicitly defines a field that is not found, raise an error
  if (schemaDefinedLinkField && !fieldOrder.includes(schemaDefinedLinkField)) {
    throw new Error('Schema attribute for displayField does not exist in fieldOrder.')
  }

  // If the schema does not define a displayField then check if there is a name field
  const detailField = schemaDefinedLinkField || (fieldOrder.includes('name') ? 'name' : null)

  const editable = isTableEditable({ schema, modelName, data, ...props })

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
