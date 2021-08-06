import React, { memo, useCallback, useState } from 'react'
import { setItem, clearItem, getItem } from '@/utils/storage'
import './index.less'
import { debounce } from '@/utils/tools'
import { Modal, Tooltip } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import Wave from '@/assets/img/wave.gif'
export default memo(function Playlist(props) {
  //从父元素中获取当前音乐是否正在播放和播放的音乐id  用于展示样式
  const {
    currentPlayMusicId,
    setCurrentPlayMusicId,
    isPlaying,
    playlist,
    setPlaylist
  } = props

  //点击播放列表中的歌曲 修改当前播放的音乐id 存入store中
  const changePlayMusicID = id => {
    //这里对切换上一首或者下一首进行了防抖处理 防止用户快速切换歌曲 导致歌词组件无法及时清除上一个已经进行的歌词滚动 因为歌词滚动需要时间初始化 如果快速切换会导致清除函数无法及时生效 使得多个歌词滚动同时进行 歌词会来回跳跃
    debounce(() => {
      setCurrentPlayMusicId(id)
      setItem('currentPlayMusicId', id)
    }, 200)()
  }
  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = () => {
    if (playlist.length === 0) {
      return
    }
    setIsModalVisible(true)
  }
  const handleOk = () => {
    clearPlaylist()
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  //清空播放列表
  const clearPlaylist = useCallback(() => {
    clearItem('playlist')
    clearItem('currentPlayMusicId')
    setPlaylist([])
  }, [])
  //移除单首歌曲
  const handleDetele = useCallback(
    (e, id) => {
      e.stopPropagation()
      if (id === currentPlayMusicId) {
        return
      }
      let localPlyalist = getItem('playlist')
      const index = playlist.findIndex(item => item.id === id)

      localPlyalist.splice(index, 1)
      setPlaylist(localPlyalist)
      setItem('playlist', localPlyalist)
    },
    [playlist, currentPlayMusicId, setPlaylist]
  )
  return (
    <div className='player-playlist-container'>
      <Modal
        title='清空播放列表'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText={'取消'}
        okText={'确定'}
      >
        <p>确定要清空列表？</p>
      </Modal>
      <div className='player-playlist-action'>
        {playlist.length === 0 ? null : (
          <div onClick={() => showModal()}>清空列表</div>
        )}
      </div>
      <div className='player-playlist-title'>
        <p> 歌曲</p>
        <p> 歌手</p>
        <p> 时长</p>
      </div>
      <div>
        {playlist &&
          playlist.map(item => {
            return (
              <div className='player-playlist-item' key={item.id}>
                <div className='song-name'>
                  <div
                    onClick={() => {
                      changePlayMusicID(item.id)
                    }}
                    className='name'
                  >
                    {item.name}
                    <p>
                      <span
                        onClick={e => {
                          handleDetele(e, item.id)
                        }}
                      >
                        <Tooltip title={'删除'} color={'#31c27c'}>
                          <DeleteOutlined />
                        </Tooltip>
                      </span>
                      <span>
                        <Tooltip title={'收藏'} color={'#31c27c'}>
                          <PlusOutlined />
                        </Tooltip>
                      </span>
                      <span></span>
                    </p>
                  </div>
                </div>

                <div> {item.artists}</div>
                <div>
                  {item.duration}
                  <span
                    className={`wave-container ${
                      //id等于当前播放的音乐id 并且音乐在播放 才会显示这个动图
                      item.id === currentPlayMusicId && isPlaying
                        ? 'isPlaying'
                        : ''
                    }`}
                    style={{ backgroundImage: `url(${Wave})` }}
                  ></span>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
})
