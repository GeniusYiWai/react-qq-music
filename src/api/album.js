import request from '../utils/request'

//获取专辑详情
export const getAlbumDeatil = id => {
  return request.get(`/album/?id=${id}`)
}
