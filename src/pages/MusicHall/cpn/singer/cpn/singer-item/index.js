import React, { memo } from 'react'
import './index.less'
//单个歌手姓名
export default memo(function SingerItem(props) {
  const { singer } = props
  return (
    <div className='singer-item'>
     {singer.name}
    </div>
  )
})
