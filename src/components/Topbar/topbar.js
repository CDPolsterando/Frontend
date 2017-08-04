import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './index.css'
import routes from '../../routes'
import services from '../../services'
import Data from '../Data'

const Topbar = ({ state }) => {
  let i = 0
  return (
    <header className="topbar">
      <Link className="topbar__logo" to="/">
        <img src="/logo.png" alt="logo" />
      </Link>
      <nav>
        {routes.filter(route => route.topbar).map((route, index) => {
          i++

          const meetsRequirements = route.requirements
            ? route.requirements(state)
            : true

          const isFinished = route.finished ? route.finished(state) : false
          return (
            <NavLink
              to={route.path}
              className={
                'topbar__step' +
                (meetsRequirements
                  ? ' step_meets_requirements'
                  : ' step_does_not_meet_requirements') +
                (isFinished ? ' step_finished' : ' step_not_finished')
              }
              activeClassName="active"
              key={index}
            >
              {i}. {route.name}
            </NavLink>
          )
        })}
      </nav>
      <div className="topbar__dropdown">
        <span>
          {services.username || 'Anonymous'}
        </span>
        <div className="topbar__dropdown__content">
          <a
            onClick={event => {
              event.preventDefault()
              services.signout()
              window.location.reload()
            }}
            href="#ausloggen"
          >
            Ausloggen
          </a>
          <Data
            network={state.network}
            keys={['constants', 'discounts', 'scripts', 'products']}
          />
        </div>
      </div>
    </header>
  )
}
export default Topbar
