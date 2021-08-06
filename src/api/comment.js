import request from '../utils/request'
// 时间戳,防止缓存
const timestamp = new Date().getTime()
//获取歌单评论
//id 歌单id
export const getPlaylistComment = (id, limit = 20) => {
  return request.get(
    `/comment/playlist?id=${id}&limit=${limit}&timestamp=${timestamp}`
  )
}
//评论点赞
// cid : 评论 id
// t : 是否点赞 ,1 为点赞 ,0 为取消点赞
// type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
// 0: 歌曲
// 1: mv
// 2: 歌单
// 3: 专辑
// 4: 电台
// 5: 视频
// 6: 动态
export const likeComment = (id, cid, t, type) => {
  return request.get(
    `/comment/like?id=${id}&cid=${cid}&t=${t}&type=${type}&timestamp=${timestamp}`
  )
}
// 发送评论
// 必选参数
// t:1 发送, 2 回复
// type: 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型
// 0: 歌曲
// 1: mv
// 2: 歌单
// 3: 专辑
// 4: 电台
// 5: 视频
// 6: 动态
// id:对应资源 id
// content :要发送的内容
// commentId :回复的评论id (回复评论时必填)
// 调用例子 : /comment?t=1&type=1&id=5436712&content=test (往广岛之恋 mv 发送评论: test)
export const sendComment = (t, type, id, content, commentId) => {
  return request.get(
    `/comment?id=${id}&content=${content}&t=${t}&type=${type}&commentId=${commentId}&timestamp=${timestamp}`
  )
}
