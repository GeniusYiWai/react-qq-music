import React, { memo, useEffect, useState, useCallback, useRef } from 'react'
import { useParams } from 'react-router'
import { toTree } from '@/utils/tools'
import PlaylistDetailCover from 'components/Playlist/playlistDetailCover'
import Comment from 'components/Comment'
import { getPlaylistComment as getPlaylistCommentAPI } from '@/api/comment'
import {
  getPlaylistDeatil as getPlaylistDeatilAPI,
  getPlaylistStatus as getPlaylistStatusAPI
} from '@/api/playlist'
import { getMusicById } from '@/api/player'
import LazyLoadImg from 'components/Common/lazyloadImg'
import PublishComment from 'components/Comment/cpn/publishComment'
import Actions from 'components/Actions'
import { ScrollTop } from '@/utils/tools'
import Empty from 'components//Common/empty'
import { message,Alert } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import './index.less'
//资源类型 2代表歌单
const resourceType = 2
export default memo(function PlaylistDetail() {
  //获取评论区域的ref引用
  const commentRef = useRef()
  const params = useParams()
  //获取当前的歌单id
  const { id } = params
  //state
  //热门评论
  const [hotComments, setHotComments] = useState([])
  //全部评论
  const [totalComments, setTotalComments] = useState([])
  //评论总数
  const [totalNum, setTotalNum] = useState(0)
  //歌单详情
  const [playlistDetail, setPlaylistDetail] = useState({})
  //歌单下的歌曲
  const [playlistSongs, setPlaylistSongs] = useState([])
  //歌单收藏状态
  const [collect, setCollect] = useState(false)
  //偏移量 用于分页 计算方式  ( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
  const [offset, setOffset] = useState(0)
  //是否正在加载新数据
  const [loading, setLoading] = useState(false)
  //判断是否是第一次加载页面
  //每页大小
  const [limit] = useState(10)
  const [flag, setFlag] = useState(true)
  //是否还有更多数据
  const [hasMore, setHasMore] = useState(true)
  //评论查询条件
  const [combineCondition] = useState({
    id,
    limit,
    offset
  })
  //fucntions
  //获取歌单是否收藏
  const getPlaylistStatus = async () => {
    try {
      const {
        data: { subscribed, code }
      } = await getPlaylistStatusAPI(id)
      if (code === 200) {
        setCollect(subscribed)
      }
    } catch (error) {
      message.error('获取歌单收藏状态失败!')
    }
  }
  //获取歌单详情
  const getPlaylistDetail = async () => {
    try {
      const {
        data: { playlist, code }
      } = await getPlaylistDeatilAPI(id)
      if (code === 200) {
        setPlaylistDetail(playlist)
        const trackIds = playlist.trackIds.slice(0,100).map(item => item.id).join(',')
        const {
          data: { songs }
        } = await getMusicById(trackIds)
        setPlaylistSongs(songs)
      }
    } catch (error) {
      const { message:msg } = error.data
      message.error(msg ? msg : '获取歌单详情失败!')
    }
  }

  //获取歌单评论
  const getPlaylistComment = async combineCondition => {
    //上锁
    setLoading(true)
    try {
      const {
        data: { comments, code, more }
      } = await getPlaylistCommentAPI({ ...combineCondition })
      if (code === 200) {
        // comments 总评论
        //返回的数据结构是一级评论parentid为0 二级评论的parentId为回复的评论的commentId 需要进行格式化
        setTotalComments(totalComments => {
          //开锁
          setLoading(false)
          setHasMore(more)
          //将新数据与旧数据合并
          return toTree(totalComments.concat(comments), 0)
        })
        //设置偏移量
        setOffset(offset + limit + 1)
        //取反第一次加载页面
        setFlag(false)
      }
    } catch (error) {
      setTotalNum(0)
      message.error('获取歌单评论失败!')
    }
  }
  //获取歌单热门评论
  const getPlaylistHotComment = async () => {
    try {
      const {
        data: { hotComments, total, code }
      } = await getPlaylistCommentAPI({ id, limit: 20, offset: 0 })
      // hotComments 热门评论
      // total 评论总数
      //设置评论总数
      if (code === 200) {
        setTotalNum(total)
        //返回的数据结构是一级评论parentid为0 二级评论的parentId为回复的评论的commentId 需要进行格式化
        setHotComments(toTree(hotComments, 0))
      }
    } catch (error) {
      setTotalNum(0)
      message.error('获取歌单评论失败!')
    }
  }
  useEffect(() => {
    //第一次进入页面 将页面滚动到顶部
    ScrollTop(0, 300)
    getPlaylistDetail()
    getPlaylistComment(combineCondition)
    getPlaylistHotComment()
    getPlaylistStatus()
  }, [])
  //滚动到评论区域
  const ScrollToComment = useCallback(() => {
    ScrollTop(commentRef.current.offsetTop, 600)
  }, [])
  const loadMore = useCallback(() => {
    //如果是第一次加载页面 不执行loadMore
    if (flag) return
    getPlaylistComment({ ...combineCondition, offset })
  }, [flag, combineCondition, offset])
  return (
    <div className='pl-detail-container w-1200'>
      <div className='pl-detail-top'>
        <div className='pl-detail-cover'>
          <LazyLoadImg
            url={playlistDetail && playlistDetail.coverImgUrl}
            width={250}
            height={250}
          />
        </div>
        <div className='pl-detail-info'>
          <h2>{playlistDetail && playlistDetail.name}</h2>
          <p>
            作者:
            {playlistDetail &&
              playlistDetail.creator &&
              playlistDetail &&
              playlistDetail.creator.nickname}
          </p>
          <p>
            标签:
            {playlistDetail &&
              playlistDetail.tags &&
              playlistDetail &&
              playlistDetail.tags.map(item => item + ' ')}
          </p>
          <p>播放量:{playlistDetail && playlistDetail.playCount}</p>
          <p>收藏量:{playlistDetail && playlistDetail.subscribedCount}</p>
        </div>

        <div className='pl-detail-description'>
          <h3>简介:</h3>
          <p>{playlistDetail && playlistDetail.description}</p>
        </div>
      </div>
      <Alert
        message='出于性能考虑，歌单只展示以及播放前100首，可自行修改。'
        type='info'
        closable
      />
      <Actions
        totalNum={totalNum}
        collect={collect}
        setCollect={setCollect}
        id={id}
        resourceType={resourceType}
        ScrollToComment={ScrollToComment}
        playlistId={playlistDetail.creator && playlistDetail.creator.userId}
      />
      <div className='pl-songs-container'>
        {playlistSongs &&
          playlistSongs.map(song => {
            return <PlaylistDetailCover song={song} key={song.id} />
          })}
      </div>
      <div ref={commentRef}>
        <PublishComment
          totalNum={totalNum}
          id={id}
          setTotalComments={setTotalComments}
          totalComments={totalComments}
          setTotalNum={setTotalNum}
          resourceType={resourceType}
        />
      </div>

      {hotComments.length !== 0 ? <h3>热门评论</h3> : null}
      {hotComments.map(item => {
        return (
          <Comment
            comment={item}
            id={id}
            key={item.time}
            resourceType={resourceType}
          />
        )
      })}
      <h3>{`共${totalNum}条评论`}</h3>
      {totalComments.length === 0 ? (
        <Empty text='暂无评论' showBtn={false} />
      ) : null}
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={loadMore}
        hasMore={!loading && hasMore}
        useWindow={true}
      >
        {totalComments.map(item => {
          return (
            <Comment
              comment={item}
              id={id}
              key={item.commentId}
              resourceType={resourceType}
            />
          )
        })}
      </InfiniteScroll>
    </div>
  )
})
