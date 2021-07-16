import React, { memo, useState, useEffect } from 'react'
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
//每页展示歌单数量
const PAGESIZE = 10
export default memo(function NewAlbumRec() {
  //redux hooks
  //获取dispatch
  const dispatch = useDispatch()
  //获取home下的state的playlistRec
  let { newAlbum } = useSelector(
    state => ({
      newAlbum: state.home.newAlbumRec
    }),
    shallowEqual
  )
  //react hooks
  //自定义当前选项卡的索引
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  //切换当前选项卡的索引
  const switchTabs = async (index, id) => {
    await dispatch(setNewAlbumRec(id))
    setCurrentIndex(index)
  }
  //切换当前推荐列表的索引
  const switchPage = page => {
    if (page * PAGESIZE >= newAlbum.length) {
      page = 0
    } else if (page === -1) {
      page = 0
    }
    setCurrentPage(page)
  }
  useEffect(() => {
    //调用dispatch 请求歌单数据 存入home state
    dispatch(setNewAlbumRec(Tabs[0].area))
  }, [dispatch])
  return (
    <div className='newalbum-container'>
      <SwitchPage currentPage={currentPage} switchPage={switchPage} />
      <div className='w-1200'>
        <BigTitle title='新碟首发' />
        <Category
          Tabs={Tabs}
          switchTabs={switchTabs}
          currentIndex={currentIndex}
          type={'area'}
        />

        <div className='newalbum-content'>
          {newAlbum
            .slice(currentPage * PAGESIZE, currentPage * PAGESIZE + PAGESIZE)
            .map((item, index) => {
              return <NewAlbumCover album={item} key={index} />
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
