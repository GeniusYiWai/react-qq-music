import { SET_ALLRANK_REC, SET_RANKBYID_REC } from './constant'
import { getAllRank, getRankById } from '@/api/rank'

//获取全部排行榜类型 action
const setAllRankAction = rank => {
  return {
    type: SET_ALLRANK_REC,
    rank: {
      rankList: rank
    }
  }
}

//获取排行榜数据通过Id action
const setRankByIdAction = rank => {
  return {
    type: SET_RANKBYID_REC,
    rank: {
      rankDetail: rank
    }
  }
}
//获取全部排行榜类型 dispatch
export const setAllRank = () => {
  return dispatch => {
    getAllRank().then(({ data }) => {
      dispatch(setAllRankAction(data.list))
    })
  }
}

//获取排行榜数据通过id dispatch
export const setRankById = id => {
  return dispatch => {
    getRankById(id).then(({ data }) => {
      dispatch(setRankByIdAction(data.playlist))
    })
  }
}
