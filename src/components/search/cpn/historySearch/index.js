import React, { memo } from 'react'
import { clearItem } from '@/utils/storage'
import { DeleteOutlined } from '@ant-design/icons'
import './index.less'
export default memo(function HistorySearch(props) {
  const { history, setHistory, goToSearch, hideAll } = props
  //清空搜索历史
  const handleClear = () => {
    clearItem('historySearch')
    setHistory([])
  }
  const handleClick = keyword => {
    //跳转到搜索页面
    goToSearch(keyword)
    //隐藏全部
    hideAll()
  }
  return (
    <div className='historysearch-container'>
      <h3>
        <p>历史搜索</p>
        <DeleteOutlined
          onClick={() => {
            handleClear()
          }}
        />
      </h3>
      {history.map((item, index) => {
        return (
          <p
            className='historysearch-item text-nowrap'
            key={index}
            onClick={() => handleClick(item)}
          >
            {item}
          </p>
        )
      })}
    </div>
  )
})
