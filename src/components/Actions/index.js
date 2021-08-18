import React, { memo, useState, useCallback, useMemo } from 'react'
import { Button, Modal } from 'antd'
import {
  PlayCircleOutlined,
  HeartOutlined,
  // ShareAltOutlined,
  // DownloadOutlined,
  HeartFilled,
  CommentOutlined
} from '@ant-design/icons'
import { getItem } from '@/utils/storage'
import { message } from 'antd'
import { playPlaylist, playMusic, playRank } from '@/utils/player'
import {
  collectPlaylist,
  collectAlbum,
  collectMv,
  collectSongToPlaylist as collectSongToPlaylistAPI
} from '@/api/collect'
import { getCollectPlaylist as getUserCreatePlaylistAPI } from '@/api/profile'
import './index.less'
export default memo(function Actions(props) {
  const uid = useMemo(() => getItem('uid'), [])
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
    playlistId
  } = props

  //收藏按钮禁用状态
  const [loading, setLoading] = useState(false)
  //播放

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
      //收藏mv
      //1 播放mv 页面滚动到顶部
      case 1:
        playVideo && playVideo()
        ScrollToTop && ScrollToTop()
        break
      default:
        break
    }
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
  const collectSongToPlaylist = async playlist => {
    console.log(playlist)
    const op = !collect ? 'add' : 'del'
    try {
      const {
        data: {
          body: { code }
        }
      } = await collectSongToPlaylistAPI(playlist.id, id, op)
      if (code === 200) {
        message.success(!collect ? '添加成功' : '取消成功')
        setIsModalVisible(false)
      } else if (code === 502) {
        message.warning('歌单内歌曲重复')
      }
    } catch (error) {
      message.error('添加失败!')
    }
  }
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  //收藏当前页面的资源
  const collectResource = async () => {
    switch (resourceType) {
      //收藏歌曲
      case 0:
        setIsModalVisible(true)
        getUserCreatePlaylist(createPlcombineCondition)
        break
      //收藏 统一需要id 和t
      //t为1收藏
      //t为2 取消收藏
      //收藏mv
      case 1:
        try {
          const type = !collect ? 1 : 2
          setLoading(true)
          console.log(type)
          const { data } = await collectMv(type, id)
          setLoading(false)
          //取反收藏按钮的状态
          setCollect && setCollect(!collect)
          message.success(data.message)
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
          setLoading(false)
          //取反收藏按钮的状态
          setCollect && setCollect(!collect)
          message.success(data.message)
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
          setLoading(false)
          //取反收藏按钮的状态
          setCollect && setCollect(!collect)
          message.success(data.message)
        } catch (error) {
          setLoading(false)
        }
        break
      default:
        break
    }
  }
  const setContenByType = useCallback(() => {
    switch (resourceType) {
      case 2:
        return '播放全部'
        break
      case 3:
        return '播放全部'
        break
      case 1:
        return '播放'
        break
      case 0:
        return '播放'
        break
      default:
        return '播放'
        break
    }
  }, [resourceType])
  return (
    <div className='actions-container'>
      <Modal
        title='收藏到歌单'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
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
      <Button icon={<PlayCircleOutlined />} onClick={() => handlePlay()}>
        {setContenByType()}
      </Button>

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

      <Button icon={<CommentOutlined />} onClick={() => ScrollToComment()}>
        评论{totalNum}
      </Button>
      {/* <Button icon={<FolderAddOutlined />}></Button> */}
      {/* <Button icon={<ShareAltOutlined />}></Button> */}
      {/* <Button icon={<DownloadOutlined />}></Button> */}
    </div>
  )
})
