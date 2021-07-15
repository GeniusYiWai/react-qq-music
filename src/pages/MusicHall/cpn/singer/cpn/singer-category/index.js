import React, { memo, useState } from 'react'
import './index.less'

export default memo(function SingerCategory(props) {
  const { condition, Category, categoryName, switchCondition } = props
  const [currentCondition, setCondition] = useState(Category[0][condition])
  return (
    <div className='singer-cate-container'>
      <div className='singer-cate-content w-1200'>
        <div className='singer-cate-initial'>
          {Category.map((item, index) => {
            return (
              <span
                className={
                  item[condition] === currentCondition
                    ? 'singer-cate-select'
                    : ''
                }
                onClick={() => {
                  setCondition(item[condition])
                  switchCondition(condition, item[condition])
                }}
                key={index}
              >
                {item[categoryName]}
              </span>
            )
          })}
        </div>
        {/* <div className='singer-cate-area'>
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
        </div> */}
      </div>
    </div>
  )
})
