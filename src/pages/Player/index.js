import React, { memo, useEffect, useRef, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPlayMusic } from './store/actionCreators'
import './index.less'
import { useHistory } from 'react-router-dom'
import { Slider } from 'antd'
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined
} from '@ant-design/icons'

import { formatMinuteSecond, getPlaySong, handleSinger } from '@/utils/tools'
export default memo(function Player() {
  const dispatch = useDispatch()
  //获取store中的当前播放音乐信息 state
  //当前播放的音乐信息
  const { currentPlayMusic } = useSelector(state => {
    return {
      currentPlayMusic: state.player.currentPlayMusic
    }
  })
  //设置音乐播放状态
  const [isPlaying, setIsPlaying] = useState(false)
  //设置音乐播放条的初始值
  const [progress, setProgress] = useState(0)
  //设置音乐当前播放的时间
  const [currentTime, setCurrentTime] = useState(0)
  //设置当前显示的音乐总时长
  const duration = currentPlayMusic.dt
  const showDuration = formatMinuteSecond(duration, 'mm:ss')
  //设置显示的音乐播放时间
  const showCurrentTime = formatMinuteSecond(currentTime, 'mm:ss')
  //获取当前audio的ref引用
  const audioRef = useRef()
  //获取history路由
  const history = useHistory()
  //处理音乐播放 更新当前音乐播放的时间
  //这个方法会在音乐播放时一直调用
  const onMusicPlay = useCallback(() => {
    //判断是否已经在通过进度条改变播放进度
    //如果是就不执行这个方法
    //设置当前播放时间
    setCurrentTime(audioRef.current.currentTime * 1000)
    //设置进度条的值
    setProgress((currentTime / duration) * 100)
  }, [currentTime, duration])

  //处理进度条点击修改进度条进度
  const onProgressChange = useCallback(
    value => {
      //改变进度条进度
      setProgress(value)
      let currentTime = (value / 100) * duration
      //改变音乐显示的播放进度
      setCurrentTime(currentTime)
      currentTime = ((value / 100) * duration) / 1000
      //改变音乐播放进度
      audioRef.current.currentTime = currentTime
      //静音
      audioRef.current.muted = true
    },
    [duration]
  )
  //处理点击图标音乐播放暂停
  const changePlayStatus = useCallback(status => {
    setIsPlaying(status)
    status ? audioRef.current.play() : audioRef.current.pause()
  }, [])

  //处理进度条点击完成修改音乐播放进度
  const onProgressAfterChange = useCallback(() => {
    //取消静音
    audioRef.current.muted = false
    changePlayStatus(true)
  }, [changePlayStatus])

  useEffect(() => {
    const { id } = history.location.state
    //请求数据获取当前播放音乐的信息
    dispatch(setCurrentPlayMusic(id))
    //请求数据获取当前播放音乐的url地址
    audioRef.current.src = getPlaySong(id)
    // window.onclick = () => {
    //   audioRef.current.play()
    // }
  }, [dispatch, history])

  return (
    <div className='player-container'>
      <div className='progress-container'>
        <div className='control'>
          <StepBackwardOutlined />
          {isPlaying ? (
            <PauseCircleOutlined onClick={() => changePlayStatus(false)} />
          ) : (
            <PlayCircleOutlined onClick={() => changePlayStatus(true)} />
          )}
          <StepForwardOutlined />
        </div>
        <div className='slider'>
          <Slider
            value={progress}
            onChange={value => onProgressChange(value)}
            onAfterChange={() => onProgressAfterChange()}
            tooltipVisible={false}
          />
          <div className='song-info'>
            {currentPlayMusic.name}(
            {currentPlayMusic.ar && handleSinger(currentPlayMusic.ar)})
            <div className='progress-time'>
              <span className='current-time'>{showCurrentTime} / </span>
              <span className='total-time'>{showDuration}</span>
            </div>
          </div>
        </div>
      </div>
      <audio
        controls
        autoPlay
        ref={audioRef}
        onTimeUpdate={() => onMusicPlay()}
        hidden
      ></audio>
    </div>
  )
})
