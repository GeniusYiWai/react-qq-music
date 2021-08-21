import React, { memo, useEffect, useState, useCallback } from 'react'
import './index.less'
import PlaylistCover from 'components/Playlist/playlistCover'
import {
  getAllPlaylistCate as getAllPlaylistCateAPI,
  getHighQualityByCate as getHighQualityByCateAPI
} from '@/api/playlist'
import PlaylistSkeleton from 'components/Skeleton/playlistSkeleton'
import Pagination from 'components/Common/pagination'
import { Menu, message } from 'antd'
const { SubMenu } = Menu
//歌单分类
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
  //state
  //鼠标悬浮显示分类详情
  const [openKeys, setOpenKeys] = useState([])
  //所有歌单分类
  const [playlistCate, setPlaylistCate] = useState([])
  //歌单详情
  const [playlist, setPlaylist] = useState([])
  //切换歌单分类
  const [key] = useState('全部')
  //歌单总数
  const [total, setTotal] = useState(0)
  //页码
  const [currentPage, setCurrentPage] = useState(1)
  //混合查询条件 因为可以多个参数一起查询
  const [combineCondition, setCombineCondition] = useState({
    //歌单分类
    cate: key,
    //偏移量
    offset: 0,
    //每页数据条数
    limit: 20
  })
  //获取所有歌单分类
  const getAllPlaylistCate = async () => {
    try {
      const {
        data: { sub, code }
      } = await getAllPlaylistCateAPI()
      if (code === 200) {
        setPlaylistCate(sub)
      }
    } catch (error) {
      message.error('获取歌单分类失败!')
    }
  }
  //通过歌单分类获取歌单详情
  const getPlaylistByCate = async ({ cate, limit, offset }) => {
    try {
      const {
        data: { playlists, total, code }
      } = await getHighQualityByCateAPI(cate, limit, offset)
      if (code === 200) {
        //设置歌单总数
        setTotal(total)
        setPlaylist(playlists)
      }
    } catch (error) {
      message.error('获取歌单详情失败!')
    }
  }
  const onOpenChange = useCallback(
    keys => {
      const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
      if (Category.indexOf(latestOpenKey) === -1) {
        setOpenKeys(keys)
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
      }
    },
    [openKeys]
  )
  //分类点击 重新加载数据
  const handleMenuClick = useCallback(({ key }) => {
    setCurrentPage(1)
    setPlaylist([])
    setCombineCondition(combineCondition => ({
      ...combineCondition,
      cate: key,
      offset: 0
    }))
  }, [])
  const getCateByNum = useCallback(
    num => {
      return playlistCate.filter(item => item.category === num)
    },
    [playlistCate]
  )
  //监听 key值 一旦发生变化就重新加载歌单数据
  useEffect(() => {
    getPlaylistByCate({ ...combineCondition })
  }, [combineCondition])
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
          {playlist.length === 0 ? <PlaylistSkeleton /> : null}
          {playlist.map((item, index) => {
            return (
              <PlaylistCover playlist={item} key={Math.random() + item.id} />
            )
          })}
          <Pagination
            setCombineCondition={setCombineCondition}
            total={total}
            limit={20}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setData={setPlaylist}
          />
        </div>
      </div>
    </div>
  )
})
