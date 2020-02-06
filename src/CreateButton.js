import React from 'react'
import { Link } from 'react-router-dom'

const CreateButton = ({
  onClick,
  className
}) => (
  <Link
    to='/Create'
    onClick={onClick}
    className={`btn btn-sm btn-outline-success ${className}`}
    role='button'
    replace
  >Create</Link>
)

export default CreateButton
