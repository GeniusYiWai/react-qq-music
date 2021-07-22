import React, { memo } from 'react'

import { clipImgSize } from '@/utils/tools'
import './index.less'
//通用歌单封面’
//coverImgUrl 图片地址
//  name 歌单名称
// playCount 歌单播放次数
export default memo(function PlaylistCover(props) {
  const {
    playlist: { coverImgUrl, name, playCount }
  } = props
  return (
    <div className='playlist-cover-wrapper'>
      <div className='playlist-cover'>
        <img src={`${coverImgUrl}${clipImgSize(150, 150)}`} alt='' />
      </div>
      <div className='playlist-cover-info'>
        <p className='text-nowrap'>{name}</p>
        <p className='playNum'>播放量: {playCount}</p>
      </div>
    </div>
  )
})
