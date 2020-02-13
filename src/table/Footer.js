import React from 'react'
import { getFieldConditions } from '../utils/schemaGetters'
import { shouldDisplay } from '../Utils'
import * as R from 'ramda'
import { getType } from '../utils/getType'

export const TFoot = ({
  schema,
  modelName,
  parentModelName,
  parentFieldName,
  fieldOrder,
  summary,
  fromIndex,
  customProps,
}) => {
  const geSummaryPath = fieldName => fromIndex ? [modelName, fieldName] : [parentModelName, parentFieldName, fieldName]

  const checkFooterField = fieldName => {
      const summaryPath = geSummaryPath(fieldName)
      const schemaPath = [modelName, 'fields', fieldName, 'showFooter']
      return(
        R.path(summaryPath, summary) &&
        R.path(schemaPath, schema)
      )
    }

  const showFooter = R.any(
    checkFooterField,
    fieldOrder
  )

  if (!showFooter) {
    return null
  }

  return (
    <tfoot>
      <tr>
        {fieldOrder.map((fieldName, idx) => {
          if (fromIndex === true) {
            const displayCondition = R.prop('index', getFieldConditions(schema, modelName, fieldName))
            if (
              shouldDisplay({
                schema,
                modelName,
                fieldName,
                displayCondition,
                customProps
              }) === false
            ) {
              return null
            }
          }

          if (!checkFooterField(fieldName)) {
            return <th key={`${idx}-${modelName}-${fieldName}`} />
          }
          const summaryPath = geSummaryPath(fieldName)
          let total = R.path(summaryPath, summary)

          if (getType({ schema, modelName, fieldName }) === 'currency')
            total = new Intl.NumberFormat('en-US', {
              style: 'currency', currency: 'USD'
            }).format(total)

          return (
            <th key={`${idx}-${modelName}-${fieldName}`} style={{ minWidth: '130px' }}>
              <div className="footer">
                <div className="sum">
                  {total}
                </div>
              </div>
            </th>
          )
        })}
      </tr>
    </tfoot>
  )
}


