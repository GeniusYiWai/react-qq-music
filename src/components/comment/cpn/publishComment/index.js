import React, { memo, useState, useCallback } from 'react'
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
    totalNum, //总评论数
    id, //资源id
    setTotalComments, //修改所有评论
    totalComments, //所有评论的数据
    setTotalNum, //修改总评论数
    resourceType //资源类型
  } = props
  const { isLogin } = useSelector(state => {
    return {
      isLogin: state.user.isLogin
    }
  }, shallowEqual)
  const dispatch = useDispatch()
  //用户输入的评论
  const [value, setValue] = useState('')
  //同步输入的评论到value
  const handleChange = e => {
    if (e.target.value.trim() !== '') {
      setValue(e.target.value.trim())
    } else if (e.target.value === '') {
      setValue('')
    }
  }
  const handlePublish = () => {
    if (!isLogin) {
      dispatch(showLoginBoxDispatch(true))
      return
    }
    if (value === '') return
    publishComments(commentType, resourceType, id, value)
  }
  //发表评论
  const publishComments = async (commentType, resourceType, id, value) => {
    const {
      data: { comment }
    } = await sendComment(commentType, resourceType, id, value)
    //找了半天才发现为什么发表的评论不能添加到评论列表中 原来是因为这里返回的结果里没有parentCommentId 需要自己带上 草
    //适当添加到所有评论的最顶部
    totalComments.unshift({ ...comment, parentCommentId: 0 })
    setValue('')
    //修改所有评论数据
    setTotalComments(totalComments)
    //修改评论总数
    setTotalNum(totalNum + 1)
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
