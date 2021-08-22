import React, { memo, useState } from 'react'
import { Button, Modal } from 'antd'
import {
  PlayCircleOutlined,
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  FormOutlined
} from '@ant-design/icons'
import { getItem } from '@/utils/storage'
import { message } from 'antd'
import { playPlaylist, playMusic, playRank } from '@/utils/player'
import { collectPlaylist, collectAlbum, collectMv } from '@/api/collect'
import { showLoginBoxDispatch } from '@/pages/LoginBox/store/actionCreators'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { getUserPlaylist, collectSongToPlaylist } from '@/actions/user'
import CreatePlaylist from 'components/Playlist/createPlaylist'
import PlaylistImg from '@/assets/img/playlist.jpg'
import './index.less'
//资源操作组件
export default memo(function Actions(props) {
  //props
  const {
    totalNum, //评论总数 每个详情页面都用
    resourceType, //资源类型 根据资源类型来调用不用的收藏接口
    id, //资源id  收藏接口必须
    collect, //是否收藏 目前只有歌单详情返回的数据有收藏字段 其他都没有 使用默认为false 可能为导致bug
    setCollect, //修改收藏状态
    ScrollToComment, //滚动到评论区域
    songDetail = {}, //歌曲详情 只有当页面是歌曲详情页面才会传过来 因为播放歌曲需要这个数据
    albumSongs = [], //专辑歌曲 只有当页面是专辑详情页面才会传过来 因为播放专辑下的所有歌曲这个数据
    playVideo, //播放mv 只有当页面是mv详情页面才会传过来 因为播放mv需要调用这个方法
    ScrollToTop, // 播放mv时滚到到顶部 只有当页面是mv详情页面才会传过来,
    playlistId //当前查看歌单id
  } = props
  //state
  //从缓存中获取当前登录用户的uid
  const uid = getItem('uid')
  //收藏按钮禁用状态
  const [loading, setLoading] = useState(false)
  //modal显示隐藏
  const [isModalVisible, setIsModalVisible] = useState(false)
  //创建歌单弹出层显示隐藏
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  //用户创建歌单
  const [userCreatePlaylists, setUserCreatePlaylists] = useState([])
  //获取用户创建歌单参数
  const [createPlcombineCondition] = useState({
    //id
    uid,
    //偏移量
    offset: 0,
    //每页数据条数
    limit: 100
  })
  //redux
  const dispatch = useDispatch()
  //获取用户登录状态
  const { isLogin } = useSelector(state => {
    return {
      isLogin: state.user.isLogin
    }
  }, shallowEqual)
  //functions

  //点击播放按钮触发事件
  const handlePlay = () => {
    //判断资源类型
    switch (resourceType) {
      //2 播放歌单下的所有歌曲
      case 2:
        playPlaylist(id)
        break
      //播放歌曲
      case 0:
        playMusic(songDetail.id, songDetail.name, songDetail.ar, songDetail.dt)
        break
      //3 播放专辑下的所有歌曲
      case 3:
        playRank(albumSongs)
        break
      //1 播放mv 页面滚动到顶部
      case 1:
        playVideo && playVideo()
        ScrollToTop && ScrollToTop()
        break
      default:
        break
    }
  }
  const getText = type => {
    message.success(type === 1 ? '收藏成功。' : '取消收藏成功。')
  }
  //获取用户创建歌单
  const handleCollectSongToPlaylist = () => {
    if (!isLogin) {
      dispatch(showLoginBoxDispatch(true))
      return
    }
    setIsModalVisible(true)
    getUserPlaylist(
      createPlcombineCondition,
      uid,
      null,
      setUserCreatePlaylists,
      'create'
    )
  }

  //点击收藏按钮触发事件
  const collectResource = async () => {
    //先判断用户有没有登录
    if (!isLogin) {
      dispatch(showLoginBoxDispatch(true))
      return
    }
    switch (resourceType) {
      //收藏 统一需要id 和t
      //t为1收藏
      //t为2 取消收藏
      //收藏mv
      case 1:
        try {
          const type = !collect ? 1 : 2
          setLoading(true)
          const { data } = await collectMv(type, id)
          if (data.code === 200) {
            setLoading(false)
            //取反收藏按钮的状态
            setCollect && setCollect(!collect)
            getText(type)
          }
        } catch (error) {
          setLoading(false)
        }
        break
      //收藏歌单
      case 2:
        try {
          const type = !collect ? 1 : 2
          setLoading(true)
          const { data } = await collectPlaylist(type, id)
          if (data.code === 200) {
            setLoading(false)
            //取反收藏按钮的状态
            setCollect && setCollect(!collect)
            getText(type)
          }
        } catch (error) {
          setLoading(false)
        }
        break
      //收藏专辑
      case 3:
        try {
          const type = !collect ? 1 : 2
          setLoading(true)
          const { data } = await collectAlbum(type, id)
          if (data.code === 200) {
            setLoading(false)
            //取反收藏按钮的状态
            setCollect && setCollect(!collect)
            getText(type)
          }
        } catch (error) {
          setLoading(false)
        }
        break
      default:
        break
    }
  }
  //根据不同的资源类型 展示不同的文字
  const setContenByType = () => {
    switch (resourceType) {
      case 2:
        return '播放全部'
      case 3:
        return '播放全部'
      case 1:
        return '播放'
      case 0:
        return '播放'
      default:
        return '播放'
    }
  }
  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleOk = () => {
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const handleCreateOk = () => {
    setIsCreateModalVisible(false)
  }
  const handleCreateCancel = () => {
    setIsCreateModalVisible(false)
  }
  return (
    <div className='actions-container'>
      <Modal
        title='创建歌单'
        visible={isCreateModalVisible}
        onOk={handleCreateOk}
        onCancel={handleCreateCancel}
        footer={[]}
      >
        <CreatePlaylist
          handleCreateOk={handleCreateOk}
          handleCreateCancel={handleCreateCancel}
          getUserCreatePlaylist={handleCollectSongToPlaylist}
        />
      </Modal>

      <Modal
        title='收藏到歌单'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
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

        {userCreatePlaylists.map(item => {
          return (
            <p
              className='user-create-playlist'
              key={item.id}
              onClick={() => {
                collectSongToPlaylist(item, id, setIsModalVisible)
              }}
            >
              <img src={PlaylistImg} alt="" />
              {item.name}
            </p>
          )
        })}
      </Modal>
      <Button icon={<PlayCircleOutlined />} onClick={() => handlePlay()}>
        {setContenByType()}
      </Button>
      {resourceType === 0 ? (
        <>
          <Button
            icon={<HeartOutlined />}
            className='collected'
            onClick={() => {
              handleCollectSongToPlaylist()
            }}
            loading={loading}
          >
            <span>添加到歌单</span>
          </Button>
        </>
      ) : (
        <div>
          {playlistId === uid ? null : (
            <div>
              {collect ? (
                <>
                  <Button
                    icon={<HeartFilled />}
                    className='collected'
                    onClick={() => collectResource()}
                    loading={loading}
                  >
                    <span>已收藏</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    icon={<HeartOutlined />}
                    onClick={() => collectResource()}
                    loading={loading}
                    className='unselected'
                  >
                    收藏
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      )}
      <Button icon={<CommentOutlined />} onClick={() => ScrollToComment()}>
        评论{totalNum}
      </Button>
      {/* <Button icon={<FolderAddOutlined />}></Button> */}
      {/* <Button icon={<ShareAltOutlined />}></Button> */}
      {/* <Button icon={<DownloadOutlined />}></Button> */}
    </div>
  )
})
