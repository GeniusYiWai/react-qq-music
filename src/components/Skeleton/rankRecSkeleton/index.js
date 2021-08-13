import React, { memo } from 'react'
import { Skeleton } from 'antd'
import './index.less'
export default memo(function RankSkeleton(props) {
  const { limit = 5 } = props
  return (
    <div className='rank-rec-skeleton-container'>
      {Array(limit)
        .fill()
        .map((item, index) => {
          return (
            <Skeleton.Avatar
              active={true}
              style={{ width: '216px', height: '500px' }}
              size={'large'}
              shape={'default'}
              key={index}
            />
          )
        })}
    </div>
  )
})
