import React, { memo, useEffect, useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import BigTitle from '../cpn/big-title'
import RankCover from '../cpn/rank-cover'

import { setNewRankRec } from '../store/actionCreators'

import './index.less'

export default memo(function RankRec() {
  //redux hooks
  //获取dispatch
  const dispatch = useDispatch()
  //获取home下的state的rankRec
  let { rank } = useSelector(
    state => ({
      rank: state.home.newRankRec
    }),
    shallowEqual
  )
  //react hooks

  useEffect(() => {
    //调用dispatch 请求排行榜数据 存入home state
    dispatch(setNewRankRec())
  }, [dispatch])

  return (
    <div className='rank-container'>
      <BigTitle title='排行榜' />
      <div className='rank-content w-1200'>
        {rank.map((item, index) => {
          return <RankCover rank={item} key={index} index={index} />
        })}
      </div>
    </div>
  )
})
