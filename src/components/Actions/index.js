import React, { memo, useState, useCallback } from 'react'
import { Button } from 'antd'
import {
  PlayCircleOutlined,
  HeartOutlined,
  // ShareAltOutlined,
  // DownloadOutlined,
  HeartFilled,
  CommentOutlined
} from '@ant-design/icons'
import { message } from 'antd'
import { playPlaylist, playMusic, playRank } from '@/utils/player'
import { collectPlaylist, collectAlbum, collectMv } from '@/api/collect'

import './index.less'
export default memo(function Actions(props) {
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
    ScrollToTop // 播放mv时滚到到顶部 只有当页面是mv详情页面才会传过来
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
  //收藏当前页面的资源
  const collectResource = useCallback(async () => {
    //取反收藏按钮的状态
    setCollect && setCollect(!collect)
    switch (resourceType) {
      //收藏歌曲
      case 0:
        message.error('暂无该接口')
        break

      //收藏 统一需要id 和t
      //t为1收藏
      //t为2 取消收藏
      //收藏mv
      case 1:
        try {
          const type = !collect ? 1 : 2
          setLoading(true)
          const { data } = await collectMv(type, id)
          setLoading(false)
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
        } catch (error) {
          setLoading(false)
        }
        break
      default:
        break
    }
  }, [resourceType])
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
      <Button icon={<PlayCircleOutlined />} onClick={() => handlePlay()}>
        {setContenByType()}
      </Button>

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
      <Button icon={<CommentOutlined />} onClick={() => ScrollToComment()}>
        评论{totalNum}
      </Button>
      {/* <Button icon={<FolderAddOutlined />}></Button> */}
      {/* <Button icon={<ShareAltOutlined />}></Button> */}
      {/* <Button icon={<DownloadOutlined />}></Button> */}
    </div>
  )
})
