import React, { memo, useState, useCallback } from 'react'
import { Form, Input, message } from 'antd'
import { sendComment as sendCommentAPI } from '@/api/comment'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { showLoginBoxDispatch } from '@/pages/LoginBox/store/actionCreators'
import './index.less'
const { TextArea } = Input
//2代表回复评论
const commentType = 2
export default memo(function Reply(props) {
  const {
    setShowReplyComment, //父组件传递的控制回复评论组件的展示和隐藏方法
    id, //资源id
    commentId, //回复的评论的commentId
    comment, //当前回复的评论的数据
    setComment, //父组件修改评论的数据的方法
    resourceType //资源类型
  } = props
  //获取用户登录状态
  const { isLogin } = useSelector(state => {
    return {
      isLogin: state.user.isLogin
    }
  }, shallowEqual)
  const dispatch = useDispatch()
  //用户输入的回复内容
  const [value, setValue] = useState()
  //回复评论
  const replyComment = () => {
    //先判断用户有没有登录
    if (!isLogin) {
      dispatch(showLoginBoxDispatch(true))
      return
    }
    //判断输入的值是否为空
    if (value && value.trim() !== '') {
      sendComment(commentType, resourceType, id, value.trim(), commentId)
    }
  }

  const sendComment = useCallback(
    // commentType 评论类型 1是发送 2是回复
    // resourceType 资源类型
    // id 资源id
    //  value 回复的评论内容
    // commentId 回复的评论commentId
    async (commentType, resourceType, id, value, commentId) => {
      try {
        const {
          data: { comment: replyComment }
        } = await sendCommentAPI(
          commentType,
          resourceType,
          id,
          value.trim(),
          commentId
        )
        //将新回复的评论添加到回复的这个评论的回复列表中的第一个
        comment.children.unshift(replyComment)
        //查询渲染回复数据
        setComment(comment)
        //关闭回复框
        setShowReplyComment(false)
      } catch (error) {
        message.success('回复成功!')
      }
    },
    []
  )
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
