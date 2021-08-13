import React, { memo } from 'react'
import { Skeleton } from 'antd'
import './index.less'
export default memo(function SingerSkeleton(props) {
  const { limit = 10 } = props
  return (
    <div className='singer-skeleton-container'>
      {Array(limit)
        .fill()
        .map((item, index) => {
          return (
            <Skeleton.Avatar
              active={true}
              style={{ width: '100px', height: '100px' }}
              size={'large'}
              shape={'circle'}
              key={index}
            />
          )
        })}
    </div>
  )
})
