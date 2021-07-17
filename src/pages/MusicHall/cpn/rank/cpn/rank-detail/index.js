import React, { memo } from 'react'
import './index.less'
import { handleSinger, formatMinuteSecond } from '@/utils/tools'
export default memo(function RankDetail(props) {
  const {
    name,
    id,
    al: { picUrl },
    ar,
    dt
  } = props.item
  const { index } = props
  return (
    <div className={`rank-detail-container ${index % 2 === 0 ? 'zebra' : ''}`}>
      <div className='rank-detail-cover'>
        <img src={picUrl} alt='' />
        <span>{name}</span>
      </div>
      <div className='rank-detail-info'>
        <span>{handleSinger(ar)}</span>
        <i>{formatMinuteSecond(dt)}</i>
      </div>
    </div>
  )
})
