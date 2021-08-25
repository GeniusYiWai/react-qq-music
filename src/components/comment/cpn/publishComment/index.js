import React, { memo, useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Input, message, Button } from 'antd'
import { showLoginBoxDispatch } from '@/pages/LoginBox/store/actionCreators'
import { sendComment } from '@/api/comment'
import './index.less'
const { TextArea } = Input
//1代表发表评论 
const commentType = 1
//发表评论组件
export default memo(function PublishComment(props) {
  //props
  const {
    totalNum, //总评论数
    id, //资源id
    setTotalNum, //修改总评论数
    resourceType, //资源类型
    setTotalComments
  } = props
  //state
  //用户输入的评论
  const [value, setValue] = useState('')
  //发布评论按钮loading状态
  const [loading, setLoading] = useState(false)
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
    // if (e.target.value.trim() !== '') {
    setValue(e.target.value)
    // }
  }
  //发送评论
  const handlePublish = () => {
    //判断是否登录
    if (!isLogin) {
      dispatch(showLoginBoxDispatch(true))
      return
    }
    if (value.trim() === '') {
      message.warning('请输入有效内容。')
      return
    }
    publishComments(commentType, resourceType, id, value)
  }
  //发表评论
  const publishComments = async (commentType, resourceType, id, value) => {
    //commentType 评论类型
    //resourceType 资源类型
    //id 资源id
    ///value 评论内容
    setLoading(true)
    try {
      const {
        data: { comment, code }
      } = await sendComment(commentType, resourceType, id, value)
      if (code === 200) {
        //这里返回的结果里没有parentCommentId 需要自己带上
        //将新评论添加到所有评论的最顶部
        setTotalComments(totalComments => {
          totalComments.unshift({
            ...comment,
            parentCommentId: 0,
            //手动增添二级评论数组
            children: [],
            //这里要手动添加liked和likedCount字段 因为后端返回的数据没有这2个字段 不加的话如果进行点赞会报错
            liked: false,
            likedCount: 0
          })
          return totalComments
        })
        //清空输入框
        setValue('')
        //修改评论总数
        setTotalNum(totalNum + 1)
        message.success('发表成功。')
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
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
        <Button
          className='reply-btn'
          onClick={() => handlePublish()}
          loading={loading}
        >
          发表评论
        </Button>
      </div>
    </div>
  )
})
