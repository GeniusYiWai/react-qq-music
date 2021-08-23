import React, { memo } from 'react'
import { handleSinger, dateFormat } from '@/utils/tools'
import LazyLoadImg from 'components/Common/lazyloadImg'
import './index.less'
//专辑封面组件
export default memo(function AlbumDetailCover(props) {
  //props
  const { album } = props
  console.log(album)
  //functions
  //跳转到专辑详情
  const goToAlbumDetail = id => {
    window.open(`/#/musichall/album/detail/${id}`)
  }
  //跳转到歌手详情
  const goToSingerDetail = artists => {
    window.open(`/#/profile/singer/${artists[0].id}`)
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
              <LazyLoadImg url={picUrl} width={50} height={50}/>
              <span>{name}</span>
            </p>
            <p
              className='text-nowrap'
              onClick={() => {
                goToSingerDetail(artists)
              }}
            >
              {handleSinger(artists)}
            </p>
            <p className='text-nowrap'>{dateFormat(publishTime, 'Y-M-D')}</p>
          </div>
        )
      })}
    </div>
  )
})
