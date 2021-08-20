import React, { memo } from 'react'
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
    <div className='collect-singer-item'>
      <img src={picUrl} alt='' />
      <p onClick={() => goToSingerDetail(id)}>{name}</p>
    </div>
  )
})
