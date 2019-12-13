import React from 'react'
import { getFieldLabel, getActions, getField, getFieldConditions } from '../utils/schemaGetters'
import { showButtonColumn } from './Table'
import * as R from 'ramda'
import { isRel } from '../utils/isType'
import { FilterComp, isColFilterable } from './Filter'
import { SortButton, isSortable } from './Sort'
import { shouldDisplay } from '../Utils'

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
          const sortKeyObj = R.path(['sort', modelName], tableView)
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
                    tableView &&
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
}) => (
  <div className='header'>
    <div className='title' >
      <a style={{ float: 'left', fontSize: '.9em' }}
        href={'#'}>
        {title}
      </a>
      <div className={'header-overflow'}>
        { showSort && <SortButton {...{ modelName, fieldName, onSort, sortKeyObj }} /> }
      </div>
    </div>
  </div>
)
