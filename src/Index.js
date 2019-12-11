import React from 'react'
import { Table } from './table/Table'
import * as R from 'ramda'
import CreateButton from './CreateButton'
import { FilterModal, FilterModalButton, isModelFilterable } from './table/Filter'
import {
  getActions,
  getHasIndex,
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

const Filters = ({
  schema,
  modelName,
  selectOptions,
  data,
  currentFilters,
  filterOrder,
  filtersAreActive
}) => {
  const actions = getActions(schema, modelName)
  const addFilter = R.path(['tableOptions', 'addFilter'], actions)
  const deleteFilter = R.path(['tableOptions', 'deleteFilter'], actions)
  const clearFilters = R.path(['tableOptions', 'clearFilters'], actions)
  const changeField = R.path(['tableOptions', 'changeField'], actions)
  const onFilterChange = R.path(['tableOptions', 'filterChange'], actions)
  const onFilterSubmit = R.path(['tableOptions', 'filterSubmit'], actions)
  const onFilterDropdown = R.path(['tableOptions', 'filterDropdown'], actions)
  return(
    <FilterModal {...{
      modelName,
      schema,
      selectOptions,
      data,
      addFilter,
      deleteFilter,
      clearFilters,
      changeField,
      onFilterChange,
      onFilterSubmit,
      onFilterDropdown,
      currentFilters,
      filterOrder,
      filtersAreActive,
      filterInputs: currentFilters
    }} />
  )
}

export const DefaultIndexTitle = ({
  schema,
  modelName,
  selectOptions,
  path,
  data,
  user,
  currentFilters,
  filterOrder,
  filtersAreActive,
  customProps
}) => {
  const actions = getActions(schema, modelName)
  const tableOptions = R.prop('tableOptions', actions)
  const onCreateClick = R.path(['create', 'onIndexCreate'], actions)
  const onClick = () => onCreateClick({ modelName, path })
  const creatable = isCreatable({ schema, modelName, data, user, customProps })
  const filterable = isModelFilterable({ schema, modelName, tableOptions })
  console.log('schema', schema)
  return (
    <div style={{ marginBottom: '10px' }}>
      <h3 className='d-inline'>
        {getModelLabelPlural({schema, modelName, data, user, customProps })}
      </h3>
      {filterable && <Filters {...{
        schema,
        modelName,
        selectOptions,
        data,
        currentFilters,
        filterOrder,
        filtersAreActive
      }}/>}
      <div className='float-right'>
        {filterable && <FilterModalButton {...{ modelName, filtersAreActive }} />}
        {creatable && <CreateButton {...{ onClick }} />}
      </div>
    </div>
  )
}

const DefaultIndex = ({
  schema,
  modelName,
  data,
  modalData,
  editData,
  selectOptions,
  modelStore,
  path,
  tooltipData,
  user,
  currentFilters,
  filterOrder,
  filtersAreActive,
  tableOptions,
  customProps
}) => {
  if (!getHasIndex(schema, modelName)) {
    return <Redirect to='/' />
  }

  const IndexTitleOverride = getIndexTitleOverride(schema, modelName)
  const IndexPageOverride = getIndexPageOverride(schema, modelName)

  const IndexTitle = IndexTitleOverride || DefaultIndexTitle
  const IndexPage = IndexPageOverride || Table

  const fieldOrder = getIndexFields({
    schema,
    modelName,
    data,
    user,
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
            user,
            currentFilters,
            filterOrder,
            filtersAreActive,
            tableOptions,
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
            modelStore,
            path,
            tooltipData,
            user,
            currentFilters,
            filterOrder,
            filtersAreActive,
            tableOptions,
            customProps,
            fieldOrder,
            fromIndex: true,
            onDelete,
            onEditSubmit
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
  modelStore,
  path,
  tooltipData,
  user,
  currentFilters,
  filterOrder,
  filtersAreActive,
  tableOptions,
  customProps
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
          {`No ${getModelLabel({ schema, modelName, data, user, customProps })} Exists`}
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
        modelStore,
        path,
        tooltipData,
        user,
        currentFilters,
        filterOrder,
        filtersAreActive,
        tableOptions,
        customProps
      }}
    />
  )
}

export default Index
