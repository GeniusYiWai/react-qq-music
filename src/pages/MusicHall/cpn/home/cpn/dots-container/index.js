import React, { memo } from 'react'
import './index.css'
export default memo(function DotsContainer(props) {
  const { length, PAGESIZE, currentPage, switchPage } = props
  //获取总页数
  const TOTAL_PAGE = Math.ceil(length / PAGESIZE)
  //根据总页数填充数组
  const page_array = [...new Array(TOTAL_PAGE)]
  return (
    <div className='dots-container'>
      {page_array.map((item, index) => {
        return (
          <div
            className={`dots ${index === currentPage ? 'active' : ''}`}
            onClick={() => switchPage(index)}
            key={index}
          ></div>
        )
      })}
    </div>
  )
})
