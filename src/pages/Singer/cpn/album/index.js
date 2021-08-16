import React, { memo, useState, useCallback, useEffect } from 'react'
import { getSingerAlbums as getSingerAlbumsAPI } from '@/api/singer'
import NewAlbumCover from 'components/Album/newAlbumCover'
import InfiniteScroll from 'react-infinite-scroller'
import { Spin } from 'antd'
import MVSkeleton from 'components/Skeleton/mvSkeleton'
export default memo(function SingerAlbum(props) {
  const { id } = props
  //歌手专辑
  const [singerAlbums, setSingerAlbums] = useState([])
  //专辑 limit
  const [albumLimit, setAlbumLimit] = useState(20)
  //专辑是否正在加载新数据
  const [albumLoading, setAlbumLoading] = useState(false)
  //专辑是否还有更多数据
  const [albumHasMore, setAlbumHasMore] = useState(true)
  //专辑 offset
  const [albumOffset, setAlbumOffset] = useState(0)
  //专辑混合查询条件
  const [albumCombineCondition, setAlbumCombineCondition] = useState({
    id: id,
    //偏移量
    offset: albumOffset,
    //每页数据条数
    limit: albumLimit
  })
  //获取歌手专辑
  const getSingerAlbums = async albumCombineCondition => {
    //上锁
    setAlbumLoading(true)
    try {
      const {
        data: { hotAlbums, more }
      } = await getSingerAlbumsAPI({ ...albumCombineCondition })
      //赋值mv数据 因为新数据是加到旧数据的后面 所以用concat方法
      setSingerAlbums(singerAlbums => {
        //开锁
        setAlbumLoading(false)
        setAlbumHasMore(more)
        //将新数据与旧数据合并
        return singerAlbums.concat(hotAlbums)
      })
      //设置偏移量
      setAlbumOffset(albumOffset + albumLimit)
    } catch (error) {}
  }
  const albumLoadMore = useCallback(() => {
    if (!albumHasMore) return
    getSingerAlbums({ ...albumCombineCondition, offset: albumOffset })
  }, [albumHasMore, albumCombineCondition, albumOffset])
  useEffect(() => {
    getSingerAlbums(albumCombineCondition)
    return () => {
      setSingerAlbums([])
      setAlbumOffset(0)
    }
  }, [])
  return (
    <div>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={albumLoadMore}
        hasMore={albumHasMore && !albumLoading}
        useWindow={true}
      >
        {singerAlbums.length === 0 ? <MVSkeleton limit={albumLimit} /> : null}
        <div className='newalbum-container'>
          {singerAlbums &&
            singerAlbums.map(item => {
              return <NewAlbumCover album={item} key={item.id} />
            })}
        </div>
      </InfiniteScroll>
      <div className='loading'>
        {albumLoading ? <Spin size='large' /> : null}
      </div>
    </div>
  )
})
