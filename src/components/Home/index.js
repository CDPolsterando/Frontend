import React from 'react'
import Container from '../Container'
import { Link } from 'react-router-dom'
import './index.css'

const Home = () =>
  <Container>
    <div>
      <h2>Kontaktdaten</h2>
    </div>
    <div>
      <h2>Existierender Auftrag?</h2>
      <div>
        <p>
          Existiert bereits ein Auftrag der aber noch nicht bestätigt wurde?
        </p>
        <div className="ja_oder_nein">
          <Link to="/neu/kunde">Nein</Link>
          <Link to="/existierender/kunde">Ja</Link>
        </div>
      </div>
    </div>
  </Container>
export default Home
