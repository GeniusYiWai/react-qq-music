import React, { memo } from 'react'
import { handleSinger } from '@/utils/tools'
import LazyLoadImg from 'components/Common/lazyloadImg'
import PlayImg from 'components/Common/playImg'
import { playMusic } from '@/utils/player'
import './index.less'
export default memo(function PlaylistDetailCover(props) {
  const {
    song: { name, id, ar, al, dt }
  } = props
  const handlePlay = () => {
    playMusic(id, name, ar, dt)
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