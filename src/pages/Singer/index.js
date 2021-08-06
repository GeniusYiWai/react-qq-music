import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingerInfo } from '@/api/singer'
import LazyLoadImg from 'components/Common/lazyloadImg'
import './index.less'
export default memo(function Singer() {
  const [singer, setsinger] = useState({})
  const params = useParams()
  const { id } = params
  console.log(id)
  useEffect(() => {
    getSingerInfo(id).then(
      ({
        data: {
          data: { artist }
        }
      }) => {
        console.log(artist)
        setsinger(artist)
      }
    )
  }, [id])
  return (
    <div className='singer-profile-container'>
      <div className='singer-profile-box w-1200'>
        <div className='singer-avatar'>
          <LazyLoadImg url={singer && singer.cover} width={200} height={200} />
        </div>
        <div className='singer-profile'>
          <h1>{singer.name}</h1>
          <p>{singer.briefDesc}</p>
        </div>
      </div>
      <div className='singer-hotsongs-list'></div>
    </div>
  )
})
