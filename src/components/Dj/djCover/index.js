import React, { memo } from 'react'
import LazyLoadImg from 'components/Common/lazyloadImg'
import PlayImg from 'components/Common/playImg'
import { message } from 'antd'
import './indx.less'
//通用dj 封面
export default memo(function DjCover(props) {
  //props
  //picUrl 图片地址
  //name dj名称
  //desc dj描述
  const { picUrl, name, desc } = props.dj
  //
  const handlePlay = () => {
    message.warning('没做。')
  }
  return (
    <div className='dj-cover'>
      <div className='dj-wrapper'>
        <LazyLoadImg url={picUrl} width={192} height={192} />
        <PlayImg handleClick={() => handlePlay()}></PlayImg>
      </div>
      <p className='text-nowrap'>{name}</p>
      <p className='text-nowrap'>{desc}</p>
    </div>
  )
})
