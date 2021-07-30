import React, { memo } from 'react'
import LazyLoadImg from 'components/lazyload-img'
import PlayImg from '../play-img'
import { handleSinger } from '@/utils/tools'
import './index.less'
//通用专辑封面
//id album id
// picUrl 图片地址
// artists 专辑作者
// name 专辑名称
export default memo(function PlaylistCover(props) {
  const {
    album: { id, picUrl, artists, name }
  } = props
  const handlePlay = id => {
    console.log(id)
  }
  return (
    <div className='album-cover'>
      <div key={id}>
        <div className='album-wrapper'>
          <LazyLoadImg url={picUrl} width={150} height={150} />
          <PlayImg handleClick={() => handlePlay()}></PlayImg>
        </div>
        <p className='text-nowrap'>{name}</p>
        <p className='singer text-nowrap'>{handleSinger(artists)}</p>
      </div>
    </div>
  )
})
