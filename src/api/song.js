import request from '../utils/request'

//获取歌曲详情
//id 歌曲id
export const getSongDeatil = id => {
  return request.get(`/song/detail?ids=${id}`)
}
