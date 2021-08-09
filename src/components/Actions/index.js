import React, { memo, useState, useCallback } from 'react'
import { Button } from 'antd'
import {
  PlayCircleOutlined,
  HeartOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  HeartFilled,
  CommentOutlined
} from '@ant-design/icons'
import { message } from 'antd'
import { playPlaylist, playMusic, playRank } from '@/utils/player'
import { collectPlaylist, collectAlbum, collectMv } from '@/api/collect'

import './index.less'
export default memo(function Actions(props) {
  const {
    totalNum,
    resourceType,
    id,
    collect,
    setCollect,
    ScrollToComment,
    songDetail = {},
    albumSongs = [],
    playVideo,
    ScrollToTop
  } = props
  const [loading, setLoading] = useState(false)
  //播放歌单内的全部歌曲
  const handlePlay = () => {
    switch (resourceType) {
      case 2:
        playPlaylist(id)
        break
      case 0:
        playMusic(songDetail.id, songDetail.name, songDetail.ar, songDetail.dt)
        break
      case 3:
        playRank(albumSongs)
        break
      //收藏mv
      case 1:
        playVideo && playVideo()
        ScrollToTop && ScrollToTop()
        break
      default:
        break
    }
  }

  const collectResource = useCallback(async () => {
    setCollect && setCollect(!collect)
    switch (resourceType) {
      //收藏歌曲
      case 0:
        message.error('暂无该接口')
        break
      //收藏mv
      case 1:
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
  }, [props])
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
