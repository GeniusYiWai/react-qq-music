import React, { memo, useState, useEffect, useCallback } from 'react'
import { getItem, setItem } from '@/utils/storage'
import './index.less'
import { useSelector } from 'react-redux'
import { handleSinger } from '@/utils/tools'
import Wave from '@/assets/img/wave.gif'
import { setCurrentPlayMusicLyric } from '../../store/actionCreators'
import { useDispatch } from 'react-redux'
export default memo(function Playlist(props) {
  //other functions
  const dispatch = useDispatch()
  const playlist = getItem('playlist')
  // react hooks
  const { isPlaying, currentPlayMusic, lyric } = useSelector(state => {
    return {
      isPlaying: state.player.isPlaying,
      lyric: state.player.lyric,
      currentPlayMusic: state.player.currentPlayMusic
    }
  })
  const { currentPlayMusicId, setCurrentPlayMusicId } = props
  //点击播放列表中的歌曲 修改当前播放的音乐id 存入缓存中
  const handleClick = useCallback(
    id => {
      setCurrentPlayMusicId(id)
      setItem('currentPlayMusicId', id)
    },
    [setCurrentPlayMusicId]
  )
  useEffect(() => {
    dispatch(setCurrentPlayMusicLyric(currentPlayMusicId))
  }, [dispatch, currentPlayMusicId])
  console.log(lyric)
  return (
    <div className='player-playlist-container'>
      <div className='player-playlist-left'>
        <div className='player-playlist-title'>
          <p> 歌曲</p>
          <p> 歌手</p>
          <p> 时长</p>
        </div>
        <div>
          {playlist.map((item, index) => {
            return (
              <div
                className='player-playlist-item'
                key={item.id}
                onClick={() => {
                  handleClick(item.id)
                }}
              >
                <div
                  className={`wave-container ${
                    item.id === currentPlayMusicId && isPlaying
                      ? 'isPlaying'
                      : ''
                  }`}
                  style={{ backgroundImage: `url(${Wave})` }}
                ></div>
                <p>{item.name}</p>
                <p> {item.artists}</p>
                <p> {item.duration}</p>
              </div>
            )
          })}
        </div>
      </div>
      <div className='player-playlist-right'>
        <img src={currentPlayMusic.al && currentPlayMusic.al.picUrl} alt='' />
        <p>歌曲名:{currentPlayMusic.name}</p>
        <p>歌手:{currentPlayMusic.ar && handleSinger(currentPlayMusic.ar)}</p>
        <p>专辑:{currentPlayMusic.al && currentPlayMusic.al.name}</p>
        <div className='lyrics-container'></div>
      </div>
    </div>
  )
})
