import React, { memo, createElement, useState, useEffect } from 'react'
import { Comment } from 'antd'
import { Avatar, Image } from 'antd'
import moment from 'moment'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { showLoginBoxDispatch } from '@/pages/LoginBox/store/actionCreators'
import { likeComment as likeCommentAPI } from '@/api/comment'
import { LikeOutlined, LikeFilled } from '@ant-design/icons'
import ReplyComment from './cpn/replyComment'

export default memo(function CommentList(props) {
  //id 父组件传递的当前评论的资源id
  //resourceType 当前评论的资源类型
  //  0: 歌曲
  // 1: mv
  // 2: 歌单
  // 3: 专辑
  // 4: 电台
  // 5: 视频
  // 6: 动态

  const { resourceType, id } = props
  //获取用户登录状态
  const { isLogin } = useSelector(state => {
    return {
      isLogin: state.user.isLogin
    }
  }, shallowEqual)
  const dispatch = useDispatch()
  //控制组件重新渲染
  const [flag, setFlag] = useState(false)
  //控制回复框的展示和隐藏
  const [showReplyComment, setShowReplyComment] = useState(false)
  //获取父组件传递过来的评论的数据
  const [comment, setComment] = useState(props.comment)

  //actions渲染对评论进行的操作
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
    getCommentById(arr, commentId)
    //用于点赞后重新渲染组件
    setFlag(!flag)
  }
  //获取当前点赞的评论 发送点赞请求
  const getCommentById = (comment, commentId) => {
    //如果当前传递过来的评论的commentId等于最外层的评论的commentId 就直接修改这个最外层的评论的点赞状态
    if (commentId === comment.commentId) {
      likeComment(comment, commentId)
    } else {
      //否则 遍历最外层的评论的children 判断是否有children的commentId等于传递的commentID 如果有 修改这个评论的点赞状态
      comment.children.forEach(e => {
        if (commentId === e.commentId) {
          e.liked = !e.liked
          let type = e.liked ? 1 : 0
          e.liked ? e.likedCount++ : e.likedCount--
          //发送点赞请求
          //id 资源id
          //commentId 点赞的评论的commentId
          //type 点赞类型 1是点赞 0 是取消点赞
          //resourceType 资源类型
          likeCommentAPI(id, commentId, type, resourceType)
        }
      })
    }
    //调用父组件的方法 查询渲染修改后的comment数据 好像不需要
    // setComment(comment)
  }
  //发送点赞请求
  const likeComment = (comment, commentId) => {
    //取反点赞状态
    comment.liked = !comment.liked
    //根据点赞状态更改点赞数量
    comment.liked ? comment.likedCount++ : comment.likedCount--
    let type = comment.liked ? 1 : 0
    likeCommentAPI(id, commentId, type, resourceType)
  }
  //跳转到用户详情
  const handleClick = id => {
    window.open(`/#/profile/user/${id}`)
  }
  return (
    <div className='comment-container w-1200'>

    
      <Comment
        actions={actions(comment)}
        author={comment.user && comment.user.nickname}
        avatar={
          <Avatar
            onClick={() => handleClick(comment.user.userId)}
            src={comment.user && comment.user.avatarUrl}
          />
        }
        content={comment.content}
        datetime={moment(comment.time).format('YYYY-MM-DD HH:mm:ss')}
      >
        {/* 回复评论组件只有一级评论才有 */}
        {showReplyComment ? (
          <ReplyComment
            setShowReplyComment={setShowReplyComment}
            id={id}
            commentId={comment.commentId}
            setComment={setComment}
            comment={comment}
            resourceType={resourceType}
          />
        ) : null}
        {comment.children &&
          comment.children.map(item => {
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
