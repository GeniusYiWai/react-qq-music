import React, { memo, useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getSearchResult } from '@/api/search'
import './index.less'
import bgSearch from '@/assets/img/bg_search.jpg'
import SongCover from '../album-detail/cpn/album-detail-cover'
import AlbumCover from './cpn/album-cover'
import SingerCover from '../singer/cpn/singer-cover'
import PlaylistCover from 'components/playlist-cover'
import MvCover from 'components/mv-cover'
const Types = [
  {
    value: '单曲',
    type: 1,
    field: 'songs'
  },
  {
    value: '专辑',
    type: 10,
    field: 'albums'
  },
  {
    value: '歌手',
    type: 100,
    field: 'artists'
  },

  {
    value: '歌单',
    type: 1000,
    field: 'playlists'
  },

  {
    value: '用户',
    type: 1002,
    field: 'userprofiles'
  },
  {
    value: 'MV',
    type: 1004,
    field: 'mvs'
  },

  {
    value: '歌词',
    type: 1006,
    field: 'songs'
  },
  {
    value: '视频',
    type: 1014,
    field: 'videos'
  }
]
export default memo(function Search() {
  const param = useParams()
  const { k } = param
  const [index, setIndex] = useState(0)
  const [result, setResult] = useState([])
  const switchType = useCallback(index => {
    setIndex(index)
  }, [])
  useEffect(() => {
    const { type, field } = Types[index]
    getSearchResult(k, type).then(({ data: { result } }) => {
      console.log(result)
      setResult(result[field])
    })
  }, [k, index])
  return (
    <div className='search-box'>
      <div
        className='search-box-top'
        style={{ backgroundImage: `url(${bgSearch})` }}
      ></div>

      <div className='search-content w-1200'>
        <div className='search-type '>
          {Types.map((item, i) => {
            return (
              <p
                key={item.type}
                className={i === index ? 'selected' : ''}
                onClick={() => {
                  switchType(i)
                }}
              >
                {item.value}
              </p>
            )
          })}
        </div>
        <div className='search-result'>
          {index === 0 && result && <SongCover song={result} />}
          {index === 1 && result && <AlbumCover album={result} />}
          {index === 2 && result ? (
            <div className='singer-result-container'>
              {result.map(item => {
                return <SingerCover singer={item} key={item.id} />
              })}
            </div>
          ) : null}
          {index === 3 && result ? (
            <div className='playlist-result-container'>
              {result.map(item => {
                return <PlaylistCover playlist={item} key={item.id} />
              })}
            </div>
          ) : null}
          {index === 4 && result ? (
            <div className='user-result-container'>
              {result.map(item => {
                return <SingerCover singer={item} key={item.userId} />
              })}
            </div>
          ) : null}
          {index === 5 && result ? (
            <div className='mv-result-container'>
              {result.map(item => {
                return <MvCover mv={item} key={item.id} />
              })}
            </div>
          ) : null}
          

          {index === 8 && result ? (
            <div className='mv-result-container'>
              {result.map(item => {
                return <MvCover mv={item} key={item.id} />
              })}
            </div>
          ) : null}

        </div>
      </div>
    </div>
  )
})
