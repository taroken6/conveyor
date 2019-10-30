import React from 'react'
import { getFieldLabel } from '../utils/schemaGetters'
import { showButtonColumn } from './Table'
import * as R from 'ramda'
import { getActions, getField } from '../utils/schemaGetters'
import { isRel } from '../utils/isType'
import { FilterComp, isColFilterable } from './Filter'
import { SortButton, isSortable } from './Sort'

export const THead = ({
  schema,
  modelName,
  fieldOrder,
  editable,
  deletable,
  detailField,
  data,
  tableOptions,
  sortable,
  filterable,
  selectOptions,
  customProps
}) => {
  const actions = getActions(schema, modelName)
  const onSort = R.path(['tableOptions', 'sort'], actions)
  const onFilterChange = R.path(['tableOptions', 'filterChange'], actions)
  const onFilterSubmit = R.path(['tableOptions', 'filterSubmit'], actions)
  const onFilterRadio = R.path(['tableOptions', 'filterRadio'], actions)
  const onMenuOpen = R.path(['input', 'onMenuOpen'], actions)
  return(
    <thead>
      <tr>
        {fieldOrder.map((fieldName, idx) => {
          const isRelField = isRel(getField(schema, modelName, fieldName))
          const filterInput = R.path(['filter', modelName, fieldName], tableOptions)
          const sortKeyObj = R.path(['sort', modelName], tableOptions)
          return (
            <th key={idx} style={{ minWidth: '130px' }}>
              <Header
                {...{
                  schema,
                  modelName,
                  fieldName,
                  title: getFieldLabel({
                    schema, modelName, fieldName, data, customProps
                  }), // this is the actual 'data' list, not 'node'
                  onFilterChange: (evt) => onFilterChange({
                    modelName,
                    ...evt
                  }),
                  onFilterSubmit,
                  onFilterRadio,
                  onSort,
                  onMenuOpen,
                  showSort: (
                    tableOptions &&
                    sortable &&
                    isSortable({schema, modelName, fieldName})
                  ) ? !isRelField : false,
                  showFilter: isColFilterable({schema, modelName, fieldName, tableOptions, filterable}),
                  sortKeyObj,
                  filterInput,
                  selectOptions,
                }}
              />
            </th>
        )})}
        {showButtonColumn({ deletable, editable, detailField }) && <th className='table_btn_col' />}
      </tr>
    </thead>
)}

export const Header = ({
  schema,
  modelName,
  fieldName,
  title,
  onFilterChange,
  onFilterSubmit,
  onFilterRadio,
  onSort,
  onMenuOpen,
  showSort,
  showFilter,
  sortKeyObj,
  filterInput,
  selectOptions
}) => (
  <div className='header'>
    <div className='title' >
      <a style={{ float: 'left', fontSize: '.9em' }}
        href={'#'}>
        {title}
      </a>
      <div className={'header-overflow'}>
        { showSort && <SortButton {...{ modelName, fieldName, onSort, sortKeyObj }} /> }
        { showFilter && <FilterComp {... { fieldName, modelName, schema, onFilterChange, onFilterSubmit, onFilterRadio, onMenuOpen, filterInput, selectOptions }} /> }
      </div>
    </div>
  </div>
)
