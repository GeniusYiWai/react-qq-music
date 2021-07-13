import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Spin } from 'antd'
import { Carousel } from 'antd'
import { setPlaylistRec } from '../../store/actionCreators'
import PlaylistCover from '../../../../../../components/playlist-cover'
import BigTitle from '../big-title'
import './index.css'
//歌单推荐选项卡
const Tabs = [
  { categoryName: '为你推荐', categoryId: '6' },
  { categoryName: '经典', categoryId: '136' },
  { categoryName: '咖啡馆', categoryId: '223' },
  { categoryName: '轻音乐', categoryId: '15' },
  { categoryName: '官方歌单', categoryId: '10000000' },
  { categoryName: '情歌', categoryId: '148' }
]
let flag = true
const PAGESIZE = 5

export default memo(function PlaylistRec() {
  //redux hooks
  //获取dispatch
  const dispatch = useDispatch()
  let { playlist } = useSelector(
    state => ({
      playlist: state.home.playlistRec
    }),
    shallowEqual
  )
  const TOTAL_PAGE = Math.ceil(playlist.length / PAGESIZE)

  const page_array = [...new Array(TOTAL_PAGE)]

  //react hooks
  //自定义当前选项卡的索引
  const [currentIndex, setcurrentIndex] = useState(0)
  const [currentPage, setcurrentPage] = useState(0)
  //切换当前选项卡的索引
  const switchTabs = async (index, categoryId) => {
    setcurrentIndex(index)
    flag = true
    await dispatch(setPlaylistRec(categoryId))
    flag = false
  }
  //切换当前推荐列表的索引
  const switchPage = page => {
    if (page * PAGESIZE >= playlist.length) {
      page = 0
    } else if (page === -1) {
      page = 0
    }
    setcurrentPage(page)
  }
  useEffect(() => {
    //调用dispatch
    dispatch(setPlaylistRec(Tabs[0].categoryId))
    flag = false
  }, [dispatch])
  return (
    <div className='playlist-container w-1200'>
      <BigTitle title='歌单推荐' />
      <div className='playlist-tabs'>
        {Tabs.map((item, index) => {
          return (
            <div
              key={item.categoryId}
              className={index === currentIndex ? 'active' : ''}
              onClick={() => switchTabs(index, item.categoryId)}
            >
              {item.categoryName}
            </div>
          )
        })}
      </div>
      <div className='loading'>{flag ? <Spin /> : null}</div>
      <div
        className='switch-btn-left switch-btn'
        onClick={() => switchPage(currentPage - 1)}
      >
        {'<'}
      </div>
      <div
        onClick={() => switchPage(currentPage + 1)}
        className='switch-btn-right switch-btn'
      >
        {'>'}
      </div>
      <div className='playlist-content'>
        <PlaylistCover
          playlist={playlist.slice(
            currentPage * PAGESIZE,
            currentPage * PAGESIZE + PAGESIZE
          )}
        />
        <div className='dots-container'>
          {page_array.map((item, index) => {
            return (
              <div
                className={`dots ${index === currentPage ? 'active' : ''}`}
                onClick={() => switchPage(index)}
                key={index}
              ></div>
            )
          })}
        </div>
      </div>
    </div>
  )
})
