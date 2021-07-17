import request from '../utils/request'
//根据id获取音乐播放地址
//id 音乐id
export const getMusicById = id => {
  return request.get(`/song/detail?ids=${id}`)
}
