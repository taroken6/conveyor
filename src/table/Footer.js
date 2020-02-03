import React from 'react'
import { getFieldLabel, getActions, getFieldConditions, getFooterFields, getShownFooters } from '../utils/schemaGetters'
import { isSummable, shouldDisplay } from '../Utils'
import { Summation } from './Summation'
import * as R from 'ramda'

export const TFoot = ({
  schema,
  modelName,
  fieldOrder,
  editable,
  deletable,
  detailField,
  data,
  tableView,
  fromIndex,
  customProps,
  user
}) => {
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

          const showFooter = getShownFooters({ schema, modelName, type: 'summable', data, user, customProps })
          const showSummation = isSummable({ schema, modelName, fieldName, user })

          return (
            <th key={`${idx}-${modelName}-${fieldName}`} style={{ minWidth: '130px' }}>
              <Footer
                {...{
                  schema,
                  modelName,
                  fieldName,
                  title: getFieldLabel({ schema, modelName, fieldName, data, customProps }),
                  data,
                  showFooter,
                  showSummation,
                  customProps
                }}
              />
            </th>
          )
        })}
      </tr>
    </tfoot>
  )
}

export const Footer = ({ schema, modelName, fieldName, title, data, showFooter, showSummation, customProps }) => {
  return (
    <div className="footer">
      <div className="sum">
        <span className="footer-title">{title}</span>
        {showSummation && <Summation {...{ schema, modelName, fieldName, data }} />}
      </div>
    </div>
  )
}
