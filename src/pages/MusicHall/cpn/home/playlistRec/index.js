import React, { memo, useState, useEffect, useCallback } from 'react'
import BigTitle from 'components/Home/bigTitle'
import Category from 'components/Common/category'
import { getRecommendPlaylist } from '@/api/home'
import PlaylistRecSkeleton from 'components/Skeleton/playlistRecSkeleton'
import { message } from 'antd'
import Carousel from 'components/Common/carousel'
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
export default memo(function PlaylistRec() {
  //歌单数据
  const [playlists, setPlaylists] = useState([])
  //当前歌单分类的索引 默认是第一个 对应上方的歌单推荐选项卡
  const [currentIndex, setCurrentIndex] = useState(0)
  //获取歌单数据
  const getRecPlaylist = async categoryId => {
    try {
      const {
        data: { playlists, code }
      } = await getRecommendPlaylist(categoryId)
      if (code === 200) {
        setPlaylists(playlists)
      }
    } catch (error) {
      message.error('获取推荐歌单失败!')
    }
  }
  //切换当前歌单分类的索引
  const switchTabs = useCallback(index => {
    setPlaylists([])
    setCurrentIndex(index)
  }, [])
  useEffect(() => {
    //每当歌单分类被切换 就会重新请求歌单数据
    //第一次加载页面默认请求第一个分类下的数据
    getRecPlaylist(Tabs[currentIndex].name)
  }, [currentIndex])
  return (
    <div className='playlist-container'>
      <div className='w-1200'>
        <BigTitle title='歌单推荐' />
        <Category
          Tabs={Tabs}
          switchTabs={switchTabs}
          currentIndex={currentIndex}
        />
        {playlists.length === 0 ? (
          <PlaylistRecSkeleton limit={5} />
        ) : (
          <Carousel
            data={playlists && playlists}
            pagesize={5}
            type={'playlist'}
          ></Carousel>
        )}
      </div>
    </div>
  )
})
