import React, { memo, useEffect, useCallback, useState, useRef } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import BgImage from '@/assets/img/bg_singer.jpg'
import ConditionQuery from 'components/Common/conditionQuery'
import SingerCover from 'components/Singer/singerCover'
import SingerItem from 'components/Singer/singerItem'
import {
  getSinger as getSingerAPI,
  getHotSinger as getHotSingerAPI
} from '@/api/singer'
import { getCollectSinger as getCollectSingerAPI } from '@/api/profile'
import { showLoginBoxDispatch } from '@/pages/LoginBox/store/actionCreators'
import { Carousel } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import SingerSkeleton from 'components/Skeleton/singerSkeleton'
import Pagination from 'components/Common/pagination'
import { ScrollTop } from '@/utils/tools'

import InfiniteScroll from 'react-infinite-scroller'
import Empty from 'components/Common/empty'
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
const pageSize = 5
export default memo(function Singer() {
  const dispatch = useDispatch()
  //获取轮播图引用
  const carouselRef = useRef()
  //下方热门歌手
  const [hotSinger, setHotSinger] = useState([])
  //下方热门歌手limit
  const [limit, setLimit] = useState(50)
  //下方热门歌手offset
  const [offset, setOffset] = useState(0)
  //下方热门歌手是否正在加载新数据
  const [loading, setLoading] = useState(false)
  //下方热门歌手是否还有更多数据
  const [hasMore, setHasMore] = useState(true)
  //判断是否是第一次加载页面
  const [flag, setFlag] = useState(true)
  //热门歌手加载数据需要的参数
  const [hotSingerParams, setHotSingerParams] = useState({
    //
    limit,
    //
    offset
  })
  //歌手
  const [singer, setSinger] = useState([])
  //歌手是否正在加载新数据
  const [singerLoading, setSingerLoading] = useState(false)
  //歌手是否还有更多数据
  const [singerHasMore, setSingerHasMore] = useState(true)
  //页码
  const [currentPage, setCurrentPage] = useState(1)
  // 歌手加载数据需要的参数
  const [combineCondition, setCombineCondition] = useState({
    //按首字母查询
    initial: '',
    //按地区查询
    area: '',
    //按类型查询
    type: '',
    limit: 10,
    offset: 0
  })
  //用户收藏歌手
  const [collectSinger, setCollectSinger] = useState([])
  const [newCollectSingerArray, setNewCollectSingerArray] = useState([])
  //isLogin 用户登录状态
  const { isLogin } = useSelector(state => {
    return {
      isLogin: state.user.isLogin
    }
  }, shallowEqual)
  //获取歌手
  const getSinger = async ({ area, initial, type, limit, offset }) => {
    try {
      const {
        data: { artists, more }
      } = await getSingerAPI(area, initial, type, limit, offset)
      setSinger(artists)
      setSingerHasMore(more)
    } catch (error) {}
  }
  //获取下方热门歌手
  const getHotSinger = async ({ limit, offset }) => {
    try {
      //上锁
      setLoading(true)
      const {
        data: { artists, more }
      } = await getHotSingerAPI(limit, offset)
      setLoading(false)
      setHasMore(more)
      setHotSinger(hotSinger => {
        return hotSinger.concat(artists)
      })
      //取反第一次加载页面
      setFlag(false)
      //设置偏移量
      setOffset(offset + limit)
    } catch (error) {
      //如果请求出错 关锁
      setLoading(true)
      setHasMore(false)
    }
  }
  //获取登录后收藏的歌手
  const getCollectSinger = async () => {
    try {
      const {
        data: { data }
      } = await getCollectSingerAPI()
      setCollectSinger(data)
      spliceList(data)
    } catch (error) {}
  }
  //切换查询条件 将新的查询条件与之前的进行对比 新的替代旧的
  const switchCondition = useCallback((condition, value) => {
    setCurrentPage(1)
    setSinger([])
    setCombineCondition(combineCondition => ({
      ...combineCondition,
      [condition]: value,
      offset: 0
    }))
  }, [])
  //监听combineCondition的改变 一旦切换查询条件 就会重新触发加载数据
  useEffect(() => {
    //第一次加载 会先加载默认的全部数据
    getSinger(combineCondition)
  }, [combineCondition])
  useEffect(() => {
    getHotSinger({ ...hotSingerParams })
  }, [hotSingerParams])
  //这个函数用来获取走马灯展示的数据
  //因为直接遍历关注歌手列表 走马灯一页只能显示一张图片
  //所以通过创建一个新数组 将原来的歌手列表按5个一组重新排序 这样一个走马灯页面就可以显示5张图片
  const spliceList = data => {
    const arr = []
    const totalPage = Math.ceil(data.length / pageSize)
    for (let i = 0; i < totalPage; i++) {
      arr[i] = data.slice(i * pageSize, i * pageSize + pageSize)
    }
    setNewCollectSingerArray(arr)
  }
  //这里监听用户登录状态的变更 如果用户登录了就重新发送请求 加载用户关注的歌手
  useEffect(() => {
    ScrollTop(0, 600)
    if (isLogin) {
      getCollectSinger()
    }
  }, [isLogin])
  const handleClick = id => {
    window.open(`/#/profile/singer/${id}`)
  }
  const loadMore = useCallback(() => {
    // 如果是第一次加载页面 不执行loadMore
    if (flag) return
    getHotSinger({ ...hotSingerParams, offset })
  }, [flag, hotSingerParams, offset])
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
      {singer.length === 0 && singerHasMore ? <SingerSkeleton /> : null}
      {!singerHasMore ? <Empty text='什么都没有了' /> : null}
      <div className='singer-hot-list w-1200'>
        {singer.map(item => {
          return <SingerCover singer={item} key={item.id} />
        })}

        <Pagination
          setCombineCondition={setCombineCondition}
          limit={10}
          total={10000}
          showSizeChanger={false}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          showQuickJumper={true}
          setData={setSinger}
        />
      </div>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={loadMore}
        hasMore={!loading && hasMore}
        useWindow={true}
      >
        <div className='w-1200 singer-list'>
          {hotSinger.map((item, index) => {
            return <SingerItem singer={item} key={index} />
          })}
        </div>
        <div className='loading'>{loading ? <Spin size='large' /> : null}</div>
      </InfiniteScroll>
      {!hasMore ? <Empty text='已经到底了' /> : null}
    </div>
  )
})
