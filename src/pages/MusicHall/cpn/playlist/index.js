import React, { memo, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPlaylistCate, setPlaylistByCate } from './store/actionCreators'
import './index.less'
import PlaylistCover from 'components/playlist-cover'
import { Menu } from 'antd'
const { SubMenu } = Menu
const Category = [
  {
    categoryName: '语种',
    num: 0
  },
  {
    categoryName: '风格',
    num: 1
  },
  {
    categoryName: '场景',
    num: 2
  },
  {
    categoryName: '情感',
    num: 3
  },
  {
    categoryName: '主题',
    num: 4
  }
]
export default memo(function Playlist() {
  const [openKeys, setOpenKeys] = useState(['全部'])
  const [key, setKey] = useState('全部')
  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
    if (Category.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPlaylistCate())
    dispatch(setPlaylistByCate({}))
  }, [dispatch])
  const { playlistCate, playlist } = useSelector(state => {
    return {
      playlistCate: state.playlist.playlistCate,
      playlist: state.playlist.playlist
    }
  })
  const handleMenuClick = ({ key }) => {
    setKey(key)
    dispatch(setPlaylistByCate({ cate: key }))
  }

  const getCateByNum = num => {
    return playlistCate.filter(item => item.category === num)
  }
  return (
    <div className='playlist-conatiner'>
      <div className='playlist-content w-1200'>
        <div className='playlist-cate'>
          <Menu
            mode='vertical'
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            className='cate-menu'
            onClick={handleMenuClick}
          >
            {Category.map((cate, index) => {
              return (
                <SubMenu key={cate.categoryName} title={cate.categoryName}>
                  {getCateByNum(index).map(item => {
                    return <Menu.Item key={item.name}>{item.name}</Menu.Item>
                  })}
                </SubMenu>
              )
            })}
          </Menu>
          <div className='current-cate'>{key}</div>
        </div>

        <div className='playlist-list'>
          {playlist.map((item, index) => {
            return <PlaylistCover playlist={item} key={item.id} />
          })}
        </div>
      </div>
    </div>
  )
})
