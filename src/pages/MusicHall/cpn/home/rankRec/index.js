import React, { memo, useEffect, useState } from 'react'
import BigTitle from 'components/Home/bigTitle'
import RankCover from 'components/Rank/rankCover'
import { getRecommendRank } from '@/api/home'
import RankRecSkeleton from 'components/Skeleton/rankRecSkeleton'
import { message } from 'antd'
import './index.less'
export default memo(function RankRec() {
  //排行榜数据
  const [rank, setRank] = useState([])
  const getRecRank = async () => {
    try {
      const {
        data: { list }
      } = await getRecommendRank()
      //因为后面的排行榜数据都是空的 为了凑够5个排行榜 手动把第一个排行榜给又添加一遍
      let arr = list.slice(0, 4)
      arr.push(list[0])
      setRank(arr)
    } catch (error) {
      message.error('获取排行榜失败!')
    }
  }
  useEffect(() => {
    getRecRank()
  }, [])
  return (
    <div className='rank-container'>
      <BigTitle title='排行榜' />
      {rank.length === 0 ? <RankRecSkeleton /> : null}
      <div className='rank-content w-1200'>
        {rank.map((item, index) => {
          return <RankCover rank={item} key={index} index={index} />
        })}
      </div>
    </div>
  )
})
