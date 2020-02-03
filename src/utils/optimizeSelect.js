import { components } from 'react-select'
import React from 'react'
import { FixedSizeList } from 'react-window'

const OptimizedMenuList = props => {
  const { options, children, maxHeight, getValue } = props
  if (!children || !Array.isArray(children)) return null

  const height = 38
  const [value] = getValue()
  const initialOffset = value
    ? options.indexOf(value) * height
    : 0

  return (
    <FixedSizeList
      width={''} // 100% width
      height={Math.min(maxHeight, height * children.length)}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => (
        <div className='select-option-wrapper' style={style}>
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
