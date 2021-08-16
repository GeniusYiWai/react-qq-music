import React, { memo } from 'react'
import { handleSinger } from '@/utils/tools'
import { PlayCircleOutlined } from '@ant-design/icons'
import { playMusic } from '@/utils/player'

import './index.less'
export default memo(function ListenSongs(props) {
  //listenSongs 用户最近听歌
  const { listenSongs } = props
  const handleClick = index => {
    window.open(`/#/profile/singer/${listenSongs[index].song.ar[0].id}`)
  }
  const handleSongDetail = index => {
    window.open(`/#/musichall/song/detail/${listenSongs[index].song.id}`)
  }
  const handlePlay = index => {
    const { id, name, ar, dt, duration } = listenSongs[index].song
    playMusic(id, name, ar, dt || duration)
  }
  return (
    <div className='listen-songs-container'>
      {listenSongs.slice(0, 10).map((item, index) => {
        return (
          <div
            className='listen-songs-item'
            style={{
              backgroundColor: index % 2 === 0 ? '#f7f7f7' : '#fff'
            }}
            key={index}
          >
            <p>{index + 1}.</p>
            <PlayCircleOutlined
              className='play-song-img'
              onClick={() => handlePlay(index)}
            />
            <p className='song-info'>
              <span onClick={() => handleSongDetail(index)}>
                {item.song.name}
              </span>
              <span onClick={() => handleClick(index)}>
                {' '}
                - {handleSinger(item.song.ar)}
              </span>
            </p>
          </div>
        )
      })}
    </div>
  )
})
