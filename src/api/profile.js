import request from '../utils/request'
// 时间戳,防止缓存
const timestamp = new Date().getTime()
//获取当前登录用户收藏的音乐 目前只能查看登录的用户收藏的音乐
/**
 *
 * @param {*} uid用户id
 * @returns
 */
export const getCollectSongs = uid => {
  return request.get(`/likelist?uid=${uid}&timestamp=${timestamp}`)
}
//获取用户收藏的歌单
/**
 *
 * @param {*} param0 uid 用户id limit 长度 offset偏移量
 * @returns
 */
export const getCollectPlaylist = ({ uid, limit, offset }) => {
  return request.get(
    `/user/playlist?uid=${uid}&limit=${limit}&offset=${offset}&timestamp=${timestamp}&random=${Math.random()}`
  )
}
//获取用户收藏的专辑
/**
 *
 * @param {*} uid 用户id
 * @returns
 */
export const getCollectAlbum = uid => {
  return request.get(`/album/sublist?uid=${uid}&timestamp=${timestamp}`)
}

//获取用户详情
/**
 *
 * @param {*} uid 用户id
 * @returns
 */
export const getUserInfo = uid => {
  return request.get(`/user/detail?uid=${uid}&timestamp=${timestamp}`)
}

//获取当前登录用户收藏的mv 只能获取当前登录用户
/**
 *
 * @returns
 */
export const getCollectMv = () => {
  return request.get(`/mv/sublist?timestamp=${timestamp}`)
}

//获取关注的歌手
/**
 *
 * @returns
 */
export const getCollectSinger = () => {
  return request.get(`/artist/sublist`)
}
//获取用户关注列表
//uid 用户id
/**
 *
 * @param {*} uid
 * @param {*} limit 长度
 * @returns
 */
export const getUserFollow = (uid, limit = 100) => {
  return request.get(`/user/follows?uid=${uid}&limit=${limit}`)
}

//获取用户粉丝列表
/**
 *
 * @param {*} param0 uid 用户id limit 长度 offset偏移量
 * @returns
 */
export const getUserFan = ({ uid, limit, offset }) => {
  return request.get(
    `/user/followeds?uid=${uid}&limit=${limit}&offset=${offset}`
  )
}
//获取用户动态
/**
 *
 * @param {*} uid 用户id
 * @returns
 */
export const getUserEvent = uid => {
  return request.get(`/user/event?uid=${uid}`)
}

//获取用户听歌排行
/**
 *
 * @param {*} uid 用户id
 * @returns
 */
export const getUserListenSongs = uid => {
  return request.get(`/user/record?uid=${uid}&type=1`)
}
