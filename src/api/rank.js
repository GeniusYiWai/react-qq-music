import request from '../utils/request'

export const getAllRank = () => {
  return request.get(`/toplist`)
}

export const getRankById = id => {
  return request.get(`/playlist/detail?id=${id}`)
}
