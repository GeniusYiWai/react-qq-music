import React, { memo } from 'react'
import { Modal, Tabs } from 'antd'
import LoginByPhone from './cpn/loginByPhone'
import LoginByEmail from './cpn/loginByEmail'
import LoginByQRCode from './cpn/loginByQrcode'
import { useSelector, useDispatch } from 'react-redux'
import { showLoginBoxDispatch } from './store/actionCreators'
import { setItem } from '@/utils/storage'
import { message } from 'antd'
import { getLoginStatus } from '@/actions/login'
const { TabPane } = Tabs
export default memo(function LoginBox() {
  //redux
  const dispatch = useDispatch()
  //获取弹出层显示隐藏状态
  const { visible } = useSelector(state => {
    return {
      visible: state.user.showLoginBox
    }
  })
  //fucntions
  //显示弹出层
  const showModal = () => {
    changeModal(true)
  }
  //隐藏弹出层
  const handleCancel = () => {
    changeModal(false)
  }
  //dispatch修改弹出层状态弹出层
  const changeModal = flag => {
    dispatch(showLoginBoxDispatch(flag))
  }
  //登录成功 获取用户登录信息 将cookie存入到缓存中
  const handleLoginSuccess = cookie => {
    setItem('cookie', cookie)
    message.success('登录成功。')
    getLoginStatus(dispatch)
  }
  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={handleCancel}
      destroyOnClose={true}
      centered
    >
      <Tabs defaultActiveKey='1' centered>
        <TabPane tab='二维码登录' key='1'>
          <LoginByQRCode
            setVisible={changeModal}
            handleLoginSuccess={handleLoginSuccess}
          />
        </TabPane>
        <TabPane tab='手机号登录' key='2'>
          <LoginByPhone
            setVisible={changeModal}
            handleLoginSuccess={handleLoginSuccess}
          />
        </TabPane>
        <TabPane tab='邮箱登录' key='3'>
          <LoginByEmail
            setVisible={changeModal}
            handleLoginSuccess={handleLoginSuccess}
          />
        </TabPane>
      </Tabs>
    </Modal>
  )
})
