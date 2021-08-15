import React, { memo } from 'react'
import PlayImg from 'components/Common/playImg'
import LazyLoadImg from 'components/Common/lazyloadImg'
import './index.less'
//通用mv 封面
//mv mv的信息
export default memo(function MVCover(props) {
  const {
    mv: {
      cover,
      coverUrl,
      id,
      title,
      name,
      playCount,
      artistName,
      vid,
      imgurl,
      artistId,
      artist
    }
  } = props
  const handlePlay = () => {
    window.open(`/musichall/mv/detail/${id || vid}`)
  }
  const handleClick = () => {
    window.open(`/profile/singer/${artist ? artist.id : artistId}`)
  }
  return (
    <div className='mv-cover-container'>
      <div className='mv-img-cover'>
        <LazyLoadImg
          url={cover || coverUrl || imgurl}
          width={150}
          height={150}
        />
        <PlayImg handleClick={() => handlePlay()}></PlayImg>
      </div>
      <div className='mv-info'>
        <p className='mv-name text-nowrap' onClick={() => handlePlay()}>
          {name || title}
        </p>
        <p className='mv-artist text-nowrap' onClick={() => handleClick()}>
          {artistName}
        </p>
        <span className='mv-playnum'>{playCount}</span>
      </div>
    </div>
  )
})
