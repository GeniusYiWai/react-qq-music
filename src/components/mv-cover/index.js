import React, { memo } from 'react'
import LazyLoadImg from 'components/lazyload-img'
import './index.less'
//通用mv 封面
//mv mv的信息
export default memo(function MVCover(props) {
  const { mv } = props
  return (
    <div className='mv-cover-container'>
      <div className='mv-img-cover'>
        <LazyLoadImg url={mv.cover} width={150} height={150} />
      </div>
      <div className='mv-info'>
        <p className='mv-name text-nowrap'>{mv.name}</p>
        <p className='mv-artist text-nowrap'>{mv.artistName}</p>
        <span className='mv-playnum'>{mv.playCount}</span>
      </div>
    </div>
  )
})
