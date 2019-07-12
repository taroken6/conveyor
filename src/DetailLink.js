import React from 'react'
import { Link } from 'react-router-dom'

const DetailLink = ({ modelName, id, children }) => (
  <Link to={`/${modelName}/${id}`}>{children}</Link>
)

export default DetailLink
