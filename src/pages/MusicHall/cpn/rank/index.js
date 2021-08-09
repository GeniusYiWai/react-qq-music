import React, { memo, useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import RankType from 'components/Rank/rankType'
import { setAllRank, setRankById } from './store/actionCreators'
import { Button } from 'antd'
import {
  PlayCircleOutlined,
  FolderAddOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  CommentOutlined
} from '@ant-design/icons'
import { playRank } from '@/utils/player'

import { handleDate } from '@/utils/tools'
import RankDetail from 'components/Rank/rankDetail'
import './index.less'
export default memo(function Rank() {
  const dispatch = useDispatch()
  //切换排行榜
  const [currentIndex, setcurrentIndex] = useState(0)

  //从rank store中获取排行榜分类和排行榜详情
  const { rankList, rankDetail } = useSelector(state => {
    return {
      rankList: state.rank.rankList,
      rankDetail: state.rank.rankDetail
    }
  }, shallowEqual)
  const handlePlay = useCallback(() => {
    playRank(rankDetail.tracks)
  }, [rankDetail])
  //通过排行榜id获取详情
  const getRanlDetailByID = useCallback(
    index => {
      //切换当前选中的排行榜
      setcurrentIndex(index)
      //手动调用获取排行榜详情的dispatch
      dispatch(setRankById(rankList[index].id))
    },
    [rankList]
  )
  //第一次加载页面 手动加载第一个排行榜分类下的数据
  useEffect(() => {
    window.scrollTo(0, 0)
    //这里进行了处理 在加载完成排行榜之后手动抛出了获取第一个排行榜详情的dispatch 所以只需要执行一次
    //这里不能监听currentIndex的改变取请求排行榜详情 因为 dispatch(setRankById(rankList[currentIndex].id)) 直接执行是会报错的 rankList此时还没有获取到
    dispatch(setAllRank())
  }, [])

  return (
    <div className='rank-container'>
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
                <Button icon={<FolderAddOutlined />}>
                  {rankDetail.subscribedCount}
                </Button>
                <Button icon={<ShareAltOutlined />}>
                  {rankDetail.shareCount}
                </Button>
                <Button icon={<DownloadOutlined />}></Button>
                <Button icon={<CommentOutlined />}>
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
                  return <RankDetail item={item} key={item.id} index={index} />
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
