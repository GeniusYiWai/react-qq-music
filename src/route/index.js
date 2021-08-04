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
        path: '/musichall/playlist/detail/:id',
        exact: true,
        component: lazy(() => import('../pages/MusicHall/cpn/playlist-detail'))
      },
      {
        path: '/musichall/album/detail/:id',
        exact: true,
        component: lazy(() => import('../pages/MusicHall/cpn/album-detail'))
      },
      {
        path: '/musichall/mvdetail/:id',
        exact: true,
        component: lazy(() => import('../pages/MusicHall/cpn/mv-detail'))
      },
      {
        path: '/musichall/home',
        exact: true,

        component: lazy(() => import('../pages/MusicHall/cpn/home'))
      },
      {
        path: '/musichall/disc',
        exact: true,

        component: lazy(() => import('../pages/MusicHall/cpn/disc'))
      },
      {
        path: '/musichall/dj',
        exact: true,

        component: lazy(() => import('../pages/MusicHall/cpn/dj'))
      },
      {
        path: '/musichall/mv',
        exact: true,
        component: lazy(() => import('../pages/MusicHall/cpn/mv'))
      },
      {
        path: '/musichall/singer',
        exact: true,

        component: lazy(() => import('../pages/MusicHall/cpn/singer'))
      },
      {
        path: '/musichall/playlist',
        exact: true,
        component: lazy(() => import('../pages/MusicHall/cpn/playlist'))
      },

      {
        path: '/musichall/rank',
        exact: true,

        component: lazy(() => import('../pages/MusicHall/cpn/rank'))
      },
      {
        path: '/musichall/search',
        exact: true,
        component: lazy(() => import('../pages/MusicHall/cpn/search'))
      }
    ]
  },
  {
    path: '/mine',
    exact: true,
    component: lazy(() => import('../pages/Mine'))
  },
  {
    path: '/player',
    exact: true,
    component: lazy(() => import('../pages/Player'))
  }
]

export default routes
