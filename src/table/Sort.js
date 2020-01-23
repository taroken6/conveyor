import React from 'react'
import * as consts from '../consts'
import * as R from 'ramda'
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'
import { getInputType } from '../form/InputType'

// currency sort is not broken, but does not have adequate permissions check
// and can give away cost info indirectly by sorting via cost value
export const isSortable = ({ schema, modelName, fieldName }) => {
  const inputType = getInputType({ schema, modelName, fieldName })
  // todo: add back currency once sort permissions added
  return !(
    (inputType === consts.inputTypes.CURRENCY_TYPE)
  )
}

const getSortIcon = (sortKey) => {
  switch (sortKey) {
    case undefined:
      return FaSort
    case 'asc':
      return FaSortUp
    case 'desc':
      return FaSortDown
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
  let sortKey
  if (R.prop('fieldName', sortKeyObj) === fieldName) {
    sortKey = R.prop('sortKey', sortKeyObj)
  }
  const SortIcon = getSortIcon(sortKey)

  const fillColor = sortKey ? 'lightgreen' : 'black'
  return (
    <SortIcon
      className={`header-icon-${sortKey ? 'active' : 'inactive'}`}
      color={fillColor}
      onClick={() => onSort({
        modelName,
        fieldName,
        sortKey: getNextSortKey(sortKey)
      })}
    />
  )
}
