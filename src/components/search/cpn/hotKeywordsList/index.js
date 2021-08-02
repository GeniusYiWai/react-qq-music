import React, { memo } from 'react'
import './index.less'
export default memo(function HotKeywordsList(props) {
  const { hotKeywords } = props
  return (
    <div className='hotkeywords-container'>
      {hotKeywords &&
        hotKeywords.map((item, index) => {
          return (
            <div key={item.searchWord} className='hotkeywords-item'>
              <p>
                <span>{index + 1}</span>
                {item.searchWord}
              </p>
              <span>{item.score}</span>
            </div>
          )
        })}
    </div>
  )
})
