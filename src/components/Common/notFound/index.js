import React, { memo, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './index.less'
//404页面组件
export default memo(function NotFound() {
  //state
  //倒计时
  const [count, setCount] = useState(5)
  //获取history
  const history = useHistory()
  //开始倒计时
  useEffect(() => {
    let timer = setInterval(() => {
      setCount(count - 1)
      //倒计时结束 跳转到主页
      if (count === 0) {
        history.push('/#/musichall')
      }
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [count])
  //点击跳转到主页
  const handleClick = () => {
    history.push('/musichall')
  }
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
