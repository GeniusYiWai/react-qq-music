import request from '../utils/request'
//根据id获取音乐详情
/**
 *
 * @param {*} id 音乐id
 * @returns
 */
export const getMusicById = id => {
  return request.get(`/song/detail?ids=${id}`)
}
//根据id检测音乐是否可以播放
/**
 *
 * @param {*} id 音乐id
 * @returns
 */
export const CheckCanPlay = id => {
  return request.get(`/check/music?id=${id}`)
}
//获取歌词
/**
 *
 * @param {*} id 歌曲id
 * @returns
 */
export const getLyric = id => {
  return request.get(`/lyric?id=${id}`)
}
