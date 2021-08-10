import React, { memo, useEffect, useCallback, useState } from 'react'
import ConditionQuery from 'components/Common/conditionQuery'
import MvCover from 'components/Mv/mvCover'
import { getMv as getMvAPI } from '@/api/mv'
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
  //mv列表
  const [mvList, setMvList] = useState([])
  //获取mv列表
  const getMv = async ({ area, initial, type }) => {
    try {
      const {
        data: { data }
      } = await getMvAPI(area, initial, type)
      setMvList(data)
    } catch (error) {}
  }
  //混合查询条件 因为可以多个参数一起查询
  const [combineCondition, setCombineCondition] = useState({
    //按热度查询
    order: '',
    //按地区查询
    area: '',
    //按类型查询
    type: ''
  })
  //切换查询条件会重新加载数据
  const switchCondition = useCallback((condition, value) => {
    setCombineCondition(combineCondition => ({
      ...combineCondition,
      [condition]: value
    }))
  }, [])
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
      <div className='mv-list-container w-1200'>
        {mvList.map(item => {
          return <MvCover mv={item} key={item.id} />
        })}
      </div>
    </div>
  )
})
