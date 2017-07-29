import React from 'react'
import { NavLink } from 'react-router-dom'

const routes = ['kunde', 'objekte', 'preis', 'fertig']

const BottomBar = ({ routeName, loading, error }) => {
  const index = routes.indexOf(routeName)

  const previous = routes[index - 1]
  const next = routes[index + 1]

  let item
  if (loading) {
    item = <span>Berechnen...</span>
  } else if (error) {
    item = (
      <span>
        Fehler bei berechnung: {error}
      </span>
    )
  } else {
    item = <span>PLZ noch nicht eingegeben</span>
  }

  return (
    <div className="container__bottombar">
      {previous
        ? <NavLink className="zureck" to={previous}>
            Zurück
          </NavLink>
        : <a className="zurueck not-active">Zurück</a>}

      <p className="naechster__standort">
        Nächster Standort: {item}
      </p>

      {next
        ? <NavLink className="weiter" to={next}>
            Weiter
          </NavLink>
        : <a className="weiter not-active">Weiter</a>}
    </div>
  )
}
export default BottomBar
