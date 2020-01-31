import { components } from 'react-select'
import React from 'react'
import { FixedSizeList } from 'react-window'

const OptimizedMenuList = props => {
  const { options, children, maxHeight, getValue } = props

  const height = 35
  const selectedValues = getValue()
  const initialOffset = selectedValues[0]
    ? options.indexOf(selectedValues[0]) * height
    : 0

  return (
    <FixedSizeList
      width={''}
      height={maxHeight}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => (
        <div style={style}>
          {children[index]}
        </div>
      )}
    </FixedSizeList>
  )
}

const OptimizedOption = props => {
  delete props.innerProps.onMouseMove
  delete props.innerProps.onMouseOver
  return <components.Option {...props}>{props.children}</components.Option>
}

export const optimizeSelect = {
  components: {
    MenuList: OptimizedMenuList,
    Option: OptimizedOption
  }
}
