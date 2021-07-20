import React, { memo, useState } from 'react'
import './index.less'
import Playlist from './cpn/playlist'
import MusicControl from './cpn/music-control'
import { getItem } from '@/utils/storage'
import { useSelector, useDispatch } from 'react-redux'
export default memo(function Player() {
  //从缓存中取出当前播放的音乐id
  //一旦发生改变就会重新加载数据
  const [currentPlayMusicId, setCurrentPlayMusicId] = useState(
    getItem('currentPlayMusicId')
  )
  const { currentPlayMusic } = useSelector(state => {
    return {
      currentPlayMusic: state.player.currentPlayMusic
    }
  })
  console.log(currentPlayMusic)
  return (
    <div className='player-container'>
      <div
        style={{ backgroundImage: `url(${currentPlayMusic.al&&currentPlayMusic.al.picUrl})` }}
        className='bg-img'
      ></div>
      <div className='player-content'>
        <div className='player-container-playlist'>
          <Playlist
            setCurrentPlayMusicId={setCurrentPlayMusicId}
            currentPlayMusicId={currentPlayMusicId}
          />
        </div>
        <MusicControl
          currentPlayMusicId={currentPlayMusicId}
          setCurrentPlayMusicId={setCurrentPlayMusicId}
        />
      </div>
    </div>
  )
})
