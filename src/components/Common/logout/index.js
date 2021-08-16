import React, { memo, useRef, useState, useEffect } from 'react'
import { message } from 'antd'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { logout } from '@/api/login'
import { userLoginDispatch } from '@/pages/LoginBox/store/actionCreators'
import { CloseOutlined } from '@ant-design/icons'
import './index.less'
export default memo(function Logout() {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const avatarRef = useRef()
  const loginBox = useRef()
  //获取用户登录状态
  const { userInfo } = useSelector(state => {
    return {
      userInfo: state.user.userInfo
    }
  }, shallowEqual)
  const handleLogout = () => {
    logout().then(({ data }) => {
      if (data.code === 200) {
        message.success('退出成功')
        dispatch(userLoginDispatch(false))
      } else {
        message.error('退出失败')
      }
    })
  }
  const showUserInfo = e => {
    e.stopPropagation()
    setShow(true)
  }
  useEffect(() => {
    //点击window 隐藏个人信息
    window.addEventListener('click', () => {
      setShow(false)
    })
  }, [])
  return (
    <div className='logout-container'>
      <div
        className='user-info-box'
        ref={avatarRef}
        onClick={e => showUserInfo(e)}
      >
        <img
          src={userInfo && userInfo.avatarUrl}
          alt=''
          className='logout-user-avatar'
        />
        <p>{userInfo && userInfo.nickname}</p>
      </div>
      {show ? (
        <div className='logout-box' ref={loginBox}>
          <div className='logout-box-top'>
            <img src={userInfo && userInfo.avatarUrl} alt='' />
            <span>{userInfo && userInfo.nickname}</span>
          </div>
          <p onClick={() => handleLogout()}>退出登录</p>
        </div>
      ) : null}
    </div>
  )
})
