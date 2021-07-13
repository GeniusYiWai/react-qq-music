import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from './route'
import store from './store'
import Header from './components/Header/index'
export default memo(function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* 头部 */}
        <Header />
        {renderRoutes(routes)}
      </Router>
    </Provider>
  )
})
