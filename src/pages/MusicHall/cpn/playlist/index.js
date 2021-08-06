import React, { memo, useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPlaylistCate, setPlaylistByCate } from './store/actionCreators'
import './index.less'
import PlaylistCover from 'components/Playlist/playlistCover'
import { Menu } from 'antd'
const { SubMenu } = Menu
//歌单分类 写死
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
  //鼠标悬浮显示分类详情
  const [openKeys, setOpenKeys] = useState([])
  //切换歌单分类
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
  //获取playlist store中的歌单分类 和当前选中的歌单详情
  const { playlistCate, playlist } = useSelector(state => {
    return {
      playlistCate: state.playlist.playlistCate,
      playlist: state.playlist.playlist
    }
  })
  //处理分类点击 查询加载数据
  const handleMenuClick = useCallback(({ key }) => {
    setKey(key)
  }, [])
  const getCateByNum = useCallback(
    num => {
      return playlistCate.filter(item => item.category === num)
    },
    [playlistCate]
  )
  //监听 key值 一旦发生变化就重新加载数据
  useEffect(() => {
    dispatch(setPlaylistByCate({ cate: key }))
  }, [key])
  //加载所有歌单分类 只需要在渲染阶段执行一次 所以传入一个空数组
  useEffect(() => {
    dispatch(setPlaylistCate())
  }, [])

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
