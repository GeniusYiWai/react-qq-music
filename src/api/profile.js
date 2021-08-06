import request from '../utils/request'

//获取当前登录用户收藏的音乐 目前只能查看登录的用户收藏的音乐
//uid 用户id
export const getCollectSongs = uid => {
  return request.get(`/likelist?uid=${uid}`)
}
//获取用户收藏的歌单
//uid 用户id
export const getCollectPlaylist = uid => {
  return request.get(`/user/playlist?uid=${uid}`)
}

//获取用户收藏的专辑
//uid 用户id
export const getCollectAlbum = uid => {
  return request.get(`/album/sublist?uid=${uid}`)
}

//获取用户关注列表
//uid 用户id
export const getUserFollow = uid => {
  return request.get(`/user/follows?uid=${uid}`)
}

//获取用户粉丝列表
//uid 用户id
export const getUserFan = uid => {
  return request.get(`/user/followeds?uid=${uid}`)
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

//获取收藏的歌手
export const getCollectSinger = () => {
  return request.get(`/artist/sublist`)
}
