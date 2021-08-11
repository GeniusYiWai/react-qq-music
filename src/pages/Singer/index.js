import React, { memo, useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getSingerInfo as getSingerInfoAPI } from '@/api/singer'
import LazyLoadImg from 'components/Common/lazyloadImg'
import Category from 'components/Common/category'
import { getSingerSongs, getSingerAlbums, getSingerMvs } from '@/api/singer'
import NewAlbumCover from 'components/Album/newAlbumCover'
import MvCover from 'components/Mv/mvCover'

import SongCover from 'components/Album/albumDetailCover'
import './index.less'
//一级分类
const Tabs = [
  {
    categoryName: '单曲'
  },
  {
    categoryName: '专辑'
  },
  {
    categoryName: 'MV'
  }
]
export default memo(function Singer() {
  //当前分类索引
  const [currentIndex, setCurrentIndex] = useState(0)
  //歌手信息
  const [singer, setsinger] = useState({})
  //歌手歌曲
  const [singerSongs, setSingerSongs] = useState([])
  //歌手专辑
  const [singerAlbums, setSingerAlbums] = useState([])
  //歌手mv
  const [singerMvs, setSingerMvs] = useState([])
  const params = useParams()
  const { id } = params
  //切换当前新碟上架的分类
  const switchTabs = useCallback(index => {
    setCurrentIndex(index)
  }, [])
  //获取歌手信息
  const getSingerInfo = async () => {
    try {
      const {
        data: {
          data: { artist }
        }
      } = await getSingerInfoAPI(id)
      console.log(artist)
      setsinger(artist)
    } catch (error) {}
  }
  useEffect(() => {
    getSingerInfo()
  }, [])
  useEffect(() => {
    //判断索引切换 加载相应的数据
    switch (currentIndex) {
      //加载单曲
      case 0:
        getSingerSongs(id).then(({ data: { songs } }) => {
          setSingerSongs(songs)
        })
        break
      //加载专辑
      case 1:
        getSingerAlbums(id).then(({ data: { hotAlbums } }) => {
          setSingerAlbums(hotAlbums)
        })
        break
      //加载mv
      case 2:
        getSingerMvs(id).then(({ data: { mvs } }) => {
          setSingerMvs(mvs)
        })
        break
      default:
        break
    }
  }, [currentIndex])
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
      <div className='singer-category w-1200'>
        <Category
          Tabs={Tabs}
          switchTabs={switchTabs}
          currentIndex={currentIndex}
        />
        <div className='singer-artist-size'>
          <p className={currentIndex === 0 ? 'active' : ''}>
            {singer.musicSize}
          </p>
          <p className={currentIndex === 1 ? 'active' : ''}>
            {singer.albumSize}
          </p>
          <p className={currentIndex === 2 ? 'active' : ''}>{singer.mvSize}</p>
        </div>
      </div>
      <div className='singer-hotsongs-list w-1200'>
        {currentIndex === 0 && singerSongs && <SongCover song={singerSongs} />}
        <div className='newalbum-container'>
          {currentIndex === 1 &&
            singerAlbums &&
            singerAlbums.map(item => {
              return <NewAlbumCover album={item} key={item.id} />
            })}
        </div>
        <div className='mv-container'>
          {currentIndex === 2 &&
            singerMvs &&
            singerMvs.map((item, index) => {
              return <MvCover mv={item} key={index} />
            })}
        </div>
      </div>
    </div>
  )
})
