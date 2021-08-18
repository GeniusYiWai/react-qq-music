import request from '../utils/request'

//获取歌曲详情
/**
 * 
 * @param {*} id  歌曲id
 * @returns 
 */
export const getSongDeatil = id => {
  return request.get(`/song/detail?ids=${id}`)
}
