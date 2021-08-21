import React, { memo, useState, useRef, useEffect } from 'react'
import './index.less'
import MusicPlaylist from './cpn/musicPlaylist'
import MusicControl from './cpn/musicControl'
import MusicLyric from './cpn/musicLyric'
import { getItem } from '@/utils/storage'
import {
  userLoginDispatch,
  setUserDispatch
} from '@/pages/LoginBox/store/actionCreators'
import { useDispatch, useSelector } from 'react-redux'
import { getLoginStatus as getLoginStatusAPI } from '@/api/login'
import { setItem } from '@/utils/storage'

export default memo(function Player() {
  const dispatch = useDispatch()

  //获取歌词组件的引用
  const childRef = useRef()
  // changeLyricScroll就是子组件暴露给父组件的方法
  //这个方法用来手动控制歌词的滚动状态
  const playLyricScroll = () => {
    childRef.current.playLyricScroll()
  }
  const changeLyricScroll = () => {
    childRef.current.changeLyricScroll()
  }
  const pauseLyricScroll = () => {
    childRef.current.pauseLyricScroll()
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
   //切换音乐播放状态
   const [isEnded, setIsEnded] = useState(false)
  //获取store中的当前播放音乐信息 用于展示背景图
  const { currentPlayMusic } = useSelector(state => {
    return {
      currentPlayMusic: state.player.currentPlayMusic
    }
  })

  //获取登录信息
  const getLoginStatus = async () => {
    try {
      const {
        data: {
          data: { profile }
        }
      } = await getLoginStatusAPI()
      if (profile) {
        //更改state中的用户登录状态
        dispatch(userLoginDispatch(true))
        //更改state中的用户信息
        dispatch(setUserDispatch(profile))
        setItem('uid', profile.userId)
      }
    } catch (error) {}
  }
  //登录成功 将登录态存入缓存 修改state中的用户登录状态
  const getUserInfo = () => {
    getLoginStatus()
  }
  useEffect(() => {
    getUserInfo()
    //监听页面进入 重新从缓存中取当前的播放列表和播放音乐的id
    document.addEventListener('visibilitychange', function () {
      var isHidden = document.hidden
      if (!isHidden) {
        setPlaylist(getItem('playlist') || [])
        setCurrentPlayMusicId(getItem('currentPlayMusicId') || null)
      }
    })
    pauseLyricScroll()
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
              pauseLyricScroll={pauseLyricScroll}
              changeLyricProgress={changeLyricProgress}
              playLyricScroll={playLyricScroll}
              setIsEnded={setIsEnded}
            />
            <MusicLyric
              ref={childRef}
              currentPlayMusic={currentPlayMusic}
              currentPlayMusicId={currentPlayMusicId}
              isPlaying={isPlaying}
              isEnded={isEnded}
            />
          </>
        ) : null}
      </div>
    </div>
  )
})
