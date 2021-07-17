import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
// import { Spin } from 'antd'
// import { Carousel } from 'antd'
import { setPlaylistRec } from '../store/actionCreators'
import PlaylistCover from 'components/playlist-cover'
import BigTitle from '../cpn/big-title'
import DotsContainer from '../cpn/dots-container'
import Category from 'components/category'
import SwitchPage from '../cpn/SwitchPage'
import './index.less'
//歌单推荐选项卡
const Tabs = [
  { categoryName: '为你推荐', name: '流行' },
  { categoryName: '经典', name: '经典' },
  { categoryName: '咖啡馆', name: '下午茶' },
  { categoryName: '轻音乐', name: '轻音乐' },
  { categoryName: '官方歌单', name: '榜单' },
  { categoryName: '情歌', name: '伤感' }
]
//每页展示歌单数量
const PAGESIZE = 5
export default memo(function PlaylistRec() {
  //redux hooks
  //获取dispatch
  const dispatch = useDispatch()
  //获取home下的state的playlistRec
  let { playlist } = useSelector(
    state => ({
      playlist: state.home.playlistRec
    }),
    shallowEqual
  )
  //react hooks
  //自定义当前选项卡的索引
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  //切换当前选项卡的索引
  const switchTabs = async (index, categoryName) => {
    await dispatch(setPlaylistRec(categoryName))
    setCurrentIndex(index)
  }
  //切换当前推荐列表的索引
  const switchPage = page => {
    if (page * PAGESIZE >= playlist.length) {
      page = 0
    } else if (page === -1) {
      page = 0
    }
    setCurrentPage(page)
  }
  useEffect(() => {
    //调用dispatch 请求歌单数据 存入home state
    dispatch(setPlaylistRec(Tabs[0].name))
  }, [dispatch])
  return (
    <div className='playlist-container'>
      <SwitchPage currentPage={currentPage} switchPage={switchPage} />

      <div className='w-1200'>
        <BigTitle title='歌单推荐' />
        <Category
          Tabs={Tabs}
          switchTabs={switchTabs}
          currentIndex={currentIndex}
          type={'name'}
        />
        <div className='playlist-content'>
          {playlist
            .slice(currentPage * PAGESIZE, currentPage * PAGESIZE + PAGESIZE)
            .map((item, index) => {
              return <PlaylistCover playlist={item} key={Math.random()+item.id}/>
            })}
        </div>
        <DotsContainer
          length={playlist.length}
          PAGESIZE={PAGESIZE}
          currentPage={currentPage}
          switchPage={switchPage}
        />
      </div>
    </div>
  )
})
