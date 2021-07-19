import { SETDJCATE, SET_DJBYCATE } from './constant'
import { getDjCate, getDjByType } from '@/api/dj'

//获取所有电台分类 action
const setDjCateAction = dj => {
  return {
    type: SETDJCATE,
    dj: {
      djCate: dj
    }
  }
}
//获取电台详情通过类型 action
const setDjByCateAction = dj => {
  return {
    type: SET_DJBYCATE,
    dj
  }
}

//获取所有电台分类 dispatch
export const setDjCate = () => {
  return dispatch => {
    getDjCate().then(({ data }) => {
      dispatch(setDjCateAction(data.categories.splice(0, 9)))
    })
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
