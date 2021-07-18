import React, { memo, useState, useCallback, useRef, useEffect } from 'react'
import { Slider, Tooltip } from 'antd'
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined
} from '@ant-design/icons'
import { setCurrentPlayMusic } from '../../store/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import { formatMinuteSecond, handleSinger, getPlaySong } from '@/utils/tools'
import { getItem } from '@/utils/storage'
import player from '@/assets/img/player.png'
import './index.less'
//0 -205px 列表循坏
//0 -232px 单曲循环
//0 -96px 随机播放

const mode = [
  // 列表循坏
  { title: '列表循坏', mode: 'ListCycle', backPosition: '-205px' },
  // 单曲循环
  { title: '单曲循环', mode: 'SingleCycle', backPosition: '-232px' },
  // 随机播放
  {
    title: '随机播放',
    mode: 'ShufflePlayback',
    backPosition: '-74px'
  }
]
export default memo(function Progress(props) {
  //other function
  const playlist = getItem('playlist')
  const { currentPlayMusicId, setCurrentPlayMusicId } = props
  // redux hooks
  const dispatch = useDispatch()
  // const currentPlayMusicId = getItem('currentPlayMusicId')
  // console.log(currentPlayMusicId);
  // const [currentPlayMusicId, setCurrentPlayMusicId] = useState(
  //   getItem('currentPlayMusicId')
  // )
  const { currentPlayMusic } = useSelector(state => {
    return {
      currentPlayMusic: state.player.currentPlayMusic
    }
  })
  // react hooks
  //设置当前播放方式 默认是0 列表循坏 1单曲循环 2随机播放
  const [playModeNum, setPlayModeNum] = useState(0)
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

  //functions
  //处理点击图标音乐播放暂停
  const changePlayStatus = useCallback(
    status => {
      setIsPlaying(status)
      status ? audioRef.current.play() : audioRef.current.pause()
    },
    [audioRef]
  )

  //处理进度条点击完成修改音乐播放进度
  const onProgressAfterChange = useCallback(() => {
    //取消静音
    audioRef.current.muted = false
    changePlayStatus(true)
  }, [changePlayStatus, audioRef])

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
    [duration, audioRef]
  )
  //音乐正在播放
  const onMusicPlay = useCallback(() => {
    //判断是否已经在通过进度条改变播放进度
    //如果是就不执行这个方法
    //设置当前播放时间
    setCurrentTime(audioRef.current.currentTime * 1000)
    //设置进度条的值
    setProgress((currentTime / duration) * 100)
  }, [currentTime, duration, audioRef])
  //随机播放获取随机数
  const getRandomIndex = useCallback((index, length) => {
    let newIndex
    let randomIndex = Math.ceil(Math.random() * (length - 1))
    if (randomIndex !== index) {
      newIndex = randomIndex
    } else {
      getRandomIndex()
    }
    return newIndex
  }, [])

  //处理播放上一首或者下一首
  const switchSong = useCallback(
    type => {
      const index = playlist.findIndex(item => item.id === currentPlayMusicId)
      let newIndex
      let { length } = playlist
      switch (type) {
        //上一首
        case 'prev':
          if (index === 0) {
            newIndex = length - 1
          } else {
            newIndex = index - 1
          }
          break
        //下一首
        case 'next':
          if (index === length - 1) {
            newIndex = 0
          } else {
            newIndex = index + 1
          }
          break
        //单曲循环 继续播放当前这一首
        case 'circle':
          newIndex = index
          //这里必须手动修改音乐播放地址 因为currentPlayMusicId没有发生改变 不会触发useEffect重新加载数据
          audioRef.current.src = getPlaySong(currentPlayMusicId)
          break
        //随机播放 继续播放当前这一首
        case 'random':
          newIndex = getRandomIndex(index, length)
          console.log(newIndex)
          break
        default:
          break
      }
      setCurrentPlayMusicId(playlist[newIndex].id)
    },
    [setCurrentPlayMusicId, playlist, currentPlayMusicId, getRandomIndex]
  )

  //当音乐播放完成后触发该函数 自动播放下一首
  const onMusicEnded = useCallback(() => {
    switch (playModeNum) {
      //列表循坏
      case 0:
        switchSong('next')
        break
      //单曲循环
      case 1:
        switchSong('circle')
        break
      //随机播放
      case 2:
        switchSong('random')

        break
      default:
        switchSong('next')
        break
    }
  }, [switchSong, playModeNum])

  //切换播放模式
  const changePlayMode = useCallback(() => {
    playModeNum + 1 === mode.length
      ? setPlayModeNum(0)
      : setPlayModeNum(playModeNum + 1)
  }, [playModeNum])

  useEffect(() => {
    dispatch(setCurrentPlayMusic(currentPlayMusicId))
    // //请求数据获取当前播放音乐的url地址
    audioRef.current.src = getPlaySong(currentPlayMusicId)
    setIsPlaying(true)
  }, [audioRef, currentPlayMusicId, dispatch])
  return (
    <div className='progress-container'>
      <audio
        controls
        autoPlay
        ref={audioRef}
        onTimeUpdate={() => onMusicPlay()}
        onEnded={() => onMusicEnded()}
        hidden
      ></audio>
      <div className='control'>
        <StepBackwardOutlined onClick={() => switchSong('prev')} />
        {isPlaying ? (
          <PauseCircleOutlined onClick={() => changePlayStatus(false)} />
        ) : (
          <PlayCircleOutlined onClick={() => changePlayStatus(true)} />
        )}
        <StepForwardOutlined onClick={() => switchSong('next')} />
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
      <div className='music-action'>
        <Tooltip title={mode[playModeNum].title} color={'#31c27c'}>
          <div
            className='play-mode'
            style={{
              backgroundImage: `url(${player})`,
              backgroundPosition: `0 ${mode[playModeNum].backPosition}`
            }}
            onClick={() => changePlayMode()}
          ></div>
        </Tooltip>
      </div>
    </div>
  )
})
