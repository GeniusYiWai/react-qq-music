import React, { memo } from 'react'
import './index.css'
export default memo(function PlaylistCover(props) {
  const { playlist } = props
  return (
    <div className='playlist-cover w-1200'>
      {playlist.map((item, index) => {
        const { imgurl, dissname, listennum } = item
        return (
          <div key={item.dissid}>
            <img src={imgurl} alt='' />
            <p className='text-nowrap'>{dissname}</p>
            <p className='playNum'>播放量: {listennum}</p>
          </div>
        )
      })}
    </div>
  )
})
