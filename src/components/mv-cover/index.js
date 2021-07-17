import React, { memo } from 'react'
import './index.less'
export default memo(function MVCover(props) {
  const { mv } = props
  return (
    <div className='mv-cover-container'>
      <div className='mv-img-cover'>
        <img src={mv.cover} alt='' />
      </div>
      <div className='mv-info'>
        <p className='mv-name text-nowrap'>{mv.name}</p>
        <p className='mv-artist text-nowrap'>{mv.artistName}</p>
        <span className='mv-playnum'>{mv.playCount}</span>
      </div>
    </div>
  )
})
