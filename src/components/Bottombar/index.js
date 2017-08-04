import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const Bottombar = ({ prev = '', next = '' }) =>
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
            // TODO: clear redux store
            console.log('TODO: clear redux store')
          }
        }}
      >
        Abbrechen
      </a>
      <Link to="">Speichern</Link>
    </div>
    <Link className={next ? 'not-disabled' : 'disabled'} to={next}>
      Weiter
    </Link>
  </div>
export default Bottombar
