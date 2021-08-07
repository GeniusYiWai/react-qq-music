import React, { memo, useEffect, useState, useCallback } from 'react'
import {
  getCollectSinger as getCollectSingerAPI,
  getUserFollow as getUserFollowAPI
} from '@/api/profile'
import SingerCover from 'components/Singer/singerCover'
import Empty from 'components/Common/empty'
import Category from 'components/Common/category'
import './index.less'
const Tabs = [
  {
    categoryName: '用户'
  },
  {
    categoryName: '歌手'
  }
]
export default memo(function Collect(props) {
  //获取当前登录用户的id
  const { userId } = props
  //当前二级分类的索引
  const [currentIndex, setCurrentIndex] = useState(0)
  //切换当前二级分类
  const switchTabs = useCallback(index => {
    setCurrentIndex(index)
  }, [])
  //用户关注的用户
  const [userFollow, setUserFollow] = useState([])
  //用户关注的歌手
  const [singerFollow, setSingerFollow] = useState([])
  //获取用户关注的用户
  const getUserFollow = useCallback(() => {
    getUserFollowAPI(userId).then(({ data: { follow } }) => {
      setUserFollow(follow)
    })
  }, [userId])
  //获取用户关注的歌手
  const getCollectSinger = useCallback(() => {
    getCollectSingerAPI().then(({ data: { data } }) => {
      setSingerFollow(data)
    })
  }, [])

  useEffect(() => {
    switch (currentIndex) {
      case 0:
        getUserFollow()
        break
      case 1:
        getCollectSinger()
        break
      default:
        break
    }
  }, [currentIndex, getUserFollow, getCollectSinger])
  return (
    <div>
      <Category
        Tabs={Tabs}
        switchTabs={switchTabs}
        currentIndex={currentIndex}
      />
      {currentIndex === 0 ? (
        <div className='singer-result-container'>
          {userFollow.length !== 0 ? (
            userFollow.map((item, index) => {
              return <SingerCover singer={item} key={index} />
            })
          ) : (
            <Empty text='这里空空如也' />
          )}
        </div>
      ) : null}
      {currentIndex === 1 ? (
        <div className='singer-result-container'>
          {singerFollow.length !== 0 ? (
            singerFollow.map((item, index) => {
              return <SingerCover singer={item} key={index} />
            })
          ) : (
            <Empty />
          )}
        </div>
      ) : null}
    </div>
  )
})