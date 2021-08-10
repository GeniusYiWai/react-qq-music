import { createStore, applyMiddleware, compose } from 'redux'
//引入cReucer
import cReucer from './reducer'
//引入redux-thunk
import thunk from 'redux-thunk'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
//混合reduecr
const store = createStore(cReucer, composeEnhancers(applyMiddleware(thunk)))
export default store
