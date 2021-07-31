import React, { memo, useEffect } from 'react'
import { setMvDetailDispatch } from './store/actionCreators'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import MvPlayer from './cpn/mv-player'
import MvRecommend from './cpn/mv-recommend'
import { handleSinger } from '@/utils/tools'
import './index.less'
export default memo(function MvDetail() {
  const dispatch = useDispatch()
  const params = useParams()
  const { id } = params
  const { mvDetail } = useSelector(state => {
    return {
      mvDetail: state.mvDetail.mvDetail
    }
  })
  console.log(mvDetail)
  useEffect(() => {
    dispatch(setMvDetailDispatch(id))
  }, [])
  return (
    <div className='mv-detail-container w-1200'>
      <MvPlayer id={id} />
      <MvRecommend id={id} />
      <div className='mv-descrption'>
        <h2>视频简介</h2>
        <p>名称:{mvDetail.name}</p>
        <p>作者:{mvDetail.artists && handleSinger(mvDetail.artists)}</p>
        <p>发行时间:{mvDetail.publishTime}</p>
      </div>
    </div>
  )
})
