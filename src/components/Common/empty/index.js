import React, { memo } from 'react'
import { Empty } from 'antd'
import empty from '@/assets/img/empty.jpg'
import './index.less'
//空状态组件
export default memo(function EmptyStatus(props) {
  //props
  // text 展示文字
  // showBtn 是否展示回到主页按钮
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
        <button type='primary' className='btn' onClick={()=>{
          window.open('/#/musichall/home')
        }}>
          去主页 发现更多精彩！
        </button>
      ) : null}
    </Empty>
  )
})
