import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './index.css'
// import { connect } from 'react-redux'

const Layout = ({ children, auftragState }) =>
  <div className="layout">
    <header>
      <Link className="logo" to="/">
        <img src="/logo.png" alt="logo" />
      </Link>
      <nav>
        <NavLink to="/neu/kunde" activeClassName="active">
          1. Kunde/Ort
        </NavLink>
        <NavLink to="/neu/objekte" activeClassName="active">
          2. Objekte
        </NavLink>
        <NavLink to="/neu/preis" activeClassName="active">
          3. Preis
        </NavLink>
        <NavLink to="/neu/fertig" activeClassName="active">
          4. Fertig
        </NavLink>
      </nav>
    </header>
    <main>
      {children}
    </main>
    <img alt="" className="logo_mit_schrift" src="/logo_mit_schrift.jpg" />
  </div>

// const mapStateToProps = state => {
//   const { name, plz } = state.auftrag
//   console.log('state: ', state)

//   const kundeFertig = name && String(plz).length === 5

//   return {
//     kunde: kundeFertig ? 'fertig' : 'nicht-fertig'
//   }
// }

// export default connect()(Layout)

export default Layout
