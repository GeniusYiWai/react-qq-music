import React, { memo, useEffect } from 'react'
import { setMvUrlDispatch } from '../../store/actionCreators'
import { useDispatch, useSelector } from 'react-redux'
import './index.less'
export default memo(function MvPlayer(props) {
  const dispatch = useDispatch()
  const { id } = props
  const { mvUrl } = useSelector(state => {
    return {
      mvUrl: state.mvDetail.mvUrl
    }
  })
  useEffect(() => {
    dispatch(setMvUrlDispatch(id))
  }, [])
  return (
    <div className='mv-player-container'>
      <video src={mvUrl && mvUrl} controls className='mv-player'></video>
    </div>
  )
})
