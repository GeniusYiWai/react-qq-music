import React, { memo } from 'react'
import { handleSinger, dateFormat } from '@/utils/tools'
import './index.less'
export default memo(function AlbumDetailCover(props) {
  const { album } = props
  const showAlbumDetail = id => {
    window.open(`/#/musichall/album/detail/${id}`)
  }
  return (
    <div>
      <div className='album-result-title'>
        <p>专辑</p>
        <p>歌手</p>
        <p>发行时间</p>
      </div>
      {album.map(({ picUrl, name, artists, publishTime, id }, index) => {
        return (
          <div className='album-result-cover' key={index}>
            <p
              onClick={() => {
                showAlbumDetail(id)
              }}
            >
              <img src={picUrl} alt='' />
              <span>{name}</span>
            </p>
            <p className='text-nowrap'>{handleSinger(artists)}</p>
            <p className='text-nowrap'>{dateFormat(publishTime, 'Y-M-D')}</p>
          </div>
        )
      })}
    </div>
  )
})
