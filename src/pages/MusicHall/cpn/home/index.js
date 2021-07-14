import React, { memo } from 'react'
import PlaylistRec from './playlist-rec'
import NewSongRec from './newsong-rec'
import NewAlbumRec from './newalbum-rec'
import RankRec from './rank-rec'

export default memo(function Home() {
  return (
    <div>
      <PlaylistRec />
      <NewSongRec />
      <NewAlbumRec />
      <RankRec />
    </div>
  )
})
