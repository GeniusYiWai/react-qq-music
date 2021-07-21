import React, { memo, useRef, useEffect, useCallback } from 'react'
import './index.less'
import { handleSinger } from '@/utils/tools'
import LyricParser from 'lyric-parser'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPlayMusicLyric } from '../../store/actionCreators'
export default memo(function MusicLyric(props) {
  const { currentPlayMusic, currentPlayMusicId } = props
  const disaptch = useDispatch()
  const { lyric } = useSelector(state => {
    return {
      lyric: state.player.currentPlayMusicLyric
    }
  })
  const lyricRef = useRef()
  // const handleLyric = ({ lineNum, txt }) => {
  //   lyricRef.current.innerHTML = txt
  // }
  // const Lyric = new LyricParser(lyric, handleLyric)

  useEffect(() => {
    // if (lyric) {
    //   Lyric.play()
    // }
    disaptch(setCurrentPlayMusicLyric(currentPlayMusicId))
  }, [disaptch, currentPlayMusicId, lyric])

  return (
    <div className='music-lyric-container'>
      <img src={currentPlayMusic.al && currentPlayMusic.al.picUrl} alt='' />
      <p>歌曲名:{currentPlayMusic.name}</p>
      <p>歌手:{currentPlayMusic.ar && handleSinger(currentPlayMusic.ar)}</p>
      <p>专辑:{currentPlayMusic.al && currentPlayMusic.al.name}</p>
      <div className='lyrics-container'>
        <div ref={lyricRef}></div>
      </div>
    </div>
  )
})
