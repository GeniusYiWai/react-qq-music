import React, { memo } from 'react'
import LazyLoadImg from 'components/Common/lazyloadImg'
import PlayImg from 'components/Common/playImg'

import './indx.less'
//通用dj 封面
//picUrl 图片地址
//name dj名称
//desc dj描述
export default memo(function DjCover(props) {
  const { picUrl, name, desc, id } = props.dj
  const handlePlay = () => {
    console.log(id)
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
