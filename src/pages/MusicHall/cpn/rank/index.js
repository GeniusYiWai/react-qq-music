import React, { memo, useEffect, useState } from 'react'
import RankType from 'components/Rank/rankType'
import { Button, message } from 'antd'
import {
  PlayCircleOutlined,
  FolderAddOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  CommentOutlined
} from '@ant-design/icons'
import { playRank } from '@/utils/player'
import {
  getAllRank as getAllRankAPI,
  getRankById as getRankByIdAPI
} from '@/api/rank'
import { handleDate } from '@/utils/tools'
import RankDetail from 'components/Rank/rankDetail'
import RankSkeleton from 'components/Skeleton/rankSkeleton'
import { ScrollTop } from '@/utils/tools'
import { showLoginBoxDispatch } from '@/pages/LoginBox/store/actionCreators'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { collectPlaylist } from '@/api/collect'
import './index.less'
export default memo(function Rank() {
  //redux
  const dispatch = useDispatch()
  //获取用户登录状态
  const { isLogin } = useSelector(state => {
    return {
      isLogin: state.user.isLogin
    }
  }, shallowEqual)
  //state
  //切换排行榜
  const [currentIndex, setcurrentIndex] = useState(0)
  //排行榜列表
  const [rankList, setRankList] = useState([])
  //排行榜详情
  const [rankDetail, setRankDetail] = useState({})
  //functions
  //获取排行榜列表
  const getAllRank = async () => {
    try {
      const {
        data: { list }
      } = await getAllRankAPI()
      setRankList(list)
      //这里直接在排行榜加载完成之后直接获取第一个排行榜的详情
      getRankById(list[0].id)
    } catch (error) {
      message.error('获取排行榜数据失败!')
    }
  }
  //获取排行榜详情
  const getRankById = async id => {
    try {
      const {
        data: { playlist }
      } = await getRankByIdAPI(id)
      setRankDetail(playlist)
    } catch (error) {
      message.error('获取排行榜详情失败!')
    }
  }
  //处理点击播放
  const handlePlay = () => {
    playRank(rankDetail.tracks)
  }
  //通过排行榜id获取详情
  const getRanlDetailByID = index => {
    //切换当前选中的排行榜
    setcurrentIndex(index)
    //手动调用获取排行榜详情的dispatch
    getRankById(rankList[index].id)
  }
  const collectRank = async () => {
    try {
      const { data } = await collectPlaylist(1, rankList[currentIndex].id)
      if (data.code === 200) {
        message.success('收藏成功')
      }
    } catch (error) {
      message.error('收藏失败!')
    }
  }
  //第一次加载页面 手动加载第一个排行榜分类下的数据
  useEffect(() => {
    ScrollTop(0, 600)
    getAllRank()
  }, [])
  return (
    <div className='rank-container'>
      {rankList.length === 0 ? <RankSkeleton /> : null}

      <div className='rank-content w-1200'>
        <div className='rank-left'>
          {rankList.map((item, index) => {
            return (
              <RankType
                index={index}
                rank={item}
                currentIndex={currentIndex}
                setcurrentIndex={setcurrentIndex}
                fetchData={getRanlDetailByID}
                key={item.id}
              />
            )
          })}
        </div>
        {rankList.length !== 0 ? (
          <div className='rank-right'>
            <div className='rank-right-info'>
              <div className='rank-right-left'>
                <img src={rankDetail.coverImgUrl} alt='' />
              </div>
              <div className='rank-right-right'>
                <p className='name'>{rankDetail.name}</p>
                <p className='updateTime'>
                  最近更新{handleDate(rankDetail.updateTime)}
                </p>
                <div className='rank-right-info'>
                  <Button
                    icon={<PlayCircleOutlined />}
                    onClick={() => {
                      handlePlay()
                    }}
                  >
                    播放
                  </Button>
                  <Button
                    icon={<FolderAddOutlined />}
                    onClick={() => {
                      collectRank()
                    }}
                  >
                    {rankDetail.subscribedCount}
                  </Button>
                  <Button
                    icon={<ShareAltOutlined />}
                    onClick={() => {
                      message.warning('没做')
                    }}
                  >
                    {rankDetail.shareCount}
                  </Button>
                  <Button
                    icon={<DownloadOutlined />}
                    onClick={() => {
                      message.warning('没做')
                    }}
                  >
                    下载
                  </Button>
                  <Button
                    icon={<CommentOutlined />}
                    onClick={() => {
                      message.warning('没做')
                    }}
                  >
                    {rankDetail.commentCount}
                  </Button>
                </div>
              </div>
            </div>
            <div className='rank-list-container'>
              <div className='rank-list-title'>
                <p className='trackCount'>
                  <span>歌曲列表 </span>
                  {rankDetail.trackCount}首歌
                </p>
                <p className='playCount'>播放:{rankDetail.playCount}次</p>
              </div>
              <div className='rank-list-content'>
                {rankDetail.tracks &&
                  rankDetail.tracks.map((item, index) => {
                    return (
                      <RankDetail item={item} key={item.id} index={index} />
                    )
                  })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
})
