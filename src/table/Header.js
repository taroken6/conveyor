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
  tableOptions,
  sortable,
  fromIndex,
  customProps
}) => {
  const actions = getActions(schema, modelName)
  const onSort = R.path(['tableOptions', 'sort'], actions)
  return(
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
          const sortKeyObj = R.path(['sort', modelName], tableOptions)
          return (
            <th key={idx} style={{ minWidth: '130px' }}>
              <Header
                {...{
                  modelName,
                  fieldName,
                  title: getFieldLabel({
                    schema, modelName, fieldName, data, customProps
                  }), // this is the actual 'data' list, not 'node'
                  onSort,
                  showSort: (
                    tableOptions &&
                    sortable &&
                    isSortable({schema, modelName, fieldName})
                  ) ? !isRelField : false,
                  sortKeyObj,
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
  sortKeyObj,
}) => {
  let sortKey = undefined
  if (R.prop('fieldName', sortKeyObj) === fieldName) {
    sortKey = R.prop('sortKey', sortKeyObj)
  }
  return (
    <div
      className='header'
      onClick={() => showSort ? onSort({
        modelName,
        fieldName,
        sortKey: getNextSortKey(sortKey)
      }) : {}}
    >
      <div className='title' >
        <a style={{ float: 'left', fontSize: '.9em' }}
          href={'#'}>
          {title}
        </a>
      </div>
      <div className={'header-overflow'}>
        { showSort && <SortButton {...{ modelName, fieldName, onSort, sortKeyObj }} /> }
      </div>
    </div>
  )
}
