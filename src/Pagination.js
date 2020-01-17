import React from 'react'
import * as R from 'ramda'
import 'bootstrap'
import { getActions } from './utils/schemaGetters'

export const Pagination = ({ schema, modelName, ...props }) => {
  const actions = getActions(schema, modelName)

  console.log('conveyor props', props)
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
        <li className="page-item"><a className="page-link" href="#">1</a></li>
        <li className="page-item"><a className="page-link" href="#">2</a></li>
        <li className="page-item"><a className="page-link" href="#">3</a></li>
        <li className="page-item"><a className="page-link" href="#">Next</a></li>
      </ul>
    </nav>
  )
}
