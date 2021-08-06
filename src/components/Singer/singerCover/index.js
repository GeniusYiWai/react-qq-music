import React, { memo } from 'react'
import LazyLoadImg from 'components/Common/lazyloadImg'
import './index.less'
//歌手详情封面
export default memo(function SingerCover(props) {
  const {
    singer: { picUrl, name, nickname, signature, avatarUrl, userId, userType }
  } = props
  //userType 为0是普通用户
  //userType 为2是入驻歌手
  const handleClick = () => {
    console.log(userId)
    console.log(userType)
    window.open(`/profile?uid=${userId}`)
  }
  return (
    <div className='singer-cover-container' onClick={() => handleClick()}>
      <LazyLoadImg url={picUrl || avatarUrl} width={100} height={100} />
      <p>{name || nickname}</p>
      <span>{signature}</span>
    </div>
  )
})
