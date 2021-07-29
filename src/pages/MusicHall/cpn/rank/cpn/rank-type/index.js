import React, { memo } from 'react'
import LazyLoadImg from 'components/lazyload-img'
import './index.less'
//排行榜分类
// id,  id
// name, 排行榜名称
//  coverImgUrl,  图片地址
//  updateFrequency 更新时间
// index,
//  currentIndex,  当前选中的排行榜索引
//  setcurrentIndex,  切换索引
//  fetchData 重新加载数据
export default memo(function RankType(props) {
  const { id, name, coverImgUrl, updateFrequency } = props.rank
  const { index, currentIndex, setcurrentIndex, fetchData } = props
  const getRankListById = index => {
    fetchData(index)
    setcurrentIndex(index)
  }
  return (
    <div
      className={`rank-type-container ${
        index === currentIndex ? 'rank-active ' : ''
      }`}
      key={id}
      onClick={() => getRankListById(index)}
    >
      <LazyLoadImg url={coverImgUrl} width={50} height={50} />

      <div className='rank-type-info'>
        <p>{name}</p>
        <span>{updateFrequency}</span>
      </div>
    </div>
  )
})
