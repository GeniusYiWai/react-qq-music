import React, { memo } from 'react'
import { Skeleton } from 'antd'
import './index.less'
export default memo(function PlaylistSkeleton(props) {
  const { limit = 20 } = props
  return (
    <div className='playlist-skeleton-container'>
      {Array(limit)
        .fill()
        .map((item, index) => {
          return (
            <Skeleton.Avatar
              active={true}
              style={{ width: '150px', height: '150px' }}
              size={'large'}
              shape={'default'}
              key={index}
            />
          )
        })}
    </div>
  )
})
