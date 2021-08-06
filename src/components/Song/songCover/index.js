import React, { memo } from 'react'
import LazyLoadImg from 'components/Common/lazyloadImg'
import { handleSinger, formatMinuteSecond } from '@/utils/tools'
import { playMusic } from '@/utils/player'
import PlayImg from 'components/Common/playImg'
import './index.less'

//通用新歌封面
//name 歌曲名称
//artists 歌曲作者
//duration 歌曲时长
//id 歌曲id
export default memo(function NewSongCover(props) {
  const {
    song: {
      album: { picUrl },
      name,
      artists,
      duration,
      id
    }
  } = props
  const handlePlay = () => {
    playMusic(id, name, artists, duration)
  }
  return (
    <div className='song-container text-nowrap'>
      <div className='img-container'>
        <div className='song-wrapper'>
          <div className='song-cover'>
            <LazyLoadImg url={picUrl} width={86} height={86} />
          </div>
          <PlayImg handleClick={() => handlePlay()}></PlayImg>
        </div>
      </div>
      <div className='song-info'>
        <div>
          <p>{name}</p>
          <p>{handleSinger(artists)}</p>
        </div>
        <div className='song-duration'>
          <p>{formatMinuteSecond(duration)}</p>
        </div>
      </div>
    </div>
  )
})
