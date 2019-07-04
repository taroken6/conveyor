import React from 'react'
import { getType } from '../utils/getType'
import * as consts from '../consts'
import * as R from 'ramda'
import DetailLink from '../DetailLink'
import Switch from 'rc-switch'
import { getEnumLabel } from '../Utils'
import { getModel, getTooltipFields } from '../utils/schemaGetters'
import getDisplayValue from '../utils/getDisplayValue'
import { ImageLinkModal } from '../Modal'
import { getFieldLabel } from '../Detail'
import Tooltip from '../Tooltip'

// gets the schema of the relationship model, based on field meta
const getRelSchemaEntry = ({ schema, modelName, fieldName }) => {
  const fieldTargetModel = R.path(
    [modelName, 'fields', fieldName, 'type', 'target'],
    schema
  )

  return getModel(schema, fieldTargetModel)
}

const FieldString = ({ schema, modelName, fieldName, node }) => {
  const value = R.prop(fieldName, node)
  const displayString = (R.isNil(value) || value === '') ? 'N/A' : value

  return (
    <span>{displayString}</span>
  )
}

const FieldBoolean = ({ schema, modelName, fieldName, node }) => {
  const displayBool = R.propOr(false, fieldName, node) // need propOr(false...
  return <Switch
    checked={displayBool}
  />
}

const FieldLink = ({ schema, modelName, fieldName, node, prefix = 'http://' }) => {
  const displayString = R.prop(fieldName, node)
  if (!displayString) { return <span>N/A</span> }

  return <a href={prefix + displayString}>{ displayString }</a>
}

const FieldCurrency = ({ schema, modelName, fieldName, node }) => {
  const num = R.prop(fieldName, node)
  const displayString = num ? '$ ' + num : 'N/A'

  return (
    <span>{displayString}</span>
  )
}

const FieldEnum = ({ schema, modelName, fieldName, node }) => {
  const value = R.prop(fieldName, node)
  if (value) {
    return (
      <span>{ getEnumLabel({ schema, modelName, fieldName, value }) }</span>
    )
  }
  return <span>{ 'N/A' }</span>
}

const FieldImageModal = ({ schema, modelName, fieldName, id, node }) => {
  const url = R.prop(fieldName, node)
  const label = getFieldLabel({ schema, modelName, fieldName, data: node })
  const modalId = `img-modal-${fieldName}`

  return <ImageLinkModal {...{ id: modalId, title: label, url }} />
}

export const FieldToOne = ({ schema, modelName, fieldName, parentModelName, node, tooltipData }) => {
  const relSchemaEntry = getRelSchemaEntry({ schema, modelName, fieldName })

  const relModelName = R.prop('modelName', relSchemaEntry)

  const displayString = getDisplayValue({ schema, modelName: relModelName, parentModelName, data: node })
  const relId = R.prop('id', node)

  if (!displayString) { return <span>N/A</span> }

  const displayTooltip = (getTooltipFields(schema, relModelName).length !== 0)
  if (displayTooltip) {
    return (
      <Tooltip
        {...{
          schema,
          modelName: relModelName,
          id: relId,
          data: R.pathOr([], [relModelName, relId], tooltipData)
        }}
      >
        <DetailLink {...{
          modelName: relModelName,
          id: relId
        }}>
          {displayString}
        </DetailLink>
      </Tooltip>
    )
  } else {
    return (
      <DetailLink {...{
        modelName: relModelName,
        id: relId }}>
        {displayString}
      </DetailLink>)
  }
}

export const FieldToMany = ({ schema, modelName, fieldName, parentModelName, tooltipData, node, ...props }) => {
  const multiRelField = R.prop(fieldName, node)

  const relListWithLink = (field, idx, obj) => (
    <React.Fragment key={`fragment-${field.node.id}`}>
      <FieldToOne
        key={`field-m2o-${field.node.id}`}
        {...{ schema, modelName, fieldName, parentModelName, tooltipData, node: field.node }}
      />
      { (idx !== (obj.length - 1)) && <span>{', '}</span>}
    </React.Fragment>
  )

  return (
    <span>{ (multiRelField && multiRelField.edges.length > 0)
      ? multiRelField.edges.map(relListWithLink) : 'N/A'}
    </span>
  )
}

export const Field = ({ schema, modelName, fieldName, parentModelName, tooltipData, node, id }) => {
  const props = {
    schema,
    modelName,
    fieldName,
    tooltipData,
    parentModelName,
    node,
    id
  }

  const type = getType({ schema, modelName, fieldName })

  switch (type) {
    case consts.inputTypes.STRING_TYPE:
    case consts.inputTypes.FLOAT_TYPE:
    case consts.inputTypes.INT_TYPE:
    case consts.inputTypes.DATE_TYPE:
    case consts.inputTypes.TEXTAREA_TYPE:
      return <FieldString {...props} />
    case consts.inputTypes.ENUM_TYPE:
      return <FieldEnum {...props} />
    case consts.inputTypes.LINK_TYPE:
      return <FieldLink {...props} />
    case consts.inputTypes.FILE_TYPE:
      return <FieldImageModal {...props} />
    case consts.inputTypes.TEL_TYPE:
      return <FieldLink {...{ prefix: 'tel:', ...props }} />
    case consts.inputTypes.EMAIL_TYPE:
      return <FieldLink {...{ prefix: 'mailto:', ...props }} />
    case consts.inputTypes.BOOLEAN_TYPE:
      return <FieldBoolean {...props} />
    case consts.inputTypes.CURRENCY_TYPE:
      return <FieldCurrency {...props} />
    case consts.relInputTypes.MANY_TO_ONE_TYPE:
      return <FieldToOne {...{
        ...props,
        node: R.prop(fieldName, node),
        schema,
        modelName,
        fieldName,
        tooltipData
      }} />
    case consts.relInputTypes.MANY_TO_MANY_TYPE:
    case consts.relInputTypes.ONE_TO_MANY_TYPE:
      return <FieldToMany {...props} />
    case consts.relInputTypes.ONE_TO_ONE_TYPE:
      return <span>OneToOne</span>
    default:
      return <span>NO TYPE</span>
  }
}

export default Field
