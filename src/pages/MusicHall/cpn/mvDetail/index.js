import React, { memo, useEffect, useState, useCallback, useRef } from 'react'
import { useParams } from 'react-router-dom'
import MvPlayer from './cpn/mvPlayer'
import MvRecommend from './cpn/mvRecommend'
import { handleSinger } from '@/utils/tools'
import { toTree } from '@/utils/tools'
import Comment from 'components/Comment'
import PublishComment from 'components/Comment/cpn/publishComment'
import { getMvComment as getMvCommentAPI } from '@/api/comment'
import {
  getMvDeatil as getMvDeatilAPI,
  getMvUrl as getMvUrlAPI,
  getSimiMv as getSimiMvAPI
} from '@/api/mv'
import InfiniteScroll from 'react-infinite-scroller'
import Actions from 'components/Actions'
import Empty from 'components//Common/empty'
import { ScrollTop } from '@/utils/tools'
import { message, Alert } from 'antd'
import './index.less'
//资源类型 1代表mv
const resourceType = 1
export default memo(function MvDetail() {
  //获取评论区域的ref引用
  const commentRef = useRef()
  //获取mv播放器的ref引用
  const videoRef = useRef()
  const params = useParams()
  //从url中获取mvid
  const { id } = params
  //state
  //热门评论
  const [hotComments, setHotComments] = useState([])
  //全部评论
  const [totalComments, setTotalComments] = useState([])
  //评论总数
  const [totalNum, setTotalNum] = useState(0)
  //mv详情
  const [mvDetail, setMvDetail] = useState({})
  //mv播放地址
  const [mvUrl, setMvUrl] = useState('')
  //相似mv
  const [simiMvs, setSimiMvs] = useState([])
  //mv收藏状态
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
  //functions
  //获取mv详情
  const getMvDetail = async () => {
    try {
      const {
        data: { data, code }
      } = await getMvDeatilAPI(id)
      if (code === 200) {
        setMvDetail(data)
      } else {
        message.error('获取mv详情失败!')
      }
    } catch (error) {
      message.error('获取mv详情失败!')
    }
  }
  //获取mv播放地址
  const getMvUrl = async () => {
    try {
      const {
        data: {
          data: { url, code }
        }
      } = await getMvUrlAPI(id)
      if (code === 200) {
        setMvUrl(url)
      }
    } catch (error) {
      message.error('获取mv播放地址失败!')
    }
  }
  //获取相似mv
  const getSimiMv = async () => {
    try {
      const {
        data: { mvs, code }
      } = await getSimiMvAPI(id)
      if (code === 200) {
        setSimiMvs(mvs)
      }
    } catch (error) {
      message.error('获取推荐mv失败!')
    }
  }

  //获取热门评论
  const getMvHotComment = async () => {
    try {
      const {
        data: { hotComments, code, total }
      } = await getMvCommentAPI({ id, limit: 20, offset: 0 })
      if (code === 200) {
        // hotComments 热门评论
        // total 评论总数
        //设置评论总数
        setTotalNum(total)
        setHotComments(toTree(hotComments, 0))
      }
    } catch (error) {
      setTotalNum(0)
      message.error('获取评论失败!')
    }
  }
  //获取mv下的评论
  const getMvComment = async combineCondition => {
    //上锁
    setLoading(true)
    try {
      const {
        data: { comments, code, more }
      } = await getMvCommentAPI({ ...combineCondition })
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
      message.error('获取评论失败!')
    }
  }
  //滚动到评论区域
  const ScrollToComment = useCallback(() => {
    ScrollTop(commentRef.current.offsetTop, 600)
  }, [])
  //滚动到顶部
  const ScrollToTop = useCallback(() => {
    ScrollTop(0, 300)
  }, [])
  //这个方法用来手动控制mv的播放
  const playVideo = () => {
    videoRef.current.playVideo()
  }
  useEffect(() => {
    //第一次进入页面 将页面滚动到顶部
    ScrollTop(0, 300)
    getMvDetail()
    getSimiMv()
    getMvUrl()
    getMvHotComment()
    getMvComment(combineCondition)
  }, [])
  const loadMore = useCallback(() => {
    //如果是第一次加载页面 不执行loadMore
    if (flag) return
    getMvComment({ ...combineCondition, offset })
  }, [flag, combineCondition, offset])
  return (
    <div className='mv-detail-container w-1200'>
      <MvPlayer mvUrl={mvUrl} ref={videoRef} />
      <MvRecommend simiMvs={simiMvs} />
      <div className='mv-descrption'>
        <h2>视频简介</h2>
        <p>名称:{mvDetail.name}</p>
        <p>作者:{mvDetail.artists && handleSinger(mvDetail.artists)}</p>
        <p>发行时间:{mvDetail.publishTime}</p>
      </div>
      <Alert
        message='由于mv没有获取收藏状态的接口,所以所有mv默认都是未收藏'
        type='warning'
      />
      <Actions
        totalNum={totalNum}
        collect={collect}
        setCollect={setCollect}
        id={id}
        resourceType={resourceType}
        ScrollToComment={ScrollToComment}
        ScrollToTop={ScrollToTop}
        playVideo={playVideo}
      />
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
