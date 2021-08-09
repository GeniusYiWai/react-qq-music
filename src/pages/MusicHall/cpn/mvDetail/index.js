import React, { memo, useEffect, useState, useCallback, useRef } from 'react'
import { useParams } from 'react-router-dom'
import MvPlayer from './cpn/mvPlayer'
import MvRecommend from './cpn/mvRecommend'
import { handleSinger } from '@/utils/tools'
import './index.less'
import { toTree } from '@/utils/tools'
import Comment from 'components/Comment'
import PublishComment from 'components/Comment/cpn/publishComment'
import { getMvComment as getMvCommentAPI } from '@/api/comment'
import {
  getMvDeatil as getMvDeatilAPI,
  getMvUrl as getMvUrlAPI,
  getSimiMv as getSimiMvAPI
} from '@/api/mv'
import Actions from 'components/Actions'
import { ScrollTop } from '@/utils/tools'
//资源类型 1代表mv
const resourceType = 1
export default memo(function MvDetail() {
  const commentRef = useRef()
  const videoRef = useRef()
  const params = useParams()
  const { id } = params
  //热门评论
  const [hotComments, setHotComments] = useState([])
  //全部评论
  const [totalComments, setTotalComments] = useState([])
  //评论总数
  const [totalNum, setTotalNum] = useState(0)
  const [mvDetail, setMvDetail] = useState({})
  const [mvUrl, setMvUrl] = useState('')
  const [simiMvs, setSimiMvs] = useState([])
  const [collect, setCollect] = useState(false)
  //获取mv详情
  const getMvDetail = useCallback(async () => {
    const {
      data: { data }
    } = await getMvDeatilAPI(id)
    setMvDetail(data)
  }, [])
  //获取mv播放地址
  const getMvUrl = useCallback(async () => {
    const {
      data: {
        data: { url }
      }
    } = await getMvUrlAPI(id)
    setMvUrl(url)
  }, [])
  //获取相似mv
  const getSimiMv = useCallback(async () => {
    const {
      data: { mvs }
    } = await getSimiMvAPI(id)
    setSimiMvs(mvs)
  }, [])
  const getMvComment = useCallback(async () => {
    const {
      data: { comments, hotComments, total }
    } = await getMvCommentAPI(id)
    // comments 总评论
    // hotComments 热门评论
    // total 评论总数
    //设置评论总数
    setTotalNum(total)
    //返回的数据结构是一级评论parentid为0 二级评论的parentId为回复的评论的commentId 需要进行格式化
    setHotComments(toTree(hotComments, 0))
    setTotalComments(toTree(comments, 0))
  }, [id])
  const ScrollToComment = useCallback(() => {
    ScrollTop(commentRef.current.offsetTop, 600)
  }, [])
  const ScrollToTop = useCallback(() => {
    ScrollTop(0, 300)
  }, [])
  useEffect(() => {
    getMvDetail()
    getSimiMv()
    getMvUrl()
    getMvComment()
  }, [id])
  //这个方法用来手动控制mv的播放
  const playVideo = () => {
    videoRef.current.playVideo()
  }
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
        <h3>热门评论</h3>
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
      </div>
    </div>
  )
})
