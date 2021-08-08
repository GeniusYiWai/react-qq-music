import React, { memo } from 'react'
import { Empty } from 'antd'
import empty from '@/assets/img/empty.jpg'
import './index.less'
export default memo(function EmptyStatus(props) {
  let { text, showBtn = true } = props
  text = text ? text : '什么都没有呢'
  return (
    <Empty
      image={empty}
      imageStyle={{
        height: 150
      }}
      description={<span>{text}</span>}
    >
      {showBtn ? (
        <button type='primary' className='btn'>
          去主页 发现更多精彩！
        </button>
      ) : null}
    </Empty>
  )
})
