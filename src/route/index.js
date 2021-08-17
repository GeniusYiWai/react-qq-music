import { lazy } from 'react'
import { Redirect } from 'react-router'
const routes = [
  // / 重定向到音乐馆
  {
    path: '/',
    exact: true,
    render: () => {
      return <Redirect to='/musichall' />
    }
  },
  //音乐馆重定向到首页
  {
    path: '/musichall',
    exact: true,
    render: () => {
      return <Redirect to='/musichall/home' />
    }
  },
  {
    path: '/musichall',
    component: lazy(() => import('../pages/MusicHall')),
    routes: [
      //歌曲详情
      {
        path: '/musichall/song/detail/:id',
        exact: true,
        component: lazy(() => import('../pages/MusicHall/cpn/songDetail'))
      },
      //专辑详情
      {
        path: '/musichall/album/detail/:id',
        exact: true,
        component: lazy(() => import('../pages/MusicHall/cpn/albumDetail'))
      },
      //主页
      {
        path: '/musichall/home',
        exact: true,
        component: lazy(() => import('../pages/MusicHall/cpn/home'))
      },
      //新碟
      {
        path: '/musichall/disc',
        exact: true,
        component: lazy(() => import('../pages/MusicHall/cpn/disc'))
      },
      //电台
      {
        path: '/musichall/dj',
        exact: true,
        component: lazy(() => import('../pages/MusicHall/cpn/dj'))
      },
      //mv详情
      {
        path: '/musichall/mv/detail/:id',
        exact: true,
        component: lazy(() => import('../pages/MusicHall/cpn/mvDetail'))
      },
      //video详情
      {
        path: '/musichall/video/detail/:id',
        exact: true,
        component: lazy(() => import('../pages/MusicHall/cpn/videoDetail'))
      },
      //mv
      {
        path: '/musichall/mv',
        exact: true,
        component: lazy(() => import('../pages/MusicHall/cpn/mv'))
      },
      //歌手
      {
        path: '/musichall/singer',
        exact: true,
        component: lazy(() => import('../pages/MusicHall/cpn/singer'))
      },
      //歌单
      {
        path: '/musichall/playlist',
        exact: true,
        component: lazy(() => import('../pages/MusicHall/cpn/playlist'))
      },
      //歌单详情
      {
        path: '/musichall/playlist/detail/:id',
        exact: true,
        component: lazy(() => import('../pages/MusicHall/cpn/playlistDetail'))
      },
      //排行榜
      {
        path: '/musichall/rank',
        exact: true,
        component: lazy(() => import('../pages/MusicHall/cpn/rank'))
      },
      //搜索
      {
        path: '/musichall/search',
        exact: true,
        component: lazy(() => import('../pages/MusicHall/cpn/search'))
      },
      // 404
      {
        path: '*',
        exact: true,
        component: lazy(() => import('components/Common/notFound'))
      }
    ]
  },
  //我的音乐
  {
    path: '/profile',
    exact: true,
    component: lazy(() => import('../pages/Profile'))
  },
  //歌手详情
  {
    path: '/profile/singer/:id',
    exact: true,
    component: lazy(() => import('../pages/Singer'))
  },
  //用户详情
  {
    path: '/profile/user/:id',
    exact: true,
    component: lazy(() => import('../pages/User'))
  },
  //播放器
  {
    path: '/player',
    exact: true,
    component: lazy(() => import('../pages/Player'))
  },
  // 404
  {
    path: '*',
    exact: true,
    component: lazy(() => import('components/Common/notFound'))
  }
]

export default routes
