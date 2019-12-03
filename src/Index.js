import React from 'react'
import { Table } from './table/Table'
import * as R from 'ramda'
import CreateButton from './CreateButton'
import { FilterModal, FilterModalButton } from './table/Filter'
import {
  getActions,
  getHasIndex,
  getIndexFields,
  getModelLabelPlural
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
  path,
  data,
  user,
  selectedField,
  currentFilters,
  filterOrder,
  customProps
}) => {
  const actions = getActions(schema, modelName)
  const onCreateClick = R.path(['create', 'onIndexCreate'], actions)
  const addFilter = R.path(['tableOptions', 'addFilter'], actions)
  const clearFilters = R.path(['tableOptions', 'clearFilters'], actions)
  const changeField = R.path(['tableOptions', 'changeField'], actions)
  const onFilterChange = R.path(['tableOptions', 'filterChange'], actions)
  const onFilterSubmit = R.path(['tableOptions', 'filterSubmit'], actions)
  const onFilterRadio = R.path(['tableOptions', 'filterRadio'], actions)
  const onClick = () => onCreateClick({ modelName, path })
  const creatable = isCreatable({ schema, modelName, data, user, customProps })
  return (
    <div style={{ marginBottom: '10px' }}>
      <h3 className='d-inline'>
        {getModelLabelPlural({schema, modelName, data, user, customProps })}
      </h3>
      <FilterModal {...{
        modelName,
        schema,
        data,
        addFilter,
        clearFilters,
        changeField,
        onFilterChange,
        onFilterSubmit,
        onFilterRadio,
        currentFilters,
        filterOrder,
        selectedField
      }} />
      <div className='float-right'>
        <FilterModalButton {...{ modelName, currentFilters }} />
        {creatable && <CreateButton {...{ onClick, selectedField }} />}
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
  path,
  tooltipData,
  user,
  selectedField,
  currentFilters,
  filterOrder,
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
            selectedField,
            currentFilters,
            filterOrder,
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
            path,
            tooltipData,
            user,
            selectedField,
            currentFilters,
            filterOrder,
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
  path,
  tooltipData,
  user,
  selectedField,
  currentFilters,
  filterOrder,
  tableOptions,
  customProps
}) => {
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
        user,
        selectedField,
        currentFilters,
        filterOrder,
        tableOptions,
        customProps
      }}
    />
  )
}

export default Index
