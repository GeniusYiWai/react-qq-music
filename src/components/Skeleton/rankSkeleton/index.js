import React, { memo } from 'react'
import { Skeleton } from 'antd'
import './index.less'
export default memo(function RankSkeleton(props) {
  return (
    <div className='rank-skeleton-container'>
      <Skeleton.Avatar
        active={true}
        style={{ width: '225px', height: '800px' }}
        size={'large'}
        shape={'default'}
        className='left'
      />
      <Skeleton.Avatar
        active={true}
        style={{ width: '980px', height: '800px' }}
        size={'large'}
        shape={'default'}
        className='right'
      />
    </div>
  )
})
