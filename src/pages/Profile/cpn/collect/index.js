import React, { memo, useEffect, useState, useCallback } from 'react'
import {
  getCollectSongs as getCollectSongsAPI,
  getCollectPlaylist as getCollectPlaylistAPI,
  getCollectMv as getCollectMvAPI,
  getCollectAlbum as getCollectAlbumAPI
} from '@/api/profile'
import { getMusicById } from '@/api/player'
import PlaylistCover from 'components/Playlist/playlistCover'
import AlbumCover from 'components/Album/newAlbumCover'
import SongCover from 'components/Album/albumDetailCover'
import MvCover from 'components/Mv/mvCover'
import Category from 'components/Common/category'
import Empty from 'components/Common/empty'
import { message } from 'antd'
import { getUserPlaylist } from '@/utils/actions'

import './index.less'
//二级分类
const Tabs = [
  {
    categoryName: '歌曲'
  },
  {
    categoryName: '歌单'
  },
  {
    categoryName: '专辑'
  },
  {
    categoryName: '视频'
  }
]
export default memo(function Collect(props) {
  //获取当前登录用户的id
  const { userId } = props
  //state
  //当前二级分类的索引
  const [currentIndex, setCurrentIndex] = useState(0)
  //用户喜欢的歌曲
  const [likeSongs, setlikeSongs] = useState([])
  //用户喜欢的歌单
  const [likePlaylists, setlikePlaylists] = useState([])
  //用户喜欢的专辑
  const [likeAlbums, setlikeAlbums] = useState([])
  //用户喜欢的mv
  const [likeMvs, setlikeMvs] = useState([])
  //用户收藏歌单查询条件
  const [collectPlcombineCondition, setCollectPlCombineCondition] = useState({
    //id
    uid: userId,
    //偏移量
    offset: 0,
    //每页数据条数
    limit: 100
  })
  //fucntions
  //切换当前二级分类
  const switchTabs = useCallback(index => {
    setCurrentIndex(index)
  }, [])
  //获取用户收藏歌曲
  const getCollectSongs = async () => {
    try {
      const {
        data: { ids, code }
      } = await getCollectSongsAPI(userId)
      if (code === 200) {
        const {
          data: { songs, code }
        } = await getMusicById(ids)
        if (code === 200) {
          setlikeSongs(songs)
        }
      }
    } catch (error) {
      message.error('获取用户收藏歌曲失败!')
    }
  }

  //获取用户收藏歌单
  const getCollectPlaylist = () => {
    getUserPlaylist(
      collectPlcombineCondition,
      userId,
      null,
      setlikePlaylists,
      'collect'
    )
  }
  //获取用户收藏专辑
  const getCollectAlbum = async () => {
    try {
      const {
        data: { data, code }
      } = await getCollectAlbumAPI(userId)
      if (code === 200) {
        setlikeAlbums(data)
      }
    } catch (error) {
      message.error('获取用户收藏专辑失败!')
    }
  }
  //获取用户收藏mv
  const getCollectMv = async () => {
    try {
      const {
        data: { data, code }
      } = await getCollectMvAPI(userId)
      if (code === 200) {
        setlikeMvs(data)
      }
    } catch (error) {
      message.error('获取用户收藏视频失败!')
    }
  }
  useEffect(() => {
    //根据索引 展示不同的内容
    switch (currentIndex) {
      case 0:
        getCollectSongs()
        break
      case 1:
        getCollectPlaylist(collectPlcombineCondition)
        break
      case 2:
        getCollectAlbum()
        break
      case 3:
        getCollectMv()
        break
      default:
        break
    }
  }, [currentIndex])
  return (
    <div>
      <Category
        Tabs={Tabs}
        switchTabs={switchTabs}
        currentIndex={currentIndex}
      />
      {currentIndex === 0 ? (
        <div className='w-1200'>
          {likeSongs.length !== 0 ? <SongCover song={likeSongs} /> : <Empty />}
        </div>
      ) : null}
      {currentIndex === 1 ? (
        <div className='playlist-result-container'>
          {likePlaylists.length !== 0 ? (
            likePlaylists.map((item, index) => {
              return <PlaylistCover playlist={item} key={index} />
            })
          ) : (
            <Empty />
          )}
        </div>
      ) : null}
      {currentIndex === 2 ? (
        <div className='mv-result-container'>
          {likeAlbums.length !== 0 ? (
            likeAlbums.map((item, index) => {
              return <AlbumCover album={item} key={index} />
            })
          ) : (
            <Empty />
          )}
        </div>
      ) : null}
      {currentIndex === 3 ? (
        <div className='mv-result-container'>
          {likeMvs.length !== 0 ? (
            likeMvs.map((item, index) => {
              return <MvCover mv={item} key={index} />
            })
          ) : (
            <Empty />
          )}
        </div>
      ) : null}
    </div>
  )
})
