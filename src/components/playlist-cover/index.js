import React, { memo } from 'react'
import './index.less'
export default memo(function PlaylistCover(props) {
  const { playlist } = props
  return (
    <div className='playlist-cover w-1200'>
      {playlist.map((item, index) => {
        const { coverImgUrl, name, playCount } = item
        return (
          <div key={item.id}>
            <img src={coverImgUrl} alt='' />
            <p className='text-nowrap'>{name}</p>
            <p className='playNum'>播放量: {playCount}</p>
          </div>
        )
      })}
    </div>
  )
})
