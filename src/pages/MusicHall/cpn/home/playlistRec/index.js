import React, { memo, useState, useEffect, useCallback } from 'react'
import PlaylistCover from 'components/Playlist/playlistCover'
import BigTitle from 'components/Home/bigTitle'
import DotsContainer from 'components/Home/dotsContainer'
import Category from 'components/Common/category'
import SwitchPage from 'components/Home/switchPage'
import { getRecommendPlaylist } from '@/api/home'
import PlaylistRecSkeleton from 'components/Skeleton/playlistRecSkeleton'

import './index.less'
//歌单推荐选项卡
const Tabs = [
  { categoryName: '为你推荐', name: '流行' },
  { categoryName: '经典', name: '经典' },
  { categoryName: '咖啡馆', name: '下午茶' },
  { categoryName: '轻音乐', name: '轻音乐' },
  { categoryName: '官方歌单', name: '榜单' },
  { categoryName: '情歌', name: '伤感' }
]
//每页展示歌单数量
const PAGESIZE = 5
export default memo(function PlaylistRec() {
  //歌单数据
  const [playlist, setPlaylist] = useState([])
  //获取歌单数据
  const getRecPlaylist = async categoryId => {
    try {
      const {
        data: { playlists }
      } = await getRecommendPlaylist(categoryId)
      setPlaylist(playlists)
    } catch (error) {}
  }
  //当前歌单分类的索引 默认是第一个 对应上方的歌单推荐选项卡
  const [currentIndex, setCurrentIndex] = useState(0)
  //当前歌单分类展示数据的页码
  const [currentPage, setCurrentPage] = useState(0)
  //切换当前歌单分类的索引
  const switchTabs = useCallback(index => {
    setCurrentIndex(index)
  }, [])
  //切换当前歌单的页码
  const switchPage = useCallback(
    page => {
      if (page * PAGESIZE >= playlist.length) {
        page = 0
      } else if (page === -1) {
        page = 0
      }
      setCurrentPage(page)
    },
    [playlist]
  )
  useEffect(() => {
    setPlaylist([])
    //每当歌单分类被切换 就会重新请求歌单数据
    //第一次加载页面默认请求第一个分类下的数据
    getRecPlaylist(Tabs[currentIndex].name)
    //手动把页码变成第一页
    setCurrentPage(0)
  }, [currentIndex])
  return (
    <div className='playlist-container'>
      <SwitchPage currentPage={currentPage} switchPage={switchPage} />
      <div className='w-1200'>
        <BigTitle title='歌单推荐' />
        <Category
          Tabs={Tabs}
          switchTabs={switchTabs}
          currentIndex={currentIndex}
        />
        {playlist.length === 0 ? <PlaylistRecSkeleton limit={5} /> : null}
        <div className='playlist-content'>
          {playlist
            .slice(currentPage * PAGESIZE, currentPage * PAGESIZE + PAGESIZE)
            .map(item => {
              return (
                <PlaylistCover playlist={item} key={Math.random() + item.id} />
              )
            })}
        </div>
        <DotsContainer
          length={playlist.length}
          PAGESIZE={PAGESIZE}
          currentPage={currentPage}
          switchPage={switchPage}
        />
      </div>
    </div>
  )
})
