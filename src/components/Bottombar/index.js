import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const Bottombar = ({ prev = '', next = '', clearContract }) =>
  <div className="bottombar">
    <Link className={prev ? 'not-disabled' : 'disabled'} to={prev}>
      Zurück
    </Link>
    <div className="bottombar__middle">
      <a
        href="#abbrechen"
        onClick={event => {
          event.preventDefault()
          let result = window.confirm('Willst du wirklich abbrechen?')
          if (result) {
            clearContract()
          }
        }}
      >
        Abbrechen
      </a>
      <a
        href="#speichern"
        onClick={event => {
          event.preventDefault()
          // TODO: save contract
        }}
      >
        Speichern
      </a>
    </div>
    <Link className={next ? 'not-disabled' : 'disabled'} to={next}>
      Weiter
    </Link>
  </div>
export default Bottombar
