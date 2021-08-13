import React, { memo } from 'react'
import { Skeleton } from 'antd'
import './index.less'
export default memo(function SongRecSkeleton(props) {
  const { limit = 9 } = props
  return (
    <div className='song-rec-skeleton-container'>
      {Array(limit)
        .fill()
        .map((item, index) => {
          return (
         
              <Skeleton.Avatar
                active={true}
                style={{ width: '86px', height: '86px' }}
                size={'large'}
                shape={'default'}
                key={index}
              />
            
          )
        })}
    </div>
  )
})
