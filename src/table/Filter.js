import React from 'react'
import { InputCore } from '../form/Input'
import { FaFilter } from 'react-icons/fa'
import * as R from 'ramda'
import { inputTypes } from '../consts'
import FlexibleInput from '../input'
import { Modal } from '../Modal'
import { getFieldLabel, getActions } from '../utils/schemaGetters.js'
import { getType } from '../utils/getType'

// should not be used w/o checking 'isTableFilterable' as well (model level req)
const isFilterable = ({ schema, modelName, fieldName }) => {
  // first check if can filter on field level
  const fieldFilterable = R.pathOr(true, [modelName, 'fields', fieldName, 'filterable'], schema)
  if (fieldFilterable === false) {
    return false
  }
  // repeat above if 'fieldFilterable' is function
  if (
    R.type(fieldFilterable) === 'Function' &&
    fieldFilterable({ schema, modelName, fieldName }) === false
  ) {
    return false
  }
  // next, filter out field types which don't work with magql
  const inputType = getType({ schema, modelName, fieldName })
  return !(
    R.isNil(inputType) ||
    (inputType === inputTypes.CREATABLE_STRING_SELECT_TYPE) ||
    (inputType === inputTypes.ONE_TO_MANY_TYPE) ||
    (inputType === inputTypes.MANY_TO_MANY_TYPE) ||
    (inputType === inputTypes.PHONE_TYPE) ||
    (inputType === inputTypes.ID_TYPE)
  )
}

export const isTableFilterable = ({ schema, modelName }) => {
  // first check if can filter on model level
  const tableFilterable = R.pathOr(true, [modelName, 'filterable'], schema)
  if (tableFilterable === false) {
    return false
  }
  // repeat above if 'tableFilterable' is function
  if (
    R.type(tableFilterable) === 'Function' &&
    tableFilterable({ schema, modelName }) === false
  ) {
    return false
  }
  // next, check field level filter
  const model = R.prop(modelName, schema)
  const fieldOrder = R.prop('fieldOrder', model)
  const boolList = R.map(fieldName =>
    isFilterable({ schema, modelName, fieldName }),
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
  deleteFilter,
  customProps
}) => {
  const filterInput = R.prop(fieldName, filterInputs)
  const filterables = getFilterableFields({ modelName, schema })
  const toOptions = fieldName => ({
    label: getFieldLabel({ schema, modelName, fieldName, data, customProps }),
    value: fieldName
  })
  const unfiltered = filterables.filter(fieldName => !filterOrder.includes(fieldName))
  const options = unfiltered.map(fieldName => toOptions(fieldName))
  const value = R.isNil(fieldName) || R.isEmpty(fieldName)
    ? { label: null, value: null }
    : toOptions(filterOrder[index])
  return (
    <li key={`${index}-${modelName}-${fieldName}-format-filter`} className='list-group-item'>
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
  filterInputs,
  customProps
}) => (
  <div id={'active-filters-' + modelName} className="mb-2">
    <ul className="list-group">
      {R.isEmpty(filterOrder) || R.isNil(filterOrder) ? (
        <li
          key="no-active-filters"
          className="list-group-item text-muted"
          style={{ cursor: 'pointer' }}
          onClick={() => addFilter({ modelName })}
        >
          Add a rule to get started...
        </li>
      ) : (
        filterOrder.map((fieldName, index) =>
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
            deleteFilter,
            customProps
          })
        )
      )}
    </ul>
    <FilterButtons
      {...{
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
  filterInputs,
  customProps
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
          filterInputs,
          customProps
        }} />
      }
    />
  )
}

export const FilterModalButton = ({ modelName, filtersAreActive }) => (
  <button
    className='btn btn-sm btn-outline-primary'
    data-toggle='modal'
    data-target={'#filter-' + modelName}
  >
    Filter
    <FaFilter
      className={`filter-icon-${filtersAreActive ? 'active' : 'inactive'} ml-2`}
      color={filtersAreActive ? 'lightgreen' : 'black'}
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
  const inputType = getType({ schema, modelName, fieldName })

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
    case inputTypes.ONE_TO_ONE_TYPE:
    case inputTypes.MANY_TO_ONE_TYPE:
    case inputTypes.ONE_TO_MANY_TYPE:
    case inputTypes.MANY_TO_MANY_TYPE:
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
  const actions = getActions(schema, modelName)
  const onMenuOpen = R.path(['input', 'onMenuOpen'], actions)
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
          onMenuOpen,
          customInput: {
            placeholder: 'Enter value...',
          }
        }} />
      </div>
    </React.Fragment>
  )
}
