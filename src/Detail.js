import React from 'react'
import * as R from 'ramda'
import { DeleteButton, Table } from './table/Table'
import { isOneToMany, isManyToMany } from './utils/isType'
import Field, { getRelSchemaEntry } from './table/Field'
import {
  getDetailFieldOverride,
  getDetailLabelOverride,
  getDetailValueOverride,
  isFieldEditable,
  isCreatable,
  isDeletable,
  skipOverride,
  getDetailOverride,
  getDetailTitleOverride,
  getDetailPageOverride,
  shouldDisplay
} from './Utils'
import {
  getActions, getModelAttribute, getField,
  getDetailFields, getHasIndex, getModelLabel, getFieldLabel,
  getFieldConditions, getCollapsable
} from './utils/schemaGetters'
import { RecursiveTab } from './Tabs'
import { getType } from './utils/getType'
import CreateButton from './CreateButton'
import {
  EditSaveButton,
  EditCancelButton,
  isFieldEditing,
  getFieldEditData,
  InlineEditButton,
  FileDelete,
  TableEditButton,
  getFieldErrorEdit,
  EditInput
} from './Edit'
import { Popover, PopoverContent } from './Popover'
import getDisplayValue from './utils/getDisplayValue'
import Input from './form/Input'
import { Link, Redirect } from 'react-router-dom'
import '../css/index.css'
import { inputTypes } from './consts'
import { DeleteDetail, RemoveDetail } from './delete/DeleteDetail'
import { FaAngleDown, FaAngleRight } from 'react-icons/fa'

const LabelInfoPopover = ({ LabelInfoComponent, fieldLabel }) => (
  <Popover
    Content={
      <PopoverContent>
        <LabelInfoComponent />
      </PopoverContent>
    }
    labelValue={fieldLabel}
  />
)

export const CollapseTableButton = ({ modelName, fieldName, id, collapse, collapseTableChange }) => {
  const CollapseTableIcon = collapse ? FaAngleDown : FaAngleDown
  return (
    <CollapseTableIcon
      className={`hide-icon-${collapse ? 'angle-right' : 'angle-down'}`}
      onClick={() => collapseTableChange({ modelName, fieldName, id, collapse })}
    />
  )
}

export const DefaultDetailLabel = ({ schema, modelName, fieldName, node, customProps }) => {
  const LabelInfoComponent = R.path(['components', 'labelInfo'], getField(schema, modelName, fieldName))
  if (skipOverride(LabelInfoComponent)) {
    return null
  }
  const fieldLabel = getFieldLabel({ schema, modelName, fieldName, node, customProps })
  if (LabelInfoComponent) {
    return <LabelInfoPopover {...{ LabelInfoComponent, fieldLabel }} />
  }
  return <span>{fieldLabel}</span>
}

export const DefaultDetailAttribute = ({
  schema,
  modelName,
  fieldName,
  node,
  editData,
  tooltipData,
  selectOptions,
  modelStore,
  id,
  path,
  user,
  customProps
}) => {
  const actions = getActions(schema, modelName)

  const LabelOverride = getDetailLabelOverride(schema, modelName, fieldName)
  const ValueOverride = getDetailValueOverride(schema, modelName, fieldName)

  const DetailLabel = LabelOverride || DefaultDetailLabel
  const DetailValue = ValueOverride || Field

  const editable = isFieldEditable({ schema, modelName, fieldName, node, user, customProps })
  const fieldType = R.prop('type', getField(schema, modelName, fieldName))

  if (skipOverride(LabelOverride) && skipOverride(ValueOverride)) {
    return null
  }

  if (isFieldEditing(editData, modelName, node.id, fieldName) !== false) {
    const relSchemaEntry = getRelSchemaEntry({ schema, modelName, fieldName })
    const relModelName = R.prop('modelName', relSchemaEntry)

    const onEditCancelClick = R.path(['edit', 'onAttributeEditCancel'], actions)
    const onEditSubmitClick = R.path(['edit', 'onDetailAttributeSubmit'], actions)
    const onFileSubmit = R.path(['edit', 'onFileSubmit'], actions)

    const fieldEditData = getFieldEditData(editData, modelName, fieldName, node.id)
    const creatable = isCreatable({ schema, modelName: relModelName, parentNode: node, user, customProps })
    const targetInverseFieldName = R.prop('backref', fieldType)
    const targetModelName = R.prop('target', fieldType)
    const error = getFieldErrorEdit(editData, modelName, fieldName, node.id)

    return (
      <React.Fragment>
        <dt className='col-sm-3 text-sm-right'>
          {
            skipOverride(LabelOverride) ? null : <DetailLabel {...{ schema, modelName, fieldName, node, customProps }} />
          }
        </dt>
        <dd className='col-sm-9'>
          <div className='detail-edit d-inline-block pull-left'>
            <EditInput {...{
              schema,
              modelName,
              fieldName,
              node,
              editData: fieldEditData,
              error,
              selectOptions,
              modelStore
            }} />
          </div>
          <div className='inline-btn-group'>
            <EditSaveButton {...{
              onClick: (fieldType === 'file')
                ? evt => onFileSubmit({ modelName, fieldName, id })
                : evt => onEditSubmitClick({ modelName, fieldName, id })
            }} />
            <EditCancelButton {...{
              onClick: (evt) => onEditCancelClick({ modelName, id, fieldName }),
              modelName,
              id
            }} />
            {
              R.type(fieldType) === 'Object' && creatable &&
              <DetailCreateButton {...{
                schema,
                targetInverseFieldName,
                targetModelName,
                path,
                node
              }}
              />
            }
          </div>
        </dd>
      </React.Fragment>
    )
  } else {
    const onEdit = R.path(['edit', 'onAttributeEdit'], actions)
    const onFileDelete = R.path(['delete', 'onFileDelete'], actions)
    const isFileType = fieldType === inputTypes.FILE_TYPE
    const hasValue = R.propOr(false, fieldName, node)

    return (
      <React.Fragment>
        <dt className='col-sm-3 text-sm-right'>
          {
            skipOverride(LabelOverride) ? null : <DetailLabel {...{ schema, modelName, fieldName, node, customProps }} />
          }
        </dt>
        <dd className='col-sm-9'>
          {
            skipOverride(ValueOverride) ? null : <DetailValue {...{
              schema,
              modelName,
              fieldName,
              node,
              id,
              tooltipData,
              customProps
            }} />
          }
          {editable &&
            <InlineEditButton {...{
              onEditClick: (evt) => onEdit({
                modelName,
                fieldName,
                id,
                value: R.prop(fieldName, node)
              })
            }} />
          }
          {(editable && isFileType && hasValue) &&
            <FileDelete {...{
              id,
              fieldName,
              onFileDelete: () => onFileDelete({ modelName, fieldName, id })
            }}/>
          }
        </dd>
      </React.Fragment>
    )
  }
}

export const DetailCreateButton = ({ schema, targetModelName, path, targetInverseFieldName, node }) => {
  const onCreateClick = R.path(['create', 'onDetailCreate'], getActions(schema, targetModelName))

  const onClick = () => onCreateClick({
    modelName: targetModelName,
    path,
    targetInverseFieldName,
    node
  })
  return <CreateButton {...{ onClick }} />
}

export const DefaultDetailTableTitleWrapper = ({ children }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <h4 className='d-inline'>
        {children}
      </h4>
    </div>
  )
}

export const DefaultDetailO2MTableTitle = ({ schema, modelName, fieldName, id, targetInverseFieldName, targetModelName, path, node, user, collapsable, collapse, collapseTableChange, customProps }) => {
  const creatable = isCreatable({ schema, modelName: targetModelName, parentNode: node, user, customProps })

  return (
    <DefaultDetailTableTitleWrapper>
      {collapsable && <CollapseTableButton {...{
        modelName,
        fieldName,
        id,
        collapse,
        collapseTableChange
      }}/>}
      <DefaultDetailLabel {...{ schema, modelName, fieldName, node, customProps }} />
      { creatable && <DetailCreateButton {...{
        schema,
        targetModelName,
        path,
        targetInverseFieldName,
        node
      }} /> }
    </DefaultDetailTableTitleWrapper>
  )
}

const DefaultDetailM2MTableTitle = ({
  schema,
  modelName,
  id,
  fieldName,
  node,
  targetInverseFieldName,
  path,
  targetModelName,
  user,
  collapsable,
  collapse,
  collapseTableChange,
  customProps
}) => {
  const editable = isFieldEditable({ schema, modelName, fieldName, node, user, customProps })

  return (
    <div style={{ marginBottom: '10px' }}>
      <h4 className='d-inline'>
        {collapsable && <CollapseTableButton {...{
          modelName,
          fieldName,
          id,
          collapse,
          collapseTableChange
        }}/>}
        {getFieldLabel({ schema, modelName, fieldName, node, customProps })}
      </h4>
      {editable && <div className='pl-2 d-inline'>
        <TableEditButton {...{
          schema,
          modelName,
          id,
          fieldName,
          targetInverseFieldName,
          node,
          path,
          targetModelName
        }} />
      </div>}
    </div>
  )
}

const DefaultDetailM2MFieldLabel = ({
  schema,
  modelName,
  fieldName,
  node,
  targetInverseFieldName,
  path,
  targetModelName,
  user,
  customProps
}) => {
  const creatable = isCreatable({ schema, modelName: targetModelName, user, parentNode: node, customProps })
  const required = R.prop('required', getField(schema, modelName, fieldName))
  const Label = () => (
    <div style={{ marginBottom: '10px' }}>
      <h4 className='d-inline'>{getFieldLabel({ schema, modelName, fieldName, node, customProps })}</h4>
      { required && ' *'}
      { creatable && <DetailCreateButton {...{
        schema,
        targetModelName,
        path,
        targetInverseFieldName,
        node
      }} /> }
    </div>
  )
  return Label
}

export const DefaultDetailTable = ({
  schema,
  modelName,
  id,
  fieldName,
  node,
  path,
  editData,
  selectOptions,
  modelStore,
  tooltipData,
  user,
  tableView,
  modalData,
  customProps
}) => {
  const fieldType = R.path([modelName, 'fields', fieldName, 'type'], schema)
  const targetInverseFieldName = R.prop('backref', fieldType)
  const targetModelName = R.prop('target', fieldType)
  const data = R.propOr(null, fieldName, node)
  const fieldOrder = R.path([modelName, 'fields', fieldName, 'type', 'tableFields'], schema)
  const actions = getActions(schema, modelName)
  const onDelete = R.path(['delete', 'onDetailDelete'], actions)
  const onEditSubmit = R.path(['edit', 'onDetailTableEditSubmit'], actions)
  const type = getType({ schema, modelName, fieldName })
  const collapse = R.path([modelName, 'fields', fieldName, 'collapse'], tableView)
  const collapseTableChange = R.path(['tableOptions', 'collapseTableChange'], actions)
  const collapsable = getCollapsable(schema, modelName, fieldName)

  if (!data) { return <div className='container'>Loading...</div> }

  const ValueOverride = getDetailValueOverride(schema, modelName, fieldName)
  const DetailValue = ValueOverride || Table

  if (type.includes('OneToMany')) {
    const LabelOverride = getDetailLabelOverride(schema, modelName, fieldName)
    const DetailLabel = LabelOverride || DefaultDetailO2MTableTitle
    return (
      <React.Fragment key={`Fragment-${id}-${targetModelName}-${fieldName}`}>
        { skipOverride(LabelOverride) ? null : <DetailLabel {...{
          schema,
          modelName,
          fieldName,
          id,
          targetInverseFieldName,
          node,
          path,
          targetModelName,
          user,
          collapsable,
          collapse,
          collapseTableChange,
          customProps
        }} />
        }
        { skipOverride(ValueOverride) ? null : <DetailValue
          key={`Table-${id}-${targetModelName}-${fieldName}`}
          {...{
            schema,
            parentId: id,
            parentModelName: modelName,
            parentFieldName: fieldName,
            modelName: targetModelName,
            editData,
            selectOptions,
            modelStore,
            tooltipData,
            node,
            data,
            onDelete,
            onEditSubmit: ({ ...props }) => onEditSubmit({
              parentModelName: modelName,
              parentId: id,
              ...props
            }),
            fieldOrder,
            user,
            tableView,
            collapse,
            modalData,
            customProps
          }}
        /> }
      </React.Fragment>
    )
  } else if (type === 'ManyToMany') {
    if (isFieldEditing(editData, modelName, id, fieldName)) {
      const actions = getActions(schema, modelName)
      const onEditInputChange = R.path(['edit', 'onEditInputChange'], actions)
      const onSaveClick = R.path(['edit', 'onDetailAttributeSubmit'], actions)
      const onCancelClick = R.path(['edit', 'onAttributeEditCancel'], actions)

      const LabelOverride = getDetailLabelOverride(schema, modelName, fieldName)
      const DetailLabel = LabelOverride || DefaultDetailM2MFieldLabel({
        schema,
        modelName,
        fieldName,
        node,
        targetInverseFieldName,
        path,
        targetModelName,
        user,
        customProps
      })

      return (
        <React.Fragment>
          <Input {...{
            schema,
            modelName,
            fieldName,
            node,
            value: getFieldEditData(editData, modelName, fieldName, id),
            error: getFieldErrorEdit(editData, modelName, fieldName, id),
            selectOptions,
            modelStore,
            customLabel: DetailLabel,
            onChange: ({ ...props }) => onEditInputChange({
              id,
              modelName,
              ...props
            }),
            customProps
          }} />
          <div className='table-btn-padding'>
            <EditSaveButton {...{
              onClick: (evt) => onSaveClick({
                modelName,
                id,
                fieldName
              })
            }} />
            <EditCancelButton {...{
              onClick: (evt) => onCancelClick({
                modelName,
                id,
                fieldName
              })
            }} />
          </div>
        </React.Fragment>
      )
    }

    const LabelOverride = getDetailLabelOverride(schema, modelName, fieldName)
    const DetailLabel = LabelOverride || DefaultDetailM2MTableTitle

    if (skipOverride(LabelOverride) && skipOverride(ValueOverride)) {
      return null
    }

    return (
      <React.Fragment key={`Fragment-${id}-${targetModelName}-${fieldName}`}>
        { skipOverride(LabelOverride) ? null : <DetailLabel {...{ schema,
          modelName,
          id,
          fieldName,
          node,
          targetInverseFieldName,
          path,
          targetModelName,
          user,
          collapsable,
          collapse,
          collapseTableChange,
          customProps
        }} /> }
        { skipOverride(ValueOverride) ? null : <DetailValue
          key={`Table-${id}-${targetModelName}-${fieldName}`}
          {...{
            schema,
            parentId: id,
            parentModelName: modelName,
            parentFieldName: fieldName,
            modelName: targetModelName,
            editData,
            selectOptions,
            modelStore,
            tooltipData,
            node,
            data,
            onDelete,
            onEditSubmit: ({ ...props }) => onEditSubmit({
              parentModelName: modelName,
              parentId: id,
              ...props
            }),
            fieldOrder,
            user,
            tableView,
            collapse,
            m2m: true,
            modalData
          }}
        /> }
      </React.Fragment>
    )
  }
}

export const partitionDetailFields = ({ schema, modelName, node, include = null, customProps }) => {
  let detailFields = getDetailFields({ schema, modelName, node, customProps })

  if (include) {
    detailFields = detailFields.filter(fieldName => R.includes(fieldName, include))
  }
  return R.partition(
    (fieldName) => {
      const detailAttribute = R.prop('detailAttribute', getField(schema, modelName, fieldName))
      if (!R.isNil(detailAttribute)) {
        return !detailAttribute
      }
      return isOneToMany(R.path([modelName, 'fields', fieldName], schema)) ||
        isManyToMany(R.path([modelName, 'fields', fieldName], schema))
    }
    ,
    detailFields
  )
}

const DefaultDetailPageTitle = ({ schema, modelName, node, modalData, user, customProps }) => {
  const model = getModelLabel({ schema, modelName, node, user, customProps })
  const label = getDisplayValue({ schema, modelName, node, customProps })
  const actions = getActions(schema, modelName)
  const onDelete = R.path(['delete', 'onDetailDeleteFromDetailPage'], actions)
  const onDeleteWarning = R.path(['delete', 'onDeleteWarning'], actions)
  const modalId = 'confirm-delete-' + modelName
  const id = R.prop('id', node)
  const HeaderLink = getHasIndex(schema, modelName) ? <Link to={'/' + modelName}>{model}</Link> : model
  return (
    <div><h2 className='d-inline'>{HeaderLink}:<b> {label}</b></h2>
      { isDeletable({ schema, modelName, node, user, customProps }) &&
        <div className='float-right'>
          <DeleteButton {...{ modalId, onDeleteWarning, modelName, id }} />
          <DeleteDetail {...{
            schema,
            id,
            modalId,
            modelName,
            onDelete,
            modalData,
            customProps
          }} />
        </div>
      }
    </div>
  )
}

export const DetailFields = ({
  schema,
  modelName,
  id,
  node,
  modalData,
  tableFields,
  descriptionList,
  editData,
  tooltipData,
  selectOptions,
  modelStore,
  path,
  user,
  tableView,
  customProps
}) => {
  if (!node) { return <div className='container'>Loading...</div> }

  if (!tableFields && !descriptionList) { [tableFields, descriptionList] = partitionDetailFields({ schema, modelName, node, customProps }) }

  return (
    <React.Fragment>
      <dl className='row'>
        {descriptionList.map(fieldName => {
          const displayCondition = R.prop('detail', getFieldConditions(schema, modelName, fieldName))
          if (shouldDisplay({schema, modelName, id, fieldName, node, displayCondition, customProps}) === false) {
              return null
          }
          const override = getDetailFieldOverride(schema, modelName, fieldName)

          if (skipOverride(override)) {
            return null
          }
          const DetailAttribute = override || DefaultDetailAttribute
          // same props go into DetailTable & DetailAttribute (even if not used) override gets all same props
          return (
            <DetailAttribute key={`DetailAttribute-${id}-${modelName}-${fieldName}`}
              {...{
                schema,
                modelName,
                fieldName,
                node,
                selectOptions,
                modelStore,
                editData,
                tooltipData,
                modalData,
                path,
                id,
                user,
                tableView,
                customProps
              }}
            />
          )
        })}
      </dl>
      {tableFields.map(fieldName => {
        const displayCondition = R.prop('detail', getFieldConditions(schema, modelName, fieldName))
        if (shouldDisplay({schema, modelName, id, fieldName, node, displayCondition, customProps}) === false) {
            return null
        }
        const override = getDetailFieldOverride(schema, modelName, fieldName)

        if (skipOverride(override)) {
          return null
        }
        const DetailTable = override || DefaultDetailTable
        // same props go into DetailTable & DetailAttribute (even if not used) override gets all same props
        return (
          <DetailTable
            key={`DetailTable-${id}-${modelName}-${fieldName}`}
            {...{
              schema,
              modelName,
              fieldName,
              node,
              selectOptions,
              modelStore,
              editData,
              tooltipData,
              modalData,
              path,
              id,
              user,
              tableView,
              customProps
            }}
          />
        )
      })}
    </React.Fragment>
  )
}

const Wrapper = ({ children }) => (
  <div className='container'>
    <div className='row'>
      <div className='col'>
        {children}
      </div>
    </div>
  </div>
)

const DefaultDetail = ({
  schema,
  modelName,
  id,
  node,
  modalData,
  editData,
  path,
  match,
  tooltipData,
  user,
  tableView,
  selectOptions,
  modelStore,
  customProps
}) => {
  const DetailTitleOverride = getDetailTitleOverride(schema, modelName)
  const DetailPageOverride = getDetailPageOverride(schema, modelName)

  const tabs = getModelAttribute(schema, modelName, 'tabs')

  const DefaultDetailPage = tabs && tabs.length > 0 ? RecursiveTab : DetailFields

  const DetailTitle = DetailTitleOverride || DefaultDetailPageTitle
  const DetailPage = DetailPageOverride || DefaultDetailPage

  if (!node) {
    return <div className='container'>Loading...</div>
  }

  if (R.prop('result', node) === null) {
    return <Redirect to={`/${modelName}`} />
  }

  if (skipOverride(DetailTitleOverride) && skipOverride(DetailPageOverride)) {
    return null
  }

  return (
    <Wrapper>
      {skipOverride(DetailTitleOverride) ? null : (
        <DetailTitle
          {...{
            schema,
            modelName,
            id,
            node,
            modalData,
            editData,
            path,
            match,
            tooltipData,
            user,
            selectOptions,
            customProps
          }}
        />
      )}
      {skipOverride(DetailPageOverride) ? null : (
        <DetailPage
          {...{
            schema,
            modelName,
            id,
            node,
            modalData,
            editData,
            tooltipData,
            match,
            tabs,
            path,
            fields: [],
            user,
            tableView,
            selectOptions,
            modelStore,
            customProps
          }}
        />
      )}
    </Wrapper>
  )
}

const Detail = ({
  schema,
  modelName,
  id,
  node,
  modalData,
  editData,
  path,
  match, // 'match' should be passed in by React by default
  tooltipData,
  user,
  tableView,
  selectOptions,
  modelStore,
  customProps
}) => {
  const DetailOverride = getDetailOverride(schema, modelName)

  const DetailComponent = DetailOverride || DefaultDetail

  return skipOverride(DetailOverride) ? null : (
    <DetailComponent
      {...{
        schema,
        modelName,
        id,
        node,
        modalData,
        editData,
        path,
        match,
        tooltipData,
        user,
        tableView,
        selectOptions,
        modelStore,
        customProps
      }}
    />
  )
}

export default Detail
