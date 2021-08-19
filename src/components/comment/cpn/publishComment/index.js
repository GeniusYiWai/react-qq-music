import React, { memo, useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Input, message } from 'antd'
import { showLoginBoxDispatch } from '@/pages/LoginBox/store/actionCreators'
import { sendComment } from '@/api/comment'
import './index.less'
const { TextArea } = Input
//1代表发表评论 写死
const commentType = 1
//发表评论组件
export default memo(function PublishComment(props) {
  //props
  const {
    totalNum, //总评论数
    id, //资源id
    totalComments, //所有评论的数据
    setTotalNum, //修改总评论数
    resourceType //资源类型
  } = props
  //state
  //用户输入的评论
  const [value, setValue] = useState('')
  //redux
  const dispatch = useDispatch()
  const { isLogin } = useSelector(state => {
    return {
      isLogin: state.user.isLogin
    }
  }, shallowEqual)
  //functions
  //用户输入的评论赋值给value
  const handleChange = e => {
    if (e.target.value.trim() !== '') {
      setValue(e.target.value.trim())
    } else if (e.target.value === '') {
      setValue('')
    }
  }
  //发送评论
  const handlePublish = () => {
    //判断是否登录
    if (!isLogin) {
      dispatch(showLoginBoxDispatch(true))
      return
    }
    if (value === '') return
    publishComments(commentType, resourceType, id, value)
  }
  //发表评论
  const publishComments = async (commentType, resourceType, id, value) => {
    //commentType 评论类型
    //resourceType 资源类型
    //id 资源id
    ///value 评论内容
    try {
      const {
        data: { comment, code }
      } = await sendComment(commentType, resourceType, id, value)
      if (code === 200) {
        //找了半天才发现为什么发表的评论不能添加到评论列表中 原来是因为这里返回的结果里没有parentCommentId 需要自己带上
        //将新评论添加到所有评论的最顶部
        totalComments.unshift({ ...comment, parentCommentId: 0 })
        //清空输入框
        setValue('')
        //修改评论总数
        setTotalNum(totalNum + 1)
        message.success('发表成功')
      }
    } catch (error) {
      message.error('发表失败!')
    }
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
