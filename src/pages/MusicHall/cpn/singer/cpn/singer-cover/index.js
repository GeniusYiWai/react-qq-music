import React, { memo } from 'react'
import './index.less'
export default memo(function SingerCover(props) {
  const { singer } = props
  return (
    <div className='singer-cover-container'>
      <img src={singer.picUrl} alt='' />
      <p>{singer.name}</p>
    </div>
  )
})
