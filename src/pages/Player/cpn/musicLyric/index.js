import React, {
  memo,
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef
} from 'react'
import './index.less'
import { handleSinger } from '@/utils/tools'
import LyricParser from '@/utils/lyric'
import { getLyric } from '@/api/player'
//这里必须把歌词类放到最外面 否则每次重新渲染都会丢失
let Lyric
export default memo(
  forwardRef(function MusicLyric(props, ref) {
    // 此处注意useImperativeHandle方法的的第一个参数是目标元素的ref引用
    useImperativeHandle(ref, () => ({
      // changeVal 就是暴露给父组件的方法
      changeLyricScroll: () => {
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
        Lyric && Lyric.togglePlay()
      }
    }))
    //props
    const { currentPlayMusic, currentPlayMusicId, isPlaying, isEnded } = props

    //获取当前播放的歌词在第几行
    const [lineNum, setLineNum] = useState(0)
    //获取歌词
    const [lyric, setLyric] = useState([])
    //获取当前播放音乐id 和信息
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
    // const handleLyricScroll = useCallback(() => {
    //   let scrollTimer
    //   clearTimeout(scrollTimer)
    //   scrollTimer = setTimeout(() => {
    //     lyricRef.current.scrollTo(0, lineNum * 30 - 30)
    //   }, 1000)
    // }, [lineNum])
    useEffect(() => {
      const LyricRef = lyricRef
      getLyric(currentPlayMusicId).then(({ data }) => {
        if (data.nolyric) {
          setLyric([{ txt: '纯音乐,敬请欣赏!' }])
        } else if (data.lrc) {
          //生成Lyric实例
          Lyric = new LyricParser(data.lrc.lyric, handleLyric)
          //调用播放方法 前提是音乐在播放
          isPlaying && Lyric.play()
          //获取所有歌词
          setLyric(Lyric.lines)
        } else {
          setLyric([{ txt: '暂无歌词!' }])
        }
        setLineNum(0)
      })
      //这里一定要返回一个清除歌词滚动的方法 不然会生成多个Lyric同时调用
      return () => {
        //一旦触发重新渲染 手动把歌词滚动到第一行
        LyricRef.current && LyricRef.current.scrollTo(0, 0)
        Lyric && Lyric.stop()
      }
    }, [currentPlayMusicId, isEnded])

    return (
      <div className='music-lyric-container'>
        <img src={currentPlayMusic.al && currentPlayMusic.al.picUrl} alt='' />
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
