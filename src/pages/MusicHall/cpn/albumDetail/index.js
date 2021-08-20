import React, { memo, useEffect, useState, useCallback, useRef } from 'react'
import { useParams } from 'react-router'
import { handleSinger } from '@/utils/tools'
import AlbumDetailCover from 'components/Album/albumDetailCover'
import { toTree } from '@/utils/tools'
import Comment from 'components/Comment'
import PublishComment from 'components/Comment/cpn/publishComment'
import { getAlbumComment as getAlbumCommentAPI } from '@/api/comment'
import LazyLoadImg from 'components/Common/lazyloadImg'
import {
  getAlbumDeatil as getAlbumDeatilAPI,
  getAlbumStatus as getAlbumStatusAPI
} from '@/api/album'
import Actions from 'components/Actions'
import { ScrollTop } from '@/utils/tools'
import { message } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import Empty from 'components/Common/empty'
import './index.less'
//资源类型 3代表专辑
const resourceType = 3
export default memo(function AlbumDetail() {
  //获取评论区域的ref引用
  const commentRef = useRef()
  //从url中获取专辑id
  const params = useParams()
  //state
  const { id } = params
  //热门评论
  const [hotComments, setHotComments] = useState([])
  //全部评论
  const [totalComments, setTotalComments] = useState([])
  //专辑详情
  const [albumDetail, setAlbumDetail] = useState({})
  //专辑下的歌曲
  const [albumSongs, setAlbumSongs] = useState([])
  //专辑收藏状态
  const [collect, setCollect] = useState(false)
  //评论总数
  const [totalNum, setTotalNum] = useState(0)
  //偏移量 用于分页 计算方式  ( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
  const [offset, setOffset] = useState(0)
  //是否正在加载新数据
  const [loading, setLoading] = useState(false)
  //判断是否是第一次加载页面
  //每页大小
  const [limit, setLimit] = useState(10)
  const [flag, setFlag] = useState(true)
  //是否还有更多数据
  const [hasMore, setHasMore] = useState(true)
  const [combineCondition, setCombineCondition] = useState({
    id,
    limit,
    offset
  })
  //获取专辑是否收藏
  const getAlbumStatus = async () => {
    try {
      const {
        data: { isSub, code }
      } = await getAlbumStatusAPI(id)
      if (code === 200) {
        setCollect(isSub)
      }
    } catch (error) {
      message.error('获取专辑收藏状态失败!')
    }
  }
  //获取专辑详情
  const getAlbumDetail = async () => {
    try {
      const {
        data: { album, songs, code }
      } = await getAlbumDeatilAPI(id)
      if (code === 200) {
        setAlbumDetail(album)
        setAlbumSongs(songs)
      }else{
        throw new Error()
      }
    } catch (error) {
      message.error('获取专辑详情失败!')
    }
  }
  //获取歌曲下的评论
  const getAlbumComment = async combineCondition => {
    //上锁
    setLoading(true)
    try {
      const {
        data: { comments, code, more }
      } = await getAlbumCommentAPI({ ...combineCondition })
      if (code === 200) {
        // comments 总评论
        //返回的数据结构是一级评论parentid为0 二级评论的parentId为回复的评论的commentId 需要进行格式化
        setTotalComments(totalComments => {
          //开锁
          setLoading(false)
          setHasMore(more)
          //将新数据与旧数据合并
          return toTree(totalComments.concat(comments), 0)
        })
        //设置偏移量
        setOffset(offset + limit + 1)
        //取反第一次加载页面
        setFlag(false)
      }
    } catch (error) {
      setTotalNum(0)
      message.error('获取歌单评论失败!')
    }
  }
  //获取专辑下的热门评论
  const getAlbumHotComment = async () => {
    try {
      const {
        data: { hotComments, total, code }
      } = await getAlbumCommentAPI({ id, limit: 20, offset: 0 })
      // hotComments 热门评论
      // total 评论总数
      //设置评论总数
      if (code === 200) {
        setTotalNum(total)
        //返回的数据结构是一级评论parentid为0 二级评论的parentId为回复的评论的commentId 需要进行格式化
        setHotComments(toTree(hotComments, 0))
      }
    } catch (error) {
      setTotalNum(0)
      message.error('获取歌单评论失败!')
    }
  }
  useEffect(() => {
    //第一次进入页面 将页面滚动到顶部
    ScrollTop(0, 300)
    //获取专辑详情
    getAlbumDetail()
    //获取专辑下的评论
    getAlbumComment(combineCondition)
    //获取专辑下的热门评论
    getAlbumHotComment()
    //获取专辑收藏状态
    getAlbumStatus()
  }, [])
  //滚动到评论区域
  const ScrollToComment = useCallback(() => {
    ScrollTop(commentRef.current.offsetTop, 600)
  }, [])
  const loadMore = useCallback(() => {
    //如果是第一次加载页面 不执行loadMore
    if (flag) return
    getAlbumComment({ ...combineCondition, offset })
  }, [flag, combineCondition, offset])
  return (
    <div className='album-detail-container w-1200'>
      <div className='album-detail-top'>
        <div className='album-detail-cover'>
          <LazyLoadImg
            url={albumDetail && albumDetail.picUrl}
            width={250}
            height={250}
          />
        </div>
        <div className='album-detail-info'>
          <h1>{albumDetail && albumDetail.name}</h1>
          <p>
            作者:
            {albumDetail &&
              albumDetail.artists &&
              handleSinger(albumDetail && albumDetail.artists)}
          </p>
        </div>
        <div className='album-detail-description'>
          <h3>简介:</h3>
          <p>{albumDetail && albumDetail.description}</p>
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
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={loadMore}
          hasMore={!loading && hasMore}
          useWindow={true}
        >
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
        </InfiniteScroll>
      </div>
    </div>
  )
})
