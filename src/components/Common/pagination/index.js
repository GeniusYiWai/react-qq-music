import React, { memo, useState } from 'react'
import { Pagination } from 'antd'
export default memo(function PaginationCpn(props) {
  //setCombineCondition 用于触发父组件重新加载数据
  //total 数据总数
  //limitNumber 每页大小
  const { setCombineCondition, total } = props

  //每页大小
  const [limit, setLimit] = useState(20)
  //页码
  const [currentPage, setCurrentPage] = useState(1)
  ///处理点击页码事件
  const handlePageChange = (current, size) => {
    //偏移量 用于分页 计算公式 (page-1)*limit
    const offset = (current - 1) * size
    //如果每页大小改不了 重新计算limit 手动返回第一页
    if (size !== limit) {
      setCombineCondition(combineCondition => ({
        ...combineCondition,
        offset: 0,
        limit: size
      }))
      setCurrentPage(1)
      setLimit(size)
      //如果没有改变每页大小 则进行页码跳转
    } else {
      setCombineCondition(combineCondition => ({
        ...combineCondition,
        offset
      }))
      setCurrentPage(current)
    }
  }
  return (
    <div>
      <Pagination
        pageSize={limit}
        total={total}
        current={currentPage}
        onChange={(current, size) => handlePageChange(current, size)}
      />
    </div>
  )
})
