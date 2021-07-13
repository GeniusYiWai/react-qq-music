import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config'
import { NavLink } from 'react-router-dom'
import './index.css'
export default memo(function MusicHall(props) {
  const { route } = props
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
      <div className='musichall w-1200'>
        {routes.map((item, index) => {
          return (
            <NavLink to={item.path} key={index} activeClassName='active'>
              {item.title}
            </NavLink>
          )
        })}
      </div>
      {renderRoutes(route.routes)}
    </div>
  )
})
