import React, { memo, useState, useEffect, useRef } from 'react'
import { Carousel } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import PlaylistCover from 'components/Playlist/playlistCover'
import NewSongCover from 'components/Song/songCover'
import NewAlbumCover from 'components/Album/newAlbumCover'
import MVCover from 'components/Mv/mvCover'
import CollectSinger from 'components/Singer/collectSinger'
import './index.less'
export default memo(function MyCarousel(props) {
  //获取轮播图引用
  const carouselRef = useRef()
  //props
  const { data, pagesize, type } = props
  //state
  const [newArr, setNewArr] = useState([])
  const spliceData = data => {
    const arr = []
    const totalPage = Math.ceil(data.length / pagesize)
    for (let i = 0; i < totalPage; i++) {
      arr[i] = data.slice(i * pagesize, i * pagesize + pagesize)
    }
    return arr
  }
  useEffect(() => {
    setNewArr(spliceData(data))
  }, [data])
  return (
    <div className='carousel-container w-1200'>
      <>
        <LeftOutlined
          className='prev'
          onClick={() => {
            carouselRef.current.prev()
          }}
        />
        <RightOutlined
          className='next'
          onClick={() => {
            carouselRef.current.next()
          }}
        />
        {/* 在用到antd Carousel走马灯的时候，有时候我们是根据后台数据区遍历显示的，但是在本项目中，是获取了一串[[],[],[]]二层数据去遍历，这个时候，走马灯没内容了，去查看dom节点，发现有内容，但是没高度，怎么设置都无法解决，最后发现问题可能出在一开始他就加载好了，但是你数据那会还没加载出来，这个时候，我们设置一个数据有的时候才显示走马灯
         */}
        {newArr.length !== 0 ? (
          <Carousel
            effect='fade'
            autoplay
            className='carousel'
            ref={carouselRef}
          >
            {newArr.map((arr, index) => {
              return (
                <div className='carousel-wrapper' key={index}>
                  {arr.map(item => {
                    switch (type) {
                      case 'playlist':
                        return (
                          <PlaylistCover
                            playlist={item}
                            key={Math.random() + item.id}
                          />
                        )
                      case 'song':
                        return (
                          <NewSongCover
                            song={item}
                            key={Math.random() + item.id}
                          />
                        )
                      case 'album':
                        return (
                          <NewAlbumCover
                            album={item}
                            key={Math.random() + item.id}
                          />
                        )
                      case 'mv':
                        return (
                          <MVCover mv={item} key={Math.random() + item.id} />
                        )
                      case 'singer':
                        return (
                          <CollectSinger
                            singer={item}
                            key={Math.random() + item.id}
                          />
                        )

                      default:
                        break
                    }
                  })}
                </div>
              )
            })}
          </Carousel>
        ) : null}
      </>
    </div>
  )
})
