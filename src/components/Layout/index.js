import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './index.css'

const Layout = ({ children, auftragState }) =>
  <div>
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
  </div>

export default Layout
