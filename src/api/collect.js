import request from '../utils/request'
// 时间戳,防止缓存
const timestamp = new Date().getTime()

//收藏歌单
/**
 *
 * @param {*} t 类型 1是收藏 2:取消收藏
 * @param {*} id 歌单id
 * @returns
 */
export const collectPlaylist = (t, id) => {
  return request.get(
    `/playlist/subscribe?t=${t}&id=${id}&timestamp=${timestamp}`
  )
}
//收藏专辑
/**
 *
 * @param {*} t 类型,1:收藏,2:取消收藏
 * @param {*} id 歌单id
 * @returns
 */

export const collectAlbum = (t, id) => {
  return request.get(`/album/sub?t=${t}&id=${id}&timestamp=${timestamp}`)
}
//收藏mv
/**
 *
 * @param {*} t 类型,1:收藏,2:取消收藏
 * @param {*} id mvid
 * @returns
 */
export const collectMv = (t, id) => {
  return request.get(`/mv/sub?t=${t}&mvid=${id}&timestamp=${timestamp}`)
}
//添加歌曲到歌单
/**
 *
 * @param {*} pid 歌单id
 * @param {*} tracks 歌曲id
 * @param {*} op 操作 add 添加 del删除
 * @returns
 */
export const collectSongToPlaylist = (pid, tracks, op = 'add') => {
  return request.get(`/playlist/tracks?op=${op}&pid=${pid}&tracks=${tracks}`)
}
