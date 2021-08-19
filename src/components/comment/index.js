import React, { memo, createElement, useState } from 'react'
import { Comment } from 'antd'
import { Avatar, message } from 'antd'
import moment from 'moment'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { showLoginBoxDispatch } from '@/pages/LoginBox/store/actionCreators'
import { likeComment as likeCommentAPI } from '@/api/comment'
import { LikeOutlined, LikeFilled } from '@ant-design/icons'
import ReplyComment from './cpn/replyComment'
//评论组件
export default memo(function CommentList(props) {
  //props
  //id 父组件传递的当前评论的资源id
  //resourceType 当前评论的资源类型
  // 0: 歌曲
  // 1: mv
  // 2: 歌单
  // 3: 专辑
  // 4: 电台
  // 5: 视频
  // 6: 动态
  const { resourceType, id } = props
  //state
  //控制组件重新渲染
  const [flag, setFlag] = useState(false)
  //控制回复框的展示和隐藏
  const [showReplyComment, setShowReplyComment] = useState(false)
  //获取父组件传递过来的评论的数据
  const [comment, setComment] = useState(props.comment)
  //redux
  const dispatch = useDispatch()
  //获取用户登录状态
  const { isLogin } = useSelector(state => {
    return {
      isLogin: state.user.isLogin
    }
  }, shallowEqual)

  //处理点赞和取消点赞评论
  const handleLike = commentId => {
    //先判断是否登录 如果没有登录 展示登录盒子
    if (!isLogin) {
      dispatch(showLoginBoxDispatch(true))
      return
    }
    //通过当前点赞的评论的id找到他的父id
    getCommentById(comment, commentId)
    //用于点赞后重新渲染组件
    setFlag(!flag)
  }
  //获取当前点赞的评论 发送点赞请求
  const getCommentById = (comment, commentId) => {
    //如果当前传递过来的评论的commentId等于最外层的评论的commentId 就直接修改这个最外层的评论的点赞状态
    if (commentId === comment.commentId) {
      likeComment(comment, id, commentId, resourceType)
    } else {
      //否则 遍历最外层的评论的children 判断是否有children的commentId等于传递的commentID 如果有 修改这个评论的点赞状态
      comment.children.forEach(e => {
        if (commentId === e.commentId) {
          likeComment(e, id, commentId, resourceType)
        }
      })
    }
  }

  //发送点赞评论请求
  const likeComment = async (e, id, commentId, resourceType) => {
    try {
      e.liked = !e.liked
      //获取操作类型 1是点赞 0是取消点赞
      let type = e.liked ? 1 : 0
      //重新计算点赞次数
      e.liked ? e.likedCount++ : e.likedCount--
      //发送点赞请求
      //id 资源id
      //commentId 点赞的评论的commentId
      //type 点赞类型 1是点赞 0 是取消点赞
      //resourceType 资源类型
      const { data } = await likeCommentAPI(id, commentId, type, resourceType)
      if (data.code === 200) {
        message.success('操作成功')
      }
    } catch (error) {
      message.error('操作失败!')
    }
  }
  //跳转到用户详情
  const goToUserDetail = id => {
    window.open(`/#/profile/user/${id}`)
  }
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
  return (
    <div className='comment-container w-1200'>
      <Comment
        actions={actions(comment)}
        author={comment.user && comment.user.nickname}
        avatar={
          <Avatar
            onClick={() => goToUserDetail(comment.user.userId)}
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
