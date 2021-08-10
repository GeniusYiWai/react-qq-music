import React, { memo, useEffect, useState, useCallback } from 'react'
import './index.less'
import PlaylistCover from 'components/Playlist/playlistCover'
import {
  getAllPlaylistCate as getAllPlaylistCateAPI,
  getHighQualityByCate as getHighQualityByCateAPI
} from '@/api/playlist'
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
  //所有歌单分类
  const [playlistCate, setPlaylistCate] = useState([])
  //歌单详情
  const [playlist, setPlaylist] = useState([])
  //切换歌单分类
  const [key, setKey] = useState('全部')
  //获取所有歌单分类
  const getAllPlaylistCate = async () => {
    try {
      const {
        data: { tags }
      } = await getAllPlaylistCateAPI()

      setPlaylistCate(tags)
    } catch (error) {}
  }
  //通过歌单分类获取歌单详情
  const getAllPlaylistByCate = async ({ cate = '全部', limit = 20 }) => {
    try {
      const {
        data: { playlists }
      } = await getHighQualityByCateAPI(cate, limit)
      setPlaylist(playlists)
    } catch (error) {}
  }

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
    if (Category.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  //分类点击 重新加载数据
  const handleMenuClick = ({ key }) => {
    setKey(key)
  }
  const getCateByNum = useCallback(
    num => {
      return playlistCate.filter(item => item.category === num)
    },
    [playlistCate]
  )
  //监听 key值 一旦发生变化就重新加载歌单数据
  useEffect(() => {
    getAllPlaylistByCate({ cate: key })
  }, [key])
  //加载所有歌单分类 只需要在渲染阶段执行一次
  useEffect(() => {
    getAllPlaylistCate()
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
