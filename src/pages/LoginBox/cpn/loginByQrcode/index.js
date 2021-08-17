import React, { memo, useEffect, useState } from 'react'
import { message } from 'antd'
import QRGuide from '@/assets/img/qr_guide.png'
import AuthorizingImg from '@/assets/img/Authorizing.jpg'
import {
  getQRKey as getQRKeyAPI,
  getQRByKey as getQRByKeyAPI,
  getQRStatus as getQRStatusAPI
} from '@/api/login'
import './index.less'
export default memo(function LoginByQRCode(props) {
  let timer
  const { setVisible, handleLoginSuccess } = props
  //扫描登录授权中
  const [Authorizing, setAuthorizing] = useState(false)
  //二维码是否有效
  const [QRValid, setQRValid] = useState(false)
  //二维码图片url地址
  const [QRImgUrl, setQRImgUrl] = useState()
  //轮询获取二维码状态 检查是否有效
  const getQRStatus = async key => {
    try {
      const { data } = await getQRStatusAPI(key)
      //状态码800 说明二维码已经失效 隐藏之前的二维码图片 清除定时器
      if (data.code === 800) {
        setQRValid(false)
        setAuthorizing(false)
        clearInterval(timer)
      } else if (data.code === 802) {
        //展示授权中页面
        setAuthorizing(true)
      } else if (data.code === 803) {
        setVisible(false)
        //清除定时器
        clearInterval(timer)
        //更新state中的用户登录状态 以及缓存中的用户登录状态 销毁弹出层
        handleLoginSuccess(true)
      }
    } catch (error) {
      message.error('获取二维码状态失败,请检查网络连接!')
    }
  }
  //获取二维码key
  const getQRKey = async () => {
    try {
      const { data } = await getQRKeyAPI()
      if (data.code === 200) {
        const {
          data: { unikey }
        } = data
        //通过key生成二维码
        getQRByKey(unikey)
      }
    } catch (error) {
      message.error('获取二维码失败,请检查网络连接!')
    }
  }
  //通过key获取二维码
  const getQRByKey = async unikey => {
    try {
      const { data } = await getQRByKeyAPI(unikey)
      if (data.code === 200) {
        const {
          data: { qrimg }
        } = data
        //展示二维码
        setQRImgUrl(qrimg)
        setQRValid(true)
        //轮询二维码是否有效
        pollingQRStatus(unikey)
      }
    } catch (error) {
      message.error('获取二维码失败,请检查网络连接!')
    }
  }
  const pollingQRStatus = key => {
    //每隔2秒查询一次
    timer = setInterval(() => {
      getQRStatus(key)
    }, 2000)
  }
  //获取二维码
  const getQRCode = () => {
    getQRKey()
  }
  //刷新二维码
  const refreshQR = () => {
    getQRCode()
  }
  //第一次加载页面 获取二维码 依赖传入一个空数组表示在组件渲染销毁阶段只执行一次
  useEffect(() => {
    getQRCode()
    return () => {
      //关闭弹出层 销毁定时器 防止继续发送网络请求
      clearInterval(timer)
    }
  }, [])
  return (
    <div className='qr-container'>
      {Authorizing ? (
        <div className='authorizing'>
          <img src={AuthorizingImg} alt='' />
          <h3>扫描成功</h3>
          <p>请在手机上确认登录</p>
        </div>
      ) : (
        <>
          <div className='qr-left'>
            <img src={QRGuide} alt='' />
          </div>
          <div className='qr-right'>
            <p>扫描登录</p>

            <img
              src={QRImgUrl ? QRImgUrl : ''}
              alt=''
              className={!QRValid ? 'img-invalid' : ''}
            />

            {!QRValid && QRImgUrl ? (
              <div className='invalid'>
                二维码已失效
                <button onClick={() => refreshQR()}>点击刷新</button>
              </div>
            ) : null}

            <p className='tips'>
              使用
              <span> 网易云音乐APP </span>
              扫码登录
            </p>
          </div>
        </>
      )}
    </div>
  )
})
