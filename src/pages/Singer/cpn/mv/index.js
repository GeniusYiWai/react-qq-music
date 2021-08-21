import React, { memo, useState, useCallback, useEffect } from 'react'
import { getSingerMvs as getSingerMvsAPI } from '@/api/singer'
import MvCover from 'components/Mv/mvCover'
import InfiniteScroll from 'react-infinite-scroller'
import { Spin, message } from 'antd'
import MVSkeleton from 'components/Skeleton/mvSkeleton'
export default memo(function SingerMv(props) {
  //id 歌手id
  const { id } = props
  //state
  //歌手mv
  const [singerMvs, setSingerMvs] = useState([])
  //mv limit
  const [mvLimit] = useState(20)
  //mv是否正在加载新数据
  const [mvLoading, setMvLoading] = useState(false)
  //mv是否还有更多数据
  const [mvHasMore, setMvHasMore] = useState(true)
  //mv offset
  const [mvOffset, setMvOffset] = useState(0)
  //mv混合查询条件
  const [mvCombineCondition] = useState({
    id: id,
    //偏移量
    offset: mvOffset,
    //每页数据条数
    limit: mvLimit
  })
  //获取歌手mv
  const getSingerMvs = async mvCombineCondition => {
    //上锁
    setMvLoading(true)
    try {
      const {
        data: { mvs, hasMore, code }
      } = await getSingerMvsAPI({ ...mvCombineCondition })
      if (code === 200) {
        //赋值mv数据 因为新数据是加到旧数据的后面 所以用concat方法
        setSingerMvs(singerMvs => {
          //开锁
          setMvLoading(false)
          setMvHasMore(hasMore)
          //将新数据与旧数据合并
          return singerMvs.concat(mvs)
        })
        //设置偏移量
        setMvOffset(mvOffset + mvLimit)
      }
    } catch (error) {
      setMvLoading(false)
      setMvHasMore(false)
      message.error('获取歌手mv失败!')
    }
  }
  const mvLoadMore = useCallback(() => {
    if (!mvHasMore) return
    getSingerMvs({ ...mvCombineCondition, offset: mvOffset })
  }, [mvCombineCondition, mvOffset, mvHasMore])
  useEffect(() => {
    //获取歌手
    getSingerMvs(mvCombineCondition)
    return () => {
      //离开页面 清空mv数据
      setSingerMvs([])
        //设置偏移量为0
      setMvOffset(0)
    }
  }, [])
  return (
    <div>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={mvLoadMore}
        hasMore={!mvLoading && mvHasMore}
        useWindow={true}
      >
        {singerMvs.length === 0 ? <MVSkeleton limit={mvLimit} /> : null}
        <div className='mv-container'>
          {singerMvs &&
            singerMvs.map((item, index) => {
              return <MvCover mv={item} key={index} />
            })}
        </div>
      </InfiniteScroll>

      <div className='loading'>{mvLoading ? <Spin size='large' /> : null}</div>
    </div>
  )
})
