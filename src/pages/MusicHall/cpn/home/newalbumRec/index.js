import React, { memo, useState, useEffect, useCallback } from 'react'
import NewAlbumCover from 'components/Album/newAlbumCover'
import BigTitle from 'components/Home/bigTitle'
import DotsContainer from 'components/Home/dotsContainer'
import Category from 'components/Common/category'
import SwitchPage from 'components/Home/switchPage'
import { getRecommendNewAlbum } from '@/api/home'
import './index.less'
//新碟上架选项卡
const Tabs = [
  { categoryName: '华语', area: 'ZH' },
  { categoryName: '欧美', area: 'EA' },
  { categoryName: '日本', area: 'JP' },
  { categoryName: '韩国', area: 'KR' }
]
//每页展示新碟数量
const PAGESIZE = 10
export default memo(function NewAlbumRec() {
  //新碟数据
  const [newAlbum, setNewAlbum] = useState([])
  //获取新碟数据
  const getRecAlbum = async area => {
    try {
      const {
        data: { monthData }
      } = await getRecommendNewAlbum(area)
      setNewAlbum(monthData.slice(0, 20))
    } catch (error) {}
  }
  //当前新碟上架的索引 默认是第一个 对应上方的新碟上架选项卡
  const [currentIndex, setCurrentIndex] = useState(0)
  //当前新碟上架的页码
  const [currentPage, setCurrentPage] = useState(0)
  //切换当前新碟上架的分类
  const switchTabs = useCallback(index => {
    setCurrentIndex(index)
  }, [])
  //切换当前新碟上架展示数据的页码
  const switchPage = useCallback(
    page => {
      if (page * PAGESIZE >= newAlbum.length) {
        page = 0
      } else if (page === -1) {
        page = 0
      }
      setCurrentPage(page)
    },
    [newAlbum]
  )
  useEffect(() => {
    //每当新碟上架分类被切换 就会重新请求数据
    //第一次加载页面默认请求第一个分类下的数据
    getRecAlbum(Tabs[currentIndex].area)
    //手动把页码变成第一页
    setCurrentPage(0)
  }, [currentIndex])
  return (
    <div className='newalbum-container'>
      <SwitchPage currentPage={currentPage} switchPage={switchPage} />
      <div className='w-1200'>
        <BigTitle title='新碟首发' />
        <Category
          Tabs={Tabs}
          switchTabs={switchTabs}
          currentIndex={currentIndex}
        />
        <div className='newalbum-content'>
          {newAlbum
            .slice(currentPage * PAGESIZE, currentPage * PAGESIZE + PAGESIZE)
            .map(item => {
              return <NewAlbumCover album={item} key={item.id} />
            })}
          <DotsContainer
            length={newAlbum.length}
            PAGESIZE={PAGESIZE}
            currentPage={currentPage}
            switchPage={switchPage}
          />
        </div>
      </div>
    </div>
  )
})
