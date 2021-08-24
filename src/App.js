import React, { memo, Suspense, useEffect } from 'react'
import { renderRoutes } from 'react-router-config'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from './route'
import store from './store'
import Header from 'components/Common/header'
import { Skeleton, BackTop } from 'antd'
import LoginBox from './pages/LoginBox'
import '@/assets/css/common.less'
export default memo(function App() {
  useEffect(() => {
    console.log(
      `%c `,
      `padding:100px; 
      background-image: url('http://81.68.126.252/images/jiaran.jpg');
      background-size: cover; 
      background-position: center center;`
    )
    console.log('关注嘉然，顿顿解馋。')
    console.log('b站搜索嘉然今天吃什么。')
    console.log('create by 意外 觉得不错请给个star~')
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Suspense
          fallback={
            <>
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </>
          }
        >
          {/* 头部 */}
          {window.location.hash === '#/player' ? null : <Header />}
          {renderRoutes(routes)}
          {/* 登录弹出层 需要在全局展示 所以放在这里 */}
          <LoginBox />
          <BackTop />
        </Suspense>
      </Router>
    </Provider>
  )
})
