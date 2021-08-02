import React, { memo, useCallback } from 'react'
import { handleSinger, highlightKeyword } from '@/utils/tools'
import './index.less'
export default memo(function SearchSuggestion(props) {
  //获取专辑 歌曲 歌手 歌单 联想建议
  const {
    searchSuggestion: { albums = [], artists = [], songs = [], playlists = [] },
    keyword
  } = props
  //解析highlightKeyword函数返回的span标签
  const parseHtml = useCallback((keyword, str) => {
    return highlightKeyword(keyword, str)
  }, [])
  //创建通过highlightKeyword函数返回的span标签
  const createHtml = useCallback(
    name => {
      return { __html: parseHtml(keyword, name) }
    },
    [keyword, parseHtml]
  )
  return (
    <div className='suggestion-container'>
      <div>
        {albums.length !== 0 ? <h3>专辑</h3> : null}
        {albums.map((item, index) => {
          return (
            <p key={index}>
              <span dangerouslySetInnerHTML={createHtml(item.name)}></span>
              <i
                dangerouslySetInnerHTML={{
                  __html: parseHtml(keyword, item.artist.name)
                }}
              ></i>
            </p>
          )
        })}
      </div>
      <div>
        {artists.length !== 0 ? <h3>歌手</h3> : null}
        {artists.map((item, index) => {
          return (
            <p key={index}>
              <span dangerouslySetInnerHTML={createHtml(item.name)}></span>
            </p>
          )
        })}
      </div>
      <div>
        {songs.length !== 0 ? <h3>歌曲</h3> : null}
        {songs.map((item, index) => {
          return (
            <p key={index}>
              <span dangerouslySetInnerHTML={createHtml(item.name)}></span>
              <i
                dangerouslySetInnerHTML={{
                  __html: parseHtml(keyword, handleSinger(item.artists))
                }}
              ></i>
            </p>
          )
        })}
      </div>
      <div>
        {playlists.length !== 0 ? <h3>歌单</h3> : null}
        {playlists.map((item, index) => {
          return (
            <p key={index}>
              <span dangerouslySetInnerHTML={createHtml(item.name)}></span>
            </p>
          )
        })}
      </div>
    </div>
  )
})
