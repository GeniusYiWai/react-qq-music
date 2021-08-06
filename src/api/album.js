import request from '../utils/request'

//获取专辑详情
//id 专辑id
export const getAlbumDeatil = id => {
  return request.get(`/album/?id=${id}`)
}
