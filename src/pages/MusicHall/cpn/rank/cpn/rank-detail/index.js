import React, { memo } from 'react'
import LazyLoadImg from 'components/lazyload-img'

import { handleSinger, formatMinuteSecond } from '@/utils/tools'
import './index.less'

//排行榜下的歌曲详情
// name, 名称
// id, id
// al: { picUrl } 图片地址
// ar, 作者
// dt 时长
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
        <LazyLoadImg url={picUrl} width={50} height={50} />
        <span>{name}</span>
      </div>
      <div className='rank-detail-info'>
        <span>{handleSinger(ar)}</span>
        <i>{formatMinuteSecond(dt)}</i>
      </div>
    </div>
  )
})
