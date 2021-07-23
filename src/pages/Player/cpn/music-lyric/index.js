import React, { memo, useRef, useEffect, useState, useCallback } from 'react'
import './index.less'
import { handleSinger } from '@/utils/tools'
import LyricParser from 'lyric-parser'
import { setCurrentPlayMusicLyric } from '../../store/actionCreators'
let scrollTimer
let Lyric
export default memo(function MusicLyric(props) {
  //获取歌词
  const [lyric, setLyric] = useState([])
  //获取当前播放的歌词在第几行
  const [lineNum, setLineNum] = useState(0)
  //获取当前播放音乐id 和信息
  const { currentPlayMusic, currentPlayMusicId } = props
  //获取歌词容器ref引用
  const lyricRef = useRef()
  //歌词滚动后自动触发该函数
  const handleLyric = ({ lineNum }) => {
    if (lineNum > 2) {
      lyricRef.current.scrollTo(0, lineNum * 30 - 30)
    }
    //根据行数滚动歌词容器
    //设置歌词当前滚动到的行数
    setLineNum(lineNum)
  }
  const handleLyricScroll = useCallback(() => {
    clearTimeout(scrollTimer)
    scrollTimer = setTimeout(() => {
      lyricRef.current.scrollTo(0, lineNum * 30 - 30)
    }, 1000)
  }, [lineNum])
  useEffect(() => {
    setCurrentPlayMusicLyric(currentPlayMusicId).then(({ data }) => {
      //生成Lyric实例
      Lyric = new LyricParser(data.lrc.lyric, handleLyric)
      //调用播放方法
      Lyric.play()
      //获取所有歌词
      setLyric(Lyric.lines)
    })
    //这里一定要返回一个清除歌词滚动的方法 不然会生成多个Lyric同时调用
    return () => {
      Lyric && Lyric.stop()
    }
  }, [currentPlayMusicId])
  return (
    <div className='music-lyric-container'>
      <img src={currentPlayMusic.al && currentPlayMusic.al.picUrl} alt='' />
      <p>歌曲名:{currentPlayMusic.name}</p>
      <p>歌手:{currentPlayMusic.ar && handleSinger(currentPlayMusic.ar)}</p>
      <p>专辑:{currentPlayMusic.al && currentPlayMusic.al.name}</p>
      <div
        ref={lyricRef}
        className='lyric-content'
        onScroll={() => handleLyricScroll()}
      >
        {lyric.length !== 0 &&
          lyric.map((item, index) => {
            return (
              <p className={`${index === lineNum ? 'active' : ''}`}>
                {item.txt}
              </p>
            )
          })}
      </div>
    </div>
  )
})
