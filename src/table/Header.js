import React from 'react'
import { getFieldLabel } from '../Detail'
import { showButtonColumn } from './Table'
import * as R from 'ramda'

export const THead = ({
  schema,
  modelName,
  fieldOrder,
  editable,
  deletable,
  detailField,
  data,
  ...props
}) => (
  <thead>
    <tr>
      {fieldOrder.map((fieldName, idx) => (
        <th key={idx} style={{ minWidth: '130px' }}>
          <Header title={getFieldLabel({ schema, modelName, fieldName, data: R.prop(fieldName, data) })} />
        </th>
      ))}
      {showButtonColumn({ deletable, editable, detailField }) && <th className='table_btn_col' />}
    </tr>
  </thead>
)

export const Header = ({ title }) => (
  <div className='header'>
    <div className='title' >
      <a style={{ float: 'left', fontSize: '.9em' }}
        href={'#'}>
        {title}
      </a>
    </div>
  </div>
)
