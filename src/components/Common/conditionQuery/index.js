import React, { memo, useState } from 'react'
import './index.less'

export default memo(function ConditionQuery(props) {
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
      </div>
    </div>
  )
})
