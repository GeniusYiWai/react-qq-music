import React, { memo, useState } from 'react'
import './index.less'
import MusicPlaylist from './cpn/music-playlist'
import MusicControl from './cpn/music-control'
import MusicLyric from './cpn/music-lyric'
import { getItem } from '@/utils/storage'
import { useSelector } from 'react-redux'
export default memo(function Player() {
  //从缓存中取出当前播放的音乐id
  const [currentPlayMusicId, setCurrentPlayMusicId] = useState(
    getItem('currentPlayMusicId')
  )
  //切换音乐播放状态
  const [isPlaying, setIsPlaying] = useState(false)

  //获取store中的当前播放音乐信息 用于展示背景图
  const { currentPlayMusic } = useSelector(state => {
    return {
      currentPlayMusic: state.player.currentPlayMusic
    }
  })
  return (
    <div className='player-container'>
      <div
        style={{
          backgroundImage: `url(${
            currentPlayMusic.al && currentPlayMusic.al.picUrl
          })`
        }}
        className='bg-img'
      ></div>
      <div className='player-content'>
        <div className='player-container-playlist'>
          <MusicPlaylist
            setCurrentPlayMusicId={setCurrentPlayMusicId}
            currentPlayMusicId={currentPlayMusicId}
            isPlaying={isPlaying}
          />
        </div>
        <MusicControl
          currentPlayMusicId={currentPlayMusicId}
          setCurrentPlayMusicId={setCurrentPlayMusicId}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
        <MusicLyric
          currentPlayMusic={currentPlayMusic}
          currentPlayMusicId={currentPlayMusicId}
        />
      </div>
    </div>
  )
})
