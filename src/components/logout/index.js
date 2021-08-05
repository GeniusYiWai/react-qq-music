import React, { memo, useRef, useEffect, useState } from 'react'
import { message } from 'antd'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { logout } from '@/api/login'
import { clearItem } from '@/utils/storage'
import { userLoginDispatch } from '@/pages/Mine/store/actionCreators'
import './index.less'
export default memo(function Logout() {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const avatarRef = useRef()
  const loginBox = useRef()
  //获取用户登录状态
  const { user } = useSelector(state => {
    return {
      user: state.user.userInfo
    }
  }, shallowEqual)
  const handleLogout = () => {
    logout().then(({ data }) => {
      if (data.code === 200) {
        message.success('退出成功')
        dispatch(userLoginDispatch(false))
        clearItem('login')
        clearItem('userInfo')
      } else {
        message.error('退出失败')
      }
    })
  }
  useEffect(() => {
    avatarRef.current.addEventListener('mouseenter', () => {
      setShow(true)
      loginBox.current &&
        loginBox.current.addEventListener('mouseleave', () => {
          setShow(false)
        })
    })
  }, [])
  return (
    <div className='logout-container' ref={avatarRef}>
      <img src={user && user.avatarUrl} alt='' className='logout-user-avatar' />
      {show ? (
        <div className='logout-box' ref={loginBox}>
          <div className='logout-box-top'>
            <img src={user.avatarUrl} alt='' />
            <span>{user.nickname}</span>
          </div>
          <p onClick={() => handleLogout()}>退出登录</p>
        </div>
      ) : null}
    </div>
  )
})
