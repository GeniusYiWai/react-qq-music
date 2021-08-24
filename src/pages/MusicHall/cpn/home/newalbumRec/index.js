import React, { memo, useState, useEffect, useCallback } from 'react'
import BigTitle from 'components/Home/bigTitle'
import Category from 'components/Common/category'
import AlbumRecSkeleton from 'components/Skeleton/albumRecSkeleton'
import { message } from 'antd'
import { getRecommendNewAlbum } from '@/api/home'
import Carousel from 'components/Common/carousel'
import './index.less'
//新碟上架选项卡
const Tabs = [
  { categoryName: '华语', area: 'ZH' },
  { categoryName: '欧美', area: 'EA' },
  { categoryName: '日本', area: 'JP' },
  { categoryName: '韩国', area: 'KR' }
]
export default memo(function NewAlbumRec() {
  //新碟数据
  const [newAlbums, setNewAlbum] = useState([])
  //获取新碟数据
  const getRecAlbum = async area => {
    try {
      const {
        data: { albums }
      } = await getRecommendNewAlbum(area, 40)
      setNewAlbum(albums)
    } catch (error) {
      message.error('获取推荐新碟失败!')
    }
  }
  //当前新碟上架的索引 默认是第一个 对应上方的新碟上架选项卡
  const [currentIndex, setCurrentIndex] = useState(0)
  //切换当前新碟上架的分类
  const switchTabs = useCallback(index => {
    setCurrentIndex(index)
  }, [])
  useEffect(() => {
    setNewAlbum([])
    //每当新碟上架分类被切换 就会重新请求数据
    //第一次加载页面默认请求第一个分类下的数据
    getRecAlbum(Tabs[currentIndex].area)
  }, [currentIndex])
  return (
    <div className='newalbum-container'>
      <div className='w-1200'>
        <BigTitle title='新碟首发' />
        <Category
          Tabs={Tabs}
          switchTabs={switchTabs}
          currentIndex={currentIndex}
        />
        {newAlbums.length === 0 ? (
          <AlbumRecSkeleton limit={10} />
        ) : (
          <Carousel data={newAlbums} pagesize={10} type={'album'}></Carousel>
        )}
      </div>
    </div>
  )
})
