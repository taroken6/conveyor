import React from 'react'
import { InputCore } from '../form/Input'
import { getInputType } from '../form/InputType'
import ReactSVG from 'react-svg'
import * as R from 'ramda'
import { inputTypes } from '../consts'
import FlexibleInput from '../input'
import { Modal } from '../Modal'
import { getFieldLabel, getActions } from '../utils/schemaGetters.js'

// todo: fix this
// band-aid solution for filter types that are still broken;
// currency filter is not broken, but does not have adequate permissions check
// and can give away cost info indirectly by filtering via cost value
export const isFilterable = ({ schema, modelName, fieldName }) => {
  const inputType = getInputType({ schema, modelName, fieldName })
  return !(
    R.isNil(inputType) ||
    (inputType === inputTypes.CREATABLE_STRING_SELECT_TYPE) || // disabled for now
    (inputType === inputTypes.RELATIONSHIP_MULTIPLE) ||
    (inputType === inputTypes.PHONE_TYPE) ||
    (inputType === inputTypes.ID_TYPE) ||
    // todo: add back currency once filter permissions added
    (inputType === inputTypes.CURRENCY_TYPE)
  )
}

export const isColFilterable = ({ schema, modelName, fieldName, filterable }) =>
  filterable && isFilterable({ schema, modelName, fieldName })

export const isTableFilterable = ({ schema, modelName }) => {
  const model = R.prop(modelName, schema)
  const fieldOrder = R.prop('fieldOrder', model)
  const filterable = R.propOr(true, 'filterable', model)
  const boolList = R.map(fieldName =>
    isColFilterable({ schema, modelName, fieldName, filterable }),
    fieldOrder
  )
  return !R.isEmpty(R.filter(R.identity, boolList))
}

const getFilterableFields = ({ modelName, schema }) => {
  const fields = R.pathOr([], [modelName, 'fieldOrder'], schema)
  const filterables = fields.filter(
    fieldName => isFilterable({ schema, modelName, fieldName })
  )
  return filterables
}

const FilterButtons = ({
  modelName,
  onFilterSubmit,
  clearFilters,
  addFilter
}) => (
  <div className='mt-3'>
    <button
      className='btn btn-primary btn-sm'
      onClick={() => addFilter({ modelName })}
    >+ Add Rule</button>
    <div className='d-inline float-right'>
      <div className='btn-group'>
        <button
          className='btn btn-success btn-sm'
          onClick={() => onFilterSubmit({ modelName })}
        >Apply</button>
        <button
          className='btn btn-outline-danger btn-sm'
          onClick={() => {
            clearFilters({ modelName })
            onFilterSubmit({ modelName })
          }}
        >Reset</button>
      </div>
    </div>
  </div>
)

const formatFilter = ({
  fieldName,
  index,
  modelName,
  schema,
  data,
  onChange,
  selectOptions,
  filterOrder,
  onFilterChange,
  onFilterSubmit,
  onFilterDropdown,
  filterInputs,
  deleteFilter
}) => {
  const filterInput = R.prop(fieldName, filterInputs)
  const filterables = getFilterableFields({ modelName, schema })
  const toOptions = fieldName => ({
    label: getFieldLabel({ schema, modelName, fieldName, data }),
    value: fieldName
  })
  const unfiltered = filterables.filter(fieldName => !filterOrder.includes(fieldName))
  const options = unfiltered.map(fieldName => toOptions(fieldName))
  const value = R.isNil(fieldName) || R.isEmpty(fieldName)
    ? { label: null, value: null }
    : toOptions(filterOrder[index])
  return (
    <li key={`${index}-${modelName}-${fieldName}-format-filter`} className='list-group-item filter'>
      <div className='filter-fieldname-dropdown'>
        <div className='w-100'>
          <FlexibleInput {...{
            type: inputTypes.SELECT_TYPE,
            onChange: evt => onChange({
              modelName,
              fieldName: R.prop('value', evt),
              index
            }),
            value,
            options,
            id: `${index}-${modelName}-filter-dropdown`,
            isClearable: false,
            customInput: {
              noOptionsMessage: () => '(no filterable fields)',
              placeholder: 'Select field...'
            }
          }}/>
        </div>
      </div>
      <div className='filter-rest align-middle'>
        <div className='w-100'>
          <FilterComp {...{
            fieldName,
            modelName,
            schema,
            onFilterChange: evt => onFilterChange({
              modelName,
              ...evt
            }),
            onFilterSubmit,
            onFilterDropdown,
            filterInput,
            selectOptions
          }}/>
        </div>
      </div>
      <div className='filter-close filter-padded align-middle'>
        <button
          className='btn btn-sm btn-danger btn-block'
          onClick={() => deleteFilter({ modelName, index })}
        >X</button>
      </div>
    </li>
  )
}

const ActiveFilters = ({
  modelName,
  schema,
  data,
  addFilter,
  deleteFilter,
  onChange,
  selectOptions,
  filterOrder,
  clearFilters,
  onFilterChange,
  onFilterSubmit,
  onFilterDropdown,
  filterInputs
}) => (
  <div id={'active-filters-' + modelName} className='mb-2'>
    <ul className="list-group">{
      R.isEmpty(filterOrder) || R.isNil(filterOrder)
        ? <li key='no-active-filters' className='list-group-item text-muted'>Add a rule to get started...</li>
        : filterOrder.map((fieldName, index) =>
            formatFilter({
              fieldName,
              index,
              modelName,
              schema,
              data,
              onChange,
              selectOptions,
              filterOrder,
              onFilterChange,
              onFilterSubmit,
              onFilterDropdown,
              filterInputs,
              deleteFilter
            })
          )
    }</ul>
    <FilterButtons {...{
      modelName,
      onFilterSubmit,
      clearFilters,
      addFilter
    }}
    />
  </div>
)

export const FilterModal = ({
  schema,
  modelName,
  selectOptions,
  data,
  filterOrder,
  filterInputs
}) => {
  const actions = getActions(schema, modelName)
  const tableOptions = R.prop('tableOptions', actions)
  const addFilter = R.prop('addFilter', tableOptions)
  const deleteFilter = R.prop('deleteFilter', tableOptions)
  const clearFilters = R.prop('clearFilters', tableOptions)
  const changeField = R.prop('changeField', tableOptions)
  const onFilterChange = R.prop('filterChange', tableOptions)
  const onFilterSubmit = R.prop('filterSubmit', tableOptions)
  const onFilterDropdown = R.prop('filterDropdown', tableOptions)
  return (
    <Modal
      id={'filter-' + modelName}
      title={'Filters - ' + modelName}
      children={
        <ActiveFilters {...{
          modelName,
          schema,
          data,
          addFilter,
          deleteFilter,
          onChange: changeField,
          selectOptions,
          filterOrder,
          clearFilters,
          onFilterChange,
          onFilterSubmit,
          onFilterDropdown,
          filterInputs
        }} />
      }
    />
  )
}

export const FilterModalButton = ({ modelName, filtersAreActive }) => (
  <button
    className={'btn btn-sm btn-outline-primary'}
    data-toggle='modal'
    data-target={'#filter-' + modelName}
  >Filter
    <ReactSVG
      src={`/static/img/filter.svg`}
      className='header-icon ml-2'
      svgStyle={{
        width: '12px',
        height: '12px',
        fill: filtersAreActive ? 'lightgreen' : 'black'
      }}
    />
  </button>
)

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
  { label: '>=', value: 'gte' }
]

const relOptions = [
  { label: 'Includes', value: 'INCLUDES' }
]

const enumOptions = [
  { label: 'Includes', value: 'INCLUDES' }
]

const dateOptions = [
  { label: 'Before', value: 'BEFORE' }
]

const booleanOptions = [
  { label: 'Equals', value: 'EQUALS' }
]

const FilterOptions = ({
  schema,
  modelName,
  fieldName,
  operator,
  onFilterDropdown
}) => {
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
    case inputTypes.DATE_TYPE:
      options = dateOptions
      break;
    case inputTypes.BOOLEAN_TYPE:
      options = booleanOptions
      break;
    case inputTypes.RELATIONSHIP_SINGLE:
    case inputTypes.RELATIONSHIP_MULTIPLE:
      options = relOptions
      break;
    default:
      options = stringOptions
  }
  return (
    <React.Fragment>
      <FlexibleInput
        type={inputTypes.SELECT_TYPE}
        onChange={val => onFilterDropdown({
          modelName,
          fieldName,
          operator: val
        })}
        value={operator}
        options={options}
        id={`${modelName}-${fieldName}-filter-radio`}
        isClearable={false}
      />
    </React.Fragment>
  )
}

// todo: finish
  // case inputTypes.DATE_TYPE:
  // case inputTypes.PHONE_TYPE:
  // case inputTypes.BOOLEAN_TYPE:


export const FilterComp = ({
  fieldName,
  modelName,
  schema,
  onFilterChange,
  onFilterSubmit,
  onFilterDropdown,
  filterInput,
  selectOptions
}) => {
  if (R.isNil(fieldName) || R.isEmpty(fieldName)) {
    return <div className='ml-1 mt-1 filter-padded'>Select a field</div>
  }
  const value = R.prop('value', filterInput)
  const operator = R.prop('operator', filterInput)
  return (
    <React.Fragment>
      <div className='filter-operator-dropdown'>
        <FilterOptions {...{
          schema,
          modelName,
          fieldName,
          operator,
          onFilterSubmit,
          onFilterDropdown,
        }} />
      </div>
      <div className='filter-input'>
        <InputCore {...{
          schema,
          modelName,
          fieldName,
          value,
          onChange: onFilterChange,
          inline: true,
          selectOptions,
          customInput: {
            placeholder: 'Enter value...',
          }
        }} />
      </div>
    </React.Fragment>
  )
}
