import { createStore, applyMiddleware, compose } from 'redux'
import cReucer from './reducer'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
//混合reduecr
const store = createStore(cReucer, composeEnhancers(applyMiddleware(thunk)))
export default store
