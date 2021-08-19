import React, { memo } from 'react'
//首页标题
export default memo(function BigTitle(props) {
  // title 标题文字
  const { title } = props
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{title}</h1>
    </div>
  )
})
