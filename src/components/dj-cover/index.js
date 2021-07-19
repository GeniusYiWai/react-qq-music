import React, { memo } from 'react'
import './indx.less'
export default memo(function DjCover(props) {
  const { picUrl, name, desc } = props.dj
  return (
    <div className='dj-container'>
      <img src={picUrl} alt='' />
      <p className='text-nowrap'>{name}</p>
      <p className='text-nowrap'>{desc}</p>
    </div>
  )
})
