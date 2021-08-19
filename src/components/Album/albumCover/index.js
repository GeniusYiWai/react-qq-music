import React, { memo } from 'react'
import { handleSinger, dateFormat } from '@/utils/tools'
import './index.less'
//专辑封面组件
export default memo(function AlbumDetailCover(props) {
  //props
  const { album } = props
  //functions
  //跳转到专辑详情
  const goToAlbumDetail = id => {
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
                goToAlbumDetail(id)
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
