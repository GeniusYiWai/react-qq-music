import React, { memo, useEffect } from 'react'
import { useLocation, useHistory, useParams } from 'react-router'
import { getPlaylistDeatil } from '@/api/playlist'
import './index.less'
export default memo(function PlaylistDetail() {
  // const location = useLocation()
  // const history = useHistory()
  const params = useParams()
  const { id } = params

  useEffect(() => {
    getPlaylistDeatil(id).then(res => {
      console.log(res)
    })
  }, [])

  return <div>PlaylistDetail</div>
})
