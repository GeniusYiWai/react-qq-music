import React, { memo } from 'react'
import './index.less'
export default memo(function RankType(props) {
  const { id, name, coverImgUrl, updateFrequency } = props.rank
  const { index, currentIndex, setcurrentIndex, fetchData } = props
  const getRankListById = (id, index) => {
    fetchData(id)
    setcurrentIndex(index)
  }
  return (
    <div
      className={`rank-type-container ${
        index === currentIndex ? 'rank-active ' : ''
      }`}
      key={id}
      onClick={() => getRankListById(id, index)}
    >
      <img src={coverImgUrl} alt='' />
      <div className='rank-type-info'>
        <p>{name}</p>
        <span>{updateFrequency}</span>
      </div>
    </div>
  )
})
