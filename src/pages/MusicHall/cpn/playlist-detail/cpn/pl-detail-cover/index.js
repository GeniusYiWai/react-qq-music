import React, { memo } from 'react'
import { handleSinger } from '@/utils/tools'
import LazyLoadImg from 'components/lazyload-img'
import './index.less'
export default memo(function PlaylistDetailCover(props) {
  const { song } = props
  return (
    <div className='pl-cover'>
      <LazyLoadImg url={song.al && song.al.picUrl} width={120} height={350} />
      <p className='text-nowrap'>{song.name}</p>
      <p className='text-nowrap'>{handleSinger(song.ar)}</p>
    </div>
  )
})
