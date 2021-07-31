import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSimiMvDispatch } from '../../store/actionCreators'
import MvCover from 'components/mv-cover'
import './index.less'
export default memo(function MvRecommend(props) {
  const dispatch = useDispatch()
  const { id } = props
  const { simiMv } = useSelector(state => {
    return {
      simiMv: state.mvDetail.simiMv
    }
  })
  useEffect(() => {
    dispatch(setSimiMvDispatch(id))
  }, [])
  return (
    <div className='mv-simi-container'>
      <h1>大部分人还爱看</h1>
      <div className='mv-simi-wrapper'>
        {simiMv.map(item => {
          return <MvCover mv={item} key={item.id} />
        })}
      </div>
    </div>
  )
})
