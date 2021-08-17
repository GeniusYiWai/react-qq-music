import React, { memo } from 'react'
import MvCover from 'components/Mv/mvCover'
import './index.less'
import MVSkeleton from 'components/Skeleton/mvSkeleton'
export default memo(function VideoRecommend(props) {
  const { simiVideos } = props
  return (
    <div className='mv-simi-container'>
      <h1>大部分人还爱看</h1>
      <div className='mv-simi-wrapper'>
        {simiVideos.length === 0 ? <MVSkeleton limit={5} /> : null}
        {simiVideos.length !== 0 &&
          simiVideos.map((item, index) => {
            return <MvCover mv={item} key={item.id} key={index} />
          })}
      </div>
    </div>
  )
})
