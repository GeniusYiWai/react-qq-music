import { getLoginStatus as getLoginStatusAPI } from '@/api/login'
import { setItem } from '@/utils/storage'
import {
  userLoginDispatch,
  setUserDispatch
} from '@/pages/LoginBox/store/actionCreators'
//获取登录信息
export const getLoginStatus = async (dispatch) => {
  try {
    const {
      data: {
        data: { profile }
      }
    } = await getLoginStatusAPI()
    if (profile) {
      //更改state中的用户登录状态
      dispatch(userLoginDispatch(true))
      //更改state中的用户信息
      dispatch(setUserDispatch(profile))
      setItem('uid', profile.userId)
    }
  } catch (error) {}
}
