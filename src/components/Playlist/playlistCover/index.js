import React, { memo } from 'react'
import LazyLoadImg from 'components/Common/lazyloadImg'
import PlayImg from 'components/Common/playImg'
import { playPlaylist } from '@/utils/player'
import './index.less'
//通用歌单封面

export default memo(function PlaylistCover(props) {
  //props
  //coverImgUrl 图片地址
  //  name 歌单名称
  // playCount 歌单播放次数
  const {
    playlist: { id, coverImgUrl, name, playCount }
  } = props
  //播放歌单内的全部歌曲
  const handlePlay = () => {
    playPlaylist(id)
  }
  //查看歌单详情
  const showPlaylistDetail = id => {
    window.open(`/#/musichall/playlist/detail/${id}`)
  }
  return (
    <div className='playlist-cover-wrapper'>
      <div className='playlist-cover'>
        <div className='playlist-cover-box'>
          <div className='playlist-img'>
            <LazyLoadImg url={coverImgUrl} width={150} height={150} />
          </div>
          <PlayImg handleClick={() => handlePlay()}></PlayImg>
        </div>
      </div>
      <div className='playlist-cover-info'>
        <p className='text-nowrap' onClick={() => showPlaylistDetail(id)}>
          {name}
        </p>
        <p className='playNum'>播放量: {playCount}</p>
      </div>
    </div>
  )
})
