import React, { memo } from 'react'
import { clipImgSize } from '@/utils/tools'
import './index.less'
//歌手详情封面
export default memo(function SingerCover(props) {
  const { singer } = props
  return (
    <div className='singer-cover-container'>
      <img src={`${singer.picUrl}${clipImgSize(100, 100)}`} alt='' />
      <p>{singer.name}</p>
    </div>
  )
})
