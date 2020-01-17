import React from 'react'
import * as R from 'ramda'
import 'bootstrap'
import { getActions } from './utils/schemaGetters'

const PaginationLink = ({ modelName, changePage, text, updatedPageIndex }) => {
  return (
    <li className="page-item">
      <a className="page-link" href="#" onClick={() => changePage({
        modelName,
        updatedPageIndex
      })}>
        {text}
      </a>
    </li>
  )
}

export const Pagination = ({ schema, modelName, tableView }) => {
  const actions = getActions(schema, modelName)
  const changePage = R.path(['tableOptions', 'changePage'], actions)

  // current page idx
  const idx = R.pathOr(0, ['page', modelName], tableView)

  // get index of last hypothetical data point
  const totalDataLength = R.prop('totalDataLength', tableView)
  const paginationAmt = R.prop('paginationAmt', tableView)
  const lastIndex = Math.floor((totalDataLength - 1) / paginationAmt)

  // get previous & last conditions
  const hasPrevious = idx > 0
  const hasLast = (lastIndex > 0) && (idx !== lastIndex)

  console.log('totalDataLength', totalDataLength)
  console.log('lastIndex', lastIndex)
  console.log('idx', idx)
  console.log('hasPrev', hasPrevious)
  console.log('hasLast', hasLast)

  // no pagination
  if (!hasPrevious && !hasLast) {
    return null
  }

  //'←'
  //'⇤'
  //'→'
  //'⇥'
  //'«' ... '»'
  //'‹' ... '›'
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {
          hasPrevious && <PaginationLink {...{
            modelName,
            changePage,
            text: '‹',
            updatedPageIndex: (idx - 1)
          }} />
        }

        {
          <PaginationLink {...{
            modelName,
            changePage,
            text: `${idx}`,
            updatedPageIndex: (idx)
          }} />
        }

        {
          hasLast && <PaginationLink {...{
            modelName,
            changePage,
            text: '›',
            updatedPageIndex: (idx + 1)
          }} />
        }
      </ul>
    </nav>
  )
}
