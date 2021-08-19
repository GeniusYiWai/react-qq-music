import React, { memo } from 'react'
import LazyLoadImg from 'components/Common/lazyloadImg'
import { handleSinger, formatMinuteSecond } from '@/utils/tools'
import { playMusic } from '@/utils/player'
import PlayImg from 'components/Common/playImg'
import './index.less'
//通用新歌封面

export default memo(function NewSongCover(props) {
  //name 歌曲名称
  //artists 歌曲作者
  //duration 歌曲时长
  //id 歌曲id
  const {
    song: {
      album: { picUrl },
      name,
      artists,
      duration,
      id
    }
  } = props
  //点击播放
  const handlePlay = () => {
    playMusic(id, name, artists, duration)
  }
  //查看歌手详情
  const goToSingerDetail = () => {
    window.open(`/#/profile/singer/${artists[0].id}`)
  }
  //查看歌曲详情
  const goToSongDetail = () => {
    window.open(`/#/musichall/song/detail/${id}`)
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
          <p onClick={() => goToSongDetail()}>{name}</p>
          <p onClick={() => goToSingerDetail()}>{handleSinger(artists)}</p>
        </div>
        <div className='song-duration'>
          <p>{formatMinuteSecond(duration)}</p>
        </div>
      </div>
    </div>
  )
})
