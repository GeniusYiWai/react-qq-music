import React, { memo, useState } from 'react'
import './index.less'
import { handleSinger, formatMinuteSecond } from '@/utils/tools'
import { message } from 'antd'
import { getItem, setItem, getMusicById } from '@/utils/storage'
import { CheckCanPlay } from '@/api/player'
import playImg from '@/assets/img/play.png'
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

  const [imgShow, setImgShow] = useState(false)
  const handleCoverMove = () => {
    setImgShow(true)
  }
  const handleCoverLeave = () => {
    setImgShow(false)
  }
  const handlePlay = () => {
    CheckCanPlay(id).then(
      () => {
        setItem('currentPlayMusicId', id)
        let playlist = getItem('playlist')
        const songInfo = {
          id,
          name,
          artists: handleSinger(artists),
          duration: formatMinuteSecond(duration)
        }
        if (!playlist) {
          playlist = []
          playlist.push(songInfo)
        } else {
          const isHas = getMusicById(id)
          if (!isHas) {
            playlist.push(songInfo)
          }
        }
        setItem('playlist', playlist)
        // history.push('/player', {
        //   id
        // })
        window.open('/player', 'alwaysRaised=yes')
      },
      () => {
        message.warning('抱歉，这首歌曲暂时不能播放。')
      }
    )
  }

  return (
    <div className='song-container text-nowrap'>
      <div
        onMouseMove={() => handleCoverMove()}
        onMouseLeave={() => handleCoverLeave()}
        className='img-container'
      >
        <img src={picUrl} alt='' className='song-cover' />
        <div className='play-img'>
          <img
            src={playImg}
            alt=''
            className={imgShow ? 'play-img-block' : 'play-img-none'}
            onClick={() => handlePlay()}
          />
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
