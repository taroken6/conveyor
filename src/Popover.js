import { Tooltip } from 'react-tippy'
import React from 'react'

export const PopoverContent = ({ children }) => (
  <div className='conv-popover-content' style={{
    'textAlign': 'justify',
    'textJustify': 'interWord',
    'overflowY': 'scroll',
    'maxHeight': '250px',
    'paddingRight': '8px'
  }}>
    {children}
  </div>
)
export const Popover = ({ labelValue, Content }) => {
  return (
    <Tooltip
      theme='light'
      trigger='mouseenter click'
      interactive='true'
      position='left'
      className='conv-popover'
      html={(Content)}
    ><a href='#'>{labelValue}</a></Tooltip>
  )
}
