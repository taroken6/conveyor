import React from 'react'
import * as consts from '../consts'
import * as R from 'ramda'
import ReactSVG from 'react-svg'

const getSortIcon = (sortKey) => {
  switch (sortKey) {
    case undefined:
      return 'sort'
    case 'asc':
      return 'sort-up'
    case 'desc':
      return 'sort-down'
  }
}

const getNextSortKey = (sortKey) => {
  switch (sortKey) {
    case undefined:
      return consts.ASC
    case consts.ASC:
      return consts.DESC
    case consts.DESC:
      return undefined
  }
}

export const SortButton = ({ modelName, fieldName, onSort, sortKeyObj }) => {
  let sortKey = undefined
  if (R.prop('fieldName', sortKeyObj) === fieldName) {
    sortKey = R.prop('sortKey', sortKeyObj)
  }

  const fillColor = sortKey ? 'lightgreen' : 'black'
  return (
    <ReactSVG
      src={`/static/img/${getSortIcon(sortKey)}.svg`}
      className='edit-icon'
      svgStyle={{width: '20px', height: '20px', fill: fillColor}}
      onClick={() => onSort({
        modelName,
        fieldName,
        sortKey: getNextSortKey(sortKey)
      })}
    />
  )
}
