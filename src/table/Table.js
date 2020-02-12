import React from 'react'
import Field from './Field'
import { THead } from './Header'
import { TFoot } from './Footer'
import {
  getCellOverride,
  isTableDeletable,
  isFieldEditable,
  isTableEditable,
  isRowEditable,
  skipOverride,
  shouldDisplay
} from '../Utils'
import * as R from 'ramda'
import DetailLink from '../DetailLink'
import { Link } from 'react-router-dom'
import { getModel, getActions, getFieldConditions } from '../utils/schemaGetters'
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
import { IndexPagination, DetailPagination } from '../Pagination'

export const DetailViewButton = ({ modelName, id }) => (
  <Link to={`/${modelName}/${id}`} className="btn btn-sm btn-outline-primary">
    View
  </Link>
)

export const DeleteButton = ({ modalId, onDeleteWarning, modelName, id }) => {
  return (
    <button
      className="btn btn-sm btn-outline-danger"
      data-toggle="modal"
      data-target={'#' + modalId}
      onClick={() => onDeleteWarning({ modelName, id })}
    >
      Delete
    </button>
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
  onDelete,
  customProps
}) => {
  const actions = getActions(schema, modelName)
  const modalId = 'confirm-delete-' + modelName + parentFieldName + idx
  const id = node.id
  return (
    <React.Fragment>
      <div className="btn-group">
        {// If detailField is null then use the detailButton
          R.isNil(detailField) && <DetailViewButton {...{ modelName, id: node.id }} />}
        {editable && (
          <RowEditButton
            {...{
              schema,
              modelName,
              id: node.id,
              node
            }}
          />
        )}
        {deletable && (
          <DeleteButton
            {...{
              modalId,
              onDeleteWarning: R.path(['delete', 'onDeleteWarning'], actions),
              modelName,
              id
            }}
          />
        )}
      </div>
      {deletable && (
        <DeleteDetail
          {...{
            schema,
            id,
            modalId,
            modelName,
            onDelete,
            parentId,
            parentModelName,
            modalData,
            customProps
          }}
        />
      )}
    </React.Fragment>
  )
}

export const TableRowWithEdit = ({
  modelName,
  fieldName,
  parentModelName,
  node,
  schema,
  detailField,
  editData,
  tooltipData,
  selectOptions,
  modelStore,
  user,
  parentNode,
  customProps
}) => {
  if (
    isEditing(editData, modelName, node.id) &&
    isFieldEditable({
      schema,
      modelName,
      fieldName,
      node,
      user,
      parentNode,
      customProps
    })
  ) {
    const fieldEditData = getFieldEditData(editData, modelName, fieldName, node.id)
    const error = getFieldErrorEdit(editData, modelName, fieldName, node.id)
    return (
      <EditInput
        {...{
          schema,
          modelName,
          fieldName,
          node,
          editData: fieldEditData,
          error,
          selectOptions,
          modelStore,
          customProps
        }}
      />
    )
  }
  const Override = getCellOverride(schema, modelName, fieldName)
  if (skipOverride(Override)) {
    return null
  }
  if (Override) {
    return (
      <Override
        {...{
          schema,
          modelName,
          fieldName,
          parentModelName,
          node,
          tooltipData,
          id: node.id,
          customProps
        }}
      />
    )
  }
  // Add DetailLink to the field that is marked as the displayField
  if (detailField === fieldName) {
    const displayString = getDisplayValue({
      schema,
      modelName,
      parentModelName,
      node,
      customProps
    })
    return <DetailLink {...{ modelName, id: node.id }}>{displayString}</DetailLink>
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
        id: node.id,
        customProps
      }}
    />
  )
}

export const TableButtonCell = ({
  modelName,
  parentModelName,
  node,
  schema,
  detailField,
  editData,
  onEditSubmit,
  onEditCancel,
  deletable,
  editable,
  parentId,
  modalData,
  parentFieldName,
  onDelete,
  idx,
  customProps
}) => {
  return isEditing(editData, modelName, node.id) ? (
    <div className="table-btn-group">
      <div className="btn-group">
        <EditSaveButton
          {...{
            onClick: evt => onEditSubmit({ modelName, id: node.id })
          }}
        />
        <EditCancelButton
          {...{
            onClick: evt => onEditCancel({ modelName, id: node.id })
          }}
        />
      </div>
    </div>
  ) : (
    <TableButtonGroup
      {...{
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
        onDelete,
        customProps
      }}
    />
  )
}

const TBody = ({
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
  tooltipData,
  modalData,
  editData,
  tableEditable,
  deletable,
  selectOptions,
  modelStore,
  user,
  parentNode,
  fromIndex,
  customProps
}) => {
  const actions = getActions(schema, modelName)
  const onEditCancel = R.path(['edit', 'onTableEditCancel'], actions)
  return (
    <tbody>
      {data.map((node, idx) => {
        const editable = isRowEditable({
          schema,
          modelName,
          node,
          parentNode,
          user,
          fieldOrder,
          customProps
        })
        return (
          <tr key={`table-tr-${node.id}`}>
            {fieldOrder.map((fieldName, headerIdx) => {
              if (fromIndex === true) {
                const displayCondition = R.prop('index', getFieldConditions(schema, modelName, fieldName))
                if (
                  shouldDisplay({
                    schema,
                    modelName,
                    fieldName,
                    displayCondition,
                    customProps
                  }) === false
                ) {
                  return null
                }
              }

              return (
                <td key={`${node.id}-${headerIdx}`}>
                  <TableRowWithEdit
                    key={`table-td-${node.id}-${headerIdx}`}
                    {...{
                      modelName,
                      fieldName,
                      parentModelName,
                      node,
                      schema,
                      detailField,
                      editData,
                      tooltipData,
                      selectOptions,
                      modelStore,
                      user,
                      parentNode,
                      customProps
                    }}
                  />
                </td>
              )
            })}
            {showButtonColumn({
              deletable,
              editable: tableEditable,
              detailField
            }) && (
              <td key={`${node.id}-edit-delete`}>
                {
                  <TableButtonCell
                    {...{
                      modelName,
                      parentModelName,
                      node,
                      schema,
                      detailField,
                      editData,
                      onEditSubmit,
                      onEditCancel,
                      deletable,
                      editable,
                      parentId,
                      modalData,
                      parentFieldName,
                      onDelete,
                      idx,
                      customProps
                    }}
                  />
                }
              </td>
            )}
          </tr>
        )
      })}
    </tbody>
  )
}

export const calcDetailField = ({ schema, modelName, fieldOrder }) => {
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
  node: parentNode,
  data, // ordered list
  fieldOrder,
  onDelete,
  onEditSubmit,
  modalData,
  editData,
  selectOptions,
  modelStore,
  parentId,
  parentModelName,
  parentFieldName,
  tooltipData,
  tableView,
  Head = THead,
  Body = TBody,
  Foot = TFoot,
  user,
  collapse,
  fromIndex,
  customProps,
  summary
}) => {
  if (!fromIndex && collapse) {
    return null
  }

  if (!data) {
    return <div>...Loading</div>
  }
  if (!fromIndex && data.length === 0) {
    return <div style={{ paddingBottom: '10px' }}>N/A</div>
  }

  const deletable = isTableDeletable({
    schema,
    modelName,
    data,
    parentNode,
    user,
    customProps
  })
  const detailField = calcDetailField({ schema, modelName, fieldOrder })
  const editable = isTableEditable({
    schema,
    modelName,
    data,
    parentNode,
    user,
    fieldOrder,
    customProps
  })

  return (
    <React.Fragment>
      <table className="table table-striped table-bordered table-hover">
        <Head
          {...{
            schema,
            modelName,
            fieldOrder,
            data,
            deletable,
            editable,
            detailField,
            selectOptions,
            tableView,
            fromIndex,
            customProps,
            user
          }}
        />
        <Body
          {...{
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
            modelStore,
            editData,
            deletable,
            tableEditable: editable,
            user,
            parentNode,
            fromIndex,
            customProps
          }}
        />
        <Foot
          {...{
            schema,
            modelName,
            parentModelName,
            parentFieldName,
            fieldOrder,
            summary,
            data,
            fromIndex,
            customProps,
            user,
          }}
        />
      </table>
      {fromIndex ? (
        <IndexPagination
          {...{
            schema,
            modelName,
            tableView
          }}
        />
      ) : (
        <DetailPagination
          {...{
            schema,
            modelName: parentModelName,
            fieldName: parentFieldName,
            tableView
          }}
        />
      )}
    </React.Fragment>
  )
}
