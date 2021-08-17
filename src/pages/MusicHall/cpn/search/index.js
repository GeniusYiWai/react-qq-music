import React, { memo, useEffect, useState, useCallback, useMemo } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { getSearchResult as getSearchResultAPI } from '@/api/search'
import { parseParam } from '@/utils/tools'
import bgSearch from '@/assets/img/bg_search.jpg'
import SongCover from 'components/Album/albumDetailCover'
import AlbumCover from 'components/Album/albumCover'
import SingerCover from 'components/Singer/singerCover'
import PlaylistCover from 'components/Playlist/playlistCover'
import MvCover from 'components/Mv/mvCover'
import { message, Pagination } from 'antd'
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
  const [page, setPage] = useState(1)
  const [total, setToal] = useState(50)
  const switchType = index => {
    setPage(1)
    setIndex(index)
    const { field } = Types[index]
    setCombineCondition(combineCondition => {
      return {
        ...combineCondition,
        type: Types[index].type,
        offset: 0,
        keyword
      }
    })
    history.push(`/musichall/search?k=${keyword}&t=${field}`)
  }

  const getSearchResult = async combineCondition => {
    try {
      const {
        data: { result }
      } = await getSearchResultAPI({ ...combineCondition })
      switch (i) {
        case 0:
          setToal(result.songCount)
          break
        case 1:
          setToal(result.albumCount)
          break

        case 2:
          setToal(result.artistCount)
          break

        case 3:
          setToal(result.playlistCount)
          break

        case 4:
          setToal(result.userprofileCount)
          break

        case 5:
          setToal(result.mvCount)
          break

        case 6:
          setToal(result.videoCount)
          break

        default:
          break
      }
      setResult(result[field])
      setIndex(i)
    } catch (error) {
      setIndex(i)
      message.error('获取搜索结果失败,请检查网络连接!')
    }
  }

  const [combineCondition, setCombineCondition] = useState({
    limit: 10,
    offset: 0,
    type,
    keyword
  })

  useEffect(() => {
    getSearchResult(combineCondition)
  }, [combineCondition])
  //这里会执行2次同样的方法 目前想不出来解决方法
  useEffect(() => {
    switchType(0)
  }, [keyword])
  const onChange = useCallback(page => {
    setPage(page)
    setCombineCondition(combineCondition => {
      return {
        ...combineCondition,
        offset: (page - 1) * 10
      }
    })
  }, [])

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
        <div className='pagination'>
          <Pagination
            total={total}
            showSizeChanger={false}
            onChange={page => onChange(page)}
            current={page}
          />
        </div>
      </div>
    </div>
  )
})
