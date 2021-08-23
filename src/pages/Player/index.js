import React, { memo, useState, useRef, useEffect } from 'react'
import './index.less'
import MusicPlaylist from './cpn/musicPlaylist'
import MusicControl from './cpn/musicControl'
import MusicLyric from './cpn/musicLyric'
import { getItem } from '@/utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { getLoginStatus } from '@/actions/login'
import Empty from 'components/Common/empty'
export default memo(function Player() {
  //redux
  //获取store中的当前播放音乐信息 用于展示背景图
  const { currentPlayMusic } = useSelector(state => {
    return {
      currentPlayMusic: state.player.currentPlayMusic
    }
  })
  const dispatch = useDispatch()
  //获取歌词组件的引用
  const childRef = useRef()
  // toggleLyricScroll就是子组件暴露给父组件的方法
  //调用歌词组件的手动播放歌词的方法
  const playLyricScroll = () => {
    childRef.current && childRef.current.playLyricScroll()
  }
  //调用歌词组件的手动改变歌词播放状态的方法
  const toggleLyricScroll = () => {
    childRef.current && childRef.current.toggleLyricScroll()
  }
  //调用歌词组件的手动暂停歌词滚动的方法
  const pauseLyricScroll = () => {
    childRef.current && childRef.current.pauseLyricScroll()
  }
  //调用歌词组件的控制歌词的滚动进度的方法
  const changeLyricProgress = time => {
    childRef.current && childRef.current.changeLyricProgress(time)
  }
  const scrollToTop = () => {
    childRef.current && childRef.current.scrollToTop()
  }
  //从缓存中取出当前播放的音乐id
  const [currentPlayMusicId, setCurrentPlayMusicId] = useState(
    getItem('currentPlayMusicId')
  )
  //从缓存中获取播放列表
  const [playlist, setPlaylist] = useState(getItem('playlist') || [])
  //全局音乐播放状态
  const [isPlaying, setIsPlaying] = useState(false)
  useEffect(() => {
    //获取登录状态 如果登录成功  修改store中的用户登录状态
    getLoginStatus(dispatch)
    //监听页面进入 重新从缓存中取当前的播放列表和播放音乐的id
    document.addEventListener('visibilitychange', function () {
      const isHidden = document.hidden
      if (!isHidden) {
        setPlaylist(getItem('playlist') || [])
        setCurrentPlayMusicId(getItem('currentPlayMusicId') || null)
      }
    })
  }, [])
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
          }?param=1920y1080)`
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
            pauseLyricScroll={pauseLyricScroll}
            playLyricScroll={playLyricScroll}
            setIsPlaying={setIsPlaying}
          />
        </div>
        {playlist.length > 0 ? (
          <>
            <MusicControl
              currentPlayMusicId={currentPlayMusicId}
              setCurrentPlayMusicId={setCurrentPlayMusicId}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              toggleLyricScroll={toggleLyricScroll}
              pauseLyricScroll={pauseLyricScroll}
              changeLyricProgress={changeLyricProgress}
              playLyricScroll={playLyricScroll}
              scrollToTop={scrollToTop}
            />
            <MusicLyric
              ref={childRef}
              currentPlayMusic={currentPlayMusic}
              currentPlayMusicId={currentPlayMusicId}
              isPlaying={isPlaying}
            />
          </>
        ) : <Empty/>}
      </div>
    </div>
  )
})
