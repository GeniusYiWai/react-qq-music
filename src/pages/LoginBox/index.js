import React, { memo } from 'react'
import { Modal, Tabs } from 'antd'
import LoginByPhone from './cpn/login-phone'
import LoginByEmail from './cpn/login-email'
import LoginByQRCode from './cpn/login-qrcode'
import { useSelector, useDispatch } from 'react-redux'
import { showLoginBoxDispatch, userLoginDispatch } from './store/actionCreators'
import { setItem } from '@/utils/storage'
const { TabPane } = Tabs
export default memo(function LoginBox() {
  const dispatch = useDispatch()
  //获取弹出层显示隐藏状态
  const { visible } = useSelector(state => {
    return {
      visible: state.user.showLoginBox
    }
  })
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
  //登录成功 将登录态存入缓存 修改state中的用户登录状态
  const handleLoginSuccess = () => {
    dispatch(userLoginDispatch(true))
    setItem('login', true)
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
        <TabPane tab='手机号登录' key='1'>
          <LoginByPhone
            setVisible={changeModal}
            handleLoginSuccess={handleLoginSuccess}
          />
        </TabPane>
        <TabPane tab='邮箱登录' key='2'>
          <LoginByEmail
            setVisible={changeModal}
            handleLoginSuccess={handleLoginSuccess}
          />
        </TabPane>
        <TabPane tab='二维码登录' key='3'>
          <LoginByQRCode
            setVisible={changeModal}
            handleLoginSuccess={handleLoginSuccess}
          />
        </TabPane>
      </Tabs>
    </Modal>
  )
})
