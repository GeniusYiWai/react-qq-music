import React, { memo } from 'react'
import PlayImg from 'components/Common/playImg'
import LazyLoadImg from 'components/Common/lazyloadImg'
import './index.less'
//通用mv 封面
export default memo(function MVCover(props) {
  //mv mv的信息
  const {
    mv: {
      cover,
      coverUrl,
      id,
      title,
      name,
      playCount,
      artistName,
      vid,
      imgurl,
      artistId,
      artist
    }
  } = props
  //处理点击播放
  //这个组件在搜索页面的视频下面使用 但返回的数据既有视频又有mv 所以需要根据id和vid的长度判断跳转到那个页面
  const handlePlay = () => {
    if (vid && vid.length > 10) {
      window.open(`/#/musichall/video/detail/${vid}`)
    } else if (vid && vid.length < 10) {
      window.open(`/#/musichall/mv/detail/${vid}`)
    } else {
      window.open(`/#/musichall/mv/detail/${id}`)
    }
  }
  //查看歌手详情
  const goToSingerDetail = () => {
    window.open(`/#/profile/singer/${artist ? artist.id : artistId}`)
  }
  return (
    <div className='mv-cover-container'>
      <div className='mv-img-cover'>
        <LazyLoadImg
          url={cover || coverUrl || imgurl}
          width={150}
          height={150}
        />
        <PlayImg handleClick={() => handlePlay()}></PlayImg>
      </div>
      <div className='mv-info'>
        <p className='mv-name text-nowrap' onClick={() => handlePlay()}>
          {name || title}
        </p>
        <p className='mv-artist text-nowrap' onClick={() => goToSingerDetail()}>
          {artistName}
        </p>
        <span className='mv-playnum'>{playCount}</span>
      </div>
    </div>
  )
})
