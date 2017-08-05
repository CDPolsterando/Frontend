import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const Home = () =>
  <div
    style={{
      width: '80%',
      margin: '0 auto',
      padding: '10px 20px',
      display: 'flex'
    }}
  >
    <div style={{ width: '40%' }}>
      <h2>Kontaktdaten</h2>
    </div>
    <div style={{ width: '60%' }}>
      <h2>Existierender Auftrag?</h2>
      <div>
        <p>
          Existiert bereits ein Auftrag der aber noch nicht bestätigt wurde?
        </p>
        <div className="ja_oder_nein">
          <Link to="/step/Kunde">Nein</Link>
          <Link to="/existierender/kunde">Ja</Link>
        </div>
      </div>
    </div>
  </div>
export default Home
