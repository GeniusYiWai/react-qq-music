import React, { memo, useState } from 'react'
import './index.less'
import playImg from '@/assets/img/play.png'

export default memo(function PlayImg(props) {
  const { handleClick } = props
  //控制鼠标移入显示播放图片
  const [imgShow, setImgShow] = useState(false)
  const handleCoverMove = () => {
    setImgShow(true)
  }
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
