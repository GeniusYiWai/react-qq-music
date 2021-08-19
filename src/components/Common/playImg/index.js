import React, { memo, useState } from 'react'
import './index.less'
import playImg from '@/assets/img/play.png'
//播放图片组件
export default memo(function PlayImg(props) {
  //props
  //handleClick 父组件点击触发的事件
  const { handleClick } = props
  //state
  //控制鼠标移入显示播放图片
  const [imgShow, setImgShow] = useState(false)
  //functions
  //鼠标移入
  const handleCoverMove = () => {
    setImgShow(true)
  }
  //鼠标移出
  const handleCoverLeave = () => {
    setImgShow(false)
  }
  return (
    <div
      className='play-img'
      onMouseMove={() => handleCoverMove()}
      onMouseLeave={() => handleCoverLeave()}
      onClick={() => handleClick()}
    >
      <img
        src={playImg}
        alt=''
        className={imgShow ? 'play-img-block' : 'play-img-none'}
      />
    </div>
  )
})
