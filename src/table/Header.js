import React from 'react'
import { getFieldLabel, getActions, getField, getFieldConditions } from '../utils/schemaGetters'
import { showButtonColumn } from './Table'
import * as R from 'ramda'
import { isRel } from '../utils/isType'
import { SortButton } from './Sort'
import {isSortable, isTableSortable, shouldDisplay} from '../Utils'
import { getNextSortKey } from './Sort.js'

export const THead = ({
  schema,
  modelName,
  fieldOrder,
  editable,
  deletable,
  detailField,
  data,
  tableView,
  fromIndex,
  customProps,
  user
}) => {
  // first check if sortable on model level
  const tableSortable = fromIndex && isTableSortable({ schema, modelName, user })
  const actions = getActions(schema, modelName)
  const onSort = R.path(['tableOptions', 'sort'], actions)
  return (
    <thead>
      <tr>
        {fieldOrder.map((fieldName, idx) => {
          if (fromIndex === true) {
            const displayCondition = R.prop(
              'index',
              getFieldConditions(schema, modelName, fieldName)
            )
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

          const sortKeyObj = R.path(['sort', modelName], tableView)
          // now check if field level is sortable as well
          const showSort = tableSortable ? isSortable({ schema, modelName, fieldName, user }) : false
          const sortKey = R.prop('fieldName', sortKeyObj) === fieldName
            ? R.prop('sortKey', sortKeyObj) : undefined
          return (
            <th
              key={`${idx}-${modelName}-${fieldName}`}
              style={{ minWidth: '130px' }}
              onClick={() => showSort ? onSort({
                modelName,
                fieldName,
                sortKey: getNextSortKey(sortKey)
              }) : {}}
            >
              <Header
                {...{
                  modelName,
                  fieldName,
                  title: getFieldLabel({
                    schema, modelName, fieldName, data, customProps
                  }), // this is the actual 'data' list, not 'node'
                  onSort,
                  showSort,
                  sortKeyObj
                }}
              />
            </th>
        )})}
        {showButtonColumn({ deletable, editable, detailField }) && <th className='table_btn_col' />}
      </tr>
    </thead>
)}

export const Header = ({
  modelName,
  fieldName,
  title,
  onSort,
  showSort,
  sortKeyObj
}) => {
  return (
    <div className='header'>
      <div className='title' >
        <a className='header-title' href={'#'}>{title}</a>
      </div>
      <div className={'header-overflow'}>
        { showSort && <SortButton {...{ modelName, fieldName, onSort, sortKeyObj }} /> }
      </div>
    </div>
  )
}
