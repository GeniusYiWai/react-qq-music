import request from '../utils/request'
//获取歌手页面全部歌手
//type 性别
//area 地区
//initial 姓名首字母
export const getSinger = ({ area = '', initial = '', type = '' }) => {
  return request.get(
    `/artist/list?type=${type}&area=${area}&initial=${initial}`
  )
}
