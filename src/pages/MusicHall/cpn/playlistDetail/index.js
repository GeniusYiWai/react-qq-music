import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setPlaylistDetailDispatch } from './store/actionCreators'
import { toTree } from '@/utils/tools'
import PlaylistDetailCover from 'components/Playlist/playlistDetailCover'
import Comment from 'components/Comment'
import { getPlaylistComment } from '@/api/comment'
import LazyLoadImg from 'components/Common/lazyloadImg'
import PublishComment from 'components/Comment/cpn/publishComment'
import './index.less'
//资源类型 2代表歌单
const resourceType = 2
export default memo(function PlaylistDetail() {
  const params = useParams()
  //获取当前的歌单id
  const { id } = params
  const dispacth = useDispatch()
  //热门评论
  const [hotComments, setHotComments] = useState([])
  //全部评论
  const [totalComments, setTotalComments] = useState([])
  //评论总数
  const [totalNum, setTotalNum] = useState(null)
  const { playlistDetail, playlistSongs } = useSelector(state => {
    return {
      playlistDetail: state.plDetail.playlistDetail,
      playlistSongs: state.plDetail.playlistSongs
    }
  })

  useEffect(() => {
    dispacth(setPlaylistDetailDispatch(id))
    //获取歌单下的评论
    getPlaylistComment(id).then(
      ({ data: { comments, hotComments, total } }) => {
        // comments 总评论
        // hotComments 热门评论
        // total 评论总数
        //设置评论总数
        setTotalNum(total)

        //返回的数据结构是一级评论parentid为0 二级评论的parentId为回复的评论的commentId 需要进行格式化
        setHotComments(toTree(hotComments, 0))
        setTotalComments(toTree(comments, 0))
      }
    )
  }, [id])
  return (
    <div className='pl-detail-container w-1200'>
      <div className='pl-detail-top'>
        <div className='pl-detail-cover'>
          <LazyLoadImg
            url={playlistDetail.coverImgUrl}
            width={250}
            height={250}
          />
        </div>
        <div className='pl-detail-info'>
          <h1>{playlistDetail.name}</h1>

          <p>
            作者:{playlistDetail.creator && playlistDetail.creator.nickname}
          </p>
          <p>
            标签:
            {playlistDetail.tags && playlistDetail.tags.map(item => item + ' ')}
          </p>
          <p>播放量:{playlistDetail.playCount}</p>
          <p>收藏量:{playlistDetail.subscribedCount}</p>
        </div>

        <div className='pl-detail-description'>
          <h3>简介:</h3>
          <p>{playlistDetail.description}</p>
        </div>
      </div>
      <div className='pl-songs-container'>
        {playlistSongs.map(song => {
          return <PlaylistDetailCover song={song} key={song.id} />
        })}
      </div>
      <PublishComment
        totalNum={totalNum}
        id={id}
        setTotalComments={setTotalComments}
        totalComments={totalComments}
        setTotalNum={setTotalNum}
        resourceType={resourceType}
      />
      <h3>热门评论</h3>
      {hotComments.map(item => {
        return (
          <Comment
            comment={item}
            id={id}
            key={item.time}
            resourceType={resourceType}
          />
        )
      })}
      <h3>{`共${totalNum}条评论`}</h3>
      {totalComments.map(item => {
        return (
          <Comment
            comment={item}
            id={id}
            key={item.time}
            resourceType={resourceType}
          />
        )
      })}
    </div>
  )
})
