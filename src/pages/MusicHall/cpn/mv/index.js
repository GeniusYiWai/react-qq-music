import React, { memo, useEffect, useCallback, useState } from 'react'
import ConditionQuery from 'components/Common/conditionQuery'
import MvCover from 'components/Mv/mvCover'
import { getMv as getMvAPI } from '@/api/mv'
import MVSkeleton from 'components/Skeleton/mvSkeleton'
import InfiniteScroll from 'react-infinite-scroller'
import { Spin, message } from 'antd'
import Empty from 'components/Common/empty'
import { ScrollTop } from '@/utils/tools'

import './index.less'
//地区筛选条件
const Area = [
  {
    categoryName: '全部',
    area: ''
  },
  {
    categoryName: '内地',
    area: '内地'
  },
  {
    categoryName: '欧美',
    area: '欧美'
  },
  {
    categoryName: '日本',
    area: '日本'
  },
  {
    categoryName: '韩国',
    area: '韩国'
  },
  {
    categoryName: '港台',
    area: '港台'
  }
]
//类型筛选条件
const Type = [
  {
    categoryName: '全部',
    type: ''
  },
  {
    categoryName: '官方版',
    type: '官方版'
  },
  {
    categoryName: '现场版',
    type: '现场版'
  },
  {
    categoryName: '网易出品',
    type: '网易出品'
  },
  {
    categoryName: '原生',
    type: '原生'
  }
]
// 排序筛选条件
const Order = [
  {
    categoryName: '全部',
    order: ''
  },
  {
    categoryName: '最快',
    order: '最快'
  },
  {
    categoryName: '最热',
    order: '最热'
  },
  {
    categoryName: '最新',
    order: '最新'
  }
]

export default memo(function Singer() {
  //state
  //mv列表
  const [mvList, setMvList] = useState([])
  //每页大小
  const [limit, setLimit] = useState(20)
  //是否正在加载新数据
  const [loading, setLoading] = useState(false)
  //是否还有更多数据
  const [hasMore, setHasMore] = useState(true)
  //偏移量 用于分页 计算方式  ( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
  const [offset, setOffset] = useState(0)
  //判断是否是第一次加载页面
  const [flag, setFlag] = useState(true)
  //mv查询条件
  const [combineCondition, setCombineCondition] = useState({
    //按热度查询
    order: '',
    //按地区查询
    area: '',
    //按类型查询
    type: '',
    //偏移量
    offset,
    //每页数据条数
    limit
  })
  //functions
  //获取mv列表
  const getMv = async combineCondition => {
    //上锁
    setLoading(true)
    try {
      const {
        data: { data, hasMore }
      } = await getMvAPI({ ...combineCondition })
      //赋值mv数据 因为新数据是加到旧数据的后面 所以用concat方法
      setMvList(mvList => {
        //开锁
        setLoading(false)
        setHasMore(hasMore)
        //将新数据与旧数据合并
        return mvList.concat(data)
      })
      //设置偏移量
      setOffset(offset + limit)
      //取反第一次加载页面
      setFlag(false)
    } catch (error) {
      message.error('获取mv数据失败!')
      //如果请求出错 关锁
      setLoading(false)
      setHasMore(false)
    }
  }
  //切换查询条件会重新加载数据
  const switchCondition = useCallback((condition, value) => {
    //切换查询条件之前 先把之前的mv数据清空 防止切换之后的新数据和之前的数据合并
    //清空偏移量
    setMvList([])
    setOffset(0)
    setCombineCondition(combineCondition => ({
      ...combineCondition,
      [condition]: value
    }))
  }, [])
  //监听 combineCondition的改变 重新发送请求
  useEffect(() => {
    //第一次进入页面 将页面滚动到顶部
    ScrollTop(0, 600)
    getMv(combineCondition)
  }, [combineCondition])
  const loadMore = useCallback(() => {
    //如果是第一次加载页面 不执行loadMore
    if (flag) return
    getMv({ ...combineCondition, offset })
  }, [flag, combineCondition, offset])
  return (
    <div className='mv-container'>
      <div className='conditionQuery w-1200'>
        <ConditionQuery
          condition='order'
          categoryName='categoryName'
          Category={Order}
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
      </div>
      {mvList.length === 0 ? <MVSkeleton limit={limit} /> : null}
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={loadMore}
        hasMore={!loading && hasMore}
        useWindow={true}
      >
        
        <div className='mv-list-container w-1200'>
          {mvList.map(item => {
            return <MvCover mv={item} key={item.id} />
          })}
        </div>
        <div className='loading'>{loading ? <Spin size='large' /> : null}</div>
      </InfiniteScroll>
      {!hasMore ? <Empty text='已经到底了' /> : null}
    </div>
  )
})
