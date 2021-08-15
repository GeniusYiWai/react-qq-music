import React, { memo, useEffect, useState, useCallback, useRef } from 'react'
import { useParams } from 'react-router'
import { toTree } from '@/utils/tools'
import PlaylistDetailCover from 'components/Playlist/playlistDetailCover'
import Comment from 'components/Comment'
import { getPlaylistComment as getPlaylistCommentAPI } from '@/api/comment'
import { getPlaylistDeatil as getPlaylistDeatilAPI } from '@/api/playlist'
import { getMusicById } from '@/api/player'
import LazyLoadImg from 'components/Common/lazyloadImg'
import PublishComment from 'components/Comment/cpn/publishComment'
import Actions from 'components/Actions'
import { ScrollTop } from '@/utils/tools'
import Empty from 'components//Common/empty'
import './index.less'
//资源类型 2代表歌单
const resourceType = 2
export default memo(function PlaylistDetail() {
  //获取评论区域的ref引用

  const commentRef = useRef()
  const params = useParams()
  //获取当前的歌单id
  const { id } = params
  //热门评论
  const [hotComments, setHotComments] = useState([])
  //全部评论
  const [totalComments, setTotalComments] = useState([])
  //评论总数
  const [totalNum, setTotalNum] = useState(0)
  //歌单详情
  const [playlistDetail, setPlaylistDetail] = useState({})
  //歌单下的歌曲
  const [playlistSongs, setPlaylistSongs] = useState([])
  //歌单收藏状态
  const [collect, setCollect] = useState(false)
  //获取歌单详情
  const getPlaylistDetail = useCallback(async () => {
    const {
      data: { playlist }
    } = await getPlaylistDeatilAPI(id)
    setPlaylistDetail(playlist)
    setCollect(playlist.subscribed)
    const trackIds = playlist.trackIds.map(item => item.id).join(',')
    const {
      data: { songs }
    } = await getMusicById(trackIds)
    setPlaylistSongs(songs)
  }, [id])
  //获取歌单评论

  const getPlaylistComment = useCallback(async () => {
    const {
      data: { comments, hotComments, total }
    } = await getPlaylistCommentAPI(id)
    // comments 总评论
    // hotComments 热门评论
    // total 评论总数
    //设置评论总数
    setTotalNum(total)
    //返回的数据结构是一级评论parentid为0 二级评论的parentId为回复的评论的commentId 需要进行格式化
    setHotComments(toTree(hotComments, 0))
    setTotalComments(toTree(comments, 0))
  }, [id])
  useEffect(() => {
    getPlaylistDetail()
    getPlaylistComment()
  }, [id])
  //滚动到评论区域
  const ScrollToComment = useCallback(() => {
    ScrollTop(commentRef.current.offsetTop, 600)
  }, [])
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
          <h2>{playlistDetail.name}</h2>
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
      <Actions
        totalNum={totalNum}
        collect={collect}
        setCollect={setCollect}
        id={id}
        resourceType={resourceType}
        ScrollToComment={ScrollToComment}
      />
      <div className='pl-songs-container'>
        {playlistSongs &&
          playlistSongs.map(song => {
            return <PlaylistDetailCover song={song} key={song.id} />
          })}
      </div>
      <div ref={commentRef}>
        <PublishComment
          totalNum={totalNum}
          id={id}
          setTotalComments={setTotalComments}
          totalComments={totalComments}
          setTotalNum={setTotalNum}
          resourceType={resourceType}
        />
      </div>

      {hotComments.length !== 0 ? <h3>热门评论</h3> : null}
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
      {totalComments.length === 0 ? (
        <Empty text='暂无评论' showBtn={false} />
      ) : null}
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
