import React, { memo } from 'react'
import './index.less'
export default memo(function PlaylistCover(props) {
  const { playlist } = props
  const {  coverImgUrl, name, playCount } = playlist
  return (
    <div className='playlist-cover-wrapper'>
      <div className='playlist-cover'>
        <img src={coverImgUrl} alt='' />
      </div>
      <div className='playlist-cover-info'>
        <p className='text-nowrap'>{name}</p>
        <p className='playNum'>播放量: {playCount}</p>
      </div>
    </div>
  )
})
