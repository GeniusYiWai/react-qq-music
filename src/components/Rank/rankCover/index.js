import React, { memo } from 'react'
import { useHistory } from 'react-router'
import BgImage from '@/assets/img/bg_index_top.jpg'
import './index.less'

export default memo(function RankCover(props) {
  const { rank, index } = props
  const history = useHistory()
  //根据排行榜的索引展示不同的背景图片
  const backgroundPosition = index * -224 + 'px'
  const goToRank = () => {
    console.log(111)
    history.push('/musichall/rank')
  }
  return (
    <div
      className='rank-cover-wrapper'
      onClick={() => {
        goToRank()
      }}
    >
      <div
        className='rank-cover-container'
        style={{
          backgroundImage: `url(${BgImage})`,
          backgroundPosition: backgroundPosition
        }}
      >
        <div className='rank-type'>
          <h2>巅峰榜</h2>
          <h1>{rank.name}</h1>
        </div>
        <div className='divider'></div>
        <div className='rank-list'>
          {rank.tracks.map((item, index) => {
            return (
              <div className='rank-item' key={index}>
                <div className='rank-index'>{index + 1}</div>
                <div className='rank-info'>
                  <p>{item.first}</p>
                  <p>{item.second}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
})
