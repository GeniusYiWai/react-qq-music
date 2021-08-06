import React, { memo } from 'react'
import PlaylistRec from './playlistRec'
import NewSongRec from './newsongRec'
import NewAlbumRec from './newalbumRec'
import RankRec from './rankRec'
import MVRec from './mvRec'

export default memo(function Home() {
  return (
    <div>
      <PlaylistRec />
      <NewSongRec />
      <NewAlbumRec />
      <RankRec />
      <MVRec />
    </div>
  )
})
