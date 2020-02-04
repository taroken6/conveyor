import React from 'react'
import { getFooterLabel, getActions, getFieldConditions, getFooterFields, getShownFooters } from '../utils/schemaGetters'
import { shouldDisplay, isTableFooterShown, isFooterShown } from '../Utils'
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
  summary,
  fromIndex,
  customProps,
  user,
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

          const showFooterInfo = isFooterShown({ schema, modelName, fieldName, user })
          const shownFooters = getShownFooters({ schema, modelName, type: fieldName.type, data, user, customProps })

          return (
            <th key={`${idx}-${modelName}-${fieldName}`} style={{ minWidth: '130px' }}>
              <Footer
                {...{
                  schema,
                  modelName,
                  fieldName,
                  title: showFooterInfo ? getFooterLabel({ schema, modelName, fieldName, data, customProps }) : false,
                  summary,
                  showFooterInfo,
                  shownFooters,
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

export const Footer = ({ schema, modelName, fieldName, title, summary, showFooterInfo, customProps }) => {
  return (
    <div className="footer">
      <div className="sum">
        <span className="footer-title">{title ? `Total ${title}: ` : null}</span>
        {showFooterInfo && <Summation {...{ schema, modelName, fieldName, summary, customProps }} />}
      </div>
    </div>
  )
}
