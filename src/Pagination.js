import React from 'react'
import * as R from 'ramda'
import { getActions } from './utils/schemaGetters'
import { Tooltip } from 'react-tippy'
import FlexibleInput from './input'
import { inputTypes } from './consts'

const GotoTooltip = ({
  modelName,
  fieldName,
  onChangePage,
  onChangeGoto,
  lastIndex,
  goto,
}) => {
  const isValidPage = 0 <= goto <= lastIndex
  return (
    <div className='d-flex goto-tooltip'>
      <div className='mr-2 float-left'>
        <FlexibleInput {...{
          type: inputTypes.INT_TYPE,
          id: `${modelName}${fieldName}-goto`,
          value: goto,
          onChange: evt => onChangeGoto({ modelName, fieldName, pageIndex: evt, isValidPage }),
          customInput: {
            placeholder: 'Go to page...',
          }
        }}/>
      </div>
      <div className='float-right'>
        <button
          className='btn btn-success'
          onClick={() => onChangePage({ modelName, fieldName, updatedPageIndex: goto - 1, isValidPage })}
        >Go</button>
      </div>
    </div>
  )
}

const PaginationLink = ({
  modelName,
  fieldName,
  onChangePage,
  onChangeGoto = null,
  lastIndex,
  goto = null,
  text,
  updatedPageIndex
}) => {
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
      >{link}</Tooltip>
    )
  }
  return (
    <Tooltip
      html={<GotoTooltip {...{
        modelName,
        fieldName,
        onChangePage,
        onChangeGoto,
        lastIndex,
        goto,
        text,
        updatedPageIndex
      }} />}
      trigger='click'
      interactive
    >{link}</Tooltip>
  )
}

export const Pagination = ({
  modelName,
  fieldName = null,
  idx,
  lastIndex,
  goto,
  onChangePage,
  onChangeGoto
}) => {
  // get previous & last conditions; 'lastIndex' can be null or '0' value
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
            fieldName,
            onChangePage,
            text: '«',
            updatedPageIndex: (0)
          }} />
        }
        {
          hasPrev && <PaginationLink {...{
            modelName,
            fieldName,
            onChangePage,
            text: '‹',
            updatedPageIndex: (idx - 1)
          }} />
        }
        {
          <PaginationLink {...{
            modelName,
            fieldName,
            onChangePage,
            onChangeGoto,
            lastIndex,
            goto,
            text: `${displayIndex}`,
            updatedPageIndex: (idx)
          }} />
        }
        {
          hasNext && <PaginationLink {...{
            modelName,
            fieldName,
            onChangePage,
            text: '›',
            updatedPageIndex: (idx + 1)
          }} />
        }
        {
          hasLast && <PaginationLink {...{
            modelName,
            fieldName,
            onChangePage,
            text: '»',
            updatedPageIndex: (lastIndex)
          }} />
        }
      </ul>
    </nav>
  )
}

export const IndexPagination = ({ schema, modelName, tableView }) => {
  const actions = getActions(schema, modelName)
  const onChangePage = R.path(['tableOptions', 'changePage'], actions)
  const onChangeGoto = R.path(['tableOptions', 'changeGotoPage'], actions)
  const page = R.path([modelName, 'page'], tableView)
  const goto = R.prop('goto', page)

  // current page idx
  const idx = R.propOr(0, 'currentPage', page)

  // get index of last hypothetical data point
  const lastIndex = R.prop('lastIndex', page)

  return <Pagination {...{ modelName, idx, lastIndex, goto, onChangePage, onChangeGoto }} />
}

export const DetailPagination = ({ schema, modelName, fieldName, tableView }) => {
  const actions = getActions(schema, modelName)
  const onChangePage = R.path(['tableOptions', 'changeRelTablePage'], actions)
  const onChangeGoto = R.path(['tableOptions', 'changeRelGotoPage'], actions)
  const page = R.path([modelName, 'fields', fieldName, 'page'], tableView)
  const goto = R.prop('goto', page)

  // current page idx
  const idx = R.propOr(0, 'currentPage', page)

  // get index of last hypothetical data point
  const lastIndex = R.prop('lastIndex', page)

  return <Pagination {...{ modelName, fieldName, idx, lastIndex, goto, onChangePage, onChangeGoto }} />
}
