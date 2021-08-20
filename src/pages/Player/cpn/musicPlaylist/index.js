import React, { memo, useCallback, useState, useMemo } from 'react'
import { setItem, clearItem, getItem } from '@/utils/storage'
import './index.less'
import { debounce } from '@/utils/tools'
import { Modal, Tooltip } from 'antd'
import {
  DeleteOutlined,
  PlusOutlined,
  PlayCircleOutlined
} from '@ant-design/icons'
import { getCollectPlaylist as getUserCreatePlaylistAPI } from '@/api/profile'
import { CheckCanPlay as CheckCanPlayAPI } from '@/api/player'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { showLoginBoxDispatch } from '@/pages/LoginBox/store/actionCreators'
import { message } from 'antd'
import { collectSongToPlaylist as collectSongToPlaylistAPI } from '@/api/collect'
import Wave from '@/assets/img/wave.gif'
export default memo(function Playlist(props) {
  //从父元素中获取当前音乐是否正在播放和播放的音乐id  用于展示样式
  const {
    currentPlayMusicId,
    setCurrentPlayMusicId,
    isPlaying,
    playlist,
    setPlaylist,
    playLyricScroll
  } = props
  const dispatch = useDispatch()
  const uid = useMemo(() => getItem('uid'), [])
  //获取用户登录状态
  const { isLogin } = useSelector(state => {
    return {
      isLogin: state.user.isLogin
    }
  }, shallowEqual)
  const CheckCanPlay = async id => {
    try {
      const {
        data: { success }
      } = await CheckCanPlayAPI(id)
      if (success) {
        debounce(() => {
          setCurrentPlayMusicId(id)
          setItem('currentPlayMusicId', id)
        }, 200)()
      }
    } catch (error) {
      message.error('抱歉，这首歌曲暂时不能播放。')
    }
  }
  //点击播放列表中的歌曲 修改当前播放的音乐id 存入store中
  const changePlayMusicID = id => {
    CheckCanPlay(id)
    //这里对切换上一首或者下一首进行了防抖处理 防止用户快速切换歌曲 导致歌词组件无法及时清除上一个已经进行的歌词滚动 因为歌词滚动需要时间初始化 如果快速切换会导致清除函数无法及时生效 使得多个歌词滚动同时进行 歌词会来回跳跃
  }
  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = () => {
    if (playlist.length === 0) {
      return
    }
    setIsModalVisible(true)
  }
  const handleOk = () => {
    clearPlaylist()
    setIsModalVisible(false)
    playLyricScroll()
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const goToSingerDetail = (e, item) => {
    e.stopPropagation()
    window.open(`/#/profile/singer/${item.singerId}`)
  }
  const goToSongDetail = (e, item) => {
    e.stopPropagation()
    window.open(`/#/musichall/song/detail/${item.id}`)
  }
  //清空播放列表
  const clearPlaylist = useCallback(() => {
    clearItem('playlist')
    clearItem('currentPlayMusicId')
    setPlaylist([])
  }, [])
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

  const [isCollectModalVisible, setIsCollectModalVisible] = useState(false)

  const showCollectModal = () => {
    setIsCollectModalVisible(true)
  }

  const handleCollectOk = () => {
    setIsCollectModalVisible(false)
  }

  const handleCollectCancel = () => {
    setIsCollectModalVisible(false)
  }
  //用户创建歌单
  const [userCreatePlaylists, setUserCreatePlaylists] = useState([])
  //获取用户创建歌单参数
  const [createPlcombineCondition, setCreatePlCombineCondition] = useState({
    //id
    uid,
    //偏移量
    offset: 0,
    //每页数据条数
    limit: 15
  })
  //获取用户创建歌单
  const getUserCreatePlaylist = async createPlcombineCondition => {
    try {
      const {
        data: { playlist }
      } = await getUserCreatePlaylistAPI({ ...createPlcombineCondition })
      const newArr = []
      //如果userId等于用户id 那就是用户创建的歌单
      playlist.forEach(e => {
        if (e.userId == uid) {
          newArr.push(e)
        }
      })
      setUserCreatePlaylists(newArr)
    } catch (error) {
      message.error('获取用户歌单失败!')
    }
  }
  const [currentSelectMusicId, setCurrentSelectMusicId] = useState(null)
  const collectSong = (e, id) => {
    e.stopPropagation()
    if (!isLogin) {
      dispatch(showLoginBoxDispatch(true))
      return
    }
    setIsCollectModalVisible(true)
    setCurrentSelectMusicId(id)
    getUserCreatePlaylist(createPlcombineCondition)
  }

  const collectSongToPlaylist = async playlist => {
    try {
      const {
        data: {
          body: { code }
        }
      } = await collectSongToPlaylistAPI(playlist.id, currentSelectMusicId)
      if (code === 200) {
        message.success('添加成功')
        setIsCollectModalVisible(false)
      } else if (code === 502) {
        message.warning('歌单内歌曲重复')
      }
    } catch (error) {
      message.error('添加失败!')
    }
  }
  return (
    <div className='player-playlist-container'>
      <Modal
        title='收藏到歌单'
        visible={isCollectModalVisible}
        onOk={handleCollectOk}
        onCancel={handleCollectCancel}
        footer={[]}
      >
        {userCreatePlaylists.map(item => {
          return (
            <p
              className='user-create-playlist'
              onClick={() => {
                collectSongToPlaylist(item)
              }}
            >
              {item.name}
            </p>
          )
        })}
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
