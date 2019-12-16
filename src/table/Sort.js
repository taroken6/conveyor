import React from 'react'
import * as consts from '../consts'
import * as R from 'ramda'
import ReactSVG from 'react-svg'
import { inputTypes } from '../consts'
import { getInputType } from '../form/InputType'

// currency sort is not broken, but does not have adequate permissions check
// and can give away cost info indirectly by sorting via cost value
export const isSortable = ({schema, modelName, fieldName}) => {
  const inputType = getInputType({ schema, modelName, fieldName })
   // todo: add back currency once sort permissions added
  return !(
    (inputType === inputTypes.CURRENCY_TYPE)
  )
}

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

export const getNextSortKey = (sortKey) => {
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
      className='header-icon'
      svgStyle={{width: '20px', height: '20px', fill: fillColor}}
      onClick={() => onSort({
        modelName,
        fieldName,
        sortKey: getNextSortKey(sortKey)
      })}
    />
  )
}
