import React, { memo, useState } from 'react'
import { Input, Button, message } from 'antd'
import { createPlaylist as createPlaylistAPI } from '@/api/playlist'
import './index.less'
export default memo(function CreatePlaylist(props) {
  const { handleCreateOk, handleCreateCancel,getUserCreatePlaylist } = props

  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')
  const createPlaylist = async () => {
    setLoading(true)
    try {
      const {
        data: { code }
      } = await createPlaylistAPI(value)
      if (code === 200) {
        setLoading(false)
        message.success('创建成功。')
        getUserCreatePlaylist()
        handleCreateOk()
        setValue('')
      }
    } catch (error) {
      setLoading(false)
      message.error('创建失败!')
    }
  }
  const handleOk = () => {
    if (value.trim() === '') {
      message.warning('请输入歌单名称!')
      return
    }
    createPlaylist()
  }
  const handleCancel = () => {
    handleCreateCancel()
    setValue('')
  }
  return (
    <div className='CreatePlaylist-container'>
      <Input
        placeholder='请输入歌单名'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <div className='actions'>
        <Button
          type='primary'
          shape='round'
          onClick={() => {
            handleCancel()
          }}
          size={'large'}
          loading={loading}
        >
          取消
        </Button>

        <Button
          type='primary'
          shape='round'
          onClick={() => {
            handleOk()
          }}
          loading={loading}
          size={'large'}
        >
          确定
        </Button>
      </div>
    </div>
  )
})
