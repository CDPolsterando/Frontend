import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'

import services from './services'

import Topbar from './components/Topbar/topbar'
import Bottombar from './components/Bottombar'
import Modal from './components/Modal'
import Requirements from './components/Requirements'
import Login from './components/Login'

import routes from './routes'

const Container = ({ children }) =>
  <main
    style={{
      paddingTop: 70, // 60,
      paddingBottom: 50
    }}
  >
    <div
      style={{
        width: '80%',
        margin: '0 auto',
        // background: 'rgba(250, 250, 250, 1)',
        borderRadius: 5,
        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(0, 0, 0, 0.18)',
        display: 'flex'
      }}
    >
      {children}
    </div>
  </main>

const Router = ({ dispatch, state, location }) => {
  const { pathname } = location
  const current = routes.findIndex(route => route.path === pathname)

  let prev = (routes[current - 1] || {}).path
  let next = (routes[current + 1] || {}).path

  return (
    <div>
      <Topbar state={state} />
      {services.isAuthenticated
        ? <Switch>
            {routes.map((route, index) => {
              const meetsRequirements = route.requirements
                ? route.requirements(state)
                : true

              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  render={() =>
                    <Modal
                      open={!meetsRequirements}
                      modal={() =>
                        <Requirements text={route.requirementsText} />}
                    >
                      {route.main
                        ? <main style={{ paddingTop: 60, paddingBottom: 50 }}>
                            {route.main()}
                          </main>
                        : <Container>
                            <div style={{ width: '50%' }}>
                              {route.left({ state, dispatch })}
                            </div>
                            <div style={{ width: '50%' }}>
                              {route.right({ state, dispatch })}
                            </div>
                          </Container>}
                    </Modal>}
                />
              )
            })}
          </Switch>
        : <Modal open modal={() => <Login />}>
            <div style={{ paddingTop: 70 }}>
              <img src="/logo.png" />
            </div>
          </Modal>}
      <Bottombar prev={prev} next={next} />
    </div>
  )
}

/*
import { Route, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Container = ({ width, children }) =>
  <div className="__container__" style={{ width: width + '%' }}>
    {children}
  </div>

// TODO: do we really need prev and next
// <Container width={80} prev='/step/ort' next='/step/price />

// TODO
// line between left and right

// colors in topbar to indicate if finished

// finished - green
// todo - grey
// not possible - red/orange

*/
const mapStateToProps = state => {
  return { state }
}
export default withRouter(connect(mapStateToProps)(Router))
