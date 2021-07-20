import { SET_MV } from './constant'

const initState = {
  //mv数据state
  mvList: []
}

function reducer(state = initState, action) {
  switch (action.type) {
    case SET_MV:
      return { ...state, ...action.mv }
    default:
      return state
  }
}
export default reducer
