import React, { memo } from 'react'
import { handleSinger } from '@/utils/tools'
import './index.less'
export default memo(function ListenSongs(props) {
  const { listenSongs } = props
  return (
    <div className='listen-songs-container'>
      {listenSongs.slice(0, 10).map((item, index) => {
        return (
          <div
            className='listen-songs-item'
            style={{
              backgroundColor: index % 2 === 0 ? '#f7f7f7' : '#fff'
            }}
          >
            <p>{index + 1}.</p>
            <p className='song-info'>
              <span>{item.song.name}</span>
              <span >  - {handleSinger(item.song.ar)}</span>
            </p>
          </div>
        )
      })}
    </div>
  )
})
