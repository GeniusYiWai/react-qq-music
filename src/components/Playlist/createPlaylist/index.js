import React, { memo, useState } from 'react'
import { Input, Button, message } from 'antd'
import { createPlaylist as createPlaylistAPI } from '@/api/playlist'
import './index.less'
export default memo(function CreatePlaylist(props) {
  //handleCreateOk 创建成功调用的函数
  //handleCreateCancel 取消创建调用的函数
  //getUserCreatePlaylist 获取用户创建歌单

  const { handleCreateOk, handleCreateCancel, getUserCreatePlaylist } = props
  //创建loading
  const [loading, setLoading] = useState(false)
  //用户创建的歌单名称
  const [value, setValue] = useState('')
  //创建歌单
  const createPlaylist = async () => {
    setLoading(true)
    try {
      const {
        data: { code }
      } = await createPlaylistAPI(value)
      if (code === 200) {
        setLoading(false)
        message.success('创建成功。')
        //重新获取用户创建的歌单
        getUserCreatePlaylist()
        handleCreateOk()
        setValue('')
      }
    } catch (error) {
      setLoading(false)
      message.error('创建失败!')
    }
  }
  //用户点击确定创建调用的函数
  const handleOk = () => {
    //判断是否为空
    if (value.trim() === '') {
      message.warning('请输入歌单名称!')
      return
    }
    createPlaylist()
  }
  //用户取消创建调用的函数
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
