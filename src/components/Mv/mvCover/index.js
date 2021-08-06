import React, { memo } from 'react'
import PlayImg from 'components/Common/playImg'
import LazyLoadImg from 'components/Common/lazyloadImg'
import './index.less'
//通用mv 封面
//mv mv的信息
export default memo(function MVCover(props) {
  const {
    mv: { cover,coverUrl, id, title,name, playCount, artistName,vid }
  } = props
  const handlePlay = () => {
    window.open(`/musichall/mvdetail/${id||vid}`)
  }
  return (
    <div className='mv-cover-container'>
      <div className='mv-img-cover'>
        <LazyLoadImg url={cover||coverUrl} width={150} height={150} />
        <PlayImg handleClick={() => handlePlay()}></PlayImg>
      </div>
      <div className='mv-info'>
        <p className='mv-name text-nowrap' onClick={() => handlePlay()}>
          {name||title}
        </p>
        <p className='mv-artist text-nowrap'>{artistName}</p>
        <span className='mv-playnum'>{playCount}</span>
      </div>
    </div>
  )
})
