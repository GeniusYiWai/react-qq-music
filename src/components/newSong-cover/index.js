import React, { memo, useState } from 'react'
import './index.less'
import { handleSinger, formatMinuteSecond, clipImgSize } from '@/utils/tools'
import { message } from 'antd'
import { getItem, setItem, getMusicById } from '@/utils/storage'
import { CheckCanPlay } from '@/api/player'
import playImg from '@/assets/img/play.png'
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
  //控制鼠标移入显示播放图片
  const [imgShow, setImgShow] = useState(false)
  const handleCoverMove = () => {
    setImgShow(true)
  }
  const handleCoverLeave = () => {
    setImgShow(false)
  }
  const handlePlay = () => {
    //先判断歌曲是否可以播放
    CheckCanPlay(id).then(
      () => {
        //可以播放 将歌曲id存入缓存
        setItem('currentPlayMusicId', id)
        //从缓存中获取歌曲列表
        let playlist = getItem('playlist')
        const songInfo = {
          id,
          name,
          artists: handleSinger(artists),
          duration: formatMinuteSecond(duration)
        }
        //如果是第一次播放歌曲 初始化播放列表
        if (!playlist) {
          playlist = []
          playlist.push(songInfo)
        } else {
          //判断歌曲是否已经存在于播放列表
          const isHas = getMusicById(id)
          if (!isHas) {
            playlist.push(songInfo)
          }
        }
        setItem('playlist', playlist)
        //跳转到歌曲播放页面
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
        <img
          src={`${picUrl}${clipImgSize(86, 86)}`}
          alt=''
          className='song-cover'
        />
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
