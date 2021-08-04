import React, { memo, useState } from 'react'
import { Form, Input } from 'antd'
import moment from 'moment'
import { sendComment } from '@/api/comment'
import './index.less'
const { TextArea } = Input

export default memo(function Reply(props) {
  const { setShowReplyComment, id, commentId, comment, setComment } = props
  const [value, setValue] = useState()
  const replyComment = () => {
    //   console.log(comment.children.push({
    //     author: "Cy3-_determition"
    // avatar: "https://p3.music.126.net/EQVhMkyRMhwZyVN-GcddxQ==/109951165435642034.jpg"
    // commentId: 5164376731
    // content: "你的赞凑够一组了"
    // datetime: 1606058785126
    // liked: false
    // likedCount: 37
    //   }));

    if (value.trim() !== '') {
      sendComment(2, 2, id, value, commentId).then(
        ({
          data: {
            comment: {
              user: { nickname, avatarUrl },
              commentId,
              time,
              content
            }
          }
        }) => {
          comment.children.push({
            author: nickname,
            commentId,
            content,
            datetime: time,
            likedCount: 0,
            liked: false,
            avatar: avatarUrl
          })
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
          htmlType='submit'
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
