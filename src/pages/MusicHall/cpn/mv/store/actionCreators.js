import { SET_MV } from './constant'
import { getMv } from '@/api/mv'

//获取mv action
const setMvAction = mv => {
  return {
    type: SET_MV,
    mv: {
      mvList: mv
    }
  }
}

//获取mv dispatch
export const setMv = (area, initial, type) => {
  return dispatch => {
    getMv(area, initial, type).then(({ data }) => {
      dispatch(setMvAction(data.data))
    })
  }
}
