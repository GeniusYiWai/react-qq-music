import React, { memo } from 'react'
import LazyLoadImg from 'components/Common/lazyloadImg'
import { clipImgSize } from '@/utils/tools'
import './index.less'
//歌手详情封面
export default memo(function SingerCover(props) {
  const {
    singer: { picUrl, name, nickname, signature, avatarUrl, id, userId },
    useLazy = true
  } = props
  //userType 为0是普通用户
  //userType 为2是入驻歌手
  const handleClick = () => {
    id
      ? window.open(`/#/profile/singer/${id}`)
      : window.open(`/#/profile/user/${userId}`)
  }
  return (
    <div className='singer-cover-container' onClick={() => handleClick()}>
      {useLazy ? (
        <LazyLoadImg
          url={avatarUrl ? avatarUrl : picUrl}
          width={100}
          height={100}
        />
      ) : (
        <img
          src={`${avatarUrl ? avatarUrl : picUrl}${clipImgSize(100, 100)}`}
          alt=''
        />
      )}

      <p>{name || nickname}</p>
      <span>{signature}</span>
    </div>
  )
})
