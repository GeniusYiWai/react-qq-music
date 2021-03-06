import React, {
  memo,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle
} from 'react'

import './index.less'
export default memo(
  forwardRef(function VideoPlayer(props, ref) {
    // 此处注意useImperativeHandle方法的的第一个参数是目标元素的ref引用
    useImperativeHandle(ref, () => ({
      // changeVal 就是暴露给父组件的方法
      playVideo: () => {
        playVideo()
      }
    }))
    //获取视频ref
    const videoRef = useRef()
    const { videoUrl } = props
    //播放视频
    const playVideo = useCallback(() => {
      videoRef.current.play()
    }, [])
    return (
      <div className='mv-player-container'>
        <video
          src={videoUrl && videoUrl}
          controls
          className='mv-player'
          ref={videoRef}
        ></video>
      </div>
    )
  })
)
