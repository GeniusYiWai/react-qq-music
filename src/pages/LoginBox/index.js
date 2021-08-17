import React, { memo } from 'react'
import { Modal, Tabs } from 'antd'
import LoginByPhone from './cpn/loginByPhone'
import LoginByEmail from './cpn/loginByEmail'
import LoginByQRCode from './cpn/loginByQrcode'
import { useSelector, useDispatch } from 'react-redux'
import { showLoginBoxDispatch, userLoginDispatch } from './store/actionCreators'
import { setUserDispatch } from './store/actionCreators'
import { getLoginStatus } from '@/api/login'

import { message } from 'antd'
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
  //登录成功 刷新页面
  const handleLoginSuccess = () => {
    message.success('登录成功')
    window.location.reload()
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
