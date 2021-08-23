import React, { memo } from 'react'
import LazyLoadImg from 'components/Common/lazyloadImg'
import './index.less'
export default memo(function CollectSinger(props) {
  const {
    singer: { id, picUrl, name }
  } = props
  //查看歌手详情
  const goToSingerDetail = id => {
    window.open(`/#/profile/singer/${id}`)
  }
  return (
    <div className='collect-singer-item' onClick={() => goToSingerDetail(id)}>
      <LazyLoadImg url={picUrl} width={150} height={150} />
      <p>{name}</p>
    </div>
  )
})
