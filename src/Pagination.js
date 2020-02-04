import React from 'react'
import * as R from 'ramda'
import { getActions } from './utils/schemaGetters'
import { Tooltip } from 'react-tippy'

const PaginationLink = ({ modelName, fieldName, onChangePage, text, updatedPageIndex }) => {
  const link = <a
    className='page-link'
    href='#'
    onClick={() => onChangePage({
      modelName, fieldName, updatedPageIndex
    })}
  >{text}</a>
  if (isNaN(text)) {
    return (
      <Tooltip
        html={<span>{`Page ${updatedPageIndex + 1}`}</span>}
        delay={0}
        interactive
      >{link}</Tooltip>
    )
  }
  return link
}

export const Pagination = ({
  modelName,
  fieldName = null,
  idx,
  lastIndex,
  totalDataLength,
  amtPerPage,
  onChangePage
}) => {
  // get previous & last conditions; 'lastIndex' can be null or '0' value
  const hasFirst = idx > 1
  const hasPrev = idx > 0
  const hasNext = lastIndex > 0 && idx < lastIndex
  const hasLast = lastIndex > 0 && idx < lastIndex - 1

  // number displayed to user
  const displayIndex = idx + 1

  // no pagination
  if (!hasFirst && !hasPrev && !hasNext && !hasLast) {
    return null
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {hasFirst && (
          <PaginationLink
            {...{
              modelName,
              fieldName,
              onChangePage,
              text: '«',
              updatedPageIndex: 0
            }}
          />
        )}
        {hasPrev && (
          <PaginationLink
            {...{
              modelName,
              fieldName,
              onChangePage,
              text: '‹',
              updatedPageIndex: idx - 1
            }}
          />
        )}
        {
          <PaginationLink
            {...{
              modelName,
              fieldName,
              onChangePage,
              text: `${displayIndex}`,
              updatedPageIndex: idx
            }}
          />
        }
        {hasNext && (
          <PaginationLink
            {...{
              modelName,
              fieldName,
              onChangePage,
              text: '›',
              updatedPageIndex: idx + 1
            }}
          />
        )}
        {hasLast && (
          <PaginationLink
            {...{
              modelName,
              fieldName,
              onChangePage,
              text: '»',
              updatedPageIndex: lastIndex
            }}
          />
        )}
        {totalDataLength && amtPerPage && (
          <span className="ml-2 my-auto">
            {idx * amtPerPage + 1}-
            {Math.min((idx + 1) * amtPerPage, totalDataLength)} of{' '}
            {totalDataLength}
          </span>
        )}
      </ul>
    </nav>
  )
}

export const IndexPagination = ({ schema, modelName, tableView }) => {
  const actions = getActions(schema, modelName)
  const onChangePage = R.path(['tableOptions', 'changePage'], actions)

  // current page idx
  const idx = R.pathOr(0, [modelName, 'page', 'currentPage'], tableView)

  // get index of last hypothetical data point
  const lastIndex = R.path([modelName, 'page', 'lastIndex'], tableView)

  const totalDataLength = R.path([modelName, 'page', 'total'], tableView)
  const amtPerPage = R.prop('amtPerPage', tableView)

  return <Pagination {...{ modelName, idx, lastIndex, totalDataLength, amtPerPage, onChangePage }} />
}

export const DetailPagination = ({ schema, modelName, fieldName, tableView }) => {
  const actions = getActions(schema, modelName)
  const onChangePage = R.path(['tableOptions', 'changeRelTablePage'], actions)

  // current page idx
  const idx = R.pathOr(0, [modelName, 'fields', fieldName, 'page', 'currentPage'], tableView)

  // get index of last hypothetical data point
  const lastIndex = R.path([modelName, 'fields', fieldName, 'page', 'lastIndex'], tableView)

  const totalDataLength = R.path(
    [modelName, 'fields', fieldName, 'page', 'total'],
    tableView
  )
  const amtPerPage = R.prop('amtPerPage', tableView)

  return <Pagination {...{ modelName, fieldName, idx, lastIndex, totalDataLength, amtPerPage, onChangePage }} />
}
