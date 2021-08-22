import React, { memo, Suspense } from 'react'
import { renderRoutes } from 'react-router-config'
import { NavLink, useLocation } from 'react-router-dom'
import { Skeleton } from 'antd'
import './index.less'
export default memo(function MusicHall(props) {
  //判断当前是不是在搜索页面 如果是 隐藏首页二级菜单
  const location = useLocation()
  const path = location.pathname.split('/')
  const index = path.indexOf('search')
  const { route } = props
  //首页路由表
  const routes = [
    {
      path: '/musichall/home',
      title: '首页'
    },
    {
      path: '/musichall/singer',
      title: '歌手'
    },
    {
      path: '/musichall/disc',
      title: '新碟'
    },
    {
      path: '/musichall/rank',
      title: '排行榜'
    },
    {
      path: '/musichall/playlist',
      title: '分类歌单'
    },
    {
      path: '/musichall/dj',
      title: '电台'
    },
    {
      path: '/musichall/mv',
      title: 'MV'
    }
  ]
  return (
    <div className='musichall-container'>
      {index === -1 ? (
        <div className='musichall w-1200'>
          {routes.map((item, index) => {
            return (
              <NavLink
                to={item.path}
                key={index}
                activeClassName='active'
                exact
              >
                {item.title}
              </NavLink>
            )
          })}
        </div>
      ) : null}

      <Suspense
        fallback={
          <>
            <Skeleton active/>
            <Skeleton active/>
            <Skeleton active/>
            <Skeleton active/>
            <Skeleton active/>
            <Skeleton active/>
            <Skeleton active/>
          </>
        }
      >
        {/* 渲染路由 */}
        {renderRoutes(route.routes)}
      </Suspense>
    </div>
  )
})
