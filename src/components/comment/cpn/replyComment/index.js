import React, { memo, useState } from 'react'
import { Form, Input, message, Button } from 'antd'
import { sendComment as sendCommentAPI } from '@/api/comment'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { showLoginBoxDispatch } from '@/pages/LoginBox/store/actionCreators'
import './index.less'
const { TextArea } = Input
//2代表回复评论 写死
const commentType = 2
//回复评论组件
export default memo(function Reply(props) {
  //props
  const {
    setShowReplyComment, //父组件传递的控制回复评论组件的展示和隐藏方法
    id, //资源id
    commentId, //回复的评论的commentId
    comment, //当前回复的评论的数据
    resourceType //资源类型
  } = props
  //state
  //用户输入的回复内容
  const [value, setValue] = useState('')
  //回复按钮loading状态
  const [loading, setLoading] = useState(false)
  //redux
  //获取用户登录状态
  const dispatch = useDispatch()
  const { isLogin } = useSelector(state => {
    return {
      isLogin: state.user.isLogin
    }
  }, shallowEqual)
  //functions
  //回复评论
  const replyComment = () => {
    //先判断用户有没有登录
    if (!isLogin) {
      dispatch(showLoginBoxDispatch(true))
      return
    }
    //判断输入的值是否为空
    if (value.trim() === '') {
      message.warning('请输入有效内容。')
      return
    } else {
      sendComment(commentType, resourceType, id, value, commentId)
    }
  }
  const sendComment = async (
    commentType,
    resourceType,
    id,
    value,
    commentId
  ) => {
    // commentType 评论类型 1是发送 2是回复
    // resourceType 资源类型
    // id 资源id
    //  value 回复的评论内容
    // commentId 回复的评论commentId
    setLoading(true)
    try {
      const {
        data: { comment: replyComment, code }
      } = await sendCommentAPI(commentType, resourceType, id, value, commentId)
      if (code === 200) {
        //将新回复的评论添加到回复的这个评论的回复列表中的第一个
        console.log(replyComment)
        console.log(comment.children)
        comment.children.unshift(replyComment)
        //关闭回复框
        setShowReplyComment(false)
        message.success('回复成功。')
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      message.error('回复失败!')
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
        <Button
          className='reply-btn'
          onClick={() => {
            replyComment()
          }}
          loading={loading}
        >
          回复
        </Button>
        <Button
          className='cancel-btn'
          onClick={() => setShowReplyComment(false)}
          loading={loading}
        >
          取消
        </Button>
      </Form.Item>
    </div>
  )
})
