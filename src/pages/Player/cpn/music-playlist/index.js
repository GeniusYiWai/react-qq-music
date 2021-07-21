import React, { memo } from 'react'
import { getItem } from '@/utils/storage'
import './index.less'
import Wave from '@/assets/img/wave.gif'
export default memo(function Playlist(props) {
  //从父元素中获取当前音乐是否正在播放和播放的音乐id  用于展示样式
  const { currentPlayMusicId, setCurrentPlayMusicId, isPlaying } = props
  //从缓存中获取播放列表
  const playlist = getItem('playlist')
  //点击播放列表中的歌曲 修改当前播放的音乐id 存入store中
  const changePlayMusicID = id => {
    setCurrentPlayMusicId(id)
  }
  return (
    <div className='player-playlist-container'>
      <div className='player-playlist-title'>
        <p> 歌曲</p>
        <p> 歌手</p>
        <p> 时长</p>
      </div>
      <div>
        {playlist.map(item => {
          return (
            <div
              className='player-playlist-item'
              key={item.id}
              onClick={() => {
                changePlayMusicID(item.id)
              }}
            >
              <div className='song-name'>
                <span
                  className={`wave-container ${
                    //id等于当前播放的音乐id 并且音乐在播放 才会显示这个动图
                    item.id === currentPlayMusicId && isPlaying
                      ? 'isPlaying'
                      : ''
                  }`}
                  style={{ backgroundImage: `url(${Wave})` }}
                ></span>
                {item.name}
              </div>
              <div> {item.artists}</div>
              <div> {item.duration}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
})
