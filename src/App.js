import React, { memo, Suspense } from 'react'
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
  return (
    <Provider store={store}>
      <Router>
        <Suspense
          fallback={
            <>
              <Skeleton active/>
              <Skeleton active/>
              <Skeleton active/>
              <Skeleton active/>
              <Skeleton active/>
              <Skeleton active/>
              <Skeleton active/>
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
