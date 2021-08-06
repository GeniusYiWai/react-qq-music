import React, { memo } from 'react'
import './index.less'
export default memo(function SwitchPage(props) {
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
