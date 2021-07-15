import React, { memo } from 'react'
import './index.less'
export default memo(function SingerItem(props) {
  const { singer } = props
  return (
    <div className='singer-item'>
     {singer.name}
    </div>
  )
})
