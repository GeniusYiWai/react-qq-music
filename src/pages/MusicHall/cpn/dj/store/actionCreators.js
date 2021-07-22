import { SET_DJ_BY_CATE } from './constant'
import {  getDjByType } from '@/api/dj'


//获取电台详情通过类型 action
const setDjByCateAction = dj => {
  return {
    type: SET_DJ_BY_CATE,
    dj
  }
}


//获取电台详情通过类型  dispatch
export const setDjByCate = type => {
  return dispatch => {
    getDjByType(type).then(({ data }) => {
      dispatch(setDjByCateAction(data.djRadios))
    })
  }
}
