import React, { memo, useState, useRef } from 'react'
import './index.less'
import MusicPlaylist from './cpn/musicPlaylist'
import MusicControl from './cpn/musicControl'
import MusicLyric from './cpn/musicLyric'
import { getItem } from '@/utils/storage'
import { useSelector } from 'react-redux'
export default memo(function Player() {
  //获取歌词组件的引用
  const childRef = useRef()
  // changeLyricScroll就是子组件暴露给父组件的方法
  //这个方法用来手动控制歌词的滚动状态
  const changeLyricScroll = () => {
    childRef.current.changeLyricScroll()
  }
  //这个方法用来手动控制歌词的滚动进度
  const changeLyricProgress = time => {
    childRef.current.changeLyricProgress(time)
  }
  //从缓存中取出当前播放的音乐id
  const [currentPlayMusicId, setCurrentPlayMusicId] = useState(
    getItem('currentPlayMusicId')
  )
  //从缓存中获取播放列表
  const [playlist, setPlaylist] = useState(getItem('playlist') || [])
  //切换音乐播放状态
  const [isPlaying, setIsPlaying] = useState(false)
  //获取store中的当前播放音乐信息 用于展示背景图
  const { currentPlayMusic } = useSelector(state => {
    return {
      currentPlayMusic: state.player.currentPlayMusic
    }
  })

  return (
    <div
      className='player-container'
      style={
        playlist.length === 0
          ? { backgroundColor: 'rgba(19, 214, 214, 0.15)' }
          : null
      }
    >
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
            playlist={playlist}
            setPlaylist={setPlaylist}
          />
        </div>
        {playlist.length > 0 ? (
          <>
            <MusicControl
              currentPlayMusicId={currentPlayMusicId}
              setCurrentPlayMusicId={setCurrentPlayMusicId}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              changeLyricScroll={changeLyricScroll}
              changeLyricProgress={changeLyricProgress}
            />
            <MusicLyric
              ref={childRef}
              currentPlayMusic={currentPlayMusic}
              currentPlayMusicId={currentPlayMusicId}
              isPlaying={isPlaying}
            />
          </>
        ) : null}
      </div>
    </div>
  )
})
