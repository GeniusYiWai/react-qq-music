import React, { memo } from 'react'
import { handleSinger, clipImgSize } from '@/utils/tools'
import './index.less'
//通用专辑封面
//id album id
// picUrl 图片地址
// artists 专辑作者
// name 专辑名称
export default memo(function PlaylistCover(props) {
  const {
    album: { id, picUrl, artists, name }
  } = props

  return (
    <div className='album-cover'>
      <div key={id}>
        <img src={`${picUrl}${clipImgSize(150, 150)}`} alt='' />
        <p className='text-nowrap'>{name}</p>
        <p className='singer text-nowrap'>{handleSinger(artists)}</p>
      </div>
    </div>
  )
})
