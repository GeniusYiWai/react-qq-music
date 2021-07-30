import React, { memo, useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setPlaylistDetailDispatch } from './store/actionCreators'
import { clipImgSize } from '@/utils/tools'
import PlaylistDetailCover from './cpn/pl-detail-cover'

import './index.less'
export default memo(function PlaylistDetail() {
  const params = useParams()
  const { id } = params
  const dispacth = useDispatch()
  const { playlistDetail, playlistSongs } = useSelector(state => {
    return {
      playlistDetail: state.plDetail.playlistDetail,
      playlistSongs: state.plDetail.playlistSongs
    }
  })
  useEffect(() => {
    //每次进来先滚动到最顶部
    window.scrollTo(0, 0)
    dispacth(setPlaylistDetailDispatch(id))
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
    </div>
  )
})
