import React, { memo } from 'react'
import { handleSinger } from '@/utils/tools'
import LazyLoadImg from 'components/lazyload-img'
import PlayImg from 'components/play-img'
import './index.less'
export default memo(function PlaylistDetailCover(props) {
  const {
    song: { name, id, ar, al }
  } = props
  const handlePlay = () => {
    console.log(id)
  }
  return (
    <div className='pl-cover'>
      <div className='pl-wrapper'>
        <LazyLoadImg url={al && al.picUrl} width={120} height={350} />
        <PlayImg handleClick={() => handlePlay()}></PlayImg>
      </div>
      <p className='text-nowrap'>{name}</p>
      <p className='text-nowrap'>{handleSinger(ar)}</p>
    </div>
  )
})