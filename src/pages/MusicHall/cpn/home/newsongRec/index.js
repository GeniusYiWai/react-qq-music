import React, { memo, useState, useEffect, useCallback } from 'react'
import BigTitle from 'components/Home/bigTitle'
import Category from 'components/Common/category'
import { getRecommendNewSong } from '@/api/home'
import SongRecSkeleton from 'components/Skeleton/songRecSkeleton'
import { message } from 'antd'
import Carousel from 'components/Common/carousel'
import './index.less'
//新歌首发选项卡
const Tabs = [
  { categoryName: '华语', id: '7' },
  { categoryName: '欧美', id: '96' },
  { categoryName: '日本', id: '8' },
  { categoryName: '韩国', id: '16' }
]

export default memo(function NewSongRec() {
  //歌曲数据
  const [newSongs, setNewSong] = useState([])
  //获取歌曲数据
  const getRecSongs = async categoryId => {
    try {
      const {
        data: { data }
      } = await getRecommendNewSong(categoryId)
      setNewSong(data.slice(0, 30))
    } catch (error) {
      message.error('获取推荐新歌失败!')
    }
  }
  //当前新歌首发的索引 默认是第一个 对应上方的新歌首发选项卡
  const [currentIndex, setCurrentIndex] = useState(0)
  //切换当前新歌首发的分类
  const switchTabs = useCallback(index => {
    setNewSong([])
    setCurrentIndex(index)
  }, [])
  useEffect(() => {
    //每当新歌首发分类被切换 就会重新请求数据
    //第一次加载页面默认请求第一个分类下的数据
    getRecSongs(Tabs[currentIndex].id)
  }, [currentIndex])
  return (
    <div className='newsong-container'>
      <div className='w-1200'>
        <BigTitle title='新歌首发' />
        <Category
          Tabs={Tabs}
          switchTabs={switchTabs}
          currentIndex={currentIndex}
        />
        {newSongs.length === 0 ? <SongRecSkeleton /> : null}
        <Carousel data={newSongs} pagesize={9} type={'song'}>
          <div className='newsong-content'></div>
        </Carousel>
      </div>
    </div>
  )
})
