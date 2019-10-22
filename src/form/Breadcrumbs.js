import React from 'react'
import * as R from 'ramda'
import { getActions } from '../utils/schemaGetters'
import { getModelLabel } from '../utils/schemaGetters'

export const Breadcrumbs = ({ schema, formStack }) => {
  const stack = R.prop('stack', formStack)
  const index = R.prop('index', formStack)
  return (
    <nav aria-label='breadcrumbs' style={{ width: '100%' }}>
      <ol className='breadcrumb'>
        {stack.map((crumb, idx) => {
          const modelName = R.prop('modelName', crumb)
          const actions = getActions(schema, modelName)
          const modelDisplayname = getModelLabel({ schema, modelName })
          const onBreadcrumbClick = R.path(['create', 'onBreadcrumbClick'], actions)
          return (
            <li className={`breadcrumb-item ${index === idx && 'active'}`} key={`create-breadcrumb-${idx}`}>
              {index === idx && modelDisplayname}
              {index !== idx && <a href='#' onClick={(evt) => onBreadcrumbClick({ index: idx })}>{modelDisplayname}</a>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
