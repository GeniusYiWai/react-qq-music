import React, { memo, useRef, useState, useEffect } from 'react'
import { message } from 'antd'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { logout as logoutAPI } from '@/api/login'
import { userLoginDispatch } from '@/pages/LoginBox/store/actionCreators'
import { clearItem } from '@/utils/storage'
import './index.less'
//退出登录
export default memo(function Logout() {
  //redux
  const dispatch = useDispatch()
  //获取用户登录状态
  const { userInfo } = useSelector(state => {
    return {
      userInfo: state.user.userInfo
    }
  }, shallowEqual)
  //state
  //控制登录和退出登录的显示隐藏
  const [show, setShow] = useState(false)
  //ref
  const avatarRef = useRef()
  const loginBox = useRef()
  //functions
  //退出登录
  const logout = async () => {
    try {
      const { data } = await logoutAPI()
      if (data.code === 200) {
        //清除cookie
        clearItem('cookie')
        message.success('退出成功')
        //设置redux中登录状态为false
        dispatch(userLoginDispatch(false))
      }
    } catch (error) {
      message.error('退出失败')
    }
  }
  //展示用户详细信息
  const showUserInfo = e => {
    e.stopPropagation()
    setShow(true)
  }
  const hideInfo = () => {
    setShow(false)
  }
  //effect
  useEffect(() => {
    //点击window 隐藏个人信息
    window.addEventListener('click', hideInfo)
    return () => {
      window.removeEventListener('click', hideInfo)
    }
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
          <p onClick={() => logout()}>退出登录</p>
        </div>
      ) : null}
    </div>
  )
})
