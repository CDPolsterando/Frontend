import React from 'react'
import './index.css'

import BottomBar from './bottomBar'

const Container = ({ children, routeName }) =>
  <div className="container">
    <div className="container__children">
      {children}
    </div>
    <BottomBar routeName={routeName} />
    {/* <div className="container__bottombar">
      <a className="zureck">Zurück</a>
      <a className="weiter">Weiter</a>
    </div> */}
  </div>

export default Container
