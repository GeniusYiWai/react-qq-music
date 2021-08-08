import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setAlbumDetailDispatch } from './store/actionCreators'
import { clipImgSize, handleSinger } from '@/utils/tools'
import AlbumDetailCover from 'components/Album/albumDetailCover'
import './index.less'
import { toTree } from '@/utils/tools'
import Comment from 'components/Comment'
import PublishComment from 'components/Comment/cpn/publishComment'
import { getAlbumComment as getAlbumCommentAPI } from '@/api/comment'
import Empty from 'components/Common/empty'
//资源类型 3代表专辑
const resourceType = 3
export default memo(function AlbumDetail() {
  const params = useParams()
  const { id } = params
  const dispacth = useDispatch()
  const { albumDetail, albumSongs } = useSelector(state => {
    return {
      albumDetail: state.albumDetail.albumDetail,
      albumSongs: state.albumDetail.albumSongs
    }
  })

  //热门评论
  const [hotComments, setHotComments] = useState([])
  //全部评论
  const [totalComments, setTotalComments] = useState([])
  //评论总数
  const [totalNum, setTotalNum] = useState(null)
  useEffect(() => {
    //获取专辑下的评论
    getAlbumCommentAPI(id).then(
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
    dispacth(setAlbumDetailDispatch(id))
  }, [id])
  return (
    <div className='album-detail-container w-1200'>
      <div className='album-detail-top'>
        <div className='album-detail-cover'>
          <img src={`${albumDetail.picUrl}${clipImgSize(250, 250)}`} alt='' />
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
      <div className='song-comment-container w-1200'>
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
