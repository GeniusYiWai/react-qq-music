import React, { memo } from 'react'
import { Skeleton } from 'antd'
import './index.less'
export default memo(function DjSkeleton(props) {
  const { limit = 20 } = props
  return (
    <div className='dj-skeleton-container'>
      {Array(limit)
        .fill()
        .map((item, index) => {
          return (
            <Skeleton.Avatar
              active={true}
              style={{ width: '192px', height: '192px' }}
              size={'large'}
              shape={'default'}
              key={index}
            />
          )
        })}
    </div>
  )
})
