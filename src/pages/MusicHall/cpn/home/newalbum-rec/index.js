import React, { memo, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { setNewAlbumRec } from '../store/actionCreators'
import NewAlbumCover from 'components/newAlbum-cover'
import BigTitle from '../cpn/big-title'
import DotsContainer from '../cpn/dots-container'
import Category from 'components/category'
import SwitchPage from '../cpn/SwitchPage'
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
  //获取dispatch
  const dispatch = useDispatch()
  //获取home下的state的newAlbum
  let { newAlbum } = useSelector(
    state => ({
      newAlbum: state.home.newAlbumRec
    }),
    shallowEqual
  )
  //react hooks
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
    //每当新碟上架分类被切换 就会重新抛出dispatch 请求数据
    //第一次加载页面默认请求第一个分类下的数据
    dispatch(setNewAlbumRec(Tabs[currentIndex].area))
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
