import React, {
  memo,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} from 'react'
import { BackTop } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setDjCate, setDjByCate } from './store/actionCreators'
import './index.less'
import DjCover from 'components/dj-cover'
const djCateList = [
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
  const [curretnIndex, setcurretnIndex] = useState(0)
  const { djCate, djList } = useSelector(state => {
    return { djCate: state.dj.djCate, djList: state.dj.djList }
  })
  useEffect(() => {
    if (djList.length !== 0) {
      return
    }
    dispatch(setDjCate())
    djCateList.forEach(e => {
      dispatch(setDjByCate(e.id))
    })
  }, [dispatch, djList])
  const handleSelectCate = index => {
    setcurretnIndex(index)
    let offsetTop = document.querySelector('.dj-list' + index).offsetTop - 10
    ScrollTop(offsetTop, 600)
  }

  useEffect(() => {
    const handleScroll = () => {
      let scrollTop = getScrollTop()
      djCateList.forEach((item, index) => {
        if (
          scrollTop >=
          document.querySelector('.dj-list' + index).offsetTop -
            document.body.clientHeight / 2
        ) {
          setcurretnIndex(index)
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const ScrollTop = (number = 0, time) => {
    if (!time) {
      document.body.scrollTop = document.documentElement.scrollTop = number
      return number
    }
    const spacingTime = 20 // 设置循环的间隔时间  值越小消耗性能越高
    let spacingInex = time / spacingTime // 计算循环的次数
    let nowTop = document.body.scrollTop + document.documentElement.scrollTop // 获取当前滚动条位置
    let everTop = (number - nowTop) / spacingInex // 计算每次滑动的距离
    let scrollTimer = setInterval(() => {
      if (spacingInex > 0) {
        spacingInex--
        ScrollTop((nowTop += everTop))
      } else {
        clearInterval(scrollTimer) // 清除计时器
      }
    }, spacingTime)
  }

  const getScrollTop = () => {
    let scrollTop = 0
    if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop
    } else if (document.body) {
      scrollTop = document.body.scrollTop
    }
    return scrollTop
  }
  return (
    <div className='w-1200 dj-container'>
      <div className='left'>
        <ul>
          {djCate.map((item, index) => {
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
        {djList.map((item, index) => {
          return (
            <div className={`dj-list dj-list${index}`} key={index}>
              <div
                className={`dj-title ${
                  index === curretnIndex ? 'dj-title-active' : ''
                } `}
              >
                {djCate[index] && djCate[index].name}
              </div>
              {item.map(dj => {
                return <DjCover dj={dj} key={dj.id} />
              })}
            </div>
          )
        })}
      </div>
      <BackTop />
    </div>
  )
})
