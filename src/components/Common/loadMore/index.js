import React, { memo, useEffect, useState } from 'react'
import { debounce } from '@/utils/tools'
export default memo(function LoadMore(props) {
  const {
    setCombineCondition,
    loading,
    limit,
    hasMore,
    setHasMore,
    setLoading,
    offset
  } = props
  const [selfOffset, setSelfOffset] = useState(offset)
  const fetchData = () => {
    // 文档内容实际高度（包括超出视窗的溢出部分）
    const scrollHeight = document.documentElement.scrollHeight
    //滚动条滚动距离
    const scrollTop = document.documentElement.scrollTop
    //窗口可视范围高度
    const clientHeight = document.documentElement.clientHeight
    //如果滚动到底部 加载新数据
    if (clientHeight + scrollTop >= scrollHeight) {
      //先判断是否已经在请求数据以及是否还有更多数据 如果都true 才会请求新数据
      if (!loading && hasMore) {
        //上锁
        setLoading(true)
        setHasMore(false)
        setSelfOffset(selfOffset => {
          //新的偏移量等于之前的偏移量加每页数据大小
          let newOffset = selfOffset + limit
          //加载新数据
          setCombineCondition(combineCondition => ({
            ...combineCondition,
            offset: newOffset
          }))
          return newOffset
        })
      }
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', fetchData)
  }, [])
  return <div></div>
})
