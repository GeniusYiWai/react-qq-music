import React, { memo } from 'react'

import './index.less'
export default memo(function HotKeywordsList(props) {
  const { hotKeywords, hideAll, setHistorySearch, goToSearch } = props
  const handleClick = keyword => {
    //跳转到搜索页面
    goToSearch(keyword)
    //将点击热门搜索的添加到历史搜索
    setHistorySearch(keyword)
    //隐藏全部
    hideAll()
  }
  return (
    <div className='hotkeywords-container'>
      {hotKeywords &&
        hotKeywords.map((item, index) => {
          return (
            <div
              key={item.searchWord}
              className='hotkeywords-item'
              onClick={() => handleClick(item.searchWord)}
            >
              <p>
                <span>{index + 1}</span>
                <i>{item.searchWord}</i>
              </p>
              <span>{item.score}</span>
            </div>
          )
        })}
    </div>
  )
})
