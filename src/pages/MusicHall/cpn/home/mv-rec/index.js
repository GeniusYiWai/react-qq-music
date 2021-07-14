import React, { memo, useEffect, useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import BigTitle from '../cpn/big-title'
import MVCover from 'components/mv-cover'
import Category from '../cpn/category'
import SwitchPage from '../cpn/SwitchPage'
import DotsContainer from '../cpn/dots-container'
import { setNewMVRec } from '../store/actionCreators'
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
  //redux hooks
  //获取dispatch
  const dispatch = useDispatch()
  //获取home下的state的MVRec
  let { mv } = useSelector(
    state => ({
      mv: state.home.newMVRec
    }),
    shallowEqual
  )
  //自定义当前选项卡的索引
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  //切换当前选项卡的索引
  const switchTabs = async (index, area) => {
    await dispatch(setNewMVRec(area))
    setCurrentIndex(index)
  }
  //切换当前推荐mv的索引
  const switchPage = page => {
    if (page * PAGESIZE >= mv.length) {
      page = 0
    } else if (page === -1) {
      page = 0
    }
    setCurrentPage(page)
  }
  //react hooks
  useEffect(() => {
    //调用dispatch 请求排行榜数据 存入home state
    dispatch(setNewMVRec(Tabs[0].area))
  }, [dispatch])

  return (
    <div className='mv-container'>
      <SwitchPage currentPage={currentPage} switchPage={switchPage} />
      <BigTitle title='MV' />
      <Category
        Tabs={Tabs}
        switchTabs={switchTabs}
        currentIndex={currentIndex}
        type={'area'}
      />
      <div className='mv-content w-1200'>
        {mv
          .slice(PAGESIZE * currentPage, PAGESIZE * currentPage + PAGESIZE)
          .map((item, index) => {
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
