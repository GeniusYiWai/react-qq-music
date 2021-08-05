import request from '../utils/request'

//获取用户收藏的音乐
export const getCollectSongs = uid => {
  return request.get(`/likelist?uid=${uid}`)
}
//获取用户收藏的歌单
export const getCollectPlaylist = uid => {
  return request.get(`/user/playlist?uid=${uid}`)
}
//获取用户收藏的mv
export const getCollectMv = () => {
  return request.get(`/mv/sublist`)
}
//获取用户收藏的专辑
export const getCollectAlbum = uid => {
  return request.get(`/album/sublist?uid=${uid}`)
}

//获取用户关注列表
export const getUserFollow = uid => {
  return request.get(`/user/follows?uid=${uid}`)
}

//获取用户粉丝列表
export const getUserFan = uid => {
  return request.get(`/user/followeds?uid=${uid}`)
}
