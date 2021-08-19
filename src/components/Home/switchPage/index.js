import React, { memo } from 'react'
import './index.less'
//分页按钮
export default memo(function SwitchPage(props) {
  //currentPage 当前页
  //switchPage 切换页码
  const { currentPage, switchPage } = props
  return (
    <>
      <div
        className='switch-btn-left switch-btn'
        onClick={() => switchPage(currentPage - 1)}
      >
        {'<'}
      </div>
      <div
        onClick={() => switchPage(currentPage + 1)}
        className='switch-btn-right switch-btn'
      >
        {'>'}
      </div>
    </>
  )
})
