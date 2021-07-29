import React, { memo } from 'react'
import LazyLoadImg from 'components/lazyload-img'
import './index.less'
//歌手详情封面
export default memo(function SingerCover(props) {
  const { singer } = props
  return (
    <div className='singer-cover-container'>
      <LazyLoadImg url={singer.picUrl} width={100} height={100} />
      <p>{singer.name}</p>
    </div>
  )
})
