import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Drawer, message } from 'antd'
import SingerCover from 'components/Singer/singerCover'
import {
  getUserInfo as getUserInfoAPI,
  getUserEvent as getUserEventAPI,
  getUserFan as getUserFansAPI,
  getUserListenSongs as getUserListenSongsAPI
} from '@/api/profile'
import LazyLoadImg from 'components/Common/lazyloadImg'
import Empty from 'components/Common/empty'
import PlaylistCover from 'components/Playlist/playlistCover'
import ListenSongs from './cpn/listenSongsCover'
import PlaylistSkeleton from 'components/Skeleton/playlistSkeleton'
import SingerSkeleton from 'components/Skeleton/singerSkeleton'
import Pagination from 'components/Common/pagination'
import {
  getUserPlaylist,
  getUserFollows,
  getUserListenSongs
} from '@/utils/actions'
import './index.less'
//处理性别
const handleGender = gender => {
  switch (gender) {
    case 1:
      return '男'
    case 0:
      return '女'
    default:
      return '保密'
  }
}
export default memo(function User() {
  //路由参数
  const params = useParams()
  //获取用户id
  const { id } = params
  //state
  //用户信息
  const [userInfo, setUserInfo] = useState({})
  //用户动态
  const [userEvents, setUserEvents] = useState([])
  //用户关注
  const [userFollows, setUserFollows] = useState([])
  //用户粉丝
  const [userFans, setUserFans] = useState([])
  //用户粉丝总数
  const [userFansSize, setUserFansSize] = useState(0)
  //用户最近听歌
  const [userListenSongs, setUserListenSongs] = useState([])
  //用户创建歌单
  const [userCreatePlaylists, setUserCreatePlaylists] = useState([])
  //用户收藏歌单
  const [userCollectPlaylists, setUserCollectPlaylists] = useState([])
  //每页大小
  const [fansLimit, setFansLimit] = useState(10)
  const [fansOffset, setFansOffset] = useState(0)
  //是否正在加载新数据
  const [fansLoading, setFansLoading] = useState(true)
  //用户创建歌单页码
  const [currentFansPage, setCurrentFansPage] = useState(1)
  //混合查询条件 因为可以多个参数一起查询
  const [fansCombineCondition, setFansCombineCondition] = useState({
    uid: id,
    //偏移量
    offset: fansOffset,
    //每页数据条数
    limit: fansLimit
  })
  //控制用户粉丝列表显示和隐藏
  const [fansVisible, setFansVisible] = useState(false)
  //控制用户关注列表显示和隐藏
  const [followsVisible, setFollowsVisible] = useState(false)
  const [disabled, setDisabled] = useState(false)

  //用户创建歌单
  const [createPlTotal, setCreatePlTotal] = useState(200)
  //是否正在加载用户创建歌单
  const [createPlLoading, setCreatePlLoading] = useState(true)
  //获取用户创建歌单参数
  const [createPlcombineCondition, setCreatePlCombineCondition] = useState({
    //id
    uid: id,
    //偏移量
    offset: 0,
    //每页数据条数
    limit: 15
  })
  //用户创建歌单页码
  const [currentCreatePlPage, setCurrentCreatePlPage] = useState(1)
  //用户收藏歌单
  const [collectPlTotal, setCollectPlTotal] = useState(500)
  //是否正在加载用户收藏歌单
  const [collectPlLoading, setCollectPlLoading] = useState(true)
  //获取用户收藏歌单参数
  const [collectPlcombineCondition, setCollectPlCombineCondition] = useState({
    //id
    uid: id,
    //偏移量
    offset: 0,
    //每页数据条数
    limit: 100
  })
  //用户收藏歌单页码
  const [currentCollectPlPage, setCurrentCollectPlPage] = useState(1)
  //fucntions
  //展示用户关注列表
  const showFollows = () => {
    setFollowsVisible(true)
  }
  //隐藏用户关注列表
  const onFollowsClose = () => {
    setFollowsVisible(false)
  }
  //展示用户粉丝列表

  const showFans = () => {
    setFansVisible(true)
  }
  //隐藏用户粉丝列表
  const onFansClose = () => {
    setFansVisible(false)
  }
  //获取用户信息
  const getUserInfo = async () => {
    try {
      const { data } = await getUserInfoAPI(id)
      if (data.code === 200) {
        setUserInfo(data)
      } else {
        throw new Error()
      }
    } catch (error) {
      message.error('用户不存在!')
      setDisabled(true)
    }
  }
  //获取用户动态
  const getUserEvent = async () => {
    try {
      const {
        data: { events, code }
      } = await getUserEventAPI(id)
      if (code === 200) {
        setUserEvents(events)
      } else {
        throw new Error()
      }
    } catch (error) {
      message.error('获取用户动态失败！')
    }
  }

  //获取用户粉丝总数
  const getUserFans = async fansCombineCondition => {
    setFansLoading(true)
    try {
      const {
        data: { followeds, size }
      } = await getUserFansAPI({ ...fansCombineCondition })
      setUserFansSize(size)
      setUserFans(userFans => {
        //开锁
        setFansLoading(false)
        //将新数据与旧数据合并
        return userFans.concat(followeds)
      })
      //设置偏移量
      setFansOffset(fansOffset + fansLimit)
    } catch (error) {
      message.error('获取用户粉丝列表失败')
      //如果请求出错 关锁
      setFansLoading(false)
    }
  }
  //获取用户创建歌单
  const getUserCreatePlaylist = () => {
    getUserPlaylist(
      createPlcombineCondition,
      id,
      setCreatePlLoading,
      setUserCreatePlaylists,
      'create'
    )
  }
  //获取用户收藏歌单
  const getUserCollectPlaylist = () => {
    getUserPlaylist(
      collectPlcombineCondition,
      id,
      setCollectPlLoading,
      setUserCollectPlaylists,
      'collect'
    )
  }

  useEffect(() => {
    //获取用户信息
    getUserInfo()
    //获取用户动态
    getUserEvent()
    //获取用户关注
    getUserFollows(id, setUserFollows)
    //获取用户粉丝
    getUserListenSongs(id, setUserListenSongs)
  }, [])
  //监听 用户创建歌单页码改变 一旦发生变化就重新加载歌单数据
  useEffect(() => {
    getUserCreatePlaylist(createPlcombineCondition)
  }, [createPlcombineCondition])
  //监听 用户收藏歌单页码改变 一旦发生变化就重新加载歌单数据
  useEffect(() => {
    getUserCollectPlaylist(collectPlcombineCondition)
  }, [collectPlcombineCondition])
  //监听 用户粉丝页码改变 一旦发生变化就重新加载歌单数据
  useEffect(() => {
    getUserFans(fansCombineCondition)
  }, [fansCombineCondition])
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
              <p className='lv'>lv{userInfo.level}</p>
              <p>{handleGender(userInfo.profile && userInfo.profile.gender)}</p>
            </div>
            <div className='user-info-middle'>
              <div>
                <span
                  onClick={() => {
                    message.warning('没做')
                  }}
                >
                  {userEvents.length}
                </span>
                <p>动态</p>
              </div>
              <div onClick={() => showFollows()}>
                <span>{userFollows.length}</span>
                <p>关注</p>
              </div>
              <div onClick={() => showFans()}>
                <span>{userFansSize}</span>
                <p>粉丝</p>
              </div>
            </div>
            <div className='user-info-bottom'>
              <p>个人介绍: {userInfo.profile && userInfo.profile.signature}</p>
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
            {createPlLoading ? <PlaylistSkeleton /> : null}
            <div className='user-create-playlist'>
              {userCreatePlaylists.length !== 0
                ? userCreatePlaylists.map((item, index) => {
                    return <PlaylistCover playlist={item} key={index} />
                  })
                : null}
              {!createPlLoading && userCreatePlaylists.length === 0 ? (
                <Empty text='这里空空如也' />
              ) : null}
              <Pagination
                setCombineCondition={setCreatePlCombineCondition}
                total={createPlTotal}
                limit={15}
                currentPage={currentCreatePlPage}
                setCurrentPage={setCurrentCreatePlPage}
                setData={setUserCreatePlaylists}
                showSizeChanger={false}
                disabled={disabled}
              />
            </div>
          </div>
          <div className='user-collect-playlist-wrapper'>
            <h2>{userInfo.profile && userInfo.profile.nickname}收藏的歌单</h2>
            {collectPlLoading ? <PlaylistSkeleton /> : null}
            <div className='user-collect-container'>
              {userCollectPlaylists.length !== 0
                ? userCollectPlaylists.map((item, index) => {
                    return <PlaylistCover playlist={item} key={index} />
                  })
                : null}
              {!collectPlLoading && userCollectPlaylists.length === 0 ? (
                <Empty text='这里空空如也' />
              ) : null}
              <Pagination
                setCombineCondition={setCollectPlCombineCondition}
                total={collectPlTotal}
                limit={100}
                currentPage={currentCollectPlPage}
                setCurrentPage={setCurrentCollectPlPage}
                setData={setUserCollectPlaylists}
                showSizeChanger={false}
                disabled={disabled}
              />
            </div>
          </div>
        </div>
        <Drawer
          title='关注列表'
          placement={'bottom'}
          closable={false}
          onClose={() => onFollowsClose()}
          visible={followsVisible}
          key={'follow'}
          height='70%'
          getContainer={false}
          forceRender={true}
        >
          <div className='follow-list'>
            {userFollows.length !== 0 ? (
              userFollows.map((item, index) => {
                return <SingerCover singer={item} key={index} useLazy={false} />
              })
            ) : (
              <Empty text='这里空空如也' showBtn={false} />
            )}
          </div>
        </Drawer>
        <Drawer
          title='粉丝列表'
          placement={'bottom'}
          closable={false}
          onClose={() => onFansClose()}
          visible={fansVisible}
          key={'fan'}
          height='80%'
          getContainer={false}
          forceRender={true}
        >
          <div className='fan-list'>
            {fansLoading ? <SingerSkeleton /> : null}
            {userFans.length !== 0 ? (
              userFans.map((item, index) => {
                return <SingerCover singer={item} key={index} useLazy={false} />
              })
            ) : (
              <Empty text='这里空空如也' showBtn={false} />
            )}
            <Pagination
              setCombineCondition={setFansCombineCondition}
              total={userFansSize}
              limit={10}
              currentPage={currentFansPage}
              setCurrentPage={setCurrentFansPage}
              setData={setUserFans}
              showSizeChanger={false}
              disabled={disabled}
            />
          </div>
        </Drawer>
      </div>
    </div>
  )
})
