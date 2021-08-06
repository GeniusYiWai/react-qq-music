import React, { memo, useEffect, useState, useCallback } from 'react'

import {
  getCollectPlaylist as getCollectPlaylistAPI,
  getUserFollow as getUserFollowAPI,
  getUserFan as getUserFanAPI
} from '@/api/mine'
import PlaylistCover from 'components/Playlist/playlistCover'
import SingerCover from 'components/Singer/singerCover'
import Category from 'components/Common/category'
import Collect from '../collect'
import './index.less'
const Tabs = [
  {
    categoryName: '我喜欢'
  },
  {
    categoryName: '我创建的歌单'
  },
  {
    categoryName: '关注'
  },
  {
    categoryName: '粉丝'
  }
]
export default memo(function CollectList(props) {
  const { userId, backgroundUrl, avatarUrl, nickname, signature } =
    props.userInfo
  //当前展示的一级索引
  const [currentIndex, setCurrentIndex] = useState(0)
  //用户创建的歌单
  const [userCreatePlaylist, setUserCreatePlaylist] = useState([])
  //用户关注列表
  const [userFollow, setUserFollow] = useState([])
  //用户粉丝列表
  const [userFan, setUserFan] = useState([])
  //切换当前一级分类
  const switchTabs = useCallback(index => {
    setCurrentIndex(index)
  }, [])
  //获取用户创建歌单
  const getUserCreatePlaylist = useCallback(() => {
    getCollectPlaylistAPI(userId).then(({ data: { playlist } }) => {
      const newArr = []
      playlist.forEach(e => {
        if (e.subscribed === false) {
          newArr.push(e)
        }
      })
      setUserCreatePlaylist(newArr)
    })
  }, [userId])
  //获取用户关注列表
  const getUserFollow = useCallback(() => {
    getUserFollowAPI(userId).then(({ data: { follow } }) => {
      setUserFollow(follow)
    })
  }, [userId])
  //获取用户粉丝列表
  const getUserFan = useCallback(() => {
    getUserFanAPI(userId).then(({ data: { followeds } }) => {
      setUserFan(followeds)
    })
  }, [userId])
  useEffect(() => {
    switch (currentIndex) {
      case 1:
        getUserCreatePlaylist()
        break
      case 2:
        getUserFollow()
        break
      case 3:
        getUserFan()
        break
      default:
        break
    }
  }, [currentIndex, getUserCreatePlaylist, getUserFollow, getUserFan])
  return (
    <div>
      <div
        className='user-info-container'
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        <img src={avatarUrl} alt='' />
        <p>{nickname}</p>
        <span>{signature}</span>
      </div>
      <Category
        Tabs={Tabs}
        switchTabs={switchTabs}
        currentIndex={currentIndex}
      />
      {currentIndex === 0 ? <Collect userId={userId} /> : null}
      {currentIndex === 1 ? (
        <div className='playlist-result-container'>
          {userCreatePlaylist.map((item, index) => {
            return <PlaylistCover playlist={item} key={index} />
          })}
        </div>
      ) : null}
      {currentIndex === 2 ? (
        <div className='singer-result-container'>
          {userFollow.map((item, index) => {
            return <SingerCover singer={item} key={index} />
          })}
        </div>
      ) : null}
      {currentIndex === 3 ? (
        <div className='singer-result-container'>
          {userFan.map((item, index) => {
            return <SingerCover singer={item} key={index} />
          })}
        </div>
      ) : null}
    </div>
  )
})
