import React from 'react'
import { getFooterLabel, getFieldConditions } from '../utils/schemaGetters'
import { shouldDisplay, isFooterShown, isDetailFieldFooterShown } from '../Utils'
import { Summation, DetailSummation } from './Summation'
import * as R from 'ramda'

export const TFoot = ({
  schema,
  modelName,
  parentModelName,
  parentFieldName,
  fieldOrder,
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

          const showFooterInfo = fromIndex ? isFooterShown({ schema, modelName, fieldName, user }) :
            isDetailFieldFooterShown({ schema, parentModelName, parentFieldName, modelName, fieldName, user })
          let shownFooters

          return (
            <th key={`${idx}-${modelName}-${fieldName}`} style={{ minWidth: '130px' }}>
              <Footer
                {...{
                  schema,
                  modelName,
                  fieldName,
                  parentModelName,
                  parentFieldName,
                  title: showFooterInfo ? getFooterLabel({ schema, modelName, fieldName, data, customProps }) : false,
                  summary,
                  fromIndex,
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

export const Footer = ({ schema, modelName, fieldName, parentModelName, parentFieldName, title, summary, fromIndex, showFooterInfo, customProps }) => {
  return (
    <div className="footer">
      <div className="sum">
        <span className="footer-title">{title ? `Total ${title}: ` : null}</span>
        {fromIndex ? (showFooterInfo && <Summation {...{ schema, modelName, fieldName, summary, customProps }} />) :
          (showFooterInfo && <DetailSummation {...{
            schema, modelName, fieldName, parentModelName, parentFieldName, summary, customProps
          }} />)}
      </div>
    </div>
  )
}
