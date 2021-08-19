import React, { memo } from 'react'
import './index.less'
//通用的分类组件
export default memo(function Category(props) {
  //props
  //Tabs 分类
  //switchTabs 切换分类调用的方法 用于请求数据
  //currentIndex 当前选择的分类
  const { Tabs, switchTabs, currentIndex } = props
  return (
    <div>
      <div className='playlist-tabs'>
        {Tabs.map((item, index) => {
          return (
            <div
              key={index}
              className={index === currentIndex ? 'active' : ''}
              onClick={() => switchTabs(index)}
            >
              {item.categoryName}
            </div>
          )
        })}
      </div>
    </div>
  )
})
