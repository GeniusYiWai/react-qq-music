import React, { memo, useEffect, useState } from 'react'
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
  const switchTabs = index => {
    setCurrentIndex(index)
  }
  //用户喜欢的歌曲
  const [likeSongs, setlikeSongs] = useState([])
  //用户喜欢的歌单
  const [likePlaylists, setlikePlaylists] = useState([])
  //用户喜欢的专辑
  const [likeAlbums, setlikeAlbums] = useState([])
  //用户喜欢的mv
  const [likeMvs, setlikeMvs] = useState([])
  //获取用户收藏歌曲
  const getCollectSongs = async () => {
    try {
      const {
        data: { ids }
      } = await getCollectSongsAPI(userId)
      const {
        data: { songs }
      } = await getMusicById(ids)
      setlikeSongs(songs)
    } catch (error) {}
  }
  //获取用户收藏歌单
  const getCollectPlaylist = async () => {
    try {
      const {
        data: { playlist }
      } = await getCollectPlaylistAPI(userId)
      const newArr = []
      playlist.forEach(e => {
        if (e.creator.userId != userId) {
          newArr.push(e)
        }
      })
      setlikePlaylists(newArr)
    } catch (error) {}
  }
  //获取用户收藏专辑
  const getCollectAlbum = async () => {
    try {
      const {
        data: { data }
      } = await getCollectAlbumAPI(userId)
      setlikeAlbums(data)
    } catch (error) {}
  }
  //获取用户收藏mv
  const getCollectMv = async () => {
    try {
      const {
        data: { data }
      } = await getCollectMvAPI(userId)
      setlikeMvs(data)
    } catch (error) {}
  }
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
