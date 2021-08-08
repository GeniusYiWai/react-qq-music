import React, { memo, useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Input } from 'antd'
import { showLoginBoxDispatch } from '@/pages/LoginBox/store/actionCreators'
import { sendComment } from '@/api/comment'
import './index.less'
const { TextArea } = Input
//1代表发表评论
const commentType = 1
export default memo(function PublishComment(props) {
  const {
    totalNum,
    id,
    setTotalComments,
    totalComments,
    setTotalNum,
    resourceType
  } = props
  const { isLogin } = useSelector(state => {
    return {
      isLogin: state.user.isLogin
    }
  }, shallowEqual)
  const dispatch = useDispatch()
  //用户输入的评论
  const [value, setValue] = useState('')
  const handleChange = e => {
    if (e.target.value.trim() !== '') {
      setValue(e.target.value.trim())
    }
  }
  const handlePublish = () => {
    if (!isLogin) {
      dispatch(showLoginBoxDispatch(true))
      return
    }
    sendComment(commentType, resourceType, id, value).then(
      ({ data: { comment } }) => {
        //找了半天才发现为什么发表的评论不能添加到评论列表中 原来是因为这里返回的结果里没有parentCommentId 需要自己带上 草
        totalComments.unshift({ ...comment, parentCommentId: 0 })
        setValue('')
        setTotalComments(totalComments)
        setTotalNum(totalNum + 1)
      }
    )
  }

  return (
    <div className='comment-box'>
      <p>
        评论
        <span>共{totalNum}条评论</span>
      </p>
      <TextArea
        value={value}
        showCount
        maxLength={300}
        placeholder={'说点什么吧'}
        allowClear
        onChange={e => handleChange(e)}
      />
      <div className='reply-btn-container'>
        <button className='reply-btn' onClick={() => handlePublish()}>
          发表评论
        </button>
      </div>
    </div>
  )
})
