import React, { memo, useEffect, useCallback, useState, useRef } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import BgImage from '@/assets/img/bg_singer.jpg'
import ConditionQuery from 'components/Common/conditionQuery'
import SingerCover from 'components/Singer/singerCover'
import SingerItem from 'components/Singer/singerItem'

import {
  setSinger,
  setHotSinger,
  setCollectSingerDispatch
} from './store/actionCreators'
import { showLoginBoxDispatch } from '@/pages/LoginBox/store/actionCreators'
import { Carousel } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import './index.less'
//首字母查询
const Initials = [
  { categoryName: '热门', initial: '' },
  { categoryName: 'A', initial: 'A' },
  { categoryName: 'B', initial: 'B' },
  { categoryName: 'C', initial: 'C' },
  { categoryName: 'D', initial: 'D' },
  { categoryName: 'E', initial: 'E' },
  { categoryName: 'F', initial: 'F' },
  { categoryName: 'G', initial: 'G' },
  { categoryName: 'H', initial: 'H' },
  { categoryName: 'I', initial: 'I' },
  { categoryName: 'J', initial: 'J' },
  { categoryName: 'K', initial: 'K' },
  { categoryName: 'L', initial: 'L' },
  { categoryName: 'M', initial: 'M' },
  { categoryName: 'N', initial: 'N' },
  { categoryName: 'O', initial: 'O' },
  { categoryName: 'P', initial: 'P' },
  { categoryName: 'Q', initial: 'Q' },
  { categoryName: 'R', initial: 'R' },
  { categoryName: 'S', initial: 'S' },
  { categoryName: 'T', initial: 'T' },
  { categoryName: 'U', initial: 'U' },
  { categoryName: 'V', initial: 'V' },
  { categoryName: 'W', initial: 'W' },
  { categoryName: 'X', initial: 'X' },
  { categoryName: 'Y', initial: 'Y' },
  { categoryName: 'Z', initial: 'Z' }
]
//地区查询
const Area = [
  {
    categoryName: '全部',
    area: '-1'
  },
  {
    categoryName: '华语',
    area: '7'
  },
  {
    categoryName: '欧美',
    area: '96'
  },
  {
    categoryName: '日本',
    area: '8'
  },
  {
    categoryName: '韩国',
    area: '16'
  },
  {
    categoryName: '其他',
    area: '0'
  }
]
//类型查询
const Type = [
  {
    categoryName: '全部',
    type: '-1'
  },
  {
    categoryName: '男歌手',
    type: '1'
  },
  {
    categoryName: '女歌手',
    type: '2'
  },
  {
    categoryName: '乐队',
    type: '3'
  }
]
const newCollectSingerArray = []
const pageSize = 5
export default memo(function Singer() {
  const carouselRef = useRef()
  const dispatch = useDispatch()
  //混合查询条件 因为可以多个参数一起查询
  const [combineCondition, setCombineCondition] = useState({
    //按首字母查询
    initial: '',
    //按地区查询
    area: '',
    //按类型查询
    type: ''
  })
  //singer 上面展示的按分类查询的歌手数据
  //hotSinger 下方展示的热门歌手数据
  //isLogin 用户登录状态
  const { singer, hotSinger, isLogin, collectSingerList } = useSelector(
    state => {
      return {
        singer: state.singer.singerList,
        hotSinger: state.singer.hotSingerList,
        isLogin: state.user.isLogin,
        collectSingerList: state.singer.collectSingerList
      }
    },
    shallowEqual
  )
  //切换查询条件 将新的查询条件与之前的进行对比 新的替代旧的
  const switchCondition = useCallback((condition, value) => {
    setCombineCondition(combineCondition => ({
      ...combineCondition,
      [condition]: value
    }))
  }, [])
  //监听combineCondition的改变 一旦切换查询条件 就会重新触发加载数据
  useEffect(() => {
    //第一次加载 会先加载默认的全部数据
    dispatch(setSinger(combineCondition))
    //加载下方的热门歌手
    dispatch(setHotSinger({}))
  }, [combineCondition])
  //这个函数用来获取走马灯展示的数据
  //因为直接遍历关注歌手列表 走马灯一页只能显示一张图片
  //所以通过创建一个新数组 将原来的歌手列表按5个一组查询排序 这样一个走马灯页面就可以显示5张图片
  const spliceList = useCallback(() => {
    const totalPage = Math.ceil(collectSingerList.length / pageSize)
    for (let i = 0; i < totalPage; i++) {
      newCollectSingerArray[i] = collectSingerList.slice(
        i * pageSize,
        i * pageSize + pageSize
      )
    }
  }, [collectSingerList])
  spliceList()
  //这里监听用户登录状态的变更 如果用户登录了就重新发送请求 加载用户关注的歌手
  useEffect(() => {
    if (isLogin) {
      dispatch(setCollectSingerDispatch())
    }
  }, [isLogin])
  const handleClick = id => {
    window.open(`/profile/singer/${id}`)
  }
  return (
    <div className='singer-container'>
      <div className='singer-bg' style={{ backgroundImage: `url(${BgImage})` }}>
        {isLogin ? (
          <>
            <LeftOutlined
              className='prev'
              onClick={() => {
                carouselRef.current.prev()
              }}
            />
            <Carousel
              effect='fade'
              autoplay
              className='collect-singer-container'
              ref={carouselRef}
            >
              {newCollectSingerArray.map((singer, index) => {
                return (
                  <div className='collect-singer-wrapper' key={index}>
                    {singer.map(item => {
                      return (
                        <div className='collect-singer-item' key={item.id}>
                          <img src={item.picUrl} alt='' />
                          <p onClick={() => handleClick(item.id)}>
                            {item.name}
                          
                          </p>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </Carousel>
            <RightOutlined
              className='next'
              onClick={() => {
                carouselRef.current.next()
              }}
            />
          </>
        ) : (
          <>
            <h1>万千歌手 尽在眼前</h1>
            <h3>登录查看你的关注歌手</h3>
            <input
              type='button'
              value='立即登录'
              className='login-btn'
              onClick={() => {
                //展示登录弹出层
                dispatch(showLoginBoxDispatch(true))
              }}
            />
          </>
        )}
      </div>
      <ConditionQuery
        condition='initial'
        categoryName='categoryName'
        Category={Initials}
        switchCondition={switchCondition}
      />
      <ConditionQuery
        condition='area'
        categoryName='categoryName'
        Category={Area}
        switchCondition={switchCondition}
      />
      <ConditionQuery
        condition='type'
        categoryName='categoryName'
        Category={Type}
        switchCondition={switchCondition}
      />
      <div className='singer-hot-list w-1200'>
        {singer.map(item => {
          return <SingerCover singer={item} key={item.id} />
        })}
      </div>
      <div className='w-1200 singer-list'>
        {hotSinger.map((item, index) => {
          return <SingerItem singer={item} key={index} />
        })}
      </div>
    </div>
  )
})
