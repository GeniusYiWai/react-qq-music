import React, { memo, useState, useEffect } from 'react'
import { getItem, setItem } from '@/utils/storage'
import './index.less'
export default memo(function HistorySearch() {
  const [historySearch, setHistorySearch] = useState([])
  useEffect(() => {
    setHistorySearch(getItem('historySearch') || [])
  }, [])
  return (
    <div>
      {historySearch.map((item, index) => {
        return <p>{item}</p>
      })}
    </div>
  )
})
