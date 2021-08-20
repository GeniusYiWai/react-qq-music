import React, { memo } from 'react'
import { handleSinger } from '@/utils/tools'
import { PlayCircleOutlined } from '@ant-design/icons'
import { playMusic } from '@/utils/player'
import './index.less'
//用户最近听歌排行
export default memo(function ListenSongs(props) {
  //props
  //listenSongs 用户最近听歌
  const { listenSongs } = props

  //查看歌手详情
  const goToSingerDetail = index => {
    window.open(`/#/profile/singer/${listenSongs[index].song.ar[0].id}`)
  }
  //查看歌曲详情
  const goToSongDetail = index => {
    window.open(`/#/musichall/song/detail/${listenSongs[index].song.id}`)
  }
  //播放
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
              <span onClick={() => goToSongDetail(index)}>
                {item.song.name}
              </span>
              <span onClick={() => goToSingerDetail(index)}>
                - {handleSinger(item.song.ar)}
              </span>
            </p>
          </div>
        )
      })}
    </div>
  )
})
