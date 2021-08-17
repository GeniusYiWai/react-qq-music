import React, { memo, useState, useEffect, useCallback } from 'react'
import NewSongCover from 'components/Song/songCover'
import BigTitle from 'components/Home/bigTitle'
import DotsContainer from 'components/Home/dotsContainer'
import Category from 'components/Common/category'
import SwitchPage from 'components/Home/switchPage'
import { getRecommendNewSong } from '@/api/home'
import SongRecSkeleton from 'components/Skeleton/songRecSkeleton'
import { message } from 'antd'

import './index.less'
//新歌首发选项卡
const Tabs = [
  { categoryName: '华语', id: '7' },
  { categoryName: '欧美', id: '96' },
  { categoryName: '日本', id: '8' },
  { categoryName: '韩国', id: '16' }
]
//每页展示新歌数量
const PAGESIZE = 9
export default memo(function NewSongRec() {
  //歌曲数据
  const [newSong, setNewSong] = useState([])
  //获取歌曲数据
  const getRecSongs = async categoryId => {
    try {
      const {
        data: { data }
      } = await getRecommendNewSong(categoryId)
      setNewSong(data)
    } catch (error) {
      message.error('获取推荐新歌失败!')
    }
  }
  //当前新歌首发的索引 默认是第一个 对应上方的新歌首发选项卡
  const [currentIndex, setCurrentIndex] = useState(0)
  //当前新歌首发的页码
  const [currentPage, setCurrentPage] = useState(0)
  //切换当前新歌首发的分类
  const switchTabs = useCallback(index => {
    setNewSong([])
    setCurrentIndex(index)
  }, [])
  //切换当前新歌首发展示数据的页码
  const switchPage = useCallback(
    page => {
      if (page * PAGESIZE >= newSong.length) {
        page = 0
      } else if (page === -1) {
        page = 0
      }
      setCurrentPage(page)
    },
    [newSong]
  )
  useEffect(() => {
    //每当新歌首发分类被切换 就会重新请求数据
    //第一次加载页面默认请求第一个分类下的数据
    getRecSongs(Tabs[currentIndex].id)
    //手动把页码变成第一页
    setCurrentPage(0)
  }, [currentIndex])
  return (
    <div className='newsong-container'>
      <SwitchPage currentPage={currentPage} switchPage={switchPage} />
      <div className='w-1200'>
        <BigTitle title='新歌首发' />
        <Category
          Tabs={Tabs}
          switchTabs={switchTabs}
          currentIndex={currentIndex}
        />
        {newSong.length === 0 ? <SongRecSkeleton /> : null}

        <div className='newsong-content'>
          {newSong
            .slice(currentPage * PAGESIZE, currentPage * PAGESIZE + PAGESIZE)
            .map(item => {
              return <NewSongCover song={item} key={item.id} />
            })}
          <DotsContainer
            length={newSong.length}
            PAGESIZE={PAGESIZE}
            currentPage={currentPage}
            switchPage={switchPage}
          />
        </div>
      </div>
    </div>
  )
})
