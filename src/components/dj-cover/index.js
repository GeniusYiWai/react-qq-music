import React, { memo } from 'react'
import { clipImgSize } from '@/utils/tools'
import './indx.less'
//通用dj 封面
//picUrl 图片地址
//name dj名称
//desc dj描述

export default memo(function DjCover(props) {
  const { picUrl, name, desc } = props.dj
  return (
    <div className='dj-cover'>
      <img src={`${picUrl}${clipImgSize(150, 150)}`} alt='' />
      <p className='text-nowrap'>{name}</p>
      <p className='text-nowrap'>{desc}</p>
    </div>
  )
})
