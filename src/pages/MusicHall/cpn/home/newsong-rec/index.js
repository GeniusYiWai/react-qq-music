import React, { memo, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
// import { Spin } from 'antd'
// import { Carousel } from 'antd'
import { setNewSongRec } from '../store/actionCreators'
import NewSongCover from 'components/newSong-cover'
import BigTitle from '../cpn/big-title'
import DotsContainer from '../cpn/dots-container'
import Category from 'components/category'
import SwitchPage from '../cpn/SwitchPage'
import './index.less'
//新歌首发选项卡
const Tabs = [
  { categoryName: '华语', id: '7' },
  { categoryName: '欧美', id: '96' },
  { categoryName: '日本', id: '8' },
  { categoryName: '韩国', id: '16' }
]
//每页展示歌单数量
const PAGESIZE = 9
export default memo(function NewSongRec() {
  //redux hooks
  //获取dispatch
  const dispatch = useDispatch()
  //获取home下的state的playlistRec
  let { newSong } = useSelector(
    state => ({
      newSong: state.home.newSongRec
    }),
    shallowEqual
  )

  //react hooks
  //自定义当前选项卡的索引
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  //切换当前选项卡的索引
  const switchTabs = useCallback(
    (index, id) => {
      dispatch(setNewSongRec(id))
      setCurrentIndex(index)
    },
    [dispatch]
  )
  //切换当前推荐列表的索引
  const switchPage = useCallback(
    page => {
      if (page * PAGESIZE >= newSong.length) {
        page = 0
      } else if (page === -1) {
        page = 0
      }
      setCurrentPage(page)
    },
    [newSong]
  ) 
  useEffect(() => {
    if (newSong.length !== 0) {
      return
    }
    //调用dispatch 请求歌单数据 存入home state
    dispatch(setNewSongRec(Tabs[0].id))
  }, [dispatch, newSong])
  return (
    <div className='newsong-container'>
      <SwitchPage currentPage={currentPage} switchPage={switchPage} />
      <div className='w-1200'>
        <BigTitle title='新歌首发' />
        <Category
          Tabs={Tabs}
          switchTabs={switchTabs}
          currentIndex={currentIndex}
          type={'id'}
        />

        <div className='newsong-content'>
          {newSong
            .slice(currentPage * PAGESIZE, currentPage * PAGESIZE + PAGESIZE)
            .map((item, index) => {
              return <NewSongCover song={item} key={index} />
            })}
          <DotsContainer
            length={newSong.length}
            PAGESIZE={PAGESIZE}
            currentPage={currentPage}
            switchPage={switchPage}
          />
        </div>
      </div>
    </div>
  )
})
