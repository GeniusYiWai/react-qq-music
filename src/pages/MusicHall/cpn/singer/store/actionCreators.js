import { SET_SINGER_REC } from './constant'
import { getSinger } from '@/api/singer'

//获取歌手 action
const setSingerAction = singer => {
  return {
    type: SET_SINGER_REC,
    singer: {
      singerList: singer
    }
  }
}
//获取歌手 dispatch
export const setSinger = (area, initial, type) => {
  return dispatch => {
    getSinger(area, initial, type).then(({ data }) => {
      dispatch(setSingerAction(data.artists.slice(0, 10)))
    })
  }
}
