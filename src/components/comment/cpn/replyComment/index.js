import React, { memo, useState } from 'react'
import { Form, Input } from 'antd'
import { sendComment } from '@/api/comment'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { showLoginBoxDispatch } from '@/pages/LoginBox/store/actionCreators'
import './index.less'
const { TextArea } = Input
//2代表回复评论
const commentType = 2
export default memo(function Reply(props) {
  const {
    setShowReplyComment,
    id,
    commentId,
    comment,
    setComment,
    resourceType
  } = props
  //获取用户登录状态
  const { isLogin } = useSelector(state => {
    return {
      isLogin: state.user.isLogin
    }
  }, shallowEqual)
  const dispatch = useDispatch()
  const [value, setValue] = useState()
  const replyComment = () => {
    if (!isLogin) {
      dispatch(showLoginBoxDispatch(true))
      return
    }
    if (value && value.trim() !== '') {
      sendComment(commentType, resourceType, id, value, commentId).then(
        ({ data: { comment: replyComment } }) => {
          comment.children.unshift(replyComment)
          setComment(comment)
          setShowReplyComment(false)
        }
      )
    }
  }
  return (
    <div>
      <Form.Item>
        <TextArea
          rows={4}
          value={value}
          onChange={e => {
            setValue(e.target.value)
          }}
        />
      </Form.Item>
      <Form.Item>
        <button
          className='reply-btn'
          onClick={() => {
            replyComment()
          }}
        >
          回复
        </button>
        <button
          className='cancel-btn'
          onClick={() => setShowReplyComment(false)}
        >
          取消
        </button>
      </Form.Item>
    </div>
  )
})
