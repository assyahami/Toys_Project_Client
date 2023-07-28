import {combineReducers,createStore,applyMiddleware} from 'redux'
import authReducer from './auth/authReducer'
import thunk from 'redux-thunk'

const rootReduceers=combineReducers({authReducer})

const store=createStore(rootReduceers,applyMiddleware(thunk))

export{
    store
}
