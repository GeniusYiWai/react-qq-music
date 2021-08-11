import React, { memo, useEffect, useState, useCallback, useMemo } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { getSearchResult } from '@/api/search'
import { parseParam } from '@/utils/tools'
import bgSearch from '@/assets/img/bg_search.jpg'
import SongCover from 'components/Album/albumDetailCover'
import AlbumCover from 'components/Album/albumCover'
import SingerCover from 'components/Singer/singerCover'
import PlaylistCover from 'components/Playlist/playlistCover'
import MvCover from 'components/Mv/mvCover'
import './index.less'
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
    value: '视频',
    type: 1014,
    field: 'videos'
  }
]
export default memo(function Search() {
  const location = useLocation()
  const history = useHistory()
  const params = location.search.split('?')[1].split('&')
  const { k: keyword, t: field } = useMemo(() => parseParam(params), [params])
  const { type, i } = useMemo(() => {
    let type, i
    Types.forEach((e, index) => {
      if (e.field === field) {
        type = e.type
        i = index
      }
    })
    return { type, i }
  }, [field])
  const [index, setIndex] = useState(i)
  const [result, setResult] = useState([])
  const switchType = useCallback(
    index => {
      setIndex(index)
      const { field } = Types[index]
      history.push(`/musichall/search?k=${keyword}&t=${field}`)
    },
    [history, keyword]
  )
  useEffect(() => {
    getSearchResult(keyword, type).then(({ data: { result } }) => {
      setResult(result[field])
      setIndex(i)
    })
  }, [keyword, field, type, i])
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
              {result.map((item, index) => {
                return <SingerCover singer={item} key={index} />
              })}
            </div>
          ) : null}
          {index === 3 && result ? (
            <div className='playlist-result-container'>
              {result.map((item, index) => {
                return <PlaylistCover playlist={item} key={index} />
              })}
            </div>
          ) : null}
          {index === 4 && result ? (
            <div className='user-result-container'>
              {result.map((item, index) => {
                return <SingerCover singer={item} key={index} />
              })}
            </div>
          ) : null}
          {index === 5 && result ? (
            <div className='mv-result-container'>
              {result.map((item, index) => {
                return <MvCover mv={item} key={index} />
              })}
            </div>
          ) : null}
          {index === 6 && result ? (
            <div className='mv-result-container'>
              {result.map((item, index) => {
                return <MvCover mv={item} key={index} />
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
})
