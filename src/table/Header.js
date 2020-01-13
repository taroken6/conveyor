import React from 'react'
import { getFieldLabel, getActions, getField, getFieldConditions } from '../utils/schemaGetters'
import { showButtonColumn } from './Table'
import * as R from 'ramda'
import { isRel } from '../utils/isType'
import { SortButton, isSortable } from './Sort'
import { shouldDisplay } from '../Utils'
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
  sortable,
  fromIndex,
  customProps
}) => {
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

          const isRelField = isRel(getField(schema, modelName, fieldName))
          const sortKeyObj = R.path(['sort', modelName], tableView)
          const showSort = (
            sortable && isSortable({schema, modelName, fieldName})
          ) ? !isRelField : false
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
