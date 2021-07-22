import React, { memo } from 'react'
import './index.less'
//通用的分类组件
//Tabs 分类
//switchTabs 切换分类调用的方法 用于请求数据
//currentIndex 当前选择的分类
//type 请求携带的参数
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
