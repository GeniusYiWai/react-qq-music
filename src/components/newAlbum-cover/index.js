import React, { memo } from 'react'
import './index.less'
import { handleSinger } from '@/utils/tools'
export default memo(function PlaylistCover(props) {
  const {
    album: { id, picUrl, artists, name }
  } = props
 
  // alias: []
  // areaId: 7
  // artist: {img1v1Id: 18686200114669624, topicPerson: 0, followed: false, briefDesc: "", picId: 109951165317827550, …}
  // artists: [{…}]
  // blurPicUrl: "http://p3.music.126.net/8J5zw-E0jDcBDyTv1w4jRQ==/109951166153378868.jpg"
  // briefDesc: ""
  // commentThreadId: "R_AL_3_129992752"
  // company: "网易子弹工作室"
  // companyId: 0
  // copyrightId: -1
  // description: ""
  // exclusive: false
  // id: 129992752
  // isSub: false
  // name: "浪里个浪"
  // onSale: false
  // paid: false
  // pic: 109951166153378860
  // picId: 109951166153378860
  // picId_str: "109951166153378868"
  // picUrl: "http://p4.music.126.net/8J5zw-E0jDcBDyTv1w4jRQ==/109951166153378868.jpg"
  // publishTime: 1625673600000
  // size: 2
  // songs: []
  // status: 0
  // subType: "录音室版"
  // tags: ""
  // type: "Single"
  return (
    <div className='album-cover'>
      <div key={id}>
        <img src={picUrl} alt='' />
        <p className='text-nowrap'>{name}</p>
        <p className='singer'>{handleSinger(artists)}</p>
      </div>
    </div>
  )
})
