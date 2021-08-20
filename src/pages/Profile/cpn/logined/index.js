import React, { memo, useEffect, useState, useCallback } from 'react'
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
import { message } from 'antd'
import './index.less'
//一级菜单
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
  //props

  //userid 用户id
  //backgroundUrl 背景图
  //avatarUrl 头像
  //nickname 昵称
  //signature 个性签名
  const { userId, backgroundUrl, avatarUrl, nickname, signature } =
    props.userInfo
  //state
  //当前展示的一级菜单的索引
  const [currentIndex, setCurrentIndex] = useState(0)
  //用户创建的歌单
  const [userCreatePlaylist, setUserCreatePlaylist] = useState([])
  //用户粉丝列表
  const [userFan, setUserFan] = useState([])
  //用户最近常听
  const [userListenSongs, setUserListenSongs] = useState([])
  //获取用户收藏歌单查询条件
  const [collectPlcombineCondition, setCollectPlCombineCondition] = useState({
    //id
    uid: userId,
    //偏移量
    offset: 0,
    //每页数据条数
    limit: 100
  })
  //获取用户粉丝查询条件
  const [fansCombineCondition, setFansCombineCondition] = useState({
    uid: userId,
    //偏移量
    offset: 0,
    //每页数据条数
    limit: 100
  })
  //fucntions
  //切换当前一级分类
  const switchTabs = useCallback(index => {
    setCurrentIndex(index)
  }, [])
  //获取用户创建歌单
  const getUserCreatePlaylist = async collectPlcombineCondition => {
    try {
      const {
        data: { playlist, code }
      } = await getCollectPlaylistAPI({ ...collectPlcombineCondition })
      if (code === 200) {
        //如果userId不等于用户id 那就是用户收藏的歌单
        const newArr = playlist.filter(e => {
          return e.userId === userId
        })
        setUserCreatePlaylist(newArr)
      }
    } catch (error) {
      message.error('获取用户创建歌单失败!')
    }
  }
  //获取用户粉丝列表
  const getUserFan = async fansCombineCondition => {
    try {
      const {
        data: { followeds, code }
      } = await getUserFanAPI({ ...fansCombineCondition })
      if (code === 200) {
        setUserFan(followeds)
      }
    } catch (error) {
      message.error('获取用户粉丝列表失败!')
    }
  }
  //获取用户最近常听
  const getUserListenSongs = async () => {
    try {
      const {
        data: { weekData, code }
      } = await getUserListenSongsAPI(userId)
      if (code === 200) {
        setUserListenSongs(weekData)
      }
    } catch (error) {
      message.error('获取用户听歌排行失败!')
    }
  }
  useEffect(() => {
    //根据索引 展示不同的菜单
    switch (currentIndex) {
      //1 用户创建的歌单
      case 1:
        getUserCreatePlaylist(collectPlcombineCondition)
        break
      //用户的粉丝
      case 3:
        getUserFan(fansCombineCondition)
        break
      //用户最近常听
      case 4:
        getUserListenSongs()
        break
      default:
        break
    }
  }, [currentIndex])
  //查看用户详情
  const goToUserDetail = () => {
    window.open(`/#/profile/user/${userId}`)
  }
  return (
    <div>
      <div
        className='user-info-container'
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        <img src={avatarUrl} alt='' />
        <p>{nickname}</p>
        <span>{signature}</span>
        <button onClick={() => goToUserDetail()} className='showDetail'>
          前往用户主页
        </button>
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
