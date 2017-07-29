import React from 'react'
import { NavLink } from 'react-router-dom'

const routes = ['kunde', 'objekte', 'preis', 'fertig']

const BottomBar = ({ routeName }) => {
  const index = routes.indexOf(routeName)

  const previous = routes[index - 1]
  const next = routes[index + 1]

  return (
    <div className="container__bottombar">
      {previous
        ? <NavLink className="zureck" to={previous}>
            Zurück
          </NavLink>
        : <a className="zurueck not-active">Zurück</a>}

      {next
        ? <NavLink className="weiter" to={next}>
            Weiter
          </NavLink>
        : <a className="weiter not-active">Weiter</a>}
    </div>
  )
}
export default BottomBar
