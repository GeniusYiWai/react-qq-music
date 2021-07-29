import React, { memo, useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import BigTitle from '../cpn/big-title'
import MVCover from 'components/mv-cover'
import Category from 'components/category'
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
  //当前mv分类的索引 默认是第一个 对应上方的mv选项卡
  const [currentIndex, setCurrentIndex] = useState(0)
  //当前mv展示数据的页码
  const [currentPage, setCurrentPage] = useState(0)
  //切换当前mv的分类
  const switchTabs = useCallback(index => {
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
    //每当MV分类被切换 就会重新抛出dispatch 请求数据
    //第一次加载页面默认请求第一个分类下的数据
    dispatch(setNewMVRec(Tabs[currentIndex].area))
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
