import React from 'react'
import * as R from 'ramda'
import { Modal } from '../Modal'
import { isEnum } from '../utils/isType'
import { getEnumLabel } from '../../framework/Utils'
import { getFields as getFieldDefinitions, getActions } from '../utils/schemaGetters'

const getFields = (schema, modelName, node) => {
  const fieldDefinitions = getFieldDefinitions(schema, modelName)

  const fields = Object.entries(node).map(([ key, value ]) => {
    if (value === Object(value)) {
      const targetModel = R.path([key, 'type', 'target'], fieldDefinitions)
      return getFields(schema, targetModel, value)
    }

    if (!R.includes(key, ['__typename', 'id'])) {
      const fieldDefinition = R.prop(key, fieldDefinitions)
      if (isEnum(fieldDefinition)) {
        return getEnumLabel({ schema, modelName, fieldName: key, value })
      } else {
        return value
      }
    }
  })

  return R.pipe(
    R.flatten,
    R.reject(val => val === undefined)
  )(fields)
}

const Row = ({ schema, model, node }) => {
  const fields = getFields(schema, model, node)
  return (
    <tr>
      {fields.map((field, index) => (
        <td key={index}>
          {field}
        </td>
      ))}
    </tr>
  )
}

const ReviewTable = ({ schema, table }) => (
  <div className='mt-2'>
    <h5 className='d-inline'>{table[0].__typename}</h5>
    <table className='table table-striped table-bordered'>
      <tbody>
        {table && table.map((node, index) => (
          <Row key={`${index}-${node.id}`} {...{
            schema,
            model: R.prop('__typename', node),
            node
          }} />
        ))}
      </tbody>
    </table>
  </div>
)

export const DeleteDetail = ({
  schema,
  modelName,
  id,
  modalId,
  title,
  onDelete,
  modalStore,
  parentModelName,
  parentId
}) => {
  const actions = getActions(schema, modelName)
  const onCancelDelete = R.path(['delete', 'onCancelDelete'], actions)
  return (
    <Modal {...{ id: modalId, title }}>
      <span><strong>The following entries will be deleted:</strong></span>
      {!modalStore && <div className={'text-center'}>...loading</div>}
      {modalStore && modalStore.map((table, index) => (
        <ReviewTable key={`${index}-${table[0].__typename}`} {...{ schema, table }} />
      ))}
      <div className='modal-footer justify-content-center mt-3'>
        <div className='btn-group'>
          <button
            className='btn btn-small btn-outline-secondary '
            data-dismiss='modal'
            onClick={() => onCancelDelete()}
          >Cancel</button>
          <button
            className='btn btn-small btn-outline-danger '
            data-dismiss='modal'
            onClick={() => onDelete({
              id: id,
              parentModel: parentModelName,
              parentId,
              modelName
            })}
          >Confirm Delete</button>
        </div>
      </div>
    </Modal>
  )
}
