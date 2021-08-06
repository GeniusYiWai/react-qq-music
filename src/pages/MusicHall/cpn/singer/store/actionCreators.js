import {
  SET_SINGER_REC,
  SET_HOTSINGER_REC,
  SET_COLLECT_SINGER
} from './constant'
import { getSinger, getHotSinger } from '@/api/singer'
import { getCollectSinger } from '@/api/mine'

//获取歌手 action
const setSingerAction = singer => {
  return {
    type: SET_SINGER_REC,
    singer: {
      singerList: singer
    }
  }
}
//获取热门歌手 action
const setHotSingerAction = singer => {
  return {
    type: SET_HOTSINGER_REC,
    singer: {
      hotSingerList: singer
    }
  }
}
//获取关注歌手 action
const setCollectSingerAction = singer => {
  return {
    type: SET_COLLECT_SINGER,
    singer: {
      collectSingerList: singer
    }
  }
}

//获取歌手 dispatch
export const setSinger = ({ area, initial, type }) => {
  return dispatch => {
    getSinger(area, initial, type).then(({ data }) => {
      dispatch(setSingerAction(data.artists.slice(0, 10)))
    })
  }
}
//获取热门歌手 dispatch
export const setHotSinger = ({ limit, offset }) => {
  return dispatch => {
    getHotSinger(limit, offset).then(({ data }) => {
      dispatch(setHotSingerAction(data.artists))
    })
  }
}
//获取关注歌手 dispatch
export const setCollectSingerDispatch = () => {
  return dispatch => {
    getCollectSinger().then(({ data }) => {
      dispatch(setCollectSingerAction(data.data))
    })
  }
}
