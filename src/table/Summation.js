import React from 'react'
import * as consts from '../consts'
import * as R from 'ramda'
import { isSummable } from '../Utils'
import { getFieldLabel } from '../utils/schemaGetters'

const getSum = ({ modelName, fieldName, data }) => {
  let sumString
  if (data.length >= 1) {
    const sum = data.map((node, idx) => node[fieldName]).reduce((prev, curr) => prev + curr)
    sumString = `$${sum}`
  } else {
    sumString = 'N/A'
  }
  return sumString
}

export const Summation = ({ schema, modelName, fieldName, data }) => {
  // getSum({ modelName, fieldName })
  const total = getSum({ modelName, fieldName, data })

  return <span>{` Total: ${total}`}</span>
}
