import React, { memo } from 'react'
import LazyLoadImg from 'components/Common/lazyloadImg'
import './index.less'
//歌手详情封面
export default memo(function SingerCover(props) {
  const {
    singer: { picUrl, name, nickname, signature, avatarUrl }
  } = props

  return (
    <div className='singer-cover-container'>
      <LazyLoadImg url={picUrl || avatarUrl} width={100} height={100} />
      <p>{name || nickname}</p>
      <p>{signature}</p>
    </div>
  )
})
