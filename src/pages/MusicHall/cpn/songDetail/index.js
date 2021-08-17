import React, { memo, useEffect, useState, useRef, useCallback } from 'react'
import { useParams } from 'react-router'
import { toTree } from '@/utils/tools'
import Comment from 'components/Comment'
import PublishComment from 'components/Comment/cpn/publishComment'
import { getSongDeatil as getSongDeatilAPI } from '@/api/song'
import { handleSinger } from '@/utils/tools'
import LyricParser from 'lyric-parser'
import LazyLoadImg from 'components/Common/lazyloadImg'
import Actions from 'components/Actions'
import { ScrollTop } from '@/utils/tools'
import { getLyric as getLyricAPI } from '@/api/player'
import { getSongComment as getSongCommentAPI } from '@/api/comment'
import InfiniteScroll from 'react-infinite-scroller'
import { message } from 'antd'
import Empty from 'components//Common/empty'
import './index.less'
//资源类型 0代表歌曲
const resourceType = 0
export default memo(function SongDetail() {
  //获取评论区域的ref引用
  const commentRef = useRef()
  const params = useParams()
  //获取当前的歌曲id
  const { id } = params
  //歌曲详情
  const [songDetail, setSongDetail] = useState({})
  //歌词
  const [lyric, setLyric] = useState({})
  //热门评论
  const [hotComments, setHotComments] = useState([])
  //全部评论
  const [totalComments, setTotalComments] = useState([])
  //评论总数
  const [totalNum, setTotalNum] = useState(0)
  const [collect, setCollect] = useState(0)
  //偏移量 用于分页 计算方式  ( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
  const [offset, setOffset] = useState(0)
  //是否正在加载新数据
  const [loading, setLoading] = useState(false)
  //判断是否是第一次加载页面
  //每页大小
  const [limit, setLimit] = useState(10)
  const [flag, setFlag] = useState(true)
  //是否还有更多数据
  const [hasMore, setHasMore] = useState(true)
  const [combineCondition, setCombineCondition] = useState({
    id,
    limit,
    offset
  })
  //获取歌曲下的评论
  const getSongComment = async combineCondition => {
    //上锁
    setLoading(true)
    try {
      const {
        data: { comments, code, more }
      } = await getSongCommentAPI({ ...combineCondition })
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
        setOffset(offset + limit+1)
        //取反第一次加载页面
        setFlag(false)
      }
    } catch (error) {
      setTotalNum(0)
      message.error('获取歌单评论失败!')
    }
  }
  //获取歌曲下的热门评论
  const getSongHotComment = async () => {
    try {
      const {
        data: { hotComments, total, code }
      } = await getSongCommentAPI({ id, limit: 20, offset: 0 })
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
  //获取歌曲详情
  const getSongDeatil = async () => {
    try {
      const {
        data: { songs }
      } = await getSongDeatilAPI(id)
      setSongDetail(songs[0])
    } catch (error) {}
  }
  //获取歌词
  const getLyric = async () => {
    try {
      const {
        data: { nolyric, lrc }
      } = await getLyricAPI(id)
      if (nolyric) {
        setLyric([{ txt: '纯音乐,敬请欣赏!' }])
      } else {
        setLyric(new LyricParser(lrc.lyric))
      }
    } catch (error) {}
  }
  //滚动到评论区域
  const ScrollToComment = () => {
    ScrollTop(commentRef.current.offsetTop, 600)
  }
  useEffect(() => {
    //第一次进入页面 将页面滚动到顶部
    ScrollTop(0, 300)
    getSongDeatil()
    getLyric()
    getSongComment(combineCondition)
    getSongHotComment()
  }, [])
  const loadMore = useCallback(() => {
    //如果是第一次加载页面 不执行loadMore
    if (flag) return
    getSongComment({ ...combineCondition, offset })
  }, [flag, combineCondition, offset])
  return (
    <div className='song-detail-wrapper'>
      <div className='song-detail-container w-1200'>
        <div className='song-detail-cover'>
          <LazyLoadImg
            url={songDetail.al && songDetail.al.picUrl}
            width={250}
            height={250}
          />
        </div>
        <div className='song-detail-info'>
          <h1>{songDetail.name}</h1>
          <p>作者:{handleSinger(songDetail.ar)}</p>
          <p>
            专辑:
            {songDetail.al && songDetail.al.name}
          </p>
        </div>
        <Actions
          totalNum={totalNum}
          collect={collect}
          setCollect={setCollect}
          songDetail={songDetail}
          id={id}
          resourceType={resourceType}
          ScrollToComment={ScrollToComment}
        />
      </div>
      <div className='song-lyric w-1200'>
        {lyric.lines &&
          lyric.lines.map((item, index) => {
            return <p key={index}>{item.txt}</p>
          })}
      </div>

      <div className='song-comment-container w-1200' ref={commentRef}>
        <PublishComment
          totalNum={totalNum}
          id={id}
          setTotalComments={setTotalComments}
          totalComments={totalComments}
          setTotalNum={setTotalNum}
          resourceType={resourceType}
        />

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
    </div>
  )
})
