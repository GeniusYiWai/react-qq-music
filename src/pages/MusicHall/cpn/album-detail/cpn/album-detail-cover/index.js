import React, { memo } from 'react'
import { handleSinger, formatMinuteSecond } from '@/utils/tools'
import { PlayCircleOutlined } from '@ant-design/icons'
import { playMusic } from '@/utils/player'
import './index.less'
export default memo(function AlbumDetailCover(props) {
  const {
    song: { name, id, ar, dt },
    index
  } = props

  const handlePlay = () => {
    playMusic(id, name, ar, dt)
  }
  return (
    <div
      className='album-cover'
      style={{
        backgroundColor:
          index % 2 === 0 ? 'rgba(50,150,50,.1)' : 'rgba(50,100,50,.1)'
      }}
    >
      <p
        className='text-nowrap'
        onClick={() => {
          handlePlay()
        }}
      >
        <PlayCircleOutlined className='play-album-img' />
        {name}
      </p>
      <p className='text-nowrap'>{handleSinger(ar)}</p>
      <p className='text-nowrap'>{formatMinuteSecond(dt)}</p>
    </div>
  )
})
