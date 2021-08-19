import React, { memo } from 'react'
import LazyLoadImg from 'components/Common/lazyloadImg'
import PlayImg from 'components/Common/playImg'
import { playMusic } from '@/utils/player'
import { handleSinger, formatMinuteSecond } from '@/utils/tools'
import './index.less'
//排行榜下的歌曲详情
export default memo(function RankDetail(props) {
  // name, 名称
  // id, id
  // al: { picUrl } 图片地址
  // ar, 作者
  // dt 时长
  const {
    name,
    id,
    al: { picUrl },
    ar,
    dt
  } = props.item
  //点击的歌曲的索引
  const { index } = props
  //点击播放
  const handlePlay = () => {
    playMusic(id, name, ar, dt)
  }
  //查看歌手详情
  const goToSingerDetail = () => {
    window.open(`/#/profile/singer/${ar[0].id}`)
  }
  //查看歌曲详情
  const goToSongDetail = () => {
    window.open(`/#/musichall/song/detail/${id}`)
  }
  return (
    <div className={`rank-detail-container ${index % 2 === 0 ? 'zebra' : ''}`}>
      <div>
        <div className='rank-detail-cover'>
          <LazyLoadImg url={picUrl} width={60} height={60} />
          <PlayImg handleClick={() => handlePlay()}></PlayImg>
        </div>
        <p onClick={() => goToSongDetail()}>{name}</p>
      </div>

      <div className='rank-detail-info'>
        <span onClick={() => goToSingerDetail()}>{handleSinger(ar)}</span>
        <i>{formatMinuteSecond(dt)}</i>
      </div>
    </div>
  )
})
