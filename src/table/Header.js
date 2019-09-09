import React from 'react'
import { getFieldLabel } from '../Detail'
import { showButtonColumn } from './Table'
import * as R from 'ramda'
import { getActions, getField } from '../utils/schemaGetters'
import { isRel } from '../utils/isType'
import { SortButton } from './Sort'

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
  ...props
}) => {
  const actions = getActions(schema, modelName)
  const onSort = R.path(['tableOptions', 'sort'], actions)
  return(
    <thead>
      <tr>
        {fieldOrder.map((fieldName, idx) => {
          const isRelField = isRel(getField(schema, modelName, fieldName))
          const sortKeyObj = R.path(['sort', modelName], tableOptions)
          return (
            <th key={idx} style={{ minWidth: '130px' }}>
              <Header
                {...{
                  modelName,
                  fieldName,
                  title: getFieldLabel({
                    schema, modelName, fieldName, data:R.prop(fieldName, data)
                  }),
                  onSort,
                  showSort: (tableOptions && sortable) ? !isRelField : false,
                  sortKeyObj,
                }}
              />
            </th>
        )})}
        {showButtonColumn({ deletable, editable, detailField }) && <th className='table_btn_col' />}
      </tr>
    </thead>
)}

export const Header = ({ modelName, fieldName, title, onSort, showSort, sortKeyObj }) => (
  <div className='header'>
    <div className='title' >
      <a style={{ float: 'left', fontSize: '.9em' }}
        href={'#'}>
        {title}
      </a>
      { showSort && <SortButton {...{ modelName, fieldName, onSort, sortKeyObj }} /> }
    </div>
  </div>
)
