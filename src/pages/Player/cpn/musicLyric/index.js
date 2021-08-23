import React, {
  memo,
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef
} from 'react'
import { handleSinger } from '@/utils/tools'
import LyricParser from '@/utils/lyric'
import { getLyric } from '@/api/player'
import LazyLoadImg from 'components/Common/lazyloadImg'

import './index.less'
//这里必须把歌词类放到最外面 否则每次重新渲染都会丢失
let Lyric
export default memo(
  forwardRef(function MusicLyric(props, ref) {
    // 此处注意useImperativeHandle方法的的第一个参数是目标元素的ref引用
    useImperativeHandle(ref, () => ({
      // 就是暴露给父组件的方法
      //修改歌词滚动状态
      toggleLyricScroll: () => {
        Lyric && Lyric.togglePlay()
      },
      //手动播放歌词
      playLyricScroll: () => {
        Lyric && Lyric.play()
      },
      //手动暂停歌词
      pauseLyricScroll: () => {
        Lyric && Lyric.stop()
      },
      //手动跳转歌词
      changeLyricProgress: time => {
        Lyric && Lyric.seek(time)
        // Lyric && Lyric.play()
      },
      //手动跳转歌词
      scrollToTop: () => {
        Lyric && Lyric.seek(0)
        lyricRef.current && lyricRef.current.scrollTo(0, 0)
      }
    }))
    //props
    // currentPlayMusic, 当前播放的音乐信息
    //  currentPlayMusicId,  当前播放的音乐id
    //  isPlaying, 音乐是否正在播放
    //  isEnded 音乐是否播放结束
    const { currentPlayMusic, currentPlayMusicId } = props
    //获取歌词容器ref引用
    const lyricRef = useRef()
    // state
    //获取当前播放的歌词在第几行
    const [lineNum, setLineNum] = useState(0)
    //歌词
    const [lyric, setLyric] = useState([])
    //fucntions
    //歌词滚动后自动触发该函数
    const handleLyric = ({ lineNum }) => {
      if (lineNum > 2) {
        lyricRef.current.scrollTo(0, lineNum * 30 - 30)
      }
      //根据行数滚动歌词容器
      //设置歌词当前滚动到的行数
      setLineNum(lineNum)
    }
    //处理页面滚动
    useEffect(() => {
      const LyricRef = lyricRef
      getLyric(currentPlayMusicId).then(({ data }) => {
        if (data.nolyric) {
          setLyric([{ txt: '纯音乐,敬请欣赏!' }])
        } else if (data.lrc) {
          //生成Lyric实例
          Lyric = new LyricParser(data.lrc.lyric, handleLyric)
          //获取所有歌词
          setLyric(Lyric.lines)
          Lyric.play()
        } else {
          setLyric([{ txt: '暂无歌词!' }])
        }
        setLineNum(0)
        LyricRef.current && LyricRef.current.scrollTo(0, 0)
      })
      //这里一定要返回一个清除歌词滚动的方法 不然会生成多个Lyric同时调用
      return () => {
        //一旦触发重新渲染 手动把歌词滚动到第一行
        LyricRef.current && LyricRef.current.scrollTo(0, 0)
        Lyric && Lyric.stop()
      }
    }, [currentPlayMusicId])
    return (
      <div className='music-lyric-container'>
        <LazyLoadImg url={currentPlayMusic.al && currentPlayMusic.al.picUrl} width={100} height={100}/>
        <p>歌曲名:{currentPlayMusic.name}</p>
        <p>歌手:{currentPlayMusic.ar && handleSinger(currentPlayMusic.ar)}</p>
        <p>专辑:{currentPlayMusic.al && currentPlayMusic.al.name}</p>
        <div
          ref={lyricRef}
          className='lyric-content'
          // onScroll={() => handleLyricScroll()}
        >
          {lyric.length !== 0 &&
            lyric.map((item, index) => {
              return (
                <p
                  className={`${index === lineNum ? 'active' : ''}`}
                  key={index}
                >
                  {item.txt}
                </p>
              )
            })}
        </div>
      </div>
    )
  })
)
