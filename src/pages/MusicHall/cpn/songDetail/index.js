import React, { memo, useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router'
import { toTree } from '@/utils/tools'
import Comment from 'components/Comment'
import PublishComment from 'components/Comment/cpn/publishComment'
import { getSongDeatil as getSongDeatilAPI } from '@/api/song'
import { handleSinger } from '@/utils/tools'
import LyricParser from 'lyric-parser'
import LazyLoadImg from 'components/Common/lazyloadImg'
import Actions from 'components/Actions'
import { ScrollTop } from '@/utils/tools'
import { getLyric as getLyricAPI } from '@/api/player'
import { getSongComment as getSongCommentAPI } from '@/api/comment'
import Empty from 'components//Common/empty'
import './index.less'
//资源类型 0代表歌曲
const resourceType = 0
export default memo(function SongDetail() {
  //获取评论区域的ref引用
  const commentRef = useRef()
  const params = useParams()
  //获取当前的歌曲id
  const { id } = params
  //歌曲详情
  const [songDetail, setSongDetail] = useState({})
  //歌词
  const [lyric, setLyric] = useState({})
  //热门评论
  const [hotComments, setHotComments] = useState([])
  //全部评论
  const [totalComments, setTotalComments] = useState([])
  //评论总数
  const [totalNum, setTotalNum] = useState(0)
  const [collect, setCollect] = useState(0)
  //获取歌曲下的评论
  const getSongComment = async () => {
    try {
      const {
        data: { comments, hotComments, total }
      } = await getSongCommentAPI(id)
      setTotalNum(total || 0)
      setHotComments(toTree(hotComments, 0))
      setTotalComments(toTree(comments, 0))
    } catch (error) {}
  }
  //获取歌曲详情
  const getSongDeatil = async () => {
    try {
      const {
        data: { songs }
      } = await getSongDeatilAPI(id)
      setSongDetail(songs[0])
    } catch (error) {}
  }
  //获取歌词
  const getLyric = async () => {
    try {
      const {
        data: { nolyric, lrc }
      } = await getLyricAPI(id)
      if (nolyric) {
        setLyric([{ txt: '纯音乐,敬请欣赏!' }])
      } else {
        setLyric(new LyricParser(lrc.lyric))
      }
    } catch (error) {}
  }
  //滚动到评论区域
  const ScrollToComment = () => {
    ScrollTop(commentRef.current.offsetTop, 600)
  }
  useEffect(() => {
    getSongDeatil()
    getLyric()
    getSongComment()
  }, [id])
  return (
    <div className='song-detail-wrapper'>
      <div className='song-detail-container w-1200'>
        <div className='song-detail-cover'>
          <LazyLoadImg
            url={songDetail.al && songDetail.al.picUrl}
            width={250}
            height={250}
          />
        </div>
        <div className='song-detail-info'>
          <h1>{songDetail.name}</h1>
          <p>作者:{handleSinger(songDetail.ar)}</p>
          <p>
            专辑:
            {songDetail.al && songDetail.al.name}
          </p>
        </div>
        <Actions
          totalNum={totalNum}
          collect={collect}
          setCollect={setCollect}
          songDetail={songDetail}
          id={id}
          resourceType={resourceType}
          ScrollToComment={ScrollToComment}
        />
      </div>
      <div className='song-lyric w-1200'>
        {lyric.lines &&
          lyric.lines.map((item, index) => {
            return <p key={index}>{item.txt}</p>
          })}
      </div>

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
    </div>
  )
})
