import request from '../utils/request'

export const getRecommendPlaylist = categoryId => {
  return request.get(`/getSongLists?categoryId=${categoryId}`)
}

