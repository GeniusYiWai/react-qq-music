import React, { memo, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SingerCategory from '../singer/cpn/singer-category'
import MvCover from 'components/mv-cover'
import { setMv } from './store/actionCreators'
import './index.less'
const Area = [
  {
    categoryName: '全部',
    area: '全部'
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
const Type = [
  {
    categoryName: '全部',
    type: '全部'
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
const Order = [
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
//混合查询条件
const combineCondition = {
  initial: '',
  area: '',
  type: ''
}
export default memo(function Singer() {
  const dispatch = useDispatch()
  //获取singer state
  const { mv } = useSelector(state => {
    return {
      mv: state.mv.mvList
    }
  })
  console.log(mv)
  const switchCondition = useCallback(
    (condition, value) => {
      combineCondition[condition] = value
      dispatch(setMv(combineCondition))
    },
    [dispatch]
  )
  useEffect(() => {
    if (mv.length !== 0) {
      return
    }
    dispatch(setMv({}))
  }, [dispatch, mv])

  return (
    <div className='mv-container'>
      <SingerCategory
        condition='order'
        categoryName='categoryName'
        Category={Order}
        switchCondition={switchCondition}
      />
      <SingerCategory
        condition='area'
        categoryName='categoryName'
        Category={Area}
        switchCondition={switchCondition}
      />
      <SingerCategory
        condition='type'
        categoryName='categoryName'
        Category={Type}
        switchCondition={switchCondition}
      />
      <div className='mv-list-container w-1200'>
        {mv.map(item => {
          return <MvCover mv={item} key={item.id} />
        })}
      </div>
    </div>
  )
})
