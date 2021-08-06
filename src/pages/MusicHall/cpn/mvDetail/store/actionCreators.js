import { SET_MV_DETAIL, SET_MV_URL, SET_SIMI_MV } from './constant'
import { getMvDeatil, getMvUrl, getSimiMv } from '@/api/mv'

//设置mv详情 action
const setMvDetailAction = mv => {
  return {
    type: SET_MV_DETAIL,
    mv: {
      mvDetail: mv
    }
  }
}
//设置mv播放地址 action
const setMvUrlAction = url => {
  return {
    type: SET_MV_URL,
    url: {
      mvUrl: url
    }
  }
}
//设置相似mv action
const setSimiMvAction = mv => {
  return {
    type: SET_SIMI_MV,
    mv: {
      simiMv: mv
    }
  }
}

//设置mv详情  dispatch
export const setMvDetailDispatch = id => {
  return dispatch => {
    console.log(id)
    getMvDeatil(id).then(({ data: { data } }) => {
      dispatch(setMvDetailAction(data))
    })
  }
}

//设置mv播放地址  dispatch
export const setMvUrlDispatch = id => {
  return dispatch => {
    getMvUrl(id).then(
      ({
        data: {
          data: { url }
        }
      }) => {
        dispatch(setMvUrlAction(url))
      }
    )
  }
}

//设置相似mv  dispatch
export const setSimiMvDispatch = id => {
  return dispatch => {
    getSimiMv(id).then(({ data: { mvs } }) => {
      dispatch(setSimiMvAction(mvs))
    })
  }
}
