import React, { memo, useEffect, useState } from 'react'
import {
  getCollectPlaylist as getCollectPlaylistAPI,
  getUserFan as getUserFanAPI,
  getUserListenSongs as getUserListenSongsAPI
} from '@/api/profile'
import PlaylistCover from 'components/Playlist/playlistCover'
import SingerCover from 'components/Singer/singerCover'
import Category from 'components/Common/category'
import Collect from '../collect'
import Follow from '../follow'
import Empty from 'components/Common/empty'
import ListenSongs from '@/pages/User/cpn/listenSongsCover'
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
  },
  {
    categoryName: '听歌排行'
  }
]
export default memo(function CollectList(props) {
  //userid 用户id
  //backgroundUrl 背景图
  //avatarUrl 头像
  //nickname 昵称
  //signature 个性签名
  const { userId, backgroundUrl, avatarUrl, nickname, signature } =
    props.userInfo
  //当前展示的一级索引
  const [currentIndex, setCurrentIndex] = useState(0)
  //用户创建的歌单
  const [userCreatePlaylist, setUserCreatePlaylist] = useState([])
  //用户粉丝列表
  const [userFan, setUserFan] = useState([])
  //用户最近常听
  const [userListenSongs, setUserListenSongs] = useState([])
  //切换当前一级分类
  const switchTabs = index => {
    setCurrentIndex(index)
  }
  //获取用户创建歌单
  const getUserCreatePlaylist = async () => {
    try {
      const {
        data: { playlist }
      } = await getCollectPlaylistAPI(userId)
      const newArr = []
      playlist.forEach(e => {
        if (e.creator.userId == userId) {
          newArr.push(e)
        }
      })
      setUserCreatePlaylist(newArr)
    } catch (error) {}
  }
  //获取用户粉丝列表
  const getUserFan = async () => {
    try {
      const {
        data: { followeds }
      } = await getUserFanAPI(userId)
      setUserFan(followeds)
    } catch (error) {}
  }
  //获取用户最近常听
  const getUserListenSongs = async () => {
    try {
      const {
        data: { weekData }
      } = await getUserListenSongsAPI(userId)
      setUserListenSongs(weekData)
    } catch (error) {}
  }
  useEffect(() => {
    switch (currentIndex) {
      //1 用户创建的歌单
      case 1:
        getUserCreatePlaylist()
        break
      //用户的粉丝
      case 3:
        getUserFan()
        break
      //用户最近常听
      case 4:
        getUserListenSongs()
        break
      default:
        break
    }
  }, [currentIndex])
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
          {userCreatePlaylist.length !== 0 ? (
            userCreatePlaylist.map((item, index) => {
              return <PlaylistCover playlist={item} key={index} />
            })
          ) : (
            <Empty text='这里空空如也' />
          )}
        </div>
      ) : null}
      {currentIndex === 2 ? <Follow userId={userId} /> : null}
      {currentIndex === 3 ? (
        <div className='singer-result-container'>
          {userFan.length !== 0 ? (
            userFan.map((item, index) => {
              return <SingerCover singer={item} key={index} />
            })
          ) : (
            <Empty text='这里空空如也' />
          )}
        </div>
      ) : null}

      {currentIndex === 4 ? (
        <div className='user-listern-songs-playlist-wrapper'>
          {userListenSongs.length !== 0 ? (
            <ListenSongs listenSongs={userListenSongs} />
          ) : (
            <Empty text='这里空空如也' showBtn={false} />
          )}
        </div>
      ) : null}
    </div>
  )
})
