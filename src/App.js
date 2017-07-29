import React, { Component } from 'react'
import './App.css'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import auftragReducer from './state/auftrag/reducer'
import networkReducer from './state/network/reducer'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'

import Neu_Kunde from './components/_Neu/Kunde'
import Neu_Objekte from './components/_Neu/Objekte'
import Neu_Fertig from './components/_Neu/Fertig'
import Neu_Preis from './components/_Neu/Preis'
// _Existierend

import promiseMiddleware from 'redux-promise-middleware'

// composeStoreWithMiddleware = applyMiddleware(promiseMiddleware())(createStore)

const middleware = compose(
  applyMiddleware(promiseMiddleware()),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)
const reducers = combineReducers({
  auftrag: auftragReducer,
  network: networkReducer
})
let store = createStore(
  reducers,
  middleware
  // applyMiddleware(
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //     window.__REDUX_DEVTOOLS_EXTENSION__(),
  //   promiseMiddleware
  // )
)

const NoMatch = () =>
  <div>
    <h2>404</h2>
    <p>Page not found</p>
  </div>

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              {/* <Route path="/existierend/kunde" component={Kunde} /> */}
              <Route path="/neu/kunde" component={Neu_Kunde} />
              <Route path="/neu/objekte" component={Neu_Objekte} />
              <Route path="/neu/preis" component={Neu_Preis} />
              <Route path="/neu/fertig" component={Neu_Fertig} />
              <Route component={NoMatch} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    )
  }
}

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

export default App
