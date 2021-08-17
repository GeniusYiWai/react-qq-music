import React, { memo, useState, useEffect, useCallback } from 'react'
import NewAlbumCover from 'components/Album/newAlbumCover'
import Category from 'components/Common/category'
import { getRecommendNewAlbum } from '@/api/home'
import MVSkeleton from 'components/Skeleton/mvSkeleton'
import { Pagination, message } from 'antd'

import './index.less'
//新碟上架选项卡 用于传入到category组件中
const Tabs = [
  { categoryName: '华语', area: 'ZH' },
  { categoryName: '欧美', area: 'EA' },
  { categoryName: '日本', area: 'JP' },
  { categoryName: '韩国', area: 'KR' }
]

export default memo(function NewAlbumRec() {
  //新碟数据
  const [newAlbum, setNewAlbum] = useState([])
  const [pageSize, setPageSize] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)

  //获取新碟数据
  const getRecAlbum = async area => {
    try {
      const {
        data: { monthData }
      } = await getRecommendNewAlbum(area)
      setNewAlbum(monthData)
      setTotal(monthData.length)
    } catch (error) {
      message.error('获取新碟数据失败!')
    }
  }
  //自定义当前选项卡的索引
  const [currentIndex, setCurrentIndex] = useState(0)
  //切换当前选项卡的索引 一旦切换就会重新加载数据
  const switchTabs = useCallback(index => {
    setCurrentPage(1)

    setCurrentIndex(index)
  }, [])
  useEffect(() => {
    setNewAlbum([])
    //调用dispatch 请求歌单数据 存入home state 第一次加载页面 手动加载第一个分类下的数据
    getRecAlbum(Tabs[currentIndex].area)
  }, [currentIndex])
  const handlePageChange = current => {
    setCurrentPage(current)
  }
  return (
    <div className='newalbum-container'>
      <div className='w-1200'>
        <Category
          Tabs={Tabs}
          switchTabs={switchTabs}
          currentIndex={currentIndex}
        />
        {newAlbum.length === 0 ? <MVSkeleton /> : null}
        <div className='newalbum-content'>
          {newAlbum
            .slice((currentPage - 1) * pageSize, pageSize * currentPage)
            .map((item, index) => {
              return <NewAlbumCover album={item} key={index} />
            })}
        </div>
      </div>
      <div className='pagination'>
        <Pagination
          current={currentPage}
          total={total}
          pageSize={pageSize}
          onChange={current => handlePageChange(current)}
          showSizeChanger={false}
        />
      </div>
    </div>
  )
})
