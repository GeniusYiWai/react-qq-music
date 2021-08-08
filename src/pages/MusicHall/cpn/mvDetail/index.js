import React, { memo, useEffect, useState } from 'react'
import { setMvDetailDispatch } from './store/actionCreators'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import MvPlayer from './cpn/mvPlayer'
import MvRecommend from './cpn/mvRecommend'
import { handleSinger } from '@/utils/tools'
import './index.less'

import { toTree } from '@/utils/tools'
import Comment from 'components/Comment'
import PublishComment from 'components/Comment/cpn/publishComment'

import { getMvComment as getMvCommentAPI } from '@/api/comment'
//资源类型 1代表mv
const resourceType = 1
export default memo(function MvDetail() {
  const dispatch = useDispatch()
  const params = useParams()
  const { id } = params
  const { mvDetail } = useSelector(state => {
    return {
      mvDetail: state.mvDetail.mvDetail
    }
  })
  //热门评论
  const [hotComments, setHotComments] = useState([])
  //全部评论
  const [totalComments, setTotalComments] = useState([])
  //评论总数
  const [totalNum, setTotalNum] = useState(null)

  useEffect(() => {
  
    dispatch(setMvDetailDispatch(id))
    //获取歌单下的评论
    getMvCommentAPI(id).then(({ data: { comments, hotComments, total } }) => {
      // comments 总评论
      // hotComments 热门评论
      // total 评论总数
      //设置评论总数
      setTotalNum(total)
      //返回的数据结构是一级评论parentid为0 二级评论的parentId为回复的评论的commentId 需要进行格式化
      setHotComments(toTree(hotComments, 0))
      setTotalComments(toTree(comments, 0))
    })

  }, [id])
  return (
    <div className='mv-detail-container w-1200'>
      <MvPlayer id={id} />
      <MvRecommend id={id} />
      <div className='mv-descrption'>
        <h2>视频简介</h2>
        <p>名称:{mvDetail.name}</p>
        <p>作者:{mvDetail.artists && handleSinger(mvDetail.artists)}</p>
        <p>发行时间:{mvDetail.publishTime}</p>
      </div>
      <div className='song-comment-container w-1200'>
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
