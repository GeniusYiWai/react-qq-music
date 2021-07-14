import { Redirect } from 'react-router'
import Mine from '../pages/Mine'
import MusicHall from '../pages/MusicHall'
import Disc from '../pages/MusicHall/cpn/disc'
import Home from '../pages/MusicHall/cpn/home'
import Mv from '../pages/MusicHall/cpn/mv'
import Playlist from '../pages/MusicHall/cpn/playlist'
import Rank from '../pages/MusicHall/cpn/rank'
import Singer from '../pages/MusicHall/cpn/singer'
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
      return <Redirect to='/musichall/singer' />
    }
  },
  {
    path: '/musichall',
    component: MusicHall,
    routes: [
      {
        path: '/musichall/home',
        component: Home
      },
      {
        path: '/musichall/disc',
        component: Disc
      },
      {
        path: '/musichall/mv',
        component: Mv
      },
      {
        path: '/musichall/singer',
        component: Singer
      },
      {
        path: '/musichall/playlist',
        component: Playlist
      },
      {
        path: '/musichall/rank',
        component: Rank
      }
    ]
  },
  {
    path: '/mine',
    component: Mine
  }
]

export default routes
