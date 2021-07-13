import React, { memo } from 'react'
import './index.css'
import { handleSinger,handleSongDuration } from '../../utils/tools'

export default memo(function NewSongCover(props) {
  const { song } = props

  // album: {songs: Array(0), paid: false, onSale: false, blurPicUrl: "http://p3.music.126.net/Nl4mFBPeN4Lqtqn3KOAvXQ==/109951166171044898.jpg", companyId: 0, …}
  // alias: []
  // artists: (2) [{…}, {…}]
  // audition: null
  // bMusic: {volumeDelta: -50813, sr: 44100, bitrate: 128000, dfsId: 0, playTime: 285200, …}
  // commentThreadId: "R_SO_4_1860567964"
  // copyFrom: ""
  // copyrightId: 2708482
  // crbt: null
  // dayPlays: 0
  // disc: "01"
  // duration: 285200
  // exclusive: true
  // fee: 8
  // ftype: 0
  // hMusic: {volumeDelta: -55018, sr: 44100, bitrate: 320000, dfsId: 0, playTime: 285200, …}
  // hearTime: 0
  // id: 1860567964
  // lMusic: {volumeDelta: -50813, sr: 44100, bitrate: 128000, dfsId: 0, playTime: 285200, …}
  // mMusic: {volumeDelta: -52422, sr: 44100, bitrate: 192000, dfsId: 0, playTime: 285200, …}
  // mp3Url: "http://m2.music.126.net/hmZoNQaqzZALvVp0rE7faA==/0.mp3"
  // mvid: 14300328
  // name: "生活在别处的你 Another me"
  // no: 1
  // playedNum: 0
  // popularity: 5
  // position: 0
  // privilege: {id: 1860567964, fee: 8, payed: 0, st: 0, pl: 128000, …}
  // ringtone: ""
  // rtUrl: null
  // rtUrls: null
  // rtype: 0
  // rurl: null
  // score: 5
  // starred: false
  // starredNum: 0
  // status: 0
  return (
    <div className='song-container'>
      <img src={song.album.picUrl} alt='' />
      <div className='song-info'>
        <div>
          <p>{song.name}</p>
          <p>{handleSinger(song.artists)}</p>
        </div>
        <div className='song-duration'>
          <p>{handleSongDuration(song.duration)}</p>
        </div>
      </div>
    </div>
  )
})
