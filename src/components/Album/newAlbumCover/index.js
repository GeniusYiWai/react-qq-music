import React, { memo } from 'react'
import LazyLoadImg from 'components/Common/lazyloadImg'
import PlayImg from 'components/Common/playImg'
import { handleSinger } from '@/utils/tools'
import { playAlbum } from '@/utils/player'
import './index.less'
//通用专辑封面
//id album id
// picUrl 图片地址
// artists 专辑作者
// name 专辑名称
export default memo(function NewAlbumCover(props) {
  //props
  const {
    album: { id, picUrl, artists, name }
  } = props
  //处理点击播放
  const handlePlay = () => {
    playAlbum(id)
  }
  //跳转到专辑详情
  const goToAlbumDetail = id => {
    window.open(`/#/musichall/album/detail/${id}`)
  }
  //跳转到歌手详情
  const goToSingerDetail = () => {
    window.open(`/#/profile/singer/${artists[0].id}`)
  }
  return (
    <div className='album-cover'>
      <div key={id}>
        <div className='album-wrapper'>
          <LazyLoadImg url={picUrl} width={150} height={150} />
          <PlayImg handleClick={() => handlePlay()}></PlayImg>
        </div>
        <p className='text-nowrap' onClick={() => goToAlbumDetail(id)}>
          {name}
        </p>
        <p className='singer text-nowrap' onClick={() => goToSingerDetail()}>
          {handleSinger(artists)}
        </p>
      </div>
    </div>
  )
})
