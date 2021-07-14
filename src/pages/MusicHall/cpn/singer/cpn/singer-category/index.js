import React, { memo } from 'react'
import './index.less'

export default memo(function SingerCategory(props) {
  const {
    Initials,
    Area,
    Type,
    currentInitial,
    switchInitials,
    currentArea,
    switchType,
    switchArea,
    currentType
  } = props

  return (
    <div className='singer-cate-container'>
      <div className='singer-cate-content w-1200'>
        <div className='singer-cate-initial'>
          {Initials.map((item, index) => {
            return (
              <span
                className={
                  item.initial === currentInitial ? 'singer-cate-select' : ''
                }
                onClick={() => switchInitials(item.initial)}
                key={index}
              >
                {item.categoryName}
              </span>
            )
          })}
        </div>
        <div className='singer-cate-area'>
          {Area.map((item, index) => {
            return (
              <span
                className={
                  item.area === currentArea ? 'singer-cate-select' : ''
                }
                onClick={() => switchArea(item.area)}
                key={index}
              >
                {item.categoryName}
              </span>
            )
          })}
        </div>
        <div className='singer-cate-type'>
          {Type.map((item, index) => {
            return (
              <span
                className={
                  item.type === currentType ? 'singer-cate-select' : ''
                }
                onClick={() => switchType(item.type)}
                key={index}
              >
                {item.categoryName}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
})
