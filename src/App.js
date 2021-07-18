import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from './route'
import store from './store'
import Header from './components/Header'
import '@/assets/css/common.less'

export default memo(function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* 头部 */}
        {window.location.pathname === '/player' ? null : <Header />}

        {renderRoutes(routes)}
      </Router>
    </Provider>
  )
})
