import React, { memo, useEffect, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import './index.less'
export default memo(function NotFound() {
  const [count, setCount] = useState(5)
  const history = useHistory()
  useEffect(() => {
    let timer = setInterval(() => {
      setCount(count => {
        return count - 1
      })
      console.log(1111);
      if (count === 0) {
        history.push('/musichall')
      }
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [count])
  const handleClick = useCallback(() => {
    history.push('/musichall')
  }, [])
  return (
    <div className='notfound-container'>
      <h1>没有找到相关内容</h1>
      <p>
        去<span onClick={() => handleClick()}>音乐馆</span>发现喜欢的音乐{' '}
        {count}
      </p>
    </div>
  )
})
