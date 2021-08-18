import request from '../utils/request'

//根据条件查询歌手
/**
 * 
 * @param {*} area 地区
 * @param {*} initial 姓名首字母
 * @param {*} type 性别
 * @param {*} limit 长度
 * @param {*} offset 偏移量
 * @returns 
 */
export const getSinger = (
  area = '',
  initial = '',
  type = '',
  limit,
  offset
) => {
  return request.get(
    `/artist/list?type=${type}&area=${area}&initial=${initial}&limit=${limit}&offset=${offset}`
  )
}
//获取歌手热门歌手
/**
 * 
 * @param {*} limit 长度
 * @param {*} offset 偏移量
 * @returns 
 */
export const getHotSinger = (limit, offset) => {
  return request.get(`/artist/list?limit=${limit}&offset=${offset}`)
}

//获取歌手详情
/**
 * 
 * @param {*} id 歌手id
 * @returns 
 */
export const getSingerInfo = id => {
  return request.get(`/artist/detail?id=${id}`)
}

//歌手全部歌曲
/**
 * 
 * @param {*} param0 id 歌手id limit 长度 offset 偏移量
 * @returns 
 */
export const getSingerSongs = ({ id, limit, offset }) => {
  return request.get(`/artist/songs?id=${id}&limit=${limit}&offset=${offset}`)
}

//歌手专辑
/**
 * 
 * @param {*} param0 id 歌手id limit 长度 offset 偏移量
 * @returns 
 */
export const getSingerAlbums = ({ id, limit, offset }) => {
  return request.get(`/artist/album?id=${id}&limit=${limit}&offset=${offset}`)
}
//歌手mv
/**
 * 
 * @param {*} param0 id 歌手id limit 长度 offset 偏移量
 * @returns 
 */
export const getSingerMvs = ({ id, limit, offset }) => {
  return request.get(`/artist/mv?id=${id}&limit=${limit}&offset=${offset}`)
}
