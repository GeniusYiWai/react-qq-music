import React, { memo, useEffect, useCallback, useState } from 'react'
import ConditionQuery from 'components/Common/conditionQuery'
import MvCover from 'components/Mv/mvCover'
import { getMv as getMvAPI } from '@/api/mv'
import MVSkeleton from 'components/Skeleton/mvSkeleton'
import LoadMore from 'components/Common/loadMore'
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
//每页大小
const limit = 20
//偏移量 用于分页 计算方式  ( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
const offset = 0
export default memo(function Singer() {
  //mv列表
  const [mvList, setMvList] = useState([])
  //是否正在加载新数据
  const [loading, setLoading] = useState(false)
  //是否还有更多数据
  const [hasMore, setHasMore] = useState(true)
  //获取mv列表
  const getMv = async combineCondition => {
    try {
      setLoading(true)
      setHasMore(false)
      const {
        data: { data, hasMore }
      } = await getMvAPI({ ...combineCondition })
      //赋值mv数据 因为新数据是加到旧数据的后面 所以用concat方法
      setMvList(mvList => {
        //设置loading为false
        setLoading(false)
        //设置hasMore为后台返回的hasMore字段
        setHasMore(hasMore)
        return mvList.concat(data)
      })
    } catch (error) {
      //如果请求出错 设置loading为true
      setLoading(true)
    }
  }
  //混合查询条件 因为可以多个参数一起查询
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
  //切换查询条件会重新加载数据
  const switchCondition = useCallback((condition, value) => {
    //切换查询条件之前 先把之前的mv数据清空 防止切换之后的新数据和之前的数据合并
    setMvList([])
    setLoading(true)
    setCombineCondition(combineCondition => ({
      ...combineCondition,
      [condition]: value
    }))
  }, [])
  //监听 combineCondition的改变 重新发送请求
  useEffect(() => {
    getMv(combineCondition)
  }, [combineCondition])
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
      {loading ? <MVSkeleton limit={limit} /> : null}

      <div className='mv-list-container w-1200'>
        {mvList.map(item => {
          return <MvCover mv={item} key={item.id} />
        })}
      </div>
      <LoadMore
        setCombineCondition={setCombineCondition}
        loading={loading}
        hasMore={hasMore}
        setHasMore={setHasMore}
        limit={limit}
        offset={offset}
        setLoading={setLoading}
      />
    </div>
  )
})
