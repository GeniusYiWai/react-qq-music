import React, { memo, useEffect, useState, useCallback, useRef } from 'react'
import { useParams } from 'react-router-dom'
import VideoPlayer from './cpn/videoPlayer'
import VideoRecommend from './cpn/videoRecommend'
import { handleSinger } from '@/utils/tools'
import './index.less'
import { toTree } from '@/utils/tools'
import Comment from 'components/Comment'
import PublishComment from 'components/Comment/cpn/publishComment'
import { getVideoComment as getVideoCommentAPI } from '@/api/comment'
import {
  getVideoDeatil as getVideoDeatilAPI,
  getVideoUrl as getVideoUrlAPI,
  getSimiVideo as getSimiVideoAPI
} from '@/api/video'
import Actions from 'components/Actions'
import Empty from 'components//Common/empty'
import { ScrollTop } from '@/utils/tools'
import { message } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
//资源类型 1代表Video
const resourceType = 1
export default memo(function VideoDetail() {
  //ref
  //获取评论区域的ref引用
  const commentRef = useRef()
  //获取Video播放器的ref引用
  const videoRef = useRef()
  const params = useParams()
  //从url中获取Videoid
  const { id } = params
  //state
  //热门评论
  const [hotComments, setHotComments] = useState([])
  //全部评论
  const [totalComments, setTotalComments] = useState([])
  //评论总数
  const [totalNum, setTotalNum] = useState(0)
  //Video详情
  const [videoDetail, setVideoDetail] = useState({})
  //Video播放地址
  const [videoUrl, setVideoUrl] = useState('')
  //相似Video
  const [simiVideos, setSimiVideos] = useState([])
  //Video收藏状态
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
  //获取Video详情
  const getVideoDetail = async () => {
    try {
      const {
        data: { data, code }
      } = await getVideoDeatilAPI(id)
      if (code === 200) {
        setVideoDetail(data)
      } else {
        message.error('获取视频详情失败!')
      }
    } catch (error) {
      message.error('获取视频详情失败!')
    }
  }
  //获取Video播放地址
  const getVideoUrl = async () => {
    try {
      const {
        data: {
          code,
          urls: [url]
        }
      } = await getVideoUrlAPI(id)
      if (code === 200) {
        if (url) {
          setVideoUrl(url.url)
        }
      }
    } catch (error) {
      message.error('获取视频播放地址失败!')
    }
  }
  //获取相似Video
  const getSimiVideo = async () => {
    try {
      const {
        data: { data, code }
      } = await getSimiVideoAPI(id)
      if (code === 200) {
        setSimiVideos(data)
      }
    } catch (error) {
      message.error('获取推荐视频失败!')
    }
  }
  //获取Video下的评论
  const getVideoComment = async combineCondition => {
    //上锁
    setLoading(true)
    try {
      const {
        data: { comments, code, more }
      } = await getVideoCommentAPI({ ...combineCondition })
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
  //获取专辑下的热门评论
  const getVideoHotComment = async () => {
    try {
      const {
        data: { hotComments, total, code }
      } = await getVideoCommentAPI({ id, limit: 20, offset: 0 })
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

  //滚动到评论区域
  const ScrollToComment = useCallback(() => {
    ScrollTop(commentRef.current.offsetTop, 600)
  }, [])
  //滚动到顶部
  const ScrollToTop = useCallback(() => {
    ScrollTop(0, 300)
  }, [])
  //这个方法用来手动控制Video的播放
  const playVideo = () => {
    videoRef.current.playVideo()
  }
  useEffect(() => {
    //第一次进入页面 将页面滚动到顶部
    ScrollTop(0, 300)
    //获取视频详情
    getVideoDetail()
    //获取相似视频
    getSimiVideo()
    //获取视频播放地址
    getVideoUrl()
    //获取视频评论
    getVideoComment(combineCondition)
    getVideoHotComment()
  }, [])
  const loadMore = useCallback(() => {
    //如果是第一次加载页面 不执行loadMore
    if (flag) return
    getVideoComment({ ...combineCondition, offset })
  }, [flag, combineCondition, offset])
  return (
    <div className='Video-detail-container w-1200'>
      <VideoPlayer videoUrl={videoUrl} ref={videoRef} />
      <VideoRecommend simiVideos={simiVideos} />

      <div className='Video-descrption'>
        <h2>视频简介</h2>
        <p>名称:{videoDetail && videoDetail.name}</p>
        <p>
          作者:
          {videoDetail &&
            videoDetail.artists &&
            handleSinger(videoDetail && videoDetail.artists)}
        </p>
        <p>发行时间:{videoDetail && videoDetail.publishTime}</p>
      </div>

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
                key={item.time}
                resourceType={resourceType}
              />
            )
          })}
        </InfiniteScroll>
      </div>
    </div>
  )
})
