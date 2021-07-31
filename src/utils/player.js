import { handleSinger, formatMinuteSecond } from '@/utils/tools'
import { message } from 'antd'
import { getItem, setItem, getMusicById } from '@/utils/storage'
import { CheckCanPlay } from '@/api/player'
import { getPlaylistDeatil } from '@/api/playlist'
import { getMusicById as getMusicByIdApi } from '@/api/player'
//通用新歌封面
//name 歌曲名称
//artists 歌曲作者
//duration 歌曲时长
//id 歌曲id
export const playMusic = (id, name, artists, duration) => {
  //先判断歌曲是否可以播放
  CheckCanPlay(id).then(
    () => {
      //可以播放 将歌曲id存入缓存
      setItem('currentPlayMusicId', id)
      //从缓存中获取歌曲列表
      let playlist = getItem('playlist')
      const songInfo = {
        id,
        name,
        artists: handleSinger(artists),
        duration: formatMinuteSecond(duration)
      }
      //如果是第一次播放歌曲 初始化播放列表
      if (!playlist) {
        playlist = []
        playlist.unshift(songInfo)
      } else {
        //判断歌曲是否已经存在于播放列表
        const isHas = getMusicById(id)
        if (!isHas) {
          playlist.unshift(songInfo)
        }
      }
      setItem('playlist', playlist)
      //跳转到歌曲播放页面
      window.open('/player', 'alwaysRaised=yes')
    },
    () => {
      message.warning('抱歉，这首歌曲暂时不能播放。')
    }
  )
}
export const playPlaylist = id => {
  getPlaylistDeatil(id).then(({ data: { playlist } }) => {
    //获取歌单下的所有歌曲的id
    const trackIds = playlist.trackIds.map(item => item.id).join(',')
    //将歌曲id放在一起请求
    getMusicByIdApi(trackIds).then(({ data }) => {
      //格式化播放列表
      const playlist = data.songs.reduce((init, val) => {
        let { id, name, ar: artists, dt: duration } = val
        artists = handleSinger(val.ar)
        duration = formatMinuteSecond(val.dt)
        init.push({
          id,
          name,
          artists,
          duration
        })
        return init
      }, [])
      //将播放列表存入缓存
      setItem('playlist', playlist)
      //将当前播放的歌曲id存入缓存 默认是播放列表的第一个
      setItem('currentPlayMusicId', playlist[0].id)
      //跳转到歌曲播放页面
      window.open('/player', 'alwaysRaised=yes')
    })
  })
}

export const playRank = tracks => {
  //格式化播放列表
  const playlist = tracks.reduce((init, val) => {
    let { id, name, ar: artists, dt: duration } = val
    artists = handleSinger(val.ar)
    duration = formatMinuteSecond(val.dt)
    init.push({
      id,
      name,
      artists,
      duration
    })
    return init
  }, [])
  //将播放列表存入缓存
  setItem('playlist', playlist)
  //将当前播放的歌曲id存入缓存 默认是播放列表的第一个
  setItem('currentPlayMusicId', playlist[0].id)
  //跳转到歌曲播放页面
  window.open('/player', 'alwaysRaised=yes')
}
