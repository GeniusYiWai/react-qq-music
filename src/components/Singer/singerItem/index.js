import React, { memo } from 'react'
import './index.less'
//单个歌手姓名
export default memo(function SingerItem(props) {
  const { name, id } = props.singer
  const handleClick = () => {
    window.open(`/#/profile/singer/${id}`)
  }
  return (
    <div className='singer-item' onClick={() => handleClick()}>
      {name}
    </div>
  )
})
