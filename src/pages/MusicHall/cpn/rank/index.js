import React, { memo, useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RankType from './cpn/rank-type'
import { setAllRank, setRankById } from './store/actionCreators'
import { Button } from 'antd'
import {
  PlayCircleOutlined,
  FolderAddOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  CommentOutlined
} from '@ant-design/icons'
import './index.less'
import { handleDate } from '@/utils/tools'
import RankDetail from './cpn/rank-detail'
export default memo(function Rank() {
  const dispatch = useDispatch()

  const getRanlDetailByID = useCallback(
    id => {
      dispatch(setRankById(id))
    },
    [dispatch]
  )
  useEffect(() => {
    dispatch(setAllRank())
    dispatch(setRankById(19723756))
  }, [dispatch])
  const [currentIndex, setcurrentIndex] = useState(0)
  const { rankList, rankDetail } = useSelector(state => {
    return {
      rankList: state.rank.rankList,
      rankDetail: state.rank.rankDetail
    }
  })
  console.log(rankDetail)
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
                <Button icon={<PlayCircleOutlined />}>播放</Button>
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
                  return <RankDetail item={item} key={item.id} index={index}/>
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
