import React from 'react'
import './index.css'
import { connect } from 'react-redux'

import BottomBar from './bottomBar'

const Container = ({ children, ...restProps }) =>
  <div className="container">
    <div className="container__children">
      {children}
    </div>
    <BottomBar {...restProps} />
    {/* <div className="container__bottombar">
      <a className="zureck">Zurück</a>
      <a className="weiter">Weiter</a>
    </div> */}
  </div>

const mapStateToProps = state => {
  return {
    loading: state.network.standort_loading,
    error: state.network.standort_error,
    standort: {}
  }
}
export default connect(mapStateToProps)(Container)
