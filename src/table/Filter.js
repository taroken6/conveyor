import React from 'react'
import { InputCore } from '../form/Input'
import { getInputType } from '../form/InputType'
import ReactSVG from 'react-svg'
import { Tooltip } from 'react-tippy'
import * as R from 'ramda'
import { inputTypes } from '../consts'
import FlexibleInput from '../input'
import { Modal } from '../Modal'

// todo: fix this
// band-aid solution for filter types that are still broken;
// currency filter is not broken, but does not have adequate permissions check
// and can give away cost info indirectly by filtering via cost value
export const isFilterable = ({schema, modelName, fieldName}) => {
  const inputType = getInputType({ schema, modelName, fieldName })
  return !(
    (inputType === inputTypes.ENUM_TYPE) ||
    (inputType === inputTypes.RELATIONSHIP_SINGLE) ||
    (inputType === inputTypes.RELATIONSHIP_MULTIPLE) ||
    (inputType === inputTypes.DATE_TYPE) ||
    (inputType === inputTypes.PHONE_TYPE) ||
    (inputType === inputTypes.BOOLEAN_TYPE) ||
    // todo: add back currency once filter permissions added
    (inputType === inputTypes.CURRENCY_TYPE)
  )
}

export const isColFilterable = ({schema, modelName, fieldName, tableOptions, filterable}) => !!tableOptions && filterable && isFilterable({schema, modelName, fieldName})

export const isTableFilterable = ({schema, modelName, fieldOrder, tableOptions, filterable}) => {
  const boolList = R.map(fieldName =>
    isColFilterable({ schema, modelName, fieldName, tableOptions, filterable }),
    fieldOrder
  )
  return !R.isEmpty(R.filter(R.identity, boolList))
}

export const FilterModal = ({modelName}) => (
  <Modal
    id={'filter-' + modelName}
    title={'Filter ' + modelName}
  >
    {null}
  </Modal>
)

const FilterRadio = ({modelName, fieldName, operator, onFilterSubmit, onFilterRadio, options}) => {
  return (
    <React.Fragment>
      <FlexibleInput
        type={inputTypes.RADIO_TYPE}
        onChange={(val) => onFilterRadio({
          modelName,
          fieldName,
          operator: val
        })}
        value={operator}
        options={options}
        id={`${modelName}-${fieldName}-filter-radio`}
      />
      <div className='btn-group'>
        <button
          className='btn btn-sm btn-outline-primary'
          onClick={() => onFilterSubmit({ modelName, fieldName, operator })}
        >Apply</button>
        <button
          className='btn btn-sm btn-outline-secondary'
          onClick={() => onFilterSubmit({ modelName, fieldName, operator: null })}
        >Reset</button>
      </div>
    </React.Fragment>
  )
}

const stringOptions = [
  { label: 'Includes', value: 'INCLUDES' },
  { label: 'Equals', value: 'EQUALS' }
]

const numberOptions = [
  { label: '<', value: 'lt' },
  { label: '<=', value: 'lte' },
  { label: '=', value: 'eq' },
  { label: '!=', value: 'neq' },
  { label: '>', value: 'gt' },
  { label: '>=', value: 'gte' },
]

const relOptions = [
  { label: 'Includes', value: 'INCLUDES' }
]

const enumOptions = [
  { label: 'Includes', value: 'INCLUDES' },
  { label: 'Excludes', value: 'EXCLUDES' }
]

const FilterApplyButton = ({ schema, modelName, fieldName, operator, onFilterSubmit, onFilterRadio }) => {
  const inputType = getInputType({ schema, modelName, fieldName })

  let options
  switch (inputType) {
    case inputTypes.INT_TYPE:
    case inputTypes.FLOAT_TYPE:
    case inputTypes.CURRENCY_TYPE:
      options = numberOptions
      break;
    case inputTypes.ENUM_TYPE:
      options = enumOptions
      break;
    case inputTypes.RELATIONSHIP_SINGLE:
    case inputTypes.RELATIONSHIP_MULTIPLE:
      options = relOptions
      break;
    default:
      options = stringOptions
  }
  return <FilterRadio {...{ modelName, fieldName, operator, onFilterSubmit, onFilterRadio, options }} />
}

// todo: finish
  // case inputTypes.DATE_TYPE:
  // case inputTypes.PHONE_TYPE:
  // case inputTypes.BOOLEAN_TYPE:

const FilterPopover = ({ schema, modelName, fieldName, value, operator, onFilterChange, onFilterSubmit, onFilterRadio, selectOptions, onMenuOpen }) => (
  <div style={{ 'minWidth': '350px', 'textAlign': 'left' }}>
    <InputCore {...{
      schema,
      modelName,
      fieldName,
      value,
      onChange: onFilterChange,
      inline: true,
      selectOptions,
      onMenuOpen,
    }} />
    <FilterApplyButton {...{schema, modelName, fieldName, operator, onFilterSubmit, onFilterRadio}} />
  </div>
)

export const FilterComp = ({
  fieldName,
  modelName,
  schema,
  onFilterChange,
  onFilterSubmit,
  onFilterRadio,
  onMenuOpen,
  filterInput,
  selectOptions
}) => {
  const value = R.prop('value', filterInput)
  const operator = R.prop('operator', filterInput)
  // 'black' for undefined/null/emtpy str
  const fillColor = (R.isEmpty(value) || R.isNil(value)) ? 'black': 'lightgreen'
  return (
    <React.Fragment>
      <Tooltip
        theme='light'
        interactive='true'
        position='bottom'
        trigger='click'
        html={(
          FilterPopover({
            schema, modelName, fieldName, value, operator, onFilterChange, onFilterSubmit, onFilterRadio, selectOptions, onMenuOpen
          })
        )}
      >
        <ReactSVG
          src={`/static/img/filter.svg`}
          className='header-icon'
          svgStyle={{width: '12px', height: '12px', fill: fillColor}}
        />
      </Tooltip>
    </React.Fragment>
  )
}
