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
import { getFieldLabel } from '../utils/schemaGetters'
import Tooltip from '../Tooltip'

// gets the schema of the relationship model, based on field meta
export const getRelSchemaEntry = ({ schema, modelName, fieldName }) => {
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
    <span className='text-area-display'>{displayString}</span>
  )
}

const FieldBoolean = ({ schema, modelName, fieldName, node }) => {
  const displayBool = R.propOr(false, fieldName, node) // need propOr(false...
  return <Switch
    checked={displayBool}
  />
}

// Render a link to the value. If the value does not start with any of the prefixes,
// append the first prefix. Produces HTTPS URLs by default.
const FieldLink = ({ schema, modelName, fieldName, node, prefix = ['https://', 'http://']}) => {
  // Ensure prefix is a list, allowing a single string instead of a list.
  prefix = R.pipe(R.prepend(prefix), R.flatten)([])
  let href = R.prop(fieldName, node)
  if (!href) { return <span>N/A</span> }

  const displayString = href

  if (!R.any(item => R.startsWith(item, href), prefix)) {
    href = prefix[0] + href
  }

  return <a href={href}>{ displayString }</a>
}

const FieldCurrency = ({ schema, modelName, fieldName, node }) => {
  const num = R.prop(fieldName, node)
  const displayString = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)

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

const FieldImageModal = ({ schema, modelName, fieldName, id, node, customProps }) => {
  const url = R.prop(fieldName, node)
  const label = getFieldLabel({ schema, modelName, fieldName, node, customProps })
  const modalId = `img-modal-${modelName}-${fieldName}-${id}`

  return <ImageLinkModal {...{ id: modalId, title: label, url }} />
}

export const FieldToOne = ({ schema, modelName, fieldName, parentModelName, node, tooltipData, customProps }) => {
  const relSchemaEntry = getRelSchemaEntry({ schema, modelName, fieldName })

  const relModelName = R.prop('modelName', relSchemaEntry)

  const displayString = getDisplayValue({ schema, modelName: relModelName, parentModelName, node, customProps })
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

export const FieldToMany = ({ schema, modelName, fieldName, parentModelName, tooltipData, node }) => {
  const multiRelField = R.prop(fieldName, node)

  const relListWithLink = (field, idx, obj) => (
    <React.Fragment key={`fragment-${field.id}`}>
      <FieldToOne
        key={`field-m2o-${field.id}`}
        {...{ schema, modelName, fieldName, parentModelName, tooltipData, node: field }}
      />
      { (idx !== (obj.length - 1)) && <span>{', '}</span>}
    </React.Fragment>
  )

  return (
    <span>{ (multiRelField && multiRelField.length > 0)
      ? multiRelField.map(relListWithLink) : 'N/A'}
    </span>
  )
}

export const Field = ({ schema, modelName, fieldName, parentModelName, tooltipData, node, id, customProps }) => {
  const props = {
    schema,
    modelName,
    fieldName,
    tooltipData,
    parentModelName,
    node,
    id,
    customProps
  }

  const type = getType({ schema, modelName, fieldName })

  switch (type) {
    case consts.inputTypes.STRING_TYPE:
    case consts.inputTypes.FLOAT_TYPE:
    case consts.inputTypes.INT_TYPE:
    case consts.inputTypes.DATE_TYPE:
    case consts.inputTypes.TEXTAREA_TYPE:
    case consts.inputTypes.CREATABLE_STRING_SELECT_TYPE:
      return <FieldString {...props} />
    case consts.inputTypes.ENUM_TYPE:
      return <FieldEnum {...props} />
    case consts.inputTypes.URL_TYPE:
      return <FieldLink {...props} />
    case consts.inputTypes.FILE_TYPE:
      return <FieldImageModal {...props} />
    case consts.inputTypes.PHONE_TYPE:
      return <FieldLink {...{ prefix: 'tel:', ...props }} />
    case consts.inputTypes.EMAIL_TYPE:
      return <FieldLink {...{ prefix: 'mailto:', ...props }} />
    case consts.inputTypes.BOOLEAN_TYPE:
      return <FieldBoolean {...props} />
    case consts.inputTypes.CURRENCY_TYPE:
      return <FieldCurrency {...props} />
    case consts.inputTypes.MANY_TO_ONE_TYPE:
      return <FieldToOne {...{
        ...props,
        node: R.prop(fieldName, node),
        schema,
        modelName,
        fieldName,
        tooltipData
      }} />
    case consts.inputTypes.MANY_TO_MANY_TYPE:
    case consts.inputTypes.ONE_TO_MANY_TYPE:
      return <FieldToMany {...props} />
    case consts.inputTypes.ONE_TO_ONE_TYPE:
      return <span>OneToOne</span>
    default:
      return <span>NO TYPE</span>
  }
}

export default Field
