import React, { memo, useCallback, useState } from 'react'
import { setItem, clearItem, getItem } from '@/utils/storage'
import { Modal, Tooltip, message } from 'antd'
import {
  DeleteOutlined,
  PlusOutlined,
  PlayCircleOutlined,
  FormOutlined
} from '@ant-design/icons'
import { CheckCanPlay as CheckCanPlayAPI } from '@/api/player'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { showLoginBoxDispatch } from '@/pages/LoginBox/store/actionCreators'
import { collectSongToPlaylist, getUserPlaylist } from '@/actions/user'
import CreatePlaylist from 'components/Playlist/createPlaylist'
import LazyLoadImg from 'components/Common/lazyloadImg'
import { Spin } from 'antd'
import Wave from '@/assets/img/wave.gif'
import './index.less'
export default memo(function Playlist(props) {
  //props
  // currentPlayMusicId, 当前播放的音乐id
  // setCurrentPlayMusicId, 修改当前播放音乐的id
  // isPlaying, 全局音乐播放状态
  // playlist, 播放列表
  // setPlaylist, 修改播放列表
  // playLyricScroll 滚动歌词
  const {
    currentPlayMusicId,
    setCurrentPlayMusicId,
    isPlaying,
    playlist,
    setPlaylist,

    setIsPlaying
  } = props
  ///redux
  const dispatch = useDispatch()
  const { isLogin, userInfo } = useSelector(state => {
    return {
      isLogin: state.user.isLogin,
      userInfo: state.user.userInfo
    }
  }, shallowEqual)
  //state
  //控制清空播放列表弹出层显示隐藏
  const [isModalVisible, setIsModalVisible] = useState(false)
  //控制删除歌曲到歌单弹出层显示隐藏
  const [isCollectModalVisible, setIsCollectModalVisible] = useState(false)
  //用户创建歌单查询条件
  const createPlcombineCondition = {
    //id
    uid: userInfo.userId,
    //偏移量
    offset: 0,
    //每页数据条数
    limit: 100
  }
  //用户创建歌单
  const [userCreatePlaylists, setUserCreatePlaylists] = useState([])
  //用户当前选中的要收藏的歌曲的id
  const [currentSelectMusicId, setCurrentSelectMusicId] = useState(null)
  //创建歌单弹出层显示隐藏
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [getCreatePlLoadng, setGetCreatePlLoadng] = useState(false)
  //检查歌曲是否可以播放
  const CheckCanPlay = async id => {
    try {
      const {
        data: { success }
      } = await CheckCanPlayAPI(id)
      if (success) {
        setIsPlaying(true)
        //可以播放 修改当前播放的音乐id
        setTimeout(() => {
          setCurrentPlayMusicId(id)
          setItem('currentPlayMusicId', id)
        }, 500)
      }
    } catch (error) {
      message.error('抱歉，这首歌曲暂时不能播放。')
    }
  }
  //点击播放列表中的歌曲 修改当前播放的音乐id
  const changePlayMusicID = id => {
    if (id === currentPlayMusicId) return
    CheckCanPlay(id)
  }
  //移除单首歌曲
  const handleDetele = useCallback(
    (e, id) => {
      e.stopPropagation()
      if (id === currentPlayMusicId) {
        message.warning('当前歌曲正在播放')
        return
      }
      let localPlyalist = getItem('playlist')
      const index = playlist.findIndex(item => item.id === id)
      localPlyalist.splice(index, 1)
      setPlaylist(localPlyalist)
      setItem('playlist', localPlyalist)
    },
    [playlist, currentPlayMusicId, setPlaylist]
  )

  const showCollectModal = () => {
    setIsCollectModalVisible(true)
  }

  const handleCollectOk = () => {
    setIsCollectModalVisible(false)
  }

  const handleCollectCancel = () => {
    setIsCollectModalVisible(false)
  }

  //获取用户创建歌单
  const getUserCreatePlaylist = () => {
    getUserPlaylist(
      createPlcombineCondition,
      userInfo.userId,
      setGetCreatePlLoadng,
      setUserCreatePlaylists,
      'create'
    )
  }
  //收藏歌曲
  const collectSong = (e, id) => {
    e.stopPropagation()
    //判断是否登录
    if (!isLogin) {
      dispatch(showLoginBoxDispatch(true))
      return
    }
    //展示弹出层
    setIsCollectModalVisible(true)
    //修改当前选中的要收藏音乐id
    setCurrentSelectMusicId(id)
    //获取用户创建歌单
    getUserCreatePlaylist(createPlcombineCondition)
  }
  //展示清空播放列表对话框
  const showModal = () => {
    if (playlist.length === 0) {
      return
    }
    setIsModalVisible(true)
  }
  //清空播放列表
  const clearPlaylist = () => {
    clearItem('playlist')
    clearItem('currentPlayMusicId')
    setPlaylist([])
  }
  //用户点击确定 清空播放列表
  const handleOk = () => {
    clearPlaylist()
    setIsModalVisible(false)
  }
  //点击取消 隐藏对话框
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  //查看歌手详情
  const goToSingerDetail = (e, item) => {
    e.stopPropagation()
    window.open(`/#/profile/singer/${item.singerId}`)
  }
  //查看歌曲详情
  const goToSongDetail = (e, item) => {
    e.stopPropagation()
    window.open(`/#/musichall/song/detail/${item.id}`)
  }
  const handleCreateOk = () => {
    setIsCreateModalVisible(false)
  }
  const handleCreateCancel = () => {
    setIsCreateModalVisible(false)
  }
  //获取用户创建歌单
  const handleCollectSongToPlaylist = () => {
    if (!isLogin) {
      dispatch(showLoginBoxDispatch(true))
      return
    }
    getUserPlaylist(
      createPlcombineCondition,
      userInfo.userId,
      setGetCreatePlLoadng,
      setUserCreatePlaylists,
      'create'
    )
  }
  return (
    <div className='player-playlist-container'>
      <Modal title='创建歌单' visible={isCreateModalVisible} footer={[]}>
        <CreatePlaylist
          handleCreateOk={handleCreateOk}
          handleCreateCancel={handleCreateCancel}
          getUserCreatePlaylist={handleCollectSongToPlaylist}
        />
      </Modal>

      <Modal
        title='收藏到歌单'
        visible={isCollectModalVisible}
        onOk={handleCollectOk}
        onCancel={handleCollectCancel}
        footer={[]}
      >
        <div
          className='create-new'
          onClick={() => {
            setIsCreateModalVisible(true)
          }}
        >
          <FormOutlined />
          创建新歌单
        </div>
        {getCreatePlLoadng ? (
          <div className='loading'>
            <Spin />
          </div>
        ) : (
          userCreatePlaylists.map(item => {
            return (
              <div
                className='user-create-playlist'
                onClick={() => {
                  collectSongToPlaylist(
                    item,
                    currentSelectMusicId,
                    setGetCreatePlLoadng
                  )
                }}
                key={item.id}
              >
                <LazyLoadImg url={item.coverImgUrl} width={50} height={50}/> 
                {item.name}
              </div>
            )
          })
        )}
      </Modal>

      <Modal
        title='清空播放列表'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText={'取消'}
        okText={'确定'}
      >
        <p>确定要清空列表？</p>
      </Modal>
      <div className='player-playlist-action'>
        {playlist.length === 0 ? null : (
          <div onClick={() => showModal()}>清空列表</div>
        )}
      </div>
      <div className='player-playlist-title'>
        <p> 歌曲</p>
        <p> 歌手</p>
        <p> 时长</p>
      </div>
      <div>
        {playlist &&
          playlist.map(item => {
            return (
              <div className='player-playlist-item' key={item.id}>
                <div className='song-name'>
                  <div className='name'>
                    <span
                      onClick={e => {
                        goToSongDetail(e, item)
                      }}
                    >
                      {item.name}
                    </span>

                    <p>
                      <span>
                        <Tooltip title={'播放'} color={'#31c27c'}>
                          <PlayCircleOutlined
                            onClick={() => {
                              changePlayMusicID(item.id)
                            }}
                          />
                        </Tooltip>
                      </span>

                      <span
                        onClick={e => {
                          handleDetele(e, item.id)
                        }}
                      >
                        <Tooltip title={'删除'} color={'#31c27c'}>
                          <DeleteOutlined />
                        </Tooltip>
                      </span>
                      <span
                        onClick={e => {
                          collectSong(e, item.id)
                        }}
                      >
                        <Tooltip title={'收藏'} color={'#31c27c'}>
                          <PlusOutlined />
                        </Tooltip>
                      </span>
                      <span></span>
                    </p>
                  </div>
                </div>

                <div
                  className='text-nowrap'
                  onClick={e => {
                    goToSingerDetail(e, item)
                  }}
                >
                  {item.artists}
                </div>
                <div>
                  {item.duration}
                  <span
                    className={`wave-container ${
                      //id等于当前播放的音乐id 并且音乐在播放 才会显示这个动图
                      item.id === currentPlayMusicId && isPlaying
                        ? 'isPlaying'
                        : ''
                    }`}
                    style={{ backgroundImage: `url(${Wave})` }}
                  ></span>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
})
