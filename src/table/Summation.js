import React from 'react'
import * as R from 'ramda'
import { getType } from '../utils/getType'

export const Summation = ({ schema, modelName, fieldName, title, summary, customProps }) => {
  let total

  if (summary && summary[modelName]) {
    const currentTotal = R.path([modelName, fieldName], summary)
    if (currentTotal === undefined)
      total = 'N/A'
    else if (getType({ schema, modelName, fieldName }) === 'currency')
      total = new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD'
      }).format(currentTotal)
    else
      total = currentTotal
  } else {
    total = 'N/A'
  }

  return <span>{total ? `Total ${title}: ${total}` : null}</span>
}

export const DetailSummation = ({ schema, modelName, fieldName, parentModelName, parentFieldName, title, summary, customProps }) => {
  let total
  if (summary) {
    const fieldTotal = R.path([parentModelName, parentFieldName, fieldName], summary)
    if (fieldTotal === undefined)
      total = null
    else if (getType({ schema, modelName, fieldName }) === 'currency')
      total = new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD'
      }).format(fieldTotal)
    else
      total = fieldTotal
  } else {
    total = null
  }

  return <span>{total ? `Total ${title}: ${total}` : null}</span>
}
