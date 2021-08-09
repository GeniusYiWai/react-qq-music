import React, { memo, useEffect, useState, useCallback, useRef } from 'react'
import { useParams } from 'react-router'
import { handleSinger } from '@/utils/tools'
import AlbumDetailCover from 'components/Album/albumDetailCover'
import { toTree } from '@/utils/tools'
import Comment from 'components/Comment'
import PublishComment from 'components/Comment/cpn/publishComment'
import { getAlbumComment as getAlbumCommentAPI } from '@/api/comment'
import Empty from 'components/Common/empty'
import LazyLoadImg from 'components/Common/lazyloadImg'
import { getAlbumDeatil as getAlbumDeatilAPI } from '@/api/album'
import Actions from 'components/Actions'
import { ScrollTop } from '@/utils/tools'
import './index.less'
//资源类型 3代表专辑
const resourceType = 3
export default memo(function AlbumDetail() {
  const commentRef = useRef()
  const params = useParams()
  const { id } = params
  //热门评论
  const [hotComments, setHotComments] = useState([])
  //全部评论
  const [totalComments, setTotalComments] = useState([])
  const [albumDetail, setAlbumDetail] = useState({})
  const [albumSongs, setAlbumSongs] = useState([])
  const [collect, setCollect] = useState(false)
  //评论总数
  const [totalNum, setTotalNum] = useState(0)
  const getAlbumDetail = useCallback(async () => {
    const { data } = await getAlbumDeatilAPI(id)
    setAlbumDetail(data.album)
    setAlbumSongs(data.songs)
  }, [])
  const getAlbumComment = useCallback(async () => {
    const {
      data: { comments, hotComments, total }
    } = await getAlbumCommentAPI(id)
    // comments 总评论
    // hotComments 热门评论
    // total 评论总数
    //设置评论总数
    setTotalNum(total)
    //返回的数据结构是一级评论parentid为0 二级评论的parentId为回复的评论的commentId 需要进行格式化
    setHotComments(toTree(hotComments, 0))
    setTotalComments(toTree(comments, 0))
  }, [])
  useEffect(() => {
    //获取专辑详情
    getAlbumDetail()
    //获取专辑下的评论
    getAlbumComment()
  }, [id])
  const ScrollToComment = useCallback(() => {
    ScrollTop(commentRef.current.offsetTop, 600)
  }, [])
  return (
    <div className='album-detail-container w-1200'>
      <div className='album-detail-top'>
        <div className='album-detail-cover'>
          <LazyLoadImg url={albumDetail.picUrl} width={250} height={250} />
        </div>
        <div className='album-detail-info'>
          <h1>{albumDetail.name}</h1>
          <p>作者:{albumDetail.artists && handleSinger(albumDetail.artists)}</p>
        </div>
        <div className='album-detail-description'>
          <h3>简介:</h3>
          <p>{albumDetail.description}</p>
        </div>
      </div>
      <div className='album-songs-container'>
        <div className='pl-cover'>
          <p className='text-nowrap'>歌曲</p>
          <p className='text-nowrap'>歌手</p>
          <p className='text-nowrap'>时长</p>
        </div>

        <AlbumDetailCover song={albumSongs} />
      </div>
      <Actions
        totalNum={totalNum}
        collect={collect}
        setCollect={setCollect}
        id={id}
        resourceType={resourceType}
        ScrollToComment={ScrollToComment}
        albumSongs={albumSongs}
      />
      <div className='song-comment-container w-1200' ref={commentRef}>
        <PublishComment
          totalNum={totalNum}
          id={id}
          setTotalComments={setTotalComments}
          totalComments={totalComments}
          setTotalNum={setTotalNum}
          resourceType={resourceType}
        />
        {hotComments.length > 0 ? (
          <div>
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
          </div>
        ) : null}
        {totalComments.length > 0 ? (
          <div>
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
        ) : (
          <Empty showBtn={false} text={'还没有人发表评论呢'} />
        )}
      </div>
    </div>
  )
})
