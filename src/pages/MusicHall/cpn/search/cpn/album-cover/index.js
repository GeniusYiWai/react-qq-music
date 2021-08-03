import React, { memo } from 'react'
import { handleSinger, dateFormat } from '@/utils/tools'
import './index.less'
export default memo(function AlbumDetailCover(props) {
  // const {
  //   album: { name, picUrl, id, artists, publishTime }
  // } = props
  const { album } = props
  return (
    <div>
      <div className='album-result-title'>
        <p>专辑</p>
        <p>歌手</p>
        <p>发行时间</p>
      </div>
      {album.map(({ picUrl, name, artists, publishTime,id }) => {
        return (
          <div className='album-result-cover' key={id}>
            <p>
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
