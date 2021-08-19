import React, { memo, useState } from 'react'
import { Pagination } from 'antd'
import './index.less'
//分页组件
export default memo(function PaginationCpn(props) {
  //props
  //setCombineCondition 用于点击下一页触发父组件重新加载数据
  //total 数据总数
  //limitNumber 每页大小
  const { currentPage, setCurrentPage, setCombineCondition, total, setData ,disabled} =
    props
  //每页大小
  const [limit, setLimit] = useState(props.limit)
  //处理修改页码大小
  const handlePageChange = (current, size) => {
    //偏移量 用于分页 计算公式 (page-1)*limit
    const offset = (current - 1) * size
    //如果每页大小改变了 重新计算limit 手动返回第一页
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
      //这里有一个bug 不知道为什么会多一条数据 只能先清空父组件的数据
      setData([])
      setCombineCondition(combineCondition => ({
        ...combineCondition,
        offset
      }))
      setCurrentPage(current)
    }
  }
  return (
    <div className='pagination-container'>
      <Pagination
        pageSize={limit}
        total={total}
        current={currentPage}
        onChange={(current, size) => handlePageChange(current, size)}
        showSizeChanger={props.showSizeChanger}
        showQuickJumper={props.showQuickJumper}
        disabled={disabled}
      />
    </div>
  )
})
