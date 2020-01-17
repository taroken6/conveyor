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

  // get previous & last conditions; 'lastIndex' can be NaN
  const hasFirst = idx > 1
  const hasPrev = idx > 0
  const hasNext = (lastIndex > 0) && (idx < lastIndex)
  const hasLast = (lastIndex > 0) && (idx < (lastIndex-1))

  // number displayed to user
  const displayIndex = idx + 1

  // no pagination
  if (!hasFirst && !hasPrev && !hasNext && !hasLast) {
    return null
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {
          hasFirst && <PaginationLink {...{
            modelName,
            changePage,
            text: '«',
            updatedPageIndex: (0)
          }} />
        }
        {
          hasPrev && <PaginationLink {...{
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
            text: `${displayIndex}`,
            updatedPageIndex: (idx)
          }} />
        }
        {
          hasNext && <PaginationLink {...{
            modelName,
            changePage,
            text: '›',
            updatedPageIndex: (idx + 1)
          }} />
        }
        {
          hasLast && <PaginationLink {...{
            modelName,
            changePage,
            text: '»',
            updatedPageIndex: (lastIndex)
          }} />
        }
      </ul>
    </nav>
  )
}
