import request from '../utils/request'
// 时间戳,防止缓存
const timestamp = new Date().getTime()
//收藏歌单

// t : 类型,1:收藏,2:取消收藏
// id : 歌单 id
export const collectPlaylist = (t, id) => {
  return request.get(
    `/playlist/subscribe?t=${t}&id=${id}&timestamp=${timestamp}`
  )
}

// t : 类型,1:收藏,2:取消收藏
// id : 歌单 id
export const collectAlbum = (t, id) => {
  return request.get(`/album/sub?t=${t}&id=${id}&timestamp=${timestamp}`)
}
// t : 类型,1:收藏,2:取消收藏
// id : 歌单 id
export const collectMv = (t, id) => {
  return request.get(`/mv/sub?t=${t}&mvid=${id}&timestamp=${timestamp}`)
}

export const collectSongToPlaylist = (pid, tracks, op = 'add') => {
  return request.get(`/playlist/tracks?op=${op}&pid=${pid}&tracks=${tracks}`)
}
