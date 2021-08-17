import React, { memo, useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getSingerInfo as getSingerInfoAPI } from '@/api/singer'
import LazyLoadImg from 'components/Common/lazyloadImg'
import Category from 'components/Common/category'
import { ScrollTop } from '@/utils/tools'
import { message } from 'antd'
import SingerMv from './cpn/mv'
import SingerAlbum from './cpn/album'
import SingerSong from './cpn/song'
import './index.less'
//一级分类
const Tabs = [
  {
    categoryName: '单曲'
  },
  {
    categoryName: '专辑'
  },
  {
    categoryName: 'MV'
  }
]
export default memo(function Singer() {
  //当前分类索引
  const [currentIndex, setCurrentIndex] = useState(0)
  //歌手信息
  const [singer, setsinger] = useState({})
  //歌手id
  const params = useParams()
  const { id } = params
  //切换当前分类
  const switchTabs = useCallback(index => {
    setCurrentIndex(index)
  }, [])
  //获取歌手信息
  const getSingerInfo = async () => {
    try {
      const {
        data: {
          data: { artist }
        }
      } = await getSingerInfoAPI(id)
      setsinger(artist)
    } catch (error) {
      message.error('获取歌手信息失败!')
    }
  }
  //获取歌手信息只执行一次
  useEffect(() => {
    //第一次进入页面 将页面滚动到顶部
    ScrollTop(0, 600)
    getSingerInfo()
  }, [])
  return (
    <div className='singer-profile-container'>
      <div className='singer-profile-box w-1200'>
        <div className='singer-avatar'>
          <LazyLoadImg url={singer && singer.cover} width={200} height={200} />
        </div>
        <div className='singer-profile'>
          <h1>{singer && singer.name}</h1>
          <p>{singer && singer.briefDesc}</p>
        </div>
      </div>
      <div className='singer-category w-1200'>
        <Category
          Tabs={Tabs}
          switchTabs={switchTabs}
          currentIndex={currentIndex}
        />
        <div className='singer-artist-size'>
          <p className={currentIndex === 0 ? 'active' : ''}>
            {singer.musicSize}
          </p>
          <p className={currentIndex === 1 ? 'active' : ''}>
            {singer.albumSize}
          </p>
          <p className={currentIndex === 2 ? 'active' : ''}>{singer.mvSize}</p>
        </div>
      </div>
      <div className='singer-hotsongs-list w-1200'>
        <div>{currentIndex === 0 ? <SingerSong id={id} /> : null}</div>
        <div>{currentIndex === 1 ? <SingerAlbum id={id} /> : null}</div>
        {currentIndex === 2 ? <SingerMv id={id} /> : null}
      </div>
    </div>
  )
})
