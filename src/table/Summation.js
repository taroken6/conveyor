import React from 'react'
import { inputTypes } from '../consts';
import { getType } from '../utils/getType'

export const Summation = ({ schema, modelName, fieldName, summary, customProps }) => {
  return <span>{summary ? `$${summary}` : 'N/A'}</span>
}
