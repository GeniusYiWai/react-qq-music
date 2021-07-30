import React, { memo } from 'react'
import LazyLoadImg from 'components/lazyload-img'
import PlayImg from 'components/play-img'
import { playMusic } from '@/utils/player'
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

  const handlePlay = () => {
    playMusic(id, name, ar, dt)
  }
  return (
    <div className={`rank-detail-container ${index % 2 === 0 ? 'zebra' : ''}`}>
      <div>
        <div className='rank-detail-cover'>
          <LazyLoadImg url={picUrl} width={60} height={60} />
          <PlayImg handleClick={() => handlePlay()}></PlayImg>
        </div>
        <p>{name}</p>
      </div>

      <div className='rank-detail-info'>
        <span>{handleSinger(ar)}</span>
        <i>{formatMinuteSecond(dt)}</i>
      </div>
    </div>
  )
})
