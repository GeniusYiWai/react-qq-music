import React, { memo } from 'react'
import { clipImgSize } from '@/utils/tools'
import PlayImg from '../play-img'
import './index.less'
//通用歌单封面’
//coverImgUrl 图片地址
//  name 歌单名称
// playCount 歌单播放次数
export default memo(function PlaylistCover(props) {
  const {
    playlist: { coverImgUrl, name, playCount }
  } = props
  const handleShowPalylistDetail = () => {
    console.log(111)
  }
  return (
    <div className='playlist-cover-wrapper'>
      <div className='playlist-cover'>
        <div className='playlist-cover-box'>
          <img src={`${coverImgUrl}${clipImgSize(150, 150)}`} alt='' className='playlist-img'/>
          <PlayImg handleClick={() => handleShowPalylistDetail()}></PlayImg>
        </div>
      </div>
      <div className='playlist-cover-info'>
        <p className='text-nowrap'>{name}</p>
        <p className='playNum'>播放量: {playCount}</p>
      </div>
    </div>
  )
})
