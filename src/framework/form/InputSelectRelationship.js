import React from 'react'
import FlexibleInput from 'flexible-forms'
import { InputType } from './InputType'

const InputSelectRelationship = ({ value, onChange, isMulti, options, onMenuOpen, ...props }) => {
  return <FlexibleInput {...{
    type: InputType.FlexibleForms.SELECT_TYPE,
    value,
    onChange,
    isMulti,
    options,
    onMenuOpen,
    ...props
  }} />
}

export default InputSelectRelationship
