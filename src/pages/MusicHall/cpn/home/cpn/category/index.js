import React, { memo } from 'react'
import './index.less'
export default memo(function Category(props) {
  const { Tabs, switchTabs, currentIndex,type } = props
  
  return (
    <div>
      <div className='playlist-tabs'>
        {Tabs.map((item, index) => {
          return (
            <div
              key={index}
              className={index === currentIndex ? 'active' : ''}
              onClick={() => switchTabs(index, item[type])}
            >
              {item.categoryName}
            </div>
          )
        })}
      </div>
    </div>
  )
})
