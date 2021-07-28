import { lazy } from 'react'
import { Redirect } from 'react-router'
// import Mine from '../pages/Mine'
// import MusicHall from '../pages/MusicHall'
// import Disc from '../pages/MusicHall/cpn/disc'
// import Dj from '../pages/MusicHall/cpn/dj'
// import Home from '../pages/MusicHall/cpn/home'
// import Mv from '../pages/MusicHall/cpn/mv'
// import Playlist from '../pages/MusicHall/cpn/playlist'
// import Rank from '../pages/MusicHall/cpn/rank'
// import Singer from '../pages/MusicHall/cpn/singer'
// import Player from '../pages/Player'
const routes = [
  {
    path: '/',
    exact: true,
    render: () => {
      return <Redirect to='/musichall' />
    }
  },
  {
    path: '/musichall',
    exact: true,
    render: () => {
      return <Redirect to='/musichall/playlist' />
    }
  },
  {
    path: '/musichall',
    component: lazy(() => import('../pages/MusicHall')),
    routes: [
      {
        path: '/musichall/home',
        component: lazy(() => import('../pages/MusicHall/cpn/home'))
      },
      {
        path: '/musichall/disc',
        component: lazy(() => import('../pages/MusicHall/cpn/disc'))
      },
      {
        path: '/musichall/dj',
        component: lazy(() => import('../pages/MusicHall/cpn/dj'))
      },
      {
        path: '/musichall/mv',
        component: lazy(() => import('../pages/MusicHall/cpn/mv'))
      },
      {
        path: '/musichall/singer',
        component: lazy(() => import('../pages/MusicHall/cpn/singer'))
      },
      {
        path: '/musichall/playlist',
        component: lazy(() => import('../pages/MusicHall/cpn/playlist'))
      },
      
      {
        path: '/musichall/rank',
        component: lazy(() => import('../pages/MusicHall/cpn/rank'))
      }
    ]
  },
  {
    path: '/mine',
    component: lazy(() => import('../pages/Mine'))
  },
  {
    path: '/player',
    component: lazy(() => import('../pages/Player'))
  },
  {
    path: '/playlist/detail/:id',
    component: lazy(() => import('../pages/PlaylistDetail'))
  },
]

export default routes
