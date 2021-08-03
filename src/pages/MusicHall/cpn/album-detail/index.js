import React, { memo, useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setAlbumDetailDispatch } from './store/actionCreators'
import { clipImgSize, handleSinger } from '@/utils/tools'
import AlbumDetailCover from './cpn/album-detail-cover'
import './index.less'
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
  useEffect(() => {
    //每次进来先滚动到最顶部
    window.scrollTo(0, 0)
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
    </div>
  )
})
