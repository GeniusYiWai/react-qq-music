import React, { memo, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { setNewAlbumRec } from '../../cpn/home/store/actionCreators'
import NewAlbumCover from 'components/Album/newAlbumCover'
import Category from 'components/Common/category'
import './index.less'
//新碟上架选项卡 用于传入到category组件中
const Tabs = [
  { categoryName: '华语', area: 'ZH' },
  { categoryName: '欧美', area: 'EA' },
  { categoryName: '日本', area: 'JP' },
  { categoryName: '韩国', area: 'KR' }
]
//每页展示歌单数量
const PAGESIZE = 20
export default memo(function NewAlbumRec() {
  const dispatch = useDispatch()
  //获取home下的state的playlistRec
  const { newAlbum } = useSelector(
    state => ({
      newAlbum: state.home.newAlbumRec
    }),
    shallowEqual
  )
  //自定义当前选项卡的索引
  const [currentIndex, setCurrentIndex] = useState(0)
  //切换当前选项卡的索引 一旦切换就会重新加载数据
  const switchTabs = useCallback(index => {
    setCurrentIndex(index)
  }, [])
  useEffect(() => {
    //调用dispatch 请求歌单数据 存入home state 第一次加载页面 手动加载第一个分类下的数据
    dispatch(setNewAlbumRec(Tabs[currentIndex].area))
  }, [currentIndex])
  return (
    <div className='newalbum-container'>
      <div className='w-1200'>
        <Category
          Tabs={Tabs}
          switchTabs={switchTabs}
          currentIndex={currentIndex}
        />
        <div className='newalbum-content'>
          {newAlbum.slice(0, PAGESIZE).map((item, index) => {
            return <NewAlbumCover album={item} key={index} />
          })}
        </div>
      </div>
    </div>
  )
})
