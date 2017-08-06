import React, { Component } from 'react'
import './App.css'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import contractReducer from './state/contract/reducer'
import networkReducer from './state/network/reducer'

import { BrowserRouter } from 'react-router-dom'

import Router from './Router'

import promiseMiddleware from 'redux-promise-middleware'

const middleware = compose(
  applyMiddleware(promiseMiddleware()),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)
const reducers = combineReducers({
  contract: contractReducer,
  network: networkReducer
})

const config = {
  key: 'root', // key is required
  storage // storage is now required
}
const reducer = persistReducer(config, reducers)
export let store = createStore(reducer, middleware)
persistStore(store)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    )
  }
}
export default App
