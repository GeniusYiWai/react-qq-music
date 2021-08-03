import React, { memo, useCallback } from 'react'
import { clearItem } from '@/utils/storage'
import { DeleteOutlined } from '@ant-design/icons'
import './index.less'
export default memo(function HistorySearch(props) {
  const { history, setHistory } = props
  const handleClear = useCallback(() => {
    console.log(11111)
    clearItem('historySearch')
    setHistory([])
  }, [setHistory])

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
          <p className='historysearch-item' key={index}>
            {item}
          </p>
        )
      })}
    </div>
  )
})
