import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { Tabs, Input, message } from 'antd'
// import LoginByPhone from '../login-phone'
// import LoginByEmail from '../login-email'
// import LoginByQRCode from '../login-qrcode'
import {
  showLoginBoxDispatch,
  userLoginDispatch
} from '@/pages/Mine/store/actionCreators'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/api/login'
import { setItem } from '@/utils/storage'
import './index.less'
import logo from '@/assets/img/logo.png'

// antd
const { Search } = Input
const { TabPane } = Tabs
//路由表
const routes = [
  {
    path: '/musichall',
    title: '音乐馆'
  },
  {
    path: '/mine',
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
  })
  const handleLogout = () => {
    logout().then(({ data }) => {
      if (data.code === 200) {
        message.success('退出成功')
        dispatch(userLoginDispatch(false))
        setItem('login', false)
      } else {
        message.error('退出失败')
      }
    })
  }
  //控制弹出层显示隐藏
  // const [visible, setVisible] = useState(false)
  //显示弹出层
  // const showModal = () => {
  //   setVisible(true)
  // }
  // const handleCancel = () => {
  //   setVisible(false)
  // }

  return (
    <div className='header'>
      {/* <Modal visible={visible} footer={null} onCancel={handleCancel}>
        <Tabs defaultActiveKey='1' centered>
          <TabPane tab='手机号登录' key='1'>
            <LoginByPhone setVisible={setVisible} />
          </TabPane>
          <TabPane tab='邮箱登录' key='2'>
            <LoginByEmail setVisible={setVisible} />
          </TabPane>
          <TabPane tab='二维码登录' key='3'>
            <LoginByQRCode setVisible={setVisible} />
          </TabPane>
        </Tabs>
      </Modal> */}
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
            <input
              type='button'
              value='退出登录'
              className='login'
              onClick={() => {
                handleLogout()
              }}
            />
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
