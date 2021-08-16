import React, { memo } from 'react'
import { handleSinger, formatMinuteSecond } from '@/utils/tools'
import { PlayCircleOutlined } from '@ant-design/icons'
import { playMusic } from '@/utils/player'
import './index.less'
export default memo(function AlbumDetailCover(props) {
  const { song } = props
  const handlePlay = index => {
    const { id, name, ar, dt, duration } = song[index]
    playMusic(id, name, ar, dt || duration)
  }
  const showAlbumDetail = index => {
    const {
      al: { id: albumId }
    } = song[index]
    window.open(`/#/musichall/album/detail/${albumId}`)
  }
  return (
    <div>
      <div className='album-detail-title'>
        <p>歌曲</p>
        <p>歌手</p>
        <p>专辑</p>
        <p>时长</p>
      </div>
      {song &&
        song.map(
          ({ name, artists, ar, album, dt, duration, id, al }, index) => {
            return (
              <div
                className='album-detail-cover'
                style={{
                  backgroundColor: index % 2 === 0 ? '#f7f7f7' : '#fafafa'
                }}
                key={index}
              >
                <p
                  className='text-nowrap'
                  onClick={() => {
                    handlePlay(index)
                  }}
                >
                  <PlayCircleOutlined className='play-album-img' />
                  {name}
                </p>
                <p className='text-nowrap'>{handleSinger(ar || artists)}</p>
                {al ? (
                  <p
                    className='text-nowrap'
                    onClick={() => {
                      showAlbumDetail(index)
                    }}
                  >
                    {al && al.name}
                  </p>
                ) : (
                  <p className='text-nowrap'>{album && album.name}</p>
                )}

                <p className='text-nowrap'>
                  {formatMinuteSecond(dt || duration)}
                </p>
              </div>
            )
          }
        )}
    </div>
  )
})
