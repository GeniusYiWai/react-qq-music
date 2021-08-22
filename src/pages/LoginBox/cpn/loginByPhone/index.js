import React, { memo, useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { loginbByPhone as loginbByPhoneAPI } from '@/api/login'
export default memo(function LoginByPhone(props) {
  //props
  //setVisible 控制弹出层显示隐藏
  //handleLoginSuccess 登录成功后调用该方法
  const { setVisible, handleLoginSuccess } = props
  //获取表单引用
  const [form] = Form.useForm()
  //控制按钮禁用
  const [loading, setLoading] = useState(false)
  //重置表单
  const onReset = () => {
    form.resetFields()
  }
  //手机号登录
  const loginbByPhone = async (phoneNumber, password) => {
    try {
      const { data } = await loginbByPhoneAPI(phoneNumber, password)
      if (data.code === 200) {
        //更新state中的用户登录状态 以及缓存中的用户登录状态 销毁弹出层
        handleLoginSuccess(data.cookie)
        setVisible(false)
      } else if (data.code === 502) {
        message.error(data.message)
      }
      setLoading(false)
    } catch (error) {
      message.error('登录失败!')
      setLoading(false)
    }
  }
  //手机号和密码校验通过触发该方法
  const handleLogin = ({ phoneNumber, password }) => {
    setLoading(true)
    loginbByPhone(phoneNumber, password)
  }
  //自定义校验规则 校验手机号
  const handleCheckPhone = (rule, value) => {
    const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
    if (value && reg.test(value)) {
      return Promise.resolve()
    } else {
      return Promise.reject('请输入正确的手机号')
    }
  }
  //自定义校验规则 校验密码
  const handleCheckPassword = (rule, value) => {
    const reg = /^[\w]{6,18}$/
    if (value && reg.test(value)) {
      return Promise.resolve()
    } else {
      return Promise.reject('密码长度在6到18位')
    }
  }
  const rules = {
    phoneNumber: [
      {
        required: true,
        validator: handleCheckPhone
      }
    ],
    password: [
      {
        required: true,
        validator: handleCheckPassword
      }
    ]
  }
  return (
    <Form
      name='basic'
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={{ remember: true }}
      form={form}
      onFinish={value => handleLogin(value)}
    >
      <Form.Item
        label='手机号'
        name='phoneNumber'
        rules={rules.phoneNumber}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='密码'
        name='password'
        rules={rules.password}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
        <Button type='primary' htmlType='submit' loading={loading} style={{marginRight:10}}>
          确认登录
        </Button>
        <Button htmlType='button' onClick={onReset} loading={loading}>
          重置
        </Button>
      </Form.Item>
    </Form>
  )
})
