import React, { memo, useState, useCallback, useRef, useEffect } from 'react'
import { Slider, Tooltip, Modal, message } from 'antd'
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined
} from '@ant-design/icons'
import { setCurrentPlayMusic } from '../../store/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import {
  formatMinuteSecond,
  handleSinger,
  getPlaySong,
  getRandomIndex,
  debounce
} from '@/utils/tools'
import { getItem, setItem } from '@/utils/storage'
import { CheckCanPlay as CheckCanPlayAPI } from '@/api/player'

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
  const [isModalVisible, setIsModalVisible] = useState(true)
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
    audioRef.current.play()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  //获取缓存中的播放列表 用于切换歌曲
  const playlist = getItem('playlist')
  //isPlaying, 音乐播放状态
  //setIsPlaying, 歌曲是否已经在播放
  //currentPlayMusicId, 当前播放的音乐id
  //setCurrentPlayMusicId 设置当前播放音乐的id
  //changeLyricScroll 父组件控制歌词组件的滚动状态的方法
  //changeLyricProgress 父组件控制歌词组件的滚动进度的方法
  const {
    isPlaying,
    setIsPlaying,
    currentPlayMusicId,
    setCurrentPlayMusicId,
    changeLyricScroll,
    pauseLyricScroll,
    changeLyricProgress
  } = props
  const dispatch = useDispatch()
  //从store中获取当前正在播放的音乐信息
  const { currentPlayMusic } = useSelector(state => {
    return {
      currentPlayMusic: state.player.currentPlayMusic
    }
  })
  const [disabled, setDisabled] = useState(false)
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
  const changePlayStatus = status => {
    setIsPlaying(status)
    //调用父组件控制歌词组件是否滚动的方法
    changeLyricScroll()
    status ? audioRef.current.play() : audioRef.current.pause()
  }

  //处理进度条点击完成修改音乐播放进度
  const onProgressAfterChange = () => {
    //取消静音
    audioRef.current.muted = false
    changePlayStatus(true)
  }

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
      //改变歌词滚动进度
      changeLyricProgress(audioRef.current.currentTime * 1000)
      //静音
      audioRef.current.muted = true
    },
    [duration]
  )

  //这个方法会在音乐播放时一直调用 从而可以实现修改进度条的值
  const onMusicPlay = useCallback(() => {
    //设置展示的当前播放时间
    setCurrentTime(audioRef.current.currentTime * 1000)
    //设置进度条的值
    setProgress((currentTime / duration) * 100)
  }, [currentTime, duration])

  const CheckCanPlay = async id => {
    try {
      const {
        data: { success }
      } = await CheckCanPlayAPI(id)
      if (success) {
        debounce(() => {
          setIsPlaying(true)
          setCurrentPlayMusicId(id)
          setItem('currentPlayMusicId', id)
        }, 200)()
      }
    } catch (error) {
      message.warning('抱歉，这首歌曲暂时不能播放。')
    }
  }
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
        //随机播放
        case 'random':
          //获取随机数
          newIndex = getRandomIndex(index, length)
          break
        default:
          break
      }
      //这里对切换上一首或者下一首进行了防抖处理 防止用户快速切换歌曲 导致歌词组件无法及时清除上一个已经进行的歌词滚动 因为歌词滚动需要时间初始化 如果快速切换会导致清除函数无法及时生效 使得多个歌词滚动同时进行 歌词会来回跳跃
      CheckCanPlay(playlist[newIndex].id)
    },
    [setCurrentPlayMusicId, playlist, currentPlayMusicId, setIsPlaying]
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
    // audioRef.current.play()
  }, [currentPlayMusicId])
  const handleError = () => {
    message.error('播放出错!')
    setIsPlaying(false)
    //调用父组件控制歌词组件是否滚动的方法
    pauseLyricScroll()
    audioRef.current.pause()
    setDisabled(true)
  }
  return (
    <div className='progress-container'>
      <Modal
        title='QQMusic提醒您'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText={''}
      >
        <p>由于您的浏览器设置，音乐无法自动播放，请手动点击播放。</p>
      </Modal>
      <audio
        autoPlay
        controls
        ref={audioRef}
        onTimeUpdate={() => onMusicPlay()}
        onEnded={() => onMusicEnded()}
        //监听音乐是否在播放 如果是 就修改播放图标的状态
        onPlay={() => setIsPlaying(true)}
        onCanPlay={() => setDisabled(false)}
        onError={() => {
          handleError()
        }}
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
          disabled={disabled}
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
