import React, { memo } from 'react'
import MvCover from 'components/Mv/mvCover'
import './index.less'
import MVSkeleton from 'components/Skeleton/mvSkeleton'
export default memo(function MvRecommend(props) {
  const { simiMvs } = props
  return (
    <div className='mv-simi-container'>
      <h1>大部分人还爱看</h1>
      <div className='mv-simi-wrapper'>
        {simiMvs.length === 0 ? <MVSkeleton limit={5} /> : null}
        {simiMvs.map(item => {
          return <MvCover mv={item} key={item.id} />
        })}
      </div>
    </div>
  )
})
