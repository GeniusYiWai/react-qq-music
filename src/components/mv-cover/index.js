import React, { memo } from 'react'
import PlayImg from '../play-img'

import LazyLoadImg from 'components/lazyload-img'
import './index.less'
//通用mv 封面
//mv mv的信息
export default memo(function MVCover(props) {
  const {
    mv: { cover, id, name, playCount, artistName }
  } = props
  const handlePlay = () => {
    console.log(id)
  }
  return (
    <div className='mv-cover-container'>
      <div className='mv-img-cover'>
        <LazyLoadImg url={cover} width={150} height={150} />
        <PlayImg handleClick={() => handlePlay()}></PlayImg>
      </div>
      <div className='mv-info'>
        <p className='mv-name text-nowrap'>{name}</p>
        <p className='mv-artist text-nowrap'>{artistName}</p>
        <span className='mv-playnum'>{playCount}</span>
      </div>
    </div>
  )
})
