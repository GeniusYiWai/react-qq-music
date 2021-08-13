import React, { memo, useEffect, useState, useCallback } from 'react'
import BigTitle from 'components/Home/bigTitle'
import MVCover from 'components/Mv/mvCover'
import Category from 'components/Common/category'
import SwitchPage from 'components/Home/switchPage'
import DotsContainer from 'components/Home/dotsContainer'
import { getRecommendMV } from '@/api/home'

import MvRecSkeleton from 'components/Skeleton/mvRecSkeleton'

import './index.less'
//MV选项卡
const Tabs = [
  { categoryName: '内地', area: '内地' },
  { categoryName: '港台', area: '港台' },
  { categoryName: '欧美', area: '欧美' },
  { categoryName: '日本', area: '日本' },
  { categoryName: '韩国', area: '韩国' }
]
//每页展示MV数量
const PAGESIZE = 10
export default memo(function MVRec() {
  //mv数据
  const [mv, setMv] = useState([])
  //获取mv数据
  const getRecMv = async area => {
    try {
      const {
        data: { data }
      } = await getRecommendMV(area)
      setMv(data)
    } catch (error) {}
  }
  //当前mv分类的索引 默认是第一个 对应上方的mv选项卡
  const [currentIndex, setCurrentIndex] = useState(0)
  //当前mv展示数据的页码
  const [currentPage, setCurrentPage] = useState(0)
  //切换当前mv的分类
  const switchTabs = useCallback(index => {
    setMv([])
    setCurrentIndex(index)
  }, [])
  //切换当前推荐mv展示数据的页码
  const switchPage = useCallback(
    page => {
      if (page * PAGESIZE >= mv.length) {
        page = 0
      } else if (page === -1) {
        page = 0
      }
      setCurrentPage(page)
    },
    [mv]
  )
  //react hooks
  useEffect(() => {
    //每当MV分类被切换 就会重新请求数据
    //第一次加载页面默认请求第一个分类下的数据
    getRecMv(Tabs[currentIndex].area)
    //手动把页码变成第一页
    setCurrentPage(0)
  }, [currentIndex])
  return (
    <div className='mv-container'>
      <SwitchPage currentPage={currentPage} switchPage={switchPage} />
      <BigTitle title='MV' />
      <Category
        Tabs={Tabs}
        switchTabs={switchTabs}
        currentIndex={currentIndex}
      />

      {mv.length === 0 ? <MvRecSkeleton limit={10} /> : null}
      <div className='mv-content w-1200'>
        {mv
          .slice(PAGESIZE * currentPage, PAGESIZE * currentPage + PAGESIZE)
          .map(item => {
            return <MVCover mv={item} key={item.id} />
          })}
        <DotsContainer
          length={mv.length}
          PAGESIZE={PAGESIZE}
          currentPage={currentPage}
          switchPage={switchPage}
        />
      </div>
    </div>
  )
})
