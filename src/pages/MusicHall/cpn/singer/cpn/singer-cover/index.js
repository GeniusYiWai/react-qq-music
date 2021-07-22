import React, { memo } from 'react'
import './index.less'
import { clipImgSize } from '@/utils/tools'
export default memo(function SingerCover(props) {
  const { singer } = props
  return (
    <div className='singer-cover-container'>
      <img src={`${singer.picUrl}${clipImgSize(100, 100)}`} alt='' />
      <p>{singer.name}</p>
    </div>
  )
})
