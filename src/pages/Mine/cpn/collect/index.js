import React, { memo, useEffect, useState, useCallback } from 'react'
import {
  getCollectSongs as getCollectSongsAPI,
  getCollectPlaylist as getCollectPlaylistAPI,
  getCollectMv as getCollectMvAPI,
  getCollectAlbum as getCollectAlbumAPI
} from '@/api/mine'
import { getMusicById } from '@/api/player'
import PlaylistCover from 'components/Playlist/playlistCover'
import AlbumCover from 'components/Album/newAlbumCover'
import SongCover from 'components/Album/albumDetailCover'
import MvCover from 'components/Mv/mvCover'
import Category from 'components/Common/category'

import './index.less'
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
  //当前二级分类的索引
  const [currentIndex, setCurrentIndex] = useState(0)
  //切换当前二级分类
  const switchTabs = useCallback(index => {
    setCurrentIndex(index)
  }, [])
  //用户喜欢的歌曲
  const [likeSongs, setlikeSongs] = useState([])
  //用户喜欢的歌单
  const [likePlaylists, setlikePlaylists] = useState([])
  //用户喜欢的专辑
  const [likeAlbums, setlikeAlbums] = useState([])
  //用户喜欢的mv
  const [likeMvs, setlikeMvs] = useState([])
  //获取用户收藏歌曲
  const getCollectSongs = useCallback(() => {
    getCollectSongsAPI(userId).then(({ data: { ids } }) => {
      getMusicById(ids).then(({ data: { songs } }) => {
        setlikeSongs(songs)
      })
    })
  }, [userId])
  //获取用户收藏歌单
  const getCollectPlaylist = useCallback(() => {
    getCollectPlaylistAPI(userId).then(({ data: { playlist } }) => {
      const newArr = []
      playlist.forEach(e => {
        if (e.subscribed === true) {
          newArr.push(e)
        }
      })
      setlikePlaylists(newArr)
    })
  }, [userId])
  //获取用户收藏专辑
  const getCollectAlbum = useCallback(() => {
    getCollectAlbumAPI(userId).then(({ data: { data } }) => {
      setlikeAlbums(data)
    })
  }, [userId])
  //获取用户收藏mv
  const getCollectMv = useCallback(() => {
    getCollectMvAPI().then(({ data: { data } }) => {
      setlikeMvs(data)
    })
  }, [])
  useEffect(() => {
    switch (currentIndex) {
      case 0:
        getCollectSongs()
        break
      case 1:
        getCollectPlaylist()
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
  }, [currentIndex, getCollectSongs, getCollectPlaylist, getCollectMv, getCollectAlbum])
  return (
    <div>
      <Category
        Tabs={Tabs}
        switchTabs={switchTabs}
        currentIndex={currentIndex}
      />
      {currentIndex === 0 ? (
        <div className='w-1200'>
          <SongCover song={likeSongs} />
        </div>
      ) : null}
      {currentIndex === 1 ? (
        <div className='playlist-result-container'>
          {likePlaylists.map((item, index) => {
            return <PlaylistCover playlist={item} key={index} />
          })}
        </div>
      ) : null}
      {currentIndex === 2 ? (
        <div className='mv-result-container'>
          {likeAlbums.map((item, index) => {
            return <AlbumCover album={item} key={index} />
          })}
        </div>
      ) : null}
      {currentIndex === 3 ? (
        <div className='mv-result-container'>
          {likeMvs.map((item, index) => {
            return <MvCover mv={item} key={index} />
          })}
        </div>
      ) : null}
    </div>
  )
})
