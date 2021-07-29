import React, { memo, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
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
//每页展示新歌数量
const PAGESIZE = 9
export default memo(function NewSongRec() {
  //获取dispatch
  const dispatch = useDispatch()
  //获取home下的state的playlistRec
  let { newSong } = useSelector(
    state => ({
      newSong: state.home.newSongRec
    }),
    shallowEqual
  )
  //当前新歌首发的索引 默认是第一个 对应上方的新歌首发选项卡
  const [currentIndex, setCurrentIndex] = useState(0)
  //当前新歌首发的页码
  const [currentPage, setCurrentPage] = useState(0)
  //切换当前新歌首发的分类
  const switchTabs = useCallback(index => {
    setCurrentIndex(index)
  }, [])
  //切换当前新歌首发展示数据的页码
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
    //每当新歌首发分类被切换 就会重新抛出dispatch 请求数据
    //第一次加载页面默认请求第一个分类下的数据
    dispatch(setNewSongRec(Tabs[currentIndex].id))
    //手动把页码变成第一页
    setCurrentPage(0)
  }, [currentIndex])
  return (
    <div className='newsong-container'>
      <SwitchPage currentPage={currentPage} switchPage={switchPage} />
      <div className='w-1200'>
        <BigTitle title='新歌首发' />
        <Category
          Tabs={Tabs}
          switchTabs={switchTabs}
          currentIndex={currentIndex}
        />
        <div className='newsong-content'>
          {newSong
            .slice(currentPage * PAGESIZE, currentPage * PAGESIZE + PAGESIZE)
            .map(item => {
              return <NewSongCover song={item} key={item.id} />
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
