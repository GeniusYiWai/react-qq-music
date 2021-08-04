import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setPlaylistDetailDispatch } from './store/actionCreators'
import { clipImgSize } from '@/utils/tools'
import PlaylistDetailCover from './cpn/pl-detail-cover'
import Comment from 'components/comment'
import { getPlaylistComment } from '@/api/comment'
import './index.less'
export default memo(function PlaylistDetail() {
  const params = useParams()
  const { id } = params
  const dispacth = useDispatch()
  //热门评论
  const [hotComments, setHotComments] = useState([])
  //全部评论
  const [comments, setComments] = useState([])
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
    getPlaylistComment(id).then(
      ({ data: { comments, hotComments, total } }) => {
        const newHotComments = []
        setTotalNum(total)

        hotComments.forEach(
          ({
            content,
            parentCommentId,
            liked,
            likedCount,
            commentId,
            time: datetime,
            user: { avatarUrl: avatar, nickname: author }
          }) => {
            if (parentCommentId === 0) {
              newHotComments.push({
                content,
                liked,
                likedCount,
                commentId,
                datetime,
                avatar,
                author,
                children: []
              })
            }
          }
        )
        hotComments.forEach(
          ({
            content,
            parentCommentId,
            liked,
            likedCount,
            commentId,
            time: datetime,
            user: { avatarUrl: avatar, nickname: author }
          }) => {
            newHotComments.forEach(i => {
              if (i.commentId === parentCommentId) {
                i.children.push({
                  content,
                  liked,
                  likedCount,
                  commentId,
                  datetime,
                  avatar,
                  author
                })
              }
            })
          }
        )

        setHotComments(newHotComments)
        const newComments = []

        comments.forEach(
          ({
            content,
            parentCommentId,
            liked,
            likedCount,
            commentId,
            time: datetime,
            user: { avatarUrl: avatar, nickname: author }
          }) => {
            if (parentCommentId === 0) {
              newComments.push({
                content,
                liked,
                likedCount,
                commentId,
                datetime,
                avatar,
                author,
                children: []
              })
            }
          }
        )
        comments.forEach(
          ({
            content,
            parentCommentId,
            liked,
            likedCount,
            commentId,
            time: datetime,
            user: { avatarUrl: avatar, nickname: author }
          }) => {
            newHotComments.forEach(i => {
              if (i.commentId === parentCommentId) {
                i.children.push({
                  content,
                  liked,
                  likedCount,
                  commentId,
                  datetime,
                  avatar,
                  author
                })
              }
            })
          }
        )

        setHotComments(newHotComments)
        setComments(newComments)
        //每次进来先滚动到最顶部
        window.scrollTo(0, 0)
      }
    )
  }, [id])
  return (
    <div className='pl-detail-container w-1200'>
      <div className='pl-detail-top'>
        <div className='pl-detail-cover'>
          <img
            src={`${playlistDetail.coverImgUrl}${clipImgSize(250, 250)}`}
            alt=''
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
      <h3>热门评论</h3>
      {hotComments.map(item => {
        return <Comment comment={item} id={id} />
      })}
      <h3>{`共${totalNum}条评论`}</h3>
      {comments.map(item => {
        return <Comment comment={item} id={id} />
      })}
    </div>
  )
})
