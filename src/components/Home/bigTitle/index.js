import React, { memo } from 'react'

export default memo(function BigTitle(props) {
  const { title } = props
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{title}</h1>
    </div>
  )
})
