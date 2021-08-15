import React, { memo, useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getSingerInfo as getSingerInfoAPI } from '@/api/singer'
import LazyLoadImg from 'components/Common/lazyloadImg'
import Category from 'components/Common/category'
import {
  getSingerSongs,
  getSingerAlbums as getSingerAlbumsAPI,
  getSingerMvs as getSingerMvsAPI
} from '@/api/singer'
import NewAlbumCover from 'components/Album/newAlbumCover'
import MvCover from 'components/Mv/mvCover'
import SongCover from 'components/Album/albumDetailCover'
import InfiniteScroll from 'react-infinite-scroller'
import { ScrollTop } from '@/utils/tools'
import { Spin } from 'antd'
import MVSkeleton from 'components/Skeleton/mvSkeleton'
import './index.less'
//一级分类
const Tabs = [
  {
    categoryName: '单曲'
  },
  {
    categoryName: '专辑'
  },
  {
    categoryName: 'MV'
  }
]
export default memo(function Singer() {
  //当前分类索引
  const [currentIndex, setCurrentIndex] = useState(0)
  //歌手信息
  const [singer, setsinger] = useState({})
  //歌手歌曲
  const [singerSongs, setSingerSongs] = useState([])
  //歌手专辑
  const [singerAlbums, setSingerAlbums] = useState([])
  //歌手mv
  const [singerMvs, setSingerMvs] = useState([])
  //歌手id
  const params = useParams()
  const { id } = params

  //切换当前分类
  const switchTabs = useCallback(index => {
    setCurrentIndex(index)
  }, [])

  //获取歌手信息
  const getSingerInfo = async () => {
    try {
      const {
        data: {
          data: { artist }
        }
      } = await getSingerInfoAPI(id)
      console.log(artist)
      setsinger(artist)
    } catch (error) {}
  }

  //mv limit
  const [mvLimit, setMvLimit] = useState(10)
  //mv是否正在加载新数据
  const [mvLoading, setMvLoading] = useState(false)
  //mv是否还有更多数据
  const [mvHasMore, setMvHasMore] = useState(true)
  //mv offset
  const [mvOffset, setMvOffset] = useState(0)
  //mv混合查询条件
  const [mvCombineCondition, setMvCombineCondition] = useState({
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
        data: { mvs, hasMore }
      } = await getSingerMvsAPI({ ...mvCombineCondition })
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
    } catch (error) {}
  }

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

  useEffect(() => {
    //第一次进入页面 将页面滚动到顶部
    ScrollTop(0, 600)
    //判断索引切换 加载相应的数据
    switch (currentIndex) {
      //加载单曲
      case 0:
        getSingerSongs(id).then(({ data: { songs } }) => {
          setSingerSongs(songs)
        })
        break
      //加载专辑
      case 1:
        getSingerAlbums(albumCombineCondition)
        break
      //加载mv
      case 2:
        getSingerMvs(mvCombineCondition)
        break
      default:
        break
    }
  }, [currentIndex])
  //获取歌手信息只执行一次
  useEffect(() => {
    getSingerInfo()
  }, [])
  const mvLoadMore = useCallback(() => {
    getSingerMvs({ ...mvCombineCondition, offset: mvOffset })
  }, [mvCombineCondition, mvOffset])
  const albumLoadMore = useCallback(() => {
    if (!albumHasMore) return
    getSingerAlbums({ ...albumCombineCondition, offset: albumOffset })
  }, [albumHasMore, albumCombineCondition, albumOffset])
  return (
    <div className='singer-profile-container'>
      <div className='singer-profile-box w-1200'>
        <div className='singer-avatar'>
          <LazyLoadImg url={singer && singer.cover} width={200} height={200} />
        </div>
        <div className='singer-profile'>
          <h1>{singer.name}</h1>
          <p>{singer.briefDesc}</p>
        </div>
      </div>
      <div className='singer-category w-1200'>
        <Category
          Tabs={Tabs}
          switchTabs={switchTabs}
          currentIndex={currentIndex}
        />
        <div className='singer-artist-size'>
          <p className={currentIndex === 0 ? 'active' : ''}>
            {singer.musicSize}
          </p>
          <p className={currentIndex === 1 ? 'active' : ''}>
            {singer.albumSize}
          </p>
          <p className={currentIndex === 2 ? 'active' : ''}>{singer.mvSize}</p>
        </div>
      </div>

      <div className='singer-hotsongs-list w-1200'>
        <div>
          {currentIndex === 0 && singerSongs && (
            <SongCover song={singerSongs} />
          )}
        </div>

        <div>
          {currentIndex === 1 ? (
            <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              loadMore={albumLoadMore}
              hasMore={albumHasMore && !albumLoading}
              useWindow={true}
            >
              {singerAlbums.length === 0 ? (
                <MVSkeleton limit={albumLimit} />
              ) : null}
              <div className='newalbum-container'>
                {currentIndex === 1 &&
                  singerAlbums &&
                  singerAlbums.map(item => {
                    return <NewAlbumCover album={item} key={item.id} />
                  })}
              </div>
            </InfiniteScroll>
          ) : null}
          <div className='loading'>
            {albumLoading ? <Spin size='large' /> : null}
          </div>
        </div>

        <div>
          {currentIndex === 2 ? (
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
          ) : null}
          <div className='loading'>
            {mvLoading ? <Spin size='large' /> : null}
          </div>
        </div>
      </div>
    </div>
  )
})
