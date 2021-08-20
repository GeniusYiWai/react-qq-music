import React, { memo, useEffect, useState, useCallback } from 'react'
import BigTitle from 'components/Home/bigTitle'
import Category from 'components/Common/category'
import { getRecommendMV } from '@/api/home'
import MvRecSkeleton from 'components/Skeleton/mvRecSkeleton'
import { message } from 'antd'
import Carousel from 'components/Common/carousel'
import './index.less'
//MV选项卡
const Tabs = [
  { categoryName: '内地', area: '内地' },
  { categoryName: '港台', area: '港台' },
  { categoryName: '欧美', area: '欧美' },
  { categoryName: '日本', area: '日本' },
  { categoryName: '韩国', area: '韩国' }
]
export default memo(function MVRec() {
  //mv数据
  const [mvs, setMv] = useState([])
  //获取mv数据
  const getRecMv = async area => {
    try {
      const {
        data: { data }
      } = await getRecommendMV(area)
      setMv(data)
    } catch (error) {
      message.error('获取推荐mv失败!')
    }
  }
  //当前mv分类的索引 默认是第一个 对应上方的mv选项卡
  const [currentIndex, setCurrentIndex] = useState(0)
  //切换当前mv的分类
  const switchTabs = useCallback(index => {
    setMv([])
    setCurrentIndex(index)
  }, [])
  //react hooks
  useEffect(() => {
    //每当MV分类被切换 就会重新请求数据
    //第一次加载页面默认请求第一个分类下的数据
    getRecMv(Tabs[currentIndex].area)
  }, [currentIndex])
  return (
    <div className='mv-container'>
      <BigTitle title='MV' />
      <Category
        Tabs={Tabs}
        switchTabs={switchTabs}
        currentIndex={currentIndex}
      />
      {mvs.length === 0 ? <MvRecSkeleton limit={10} /> : null}
      <Carousel data={mvs} pagesize={10} type={'mv'}></Carousel>
    </div>
  )
})
