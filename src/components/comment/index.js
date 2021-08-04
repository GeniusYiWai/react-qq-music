import React, { memo, createElement, useState } from 'react'
import { Comment } from 'antd'
import moment from 'moment'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { showLoginBoxDispatch } from '@/pages/Mine/store/actionCreators'
import { likeComment as likeCommentAPI } from '@/api/comment'
import { LikeOutlined, LikeFilled } from '@ant-design/icons'
import ReplyComment from './cpn/reply'
export default memo(function CommentList(props) {
  // const {
  //   // comment: {
  //   //   liked,
  //   //   avatar,
  //   //   author,
  //   //   content,
  //   //   datetime,
  //   //   likedCount,
  //   //   children,
  //   //   commentId
  //   // },
  //   // changeStatus,
  //   comment
  // } = props

  //获取用户登录状态
  const { isLogin } = useSelector(state => {
    return {
      isLogin: state.user.isLogin
    }
  }, shallowEqual)
  const dispatch = useDispatch()
  const { id } = props
  const [flag, setFlag] = useState(false)
  const [showReplyComment, setShowReplyComment] = useState(false)

  const [comment, setComment] = useState(props.comment)
  const actions = ({ commentId, liked, likedCount }, showReply = true) => {
    return [
      <span
        onClick={() => {
          likeComment(commentId)
        }}
      >
        {createElement(liked ? LikeFilled : LikeOutlined)}
        <span className='comment-action'>{likedCount}</span>
      </span>,

      <span
        key='comment-basic-reply-to'
        onClick={() => setShowReplyComment(!showReplyComment)}
      >
        {showReply ? '回复' : null}
      </span>
    ]
  }

  const likeComment = commentId => {
    let arr = comment
    if (!isLogin) {
      dispatch(showLoginBoxDispatch(true))
      return
    }
    if (commentId === arr.commentId) {
      arr.liked = !arr.liked
      let type = arr.liked ? 1 : 0
      likeCommentAPI(id, commentId, type, 2)
      arr.liked ? arr.likedCount++ : arr.likedCount--
    } else {
      arr.children.forEach(e => {
        if (commentId === e.commentId) {
          e.liked = !e.liked
          let type = e.liked ? 1 : 0

          e.liked ? e.likedCount++ : e.likedCount--
          likeCommentAPI(id, commentId, type, 2)
        }
      })
    }

    setComment(arr)
    setFlag(!flag)
  }
  return (
    <div className='comment-container w-1200'>
      <Comment
        actions={actions(comment)}
        author={comment.author}
        avatar={comment.avatar}
        content={comment.content}
        datetime={moment(comment.datetime).format('YYYY-MM-DD HH:mm:ss')}
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
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={moment(item.datetime).format('YYYY-MM-DD HH:mm:ss')}
              key={item.commentId}
            />
          )
        })}
      </Comment>
    </div>
  )
})
