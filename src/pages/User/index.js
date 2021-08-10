import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  getUserInfo as getUserInfoAPI,
  getUserEvent as getUserEventAPI,
  getUserFollow as getUserFollowsAPI,
  getUserFan as getUserFansAPI,
  getCollectPlaylist as getUserCreatePlaylistAPI,
  getUserListenSongs as getUserListenSongsAPI
} from '@/api/profile'
import LazyLoadImg from 'components/Common/lazyloadImg'
import { WeiboCircleOutlined } from '@ant-design/icons'
import Empty from 'components/Common/empty'
import PlaylistCover from 'components/Playlist/playlistCover'
import ListenSongs from './cpn/listenSongsCover'
import './index.less'
//处理性别
const handleGender = gender => {
  return gender === 1 ? '男' : '女'
}
//处理微博
const getWeibo = bindings => {
  return bindings.filter(item => {
    return item.url !== ''
  })
}
export default memo(function User() {
  const params = useParams()
  //获取用户id
  const { id } = params
  //用户信息
  const [userInfo, setUserInfo] = useState({})
  //用户动态
  const [userEvents, setUserEvents] = useState([])
  //用户关注
  const [userFollows, setUserFollows] = useState([])
  //用户粉丝
  const [userFans, setUserFans] = useState([])
  //用户最近听歌
  const [userListenSongs, setUserListenSongs] = useState([])
  //用户创建歌单
  const [userCreatePlaylists, setUserCreatePlaylists] = useState([])
  //用户收藏歌单
  const [userCollectPlaylists, setUserCollectPlaylists] = useState([])
  //用户微博
  const [weibo, setWeibo] = useState('')
  //获取用户信息
  const getUserInfo = async () => {
    try {
      const { data } = await getUserInfoAPI(id)
      setUserInfo(data)
      setWeibo(getWeibo(data.bindings)[0].url)
    } catch (error) {}
  }
  //获取用户动态
  const getUserEvent = async () => {
    try {
      const {
        data: { events }
      } = await getUserEventAPI(id)

      setUserEvents(events)
    } catch (error) {}
  }
  //获取用户关注 关注没有返回总数 只能判断返回值的length
  const getUserFollows = async () => {
    try {
      const {
        data: { follow }
      } = await getUserFollowsAPI(id)

      setUserFollows(follow)
    } catch (error) {}
  }
  //获取用户粉丝总数
  const getUserFans = async () => {
    try {
      const {
        data: { size }
      } = await getUserFansAPI(id)
      setUserFans(size)
    } catch (error) {}
  }
  //获取用户最近常听
  const getUserListenSongs = async () => {
    try {
      const {
        data: { weekData }
      } = await getUserListenSongsAPI(id)
      setUserListenSongs(weekData)
    } catch (error) {}
  }
  //获取用户创建歌单
  const getUserCreatePlaylist = async () => {
    try {
      const {
        data: { playlist }
      } = await getUserCreatePlaylistAPI(id)
      const newArr = []
      //如果userId等于用户id 那就是用户创建的歌单
      playlist.forEach(e => {
        if (e.creator.userId == id) {
          newArr.push(e)
        }
      })
      setUserCreatePlaylists(newArr)
    } catch (error) {}
  }
  //获取用户收藏歌单
  const getUserCollectPlaylist = async () => {
    try {
      const {
        data: { playlist }
      } = await getUserCreatePlaylistAPI(id)
      const newArr = []
      //如果userId不等于用户id 那就是用户收藏的歌单
      playlist.forEach(e => {
        if (e.creator.userId !== id) {
          newArr.push(e)
        }
      })
      setUserCollectPlaylists(newArr)
    } catch (error) {}
  }
  useEffect(() => {
    getUserInfo()
    getUserEvent()
    getUserFollows()
    getUserFans()
    getUserCreatePlaylist()
    getUserCollectPlaylist()
    getUserListenSongs()
  }, [id])
  //跳转到微博
  const goToWeibo = () => {
    window.open(weibo)
  }
  return (
    <div className='user'>
      <div className='user-info-container'>
        <div className='user-info-wrapper'>
          <div className='user-avatar'>
            <div>
              <LazyLoadImg
                url={userInfo.profile && userInfo.profile.avatarUrl}
                width={200}
                height={200}
              />
            </div>
          </div>
          <div className='user-info'>
            <div className='user-info-top'>
              <h2>{userInfo.profile && userInfo.profile.nickname}</h2>
              <p>lv{userInfo.level}</p>
              <p>{handleGender(userInfo.profile && userInfo.profile.gender)}</p>
            </div>
            <div className='user-info-middle'>
              <div>
                <span>{userEvents.length}</span>
                <p>动态</p>
              </div>
              <div>
                <span>{userFollows.length}</span>
                <p>关注</p>
              </div>
              <div>
                <span>{userFans}</span>
                <p>粉丝</p>
              </div>
            </div>
            <div className='user-info-bottom'>
              <p>个人介绍: {userInfo.profile && userInfo.profile.signature}</p>

              <p>
                社交网络:
                <WeiboCircleOutlined
                  className='weibo'
                  onClick={() => goToWeibo()}
                />
              </p>
            </div>
          </div>
        </div>
        <div className='user-personal-info'>
          <div className='user-listern-songs-playlist-wrapper'>
            <h2>听歌排行</h2>
            {userListenSongs.length !== 0 ? (
              <ListenSongs listenSongs={userListenSongs} />
            ) : (
              <Empty text='这里空空如也' showBtn={false} />
            )}
          </div>
          <div className='user-create-playlist-wrapper'>
            <h2>{userInfo.profile && userInfo.profile.nickname}创建的歌单</h2>
            <div className='user-create-playlist'>
              {userCreatePlaylists.length !== 0 ? (
                userCreatePlaylists.map((item, index) => {
                  return <PlaylistCover playlist={item} key={index} />
                })
              ) : (
                <Empty text='这里空空如也' />
              )}
            </div>
          </div>
          <div className='user-collect-playlist-wrapper'>
            <h2>{userInfo.profile && userInfo.profile.nickname}收藏的歌单</h2>
            <div className='user-collect-container'>
              {userCollectPlaylists.length !== 0 ? (
                userCollectPlaylists.map((item, index) => {
                  return <PlaylistCover playlist={item} key={index} />
                })
              ) : (
                <Empty text='这里空空如也' />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
