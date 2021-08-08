import React, { memo, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { toTree } from '@/utils/tools'
import Comment from 'components/Comment'
import PublishComment from 'components/Comment/cpn/publishComment'
import { getSongDeatil as getSongDeatilAPI } from '@/api/song'
import { handleSinger } from '@/utils/tools'
import './index.less'
import LyricParser from 'lyric-parser'
import LazyLoadImg from 'components/Common/lazyloadImg'

import { getLyric as getLyricAPI } from '@/api/player'
import { getSongComment as getSongCommentAPI } from '@/api/comment'
//资源类型 0代表歌曲
const resourceType = 0
export default memo(function SongDetail() {
  const params = useParams()
  //获取当前的歌曲id
  const { id } = params
  const [songDetail, setSongDetail] = useState({})
  const [lyric, setLyric] = useState({})
  //热门评论
  const [hotComments, setHotComments] = useState([])
  //全部评论
  const [totalComments, setTotalComments] = useState([])
  //评论总数
  const [totalNum, setTotalNum] = useState(null)

  //获取歌曲下的评论
  const getSongComment = useCallback(async () => {
    const {
      data: { comments, hotComments, total }
    } = await getSongCommentAPI(id)
    setTotalNum(total)
    setHotComments(toTree(hotComments, 0))
    setTotalComments(toTree(comments, 0))
  }, [id])
  const getSongDeatil = useCallback(async () => {
    const {
      data: { songs }
    } = await getSongDeatilAPI(id)
    setSongDetail(songs[0])
  }, [id])
  const getLyric = useCallback(async () => {
    const {
      data: { nolyric, lrc }
    } = await getLyricAPI(id)
    if (nolyric) {
      setLyric([{ txt: '纯音乐,敬请欣赏!' }])
    } else {
      setLyric(new LyricParser(lrc.lyric))
    }
  }, [id])

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
      </div>
      <div className='song-lyric w-1200'>
        {lyric.lines &&
          lyric.lines.map((item, index) => {
            return <p key={index}>{item.txt}</p>
          })}
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
    </div>
  )
})
