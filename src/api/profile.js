import request from '../utils/request'

//获取当前登录用户收藏的音乐 目前只能查看登录的用户收藏的音乐
//uid 用户id
export const getCollectSongs = uid => {
  return request.get(`/likelist?uid=${uid}`)
}
//获取用户收藏的歌单
//uid 用户id
export const getCollectPlaylist = (uid, limit = 100) => {
  return request.get(`/user/playlist?uid=${uid}&limit=${limit}`)
}

//获取用户收藏的专辑
//uid 用户id
export const getCollectAlbum = uid => {
  return request.get(`/album/sublist?uid=${uid}`)
}

//获取用户粉丝列表
//uid 用户id
export const getUserFan = (uid, limit = 1000) => {
  return request.get(`/user/followeds?uid=${uid}&limit=${limit}`)
}

//获取用户详情
//uid 用户id
export const getUserInfo = uid => {
  return request.get(`/user/detail?uid=${uid}`)
}

//获取当前登录用户收藏的mv 只能获取当前登录用户
export const getCollectMv = () => {
  return request.get(`/mv/sublist`)
}

//获取关注的歌手
export const getCollectSinger = () => {
  return request.get(`/artist/sublist`)
}
//获取用户关注的用户
//uid 用户id
export const getUserFollow = (uid, limit = 1000) => {
  return request.get(`/user/follows?uid=${uid}&limit=${limit}`)
}

//获取用户动态

export const getUserEvent = uid => {
  return request.get(`/user/event?uid=${uid}`)
}

//获取用户播放记录
export const getUserListenSongs = uid => {
  return request.get(`/user/record?uid=${uid}&type=1`)
}
