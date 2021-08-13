import React, { memo, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setDjByCate } from './store/actionCreators'
import DjCover from 'components/Dj/djCover'
import { ScrollTop, getScrollTop } from '@/utils/tools'
import DiscSkeleton from 'components/Skeleton/discSkeleton'

import './index.less'
//dj的所有分类 写死
//name 是展示的分类名称
//id 用于传参
let djCateList = [
  {
    name: '情感',
    id: 3
  },
  {
    name: '音乐推荐',
    id: 2
  },
  {
    name: '有声书',
    id: 10001
  },
  {
    name: '脱口秀',
    id: 8
  },
  {
    name: '创作翻唱',
    id: 2001
  },
  {
    name: '电音',
    id: 10002
  },
  {
    name: '知识',
    id: 11
  },
  {
    name: '二次元',
    id: 3001
  },
  {
    name: '明星专区',
    id: 14
  }
]
export default memo(function Dj() {
  const dispatch = useDispatch()
  //切换当前选中dj分类
  const [curretnIndex, setcurretnIndex] = useState(0)
  //获取dj store中的djList state 用于展示
  const { djList } = useSelector(state => {
    return { djList: state.dj.djList }
  })
  //选择分类 歌单页面到分类下的列表
  const handleSelectCate = index => {
    setcurretnIndex(index)
    //获取点击的分类距离顶部的距离
    const offsetTop =
      document.querySelector('.dj-list' + index) &&
      document.querySelector('.dj-list' + index).offsetTop - 10
    ScrollTop(offsetTop, 600)
  }

  useEffect(() => {
    //监听页面滚动
    const handleScroll = () => {
      let scrollTop = getScrollTop()
      djCateList.forEach((item, index) => {
        if (
          scrollTop >=
          (document.querySelector('.dj-list' + index) &&
            document.querySelector('.dj-list' + index).offsetTop -
              document.body.clientHeight / 2)
        ) {
          setcurretnIndex(index)
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    //取消监听页面滚动
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  useEffect(() => {
    //如果已经有djList就不再请求
    if (djList.length !== 0) {
      return
    }
    //循环遍历dj分类 发送请求 存入到state中
    djCateList.forEach(e => {
      dispatch(setDjByCate(e.id))
    })
  }, [])

  return (
    <div className='w-1200 dj-container'>
      <div className='left'>
        <ul>
          {djCateList.map((item, index) => {
            return (
              <li
                onClick={() => handleSelectCate(index)}
                key={item.id}
                className={index === curretnIndex ? 'active' : ''}
              >
                {item.name}
              </li>
            )
          })}
        </ul>
      </div>
      <div className='right'>
        {djList.length === 0 ? <DiscSkeleton /> : null}
        {djList.map((item, index) => {
          return (
            <div className={`dj-list dj-list${index}`} key={index}>
              <p
                className={`dj-title ${
                  index === curretnIndex ? 'dj-title-active' : ''
                } `}
              >
                {djCateList[index] && djCateList[index].name}
              </p>
              {item.map(dj => {
                return <DjCover dj={dj} key={dj.id} className='dj-item' />
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
})
