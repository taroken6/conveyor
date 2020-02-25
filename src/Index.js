import React from 'react'
import { Table } from './table/Table'
import * as R from 'ramda'
import CreateButton from './CreateButton'
import { FilterModal, FilterModalButton, isTableFilterable } from './table/Filter'
import {
  getActions,
  getHasIndex, getModel,
  getIndexFields, getModelLabel,
  getModelLabelPlural, getSingleton
} from './utils/schemaGetters'
import { Redirect } from 'react-router-dom'
import {
  isCreatable,
  getIndexOverride,
  getIndexTitleOverride,
  getIndexPageOverride,
  skipOverride
} from './Utils'

export const DefaultIndexTitle = ({
  schema,
  modelName,
  selectOptions,
  path,
  data,
  tableView,
  customProps,
}) => {
  const actions = getActions(schema, modelName)
  const onCreateClick = R.path(['create', 'onIndexCreate'], actions)
  const onClick = () => onCreateClick({ modelName, path })
  const creatable = isCreatable({ schema, modelName, data, customProps })
  const filterable = isTableFilterable({ schema, modelName })
  const currentFilters = R.path([modelName, 'filter', 'filterValue'], tableView)
  const filterOrder = R.path([modelName, 'filter', 'filterOrder'], tableView)
  const filtersAreActive = R.path([modelName, 'filter', 'filtersAreActive'], tableView)

  return (
    <div style={{ marginBottom: '10px' }}>
      <h3 className='d-inline'>
        {getModelLabelPlural({ schema, modelName, data, customProps })}
      </h3>
      {filterable && <FilterModal {...{
        schema,
        modelName,
        selectOptions,
        data,
        filterOrder,
        filterInputs: currentFilters,
        customProps
      }} />}
      <div className='float-right'>
        {filterable && <FilterModalButton {...{ modelName, filtersAreActive }} />}
        {creatable && <CreateButton {...{ onClick }} />}
      </div>
    </div>
  )
}

const PageNotFound = () => (
  <div id='page-not-found' className='text-center mt-5'>
    <h1>Page Not Found</h1>
  </div>
)

export const DefaultIndex = ({
  schema,
  modelName,
  data,
  modalData,
  editData,
  selectOptions,
  path,
  tooltipData,
  tableView,
  customProps,
  summary
}) => {
  if (!getHasIndex(schema, modelName) || R.isNil(getModel(schema, modelName))) {
    return <PageNotFound />
  }

  const IndexTitleOverride = getIndexTitleOverride(schema, modelName)
  const IndexPageOverride = getIndexPageOverride(schema, modelName)

  const IndexTitle = IndexTitleOverride || DefaultIndexTitle
  const IndexPage = IndexPageOverride || Table

  const fieldOrder = getIndexFields({
    schema,
    modelName,
    data,
    customProps
  })
  const actions = getActions(schema, modelName)
  const onDelete = R.path(['delete', 'onIndexDelete'], actions)
  const onEditSubmit = R.path(['edit', 'onIndexEditSubmit'], actions)

  if (skipOverride(IndexTitleOverride) && skipOverride(IndexPageOverride)) {
    return null
  }

  return (
    <div className='container'>
      {skipOverride(IndexTitleOverride) ? null : (
        <IndexTitle
          {...{
            schema,
            modelName,
            data,
            modalData,
            editData,
            selectOptions,
            path,
            tooltipData,
            tableView,
            customProps
          }}
        />
      )}
      {skipOverride(IndexPageOverride) ? null : (
        <IndexPage
          {...{
            schema,
            modelName,
            data,
            modalData,
            editData,
            selectOptions,
            tooltipData,
            tableView,
            customProps,
            fieldOrder,
            fromIndex: true,
            onDelete,
            onEditSubmit,
            summary
          }}
        />
      )}
    </div>
  )
}

const Index = ({
  schema,
  modelName,
  data,
  modalData,
  editData,
  selectOptions,
  path,
  tooltipData,
  tableView,
  customProps,
  summary,
}) => {
  // if singleton, Index redirects to Detail pg
  if (getSingleton(schema, modelName)) {
    const singleton = R.last(data)
    // singleton may not be null when last deleted; test for 'id'
    const singleId = R.propOr(null, 'id', singleton)
    if (singleId) {
      return <Redirect to={`/${modelName}/${singleId}`} />
    }
    // if no singleId exists, must create
    const actions = getActions(schema, modelName)
    const onCreateClick = R.path(['create', 'onIndexCreate'], actions)
    return (
      <div className='container'>
        <h1>
          {`No ${getModelLabel({ schema, modelName, data, customProps })} Exists`}
          <CreateButton {...{
            onClick: () => onCreateClick({ modelName })
          }} />
        </h1>
      </div>
    )
  }

  const IndexOverride = getIndexOverride(schema, modelName)
  const IndexComponent = IndexOverride || DefaultIndex

  return skipOverride(IndexOverride) ? null : (
    <IndexComponent
      {...{
        schema,
        modelName,
        data,
        modalData,
        editData,
        selectOptions,
        path,
        tooltipData,
        tableView,
        customProps,
        summary
      }}
    />
  )
}

export default Index
