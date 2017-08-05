import React, { Component } from 'react'
import './App.css'

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
export let store = createStore(reducers, middleware)

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
