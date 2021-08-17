import React, { memo, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {
  showLoginBoxDispatch,
  userLoginDispatch,
  setUserDispatch
} from '@/pages/LoginBox/store/actionCreators'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import Search from 'components/Search'
import Logout from '../logout'
import logo from '@/assets/img/logo.png'
import { getLoginStatus as getLoginStatusAPI } from '@/api/login'
import { message } from 'antd'
import './index.less'
//路由表
const routes = [
  {
    path: '/musichall',
    title: '音乐馆'
  },
  {
    path: '/profile',
    title: '我的音乐'
  },
  {
    path: 'https://y.qq.com/download/index.html',
    title: '客户端',
    link: true
  },
  {
    path: 'https://y.qq.com/artists',
    title: '开放平台',
    link: true
  },
  {
    path: 'https://y.qq.com/portal/vipportal/index.html',
    title: 'VIP',
    link: true
  }
]
//通用头部
export default memo(function Header() {
  const dispatch = useDispatch()
  //获取用户登录状态
  const { isLogin } = useSelector(state => {
    return {
      isLogin: state.user.isLogin
    }
  }, shallowEqual)
  //获取登录信息
  const getLoginStatus = async () => {
    try {
      const {
        data: {
          data: { profile }
        }
      } = await getLoginStatusAPI()
      if (profile) {
        //更改state中的用户登录状态
        dispatch(userLoginDispatch(true))
        //更改state中的用户信息
        dispatch(setUserDispatch(profile))
      }
    } catch (error) {}
  }
  //登录成功 将登录态存入缓存 修改state中的用户登录状态
  const getUserInfo = () => {
    getLoginStatus()
  }
  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <div className='header'>
      <div className='header-container w-1200'>
        <div className='header-left'>
          <img src={logo} alt='' className='logo' />
          {routes.map((item, index) => {
            return item.link ? (
              <a
                href={item.path}
                key={index}
                target='_blank'
                rel='noreferrer'
                className={`link ${index === 2 ? 'privilege' : ''}`}
              >
                {item.title}
              </a>
            ) : (
              <NavLink
                to={item.path}
                key={index}
                className='link'
                activeClassName='active'
              >
                {item.title}
              </NavLink>
            )
          })}
        </div>
        <div className='header-right'>
          <Search
            placeholder='请输入关键词'
            style={{ width: '170px' }}
            allowClear
          />
          {isLogin ? (
            <Logout />
          ) : (
            <input
              type='button'
              value='登录'
              className='login'
              onClick={() => {
                dispatch(showLoginBoxDispatch(true))
              }}
            />
          )}

          <div className='select-container'>
            <input type='button' value='开通VIP' className='vip' />
            <span className='icon white'></span>
          </div>
          <div className='select-container'>
            <input type='button' value='充值' className='recharge' />
            <span className='icon black'></span>
          </div>
        </div>
      </div>
    </div>
  )
})
