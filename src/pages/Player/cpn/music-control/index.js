import React, { memo, useState, useCallback, useRef, useEffect } from 'react'
import { Slider, Tooltip } from 'antd'
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined
} from '@ant-design/icons'
import {
  setCurrentPlayMusic
} from '../../store/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import {
  formatMinuteSecond,
  handleSinger,
  getPlaySong,
  getRandomIndex
} from '@/utils/tools'
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
  //获取缓存中的播放列表 用于切换歌曲
  const playlist = getItem('playlist')
  //获取音乐播放状态 当前播放的音乐id
  const { isPlaying, setIsPlaying, currentPlayMusicId, setCurrentPlayMusicId } =
    props
  const dispatch = useDispatch()
  //从store中获取当前正在播放的音乐信息
  const { currentPlayMusic } = useSelector(state => {
    return {
      currentPlayMusic: state.player.currentPlayMusic
    }
  })
  //设置当前播放方式 默认是0 列表循坏 1单曲循环 2随机播放
  const [playModeNum, setPlayModeNum] = useState(0)
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

  //处理点击播放暂停图标 调用父元素的更新播放状态方法 音乐同步播放暂停
  const changePlayStatus = useCallback(
    status => {
      setIsPlaying(status)
      status ? audioRef.current.play() : audioRef.current.pause()
    },
    [audioRef, setIsPlaying]
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

  //这个方法会在音乐播放时一直调用 从而可以实现修改进度条的值
  const onMusicPlay = useCallback(() => {
    //设置展示的当前播放时间
    setCurrentTime(audioRef.current.currentTime * 1000)
    //设置进度条的值
    setProgress((currentTime / duration) * 100)
  }, [currentTime, duration, audioRef])

  //处理播放上一首或者下一首
  const switchSong = useCallback(
    type => {
      //获取当前正在播放的音乐在播放列表中的索引
      const index = playlist.findIndex(item => item.id === currentPlayMusicId)
      let newIndex
      let { length } = playlist
      switch (type) {
        //上一首 如果已经是第一首 就播放最后一首
        case 'prev':
          if (index === 0) {
            newIndex = length - 1
          } else {
            newIndex = index - 1
          }
          break
        //下一首 如果已经是最后一首 就播放第一首
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
          //获取随机数
          newIndex = getRandomIndex(index, length)
          break
        default:
          break
      }
      setCurrentPlayMusicId(playlist[newIndex].id)
    },
    [setCurrentPlayMusicId, playlist, currentPlayMusicId]
  )

  //当音乐播放完成后触发该函数 自动播放下一首
  const onMusicEnded = useCallback(() => {
    switch (playModeNum) {
      //列表循坏 播放下一首
      case 0:
        switchSong('next')
        break
      //单曲循环 播放当前这一首
      case 1:
        switchSong('circle')
        break
      //随机播放
      case 2:
        switchSong('random')
        break
      default:
        //默认 继续播放下一首
        switchSong('next')
        break
    }
  }, [switchSong, playModeNum])

  //切换播放模式
  const changePlayMode = useCallback(() => {
    // 1是默认 2是单曲循环 3是随机播放
    //因为索引从0开始 所以需要加1
    playModeNum + 1 === mode.length
      ? setPlayModeNum(0)
      : setPlayModeNum(playModeNum + 1)
  }, [playModeNum])

  useEffect(() => {
    //currentPlayMusicId发生变化就重新加载当前播放的音乐信息
    dispatch(setCurrentPlayMusic(currentPlayMusicId))
    //请求数据获取当前播放音乐的url地址
    audioRef.current.src = getPlaySong(currentPlayMusicId)
    //更改音乐播放状态
    setIsPlaying(true)
    audioRef.current.play()
  }, [audioRef, currentPlayMusicId, setIsPlaying, dispatch])
  return (
    <div className='progress-container'>
      <audio
        autoPlay
        controls
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
