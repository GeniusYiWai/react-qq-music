import React, { memo, useState, useCallback, useEffect } from 'react'
import { getSingerSongs as getSingerSongsAPI } from '@/api/singer'
import SongCover from 'components/Album/albumDetailCover'
import InfiniteScroll from 'react-infinite-scroller'
import { Spin, message } from 'antd'
export default memo(function SingerSong(props) {
  const { id } = props
  //歌手歌曲
  const [singerSongs, setSingerSongs] = useState([])
  //歌曲 limit
  const [songLimit, setSongLimit] = useState(50)
  //歌曲是否正在加载新数据
  const [songLoading, setSongLoading] = useState(false)
  //歌曲是否还有更多数据
  const [songHasMore, setSongHasMore] = useState(true)
  //歌曲 offset
  const [songOffset, setSongOffset] = useState(0)
  //歌曲混合查询条件
  const [songCombineCondition, setSongCombineCondition] = useState({
    id: id,
    //偏移量
    offset: songOffset,
    //每页数据条数
    limit: songLimit
  })
  //获取歌手歌曲
  const getSingerSongs = async songCombineCondition => {
    //上锁
    setSongLoading(true)
    try {
      const {
        data: { songs, more, code }
      } = await getSingerSongsAPI({ ...songCombineCondition })
      if (code === 200) {
        //赋值歌曲数据 因为新数据是加到旧数据的后面 所以用concat方法
        setSingerSongs(singerSongs => {
          //开锁
          setSongLoading(false)
          setSongHasMore(more)
          //将新数据与旧数据合并
          return singerSongs.concat(songs)
        })
        //设置偏移量
        setSongOffset(songOffset + songLimit)
      } else {
        throw new Error()
      }
    } catch (error) {
      message.error('获取歌手单曲失败!')
    }
  }
  const songLoadMore = useCallback(() => {
    if (!songHasMore) return
    getSingerSongs({ ...songCombineCondition, offset: songOffset })
  }, [songCombineCondition, songOffset, songHasMore])
  useEffect(() => {
    getSingerSongs(songCombineCondition)
    return () => {
      setSingerSongs([])
      setSongOffset(0)
    }
  }, [])
  return (
    <div>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={songLoadMore}
        hasMore={songHasMore && !songLoading}
        useWindow={true}
      >
        <SongCover song={singerSongs} />
        <div className='loading'>
          {songLoading ? <Spin size='large' /> : null}
        </div>
      </InfiniteScroll>
    </div>
  )
})
