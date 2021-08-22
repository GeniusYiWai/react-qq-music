import React, { memo, useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { loginByEmail as loginByEmailAPI } from '@/api/login'
export default memo(function LoginByEmail(props) {
  //props
  //隐藏弹出层
  const { setVisible, handleLoginSuccess } = props
  //获取表单引用
  const [form] = Form.useForm()
  //点击登录后禁用按钮
  const [loading, setLoading] = useState(false)
  //重置表单
  const onReset = () => {
    form.resetFields()
  }
  //邮箱登录
  const loginByEmail = async (email, password) => {
    try {
      const { data } = await loginByEmailAPI(email, password)
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
  //邮箱和密码校验通过触发该方法 进入登录流程
  const handleLogin = ({ email, password }) => {
    setLoading(true)
    loginByEmail(email, password)
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
    email: [
      {
        required: true,
        type: 'email',
        message: '邮箱地址不合法'
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
      <Form.Item label='邮箱' name='email' rules={rules.email} hasFeedback>
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
