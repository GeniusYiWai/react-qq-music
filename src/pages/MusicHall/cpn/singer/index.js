import React, { memo, useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BgImage from '@/assets/img/bg_singer.jpg'
import ConditionQuery from 'components/condition-query'
import SingerCover from './cpn/singer-cover'
import SingerItem from './cpn/singer-item'
import { setSinger, setHotSinger } from './store/actionCreators'
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
export default memo(function Singer() {
  const dispatch = useDispatch()
  //混合查询条件 因为可以多个参数一起查询
  const [combineCondition, setCombineCondition] = useState({
    initial: '',
    area: '',
    type: ''
  })
  //获取singer state
  const { singer, hotSinger } = useSelector(state => {
    return {
      singer: state.singer.singerList,
      hotSinger: state.singer.hotSingerList
    }
  })
  //切换查询条件
  const switchCondition = useCallback((condition, value) => {
    setCombineCondition(combineCondition => ({
      ...combineCondition,
      [condition]: value
    }))
  }, [])
  //切换查询条件 重新触发加载
  useEffect(() => {
    console.log(combineCondition)
    dispatch(setSinger(combineCondition))
    dispatch(setHotSinger({}))
  }, [combineCondition])
  return (
    <div className='singer-container'>
      <div className='singer-bg' style={{ backgroundImage: `url(${BgImage})` }}>
        <h1>万千歌手 尽在眼前</h1>
        <h3>登录查看你的关注歌手</h3>
        <input type='button' value='立即登录' className='login-btn' />
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
