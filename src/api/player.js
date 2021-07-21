import request from '../utils/request'
//根据id获取音乐详情
//id 音乐id
export const getMusicById = id => {
  return request.get(`/song/detail?ids=${id}`)
}
//根据id检测音乐是否可以播放
//id 音乐id
export const CheckCanPlay = id => {
  return request.get(`/check/music?id=${id}`)
}
//获取歌词
//ld 歌曲id
export const getLyric = id => {
  return request.get(`/lyric?id=${id}`)
}
