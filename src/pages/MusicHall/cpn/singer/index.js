import React, { memo, useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BgImage from '@/assets/img/bg_singer.jpg'
import SingerCategory from './cpn/singer-category'
import SingerCover from './cpn/singer-cover'
import { setSinger } from './store/actionCreators'
import './index.less'
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
const Type = [
  {
    categoryName: '全部',
    type: '-1'
  },
  {
    categoryName: '男歌手',
    type: ''
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
  const [currentInitial, setInitial] = useState(Initials[0].initial)
  const [currentArea, setArea] = useState(Area[0].area)
  const [currentType, setType] = useState(Type[0].type)
  const dispatch = useDispatch()
  const { singer } = useSelector(state => {
    return {
      singer: state.singer.singerList
    }
  })
  const switchInitials = useCallback(
    initial => {
      setInitial(initial)
      //useState是异步更改 这里不能立即拿到initial
      // console.log(currentInitial)
      dispatch(setSinger({ initial, area: currentArea, type: currentType }))
    },
    [dispatch, setInitial, currentArea, currentType]
  )

  const switchArea = useCallback(
    area => {
      setArea(area)
      //useState是异步更改 这里不能立即拿到initial
      // console.log(currentArea)
      dispatch(setSinger({ area, initial: currentInitial, type: currentType }))
    },
    [dispatch, setArea, currentInitial, currentType]
  )

  const switchType = useCallback(
    type => {
      setType(type)
      //useState是异步更改 这里不能立即拿到initial
      // console.log(currentType)
      dispatch(setSinger({ area: currentArea, initial: currentInitial, type }))
    },
    [dispatch, currentInitial, currentArea]
  )
  useEffect(() => {
    dispatch(setSinger({}))
  }, [dispatch])
  return (
    <div className='singer-container'>
      <div className='singer-bg' style={{ backgroundImage: `url(${BgImage})` }}>
        <h1>万千歌手 尽在眼前</h1>
        <h3>登录查看你的关注歌手</h3>
        <input type='button' value='立即登录' className='login-btn' />
      </div>
      <SingerCategory
        Initials={Initials}
        Area={Area}
        Type={Type}
        currentInitial={currentInitial}
        switchInitials={switchInitials}
        currentArea={currentArea}
        switchArea={switchArea}
        switchType={switchType}
        currentType={currentType}
      />
      <div className='singer-list w-1200'>
        {singer.map(item => {
          return <SingerCover singer={item} key={item.accountId} />
        })}
      </div>
    </div>
  )
})
