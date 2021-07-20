import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { setNewAlbumRec } from '../../cpn/home/store/actionCreators'
import NewAlbumCover from 'components/newAlbum-cover'
import Category from 'components/category'
import './index.less'
//新碟上架选项卡
const Tabs = [
  { categoryName: '华语', area: 'ZH' },
  { categoryName: '欧美', area: 'EA' },
  { categoryName: '日本', area: 'JP' },
  { categoryName: '韩国', area: 'KR' }
]
//每页展示歌单数量
const PAGESIZE = 20
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
  //切换当前选项卡的索引
  const switchTabs = async (index, id) => {
    await dispatch(setNewAlbumRec(id))
    setCurrentIndex(index)
  }
  useEffect(() => {
    if (newAlbum.length !== 0) {
      return
    }
    //调用dispatch 请求歌单数据 存入home state
    dispatch(setNewAlbumRec(Tabs[0].area))
  }, [dispatch, newAlbum])
  return (
    <div className='newalbum-container'>
      <div className='w-1200'>
        <Category
          Tabs={Tabs}
          switchTabs={switchTabs}
          currentIndex={currentIndex}
          type={'area'}
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
