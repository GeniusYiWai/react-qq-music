import React, { memo, createElement, useState } from 'react'
import { Comment } from 'antd'
import moment from 'moment'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { showLoginBoxDispatch } from '@/pages/Mine/store/actionCreators'
import { likeComment as likeCommentAPI } from '@/api/comment'
import { LikeOutlined, LikeFilled } from '@ant-design/icons'
import ReplyComment from './cpn/reply'
export default memo(function CommentList(props) {
  //获取用户登录状态
  const { isLogin } = useSelector(state => {
    return {
      isLogin: state.user.isLogin
    }
  }, shallowEqual)
  const dispatch = useDispatch()
  //获取当前歌单的id
  const { id } = props
  //控制组件重新渲染
  const [flag, setFlag] = useState(false)
  //控制回复框的展示和隐藏
  const [showReplyComment, setShowReplyComment] = useState(false)
  //父组件传递过来的评论的数据
  const [comment, setComment] = useState(props.comment)
  //commentId 评论的id
  //liked 是否点赞
  //likedCount 点赞总数
  //showReply 是否展示回复按钮
  const actions = ({ commentId, liked, likedCount }, showReply = true) => {
    return [
      <span
        onClick={() => {
          handleLike(commentId)
        }}
      >
        {/* 如果点赞了就显示点赞图标 */}
        {createElement(liked ? LikeFilled : LikeOutlined)}
        <span className='comment-action'>{likedCount}</span>
      </span>,

      <span
        key='comment-basic-reply-to'
        // 展示回复框
        onClick={() => setShowReplyComment(!showReplyComment)}
      >
        {showReply ? '回复' : null}
      </span>
    ]
  }
  //点赞评论
  const handleLike = commentId => {
    //先判断是否登录 如果没有登录 展示登录盒子
    if (!isLogin) {
      dispatch(showLoginBoxDispatch(true))
      return
    }
    let arr = comment
    getCommentById(arr)
    //重新渲染组件
    setFlag(!flag)
  }
  //获取当前点赞的评论 发送点赞请求
  const getCommentById = (comment, commentId) => {
    if (commentId === comment.commentId) {
      likeComment(comment, commentId)
    } else {
      comment.children.forEach(e => {
        if (commentId === e.commentId) {
          e.liked = !e.liked
          let type = e.liked ? 1 : 0
          e.liked ? e.likedCount++ : e.likedCount--
          likeCommentAPI(id, commentId, type, 2)
        }
      })
    }
    setComment(comment)
  }
  //发送点赞请求
  const likeComment = (comment, commentId) => {
    //取反点赞状态
    comment.liked = !comment.liked
    ////根据点赞状态更改点赞数量
    comment.liked ? comment.likedCount++ : comment.likedCount--
    let type = comment.liked ? 1 : 0
    likeCommentAPI(id, commentId, type, 2)
  }
  return (
    <div className='comment-container w-1200'>
      <Comment
        actions={actions(comment)}
        author={comment.user && comment.user.nickname}
        avatar={comment.user && comment.user.avatarUrl}
        content={comment.content}
        datetime={moment(comment.time).format('YYYY-MM-DD HH:mm:ss')}
      >
        {showReplyComment ? (
          <ReplyComment
            setShowReplyComment={setShowReplyComment}
            id={id}
            commentId={comment.commentId}
            setComment={setComment}
            comment={comment}
          />
        ) : null}
        {comment.children.map(item => {
          return (
            <Comment
              actions={actions(item, false)}
              author={item.user && item.user.nickname}
              avatar={item.user && item.user.avatarUrl}
              content={item.content}
              datetime={moment(item.time).format('YYYY-MM-DD HH:mm:ss')}
              key={item.commentId}
            />
          )
        })}
      </Comment>
    </div>
  )
})
