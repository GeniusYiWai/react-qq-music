import request from '../utils/request'
// 时间戳,防止缓存
const timestamp = new Date().getTime()
//获取歌单评论
/**
 *
 * @param {*} id 歌单id limit数据长度 offset偏移量
 * @returns
 */
export const getPlaylistComment = ({ id, limit, offset }) => {
  return request.get(
    `/comment/playlist?id=${id}&limit=${limit}&offset=${offset}&timestamp=${timestamp}`
  )
}
//获取歌曲评论
/**
 *
 * @param {*} id 歌曲id limit数据长度 offset偏移量
 * @returns
 */
export const getSongComment = ({ id, limit, offset }) => {
  return request.get(
    `/comment/music?id=${id}&limit=${limit}&offset=${offset}&timestamp=${timestamp}`
  )
}
//获取mv评论
/**
 *
 * @param {*} id mvid limit数据长度 offset偏移量
 * @returns
 */
export const getMvComment = ({ id, limit, offset }) => {
  return request.get(
    `/comment/mv?id=${id}&limit=${limit}&offset=${offset}&timestamp=${timestamp}`
  )
}
//获取专辑评论
/**
 *
 * @param {*} id 专辑id limit数据长度 offset偏移量
 * @returns
 */
export const getAlbumComment = ({ id, limit, offset }) => {
  return request.get(
    `/comment/album?id=${id}&limit=${limit}&offset=${offset}&timestamp=${timestamp}`
  )
}
//获取video评论
/**
 *
 * @param {*} id video id limit数据长度 offset偏移量
 * @returns
 */
export const getVideoComment = ({ id, limit, offset }) => {
  return request.get(
    `/comment/video?id=${id}&limit=${limit}&offset=${offset}&timestamp=${timestamp}`
  )
}

//评论点赞
/**
 * 
 * @param {*} id 资源 id, 如歌曲 id,mv id
 * @param {*} cid 评论 id
 * @param {*} t 是否点赞 ,1 为点赞 ,0 为取消点赞
 * @param {*} type 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
 *0: 歌曲
 *1: mv
 *2: 歌单
 *3: 专辑 
 *4: 电台
 *5: 视频
 *6: 动态
 * @returns 
 */
export const likeComment = (id, cid, t, type) => {
  return request.get(
    `/comment/like?id=${id}&cid=${cid}&t=${t}&type=${type}&timestamp=${timestamp}`
  )
}
// 发送评论
/**
 * 
 * @param {*} id 资源 id, 如歌曲 id,mv id
 * @param {*} content 要发送的内容
 * @param {*} t 1 发送, 2 回复
 * @param {*} type 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
 * @param {*} commentId 回复的评论id (回复评论时必填)
 *0: 歌曲
 *1: mv
 *2: 歌单
 *3: 专辑 
 *4: 电台
 *5: 视频
 *6: 动态
 * @returns 
 */
export const sendComment = (t, type, id, content, commentId) => {
  return request.get(
    `/comment?id=${id}&content=${content}&t=${t}&type=${type}&commentId=${commentId}&timestamp=${timestamp}`
  )
}
