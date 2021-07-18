import React, { memo, useState } from 'react'
import { useEffect, useCallback } from 'react'
import { getItem, setItem } from '@/utils/storage'
import './index.less'

export default memo(function Playlist(props) {
  //other functions
  const playlist = getItem('playlist')

  // react hooks
  // const [currentPlayMusicId, setCurrentPlayMusicId] = useState(
  //   getItem('currentPlayMusicId')
  // )
  const { currentPlayMusicId, setCurrentPlayMusicId } = props
  //点击播放列表中的歌曲 修改当前播放的音乐id 存入缓存中
  const handleClick = useCallback(
    id => {
      setCurrentPlayMusicId(id)
      setItem('currentPlayMusicId', id)
    },
    [setCurrentPlayMusicId]
  )
  return (
    <div className='player-playlist-container'>
      <div className='player-playlist-title'>
        <p> 歌曲</p>
        <p> 歌手</p>
        <p> 时长</p>
      </div>
      {playlist.map((item, index) => {
        return (
          <div
            className={`player-playlist-item ${
              item.id === currentPlayMusicId ? 'isPlaying' : ''
            }`}
            key={item.id}
            onClick={() => {
              handleClick(item.id)
            }}
          >
            <p> {item.name}</p>
            <p> {item.artists}</p>
            <p> {item.duration}</p>
          </div>
        )
      })}
    </div>
  )
})
