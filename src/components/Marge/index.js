import React, { Component } from 'react'
import { margeVonPreis, preisVonMarge } from '../../logic/preis'
import gesamtZeit from '../../logic/gesamtZeit'
import './index.css'

const konstanten = {
  // alle einheiten in euro
  stundensatz_fahrt: 10,
  stundensatz_arbeit: 15,
  pauschal_nacharbeit: 5,
  pauschal_reinigunsmittel: 15,
  cost_per_order: 45,
  spritpreis_pro_km: 0.16,

  mindest_marge: 0.05 // also 5%
}

class Marge extends Component {
  constructor(props) {
    super(props)
    this.state = {
      preis: 0,
      marge: 0
    }
  }
  onChangePreis = preis => event => {
    const { fahrstrecke, fahrzeit } = this.props
    if (!fahrstrecke || !fahrzeit) {
      console.error('Marge: fahrstrecke and fahrzeit need to be set!')
    }

    const variablen = {
      fahrstrecke,
      fahrzeit,
      // fahrzeit: 40.266666,
      // fahrstrecke: 49.135,

      // TODO: from redux

      arbeitszeit: gesamtZeit(this.props.objekte)
    }

    const preis = event.target.value
    if (preis === '') {
      return this.setState({ preis: '', marge: '' })
    }

    const marge = margeVonPreis(konstanten, variablen, parseFloat(preis))
    this.setState({
      preis,
      marge: marge.toFixed(2)
    })
  }
  onChangeMarge = marge => event => {
    const { fahrstrecke, fahrzeit } = this.props
    if (!fahrstrecke || !fahrzeit) {
      console.error('Marge: fahrstrecke and fahrzeit need to be set!')
    }

    const variablen = {
      fahrstrecke,
      fahrzeit,
      // fahrzeit: 40.266666,
      // fahrstrecke: 49.135,
      arbeitszeit: gesamtZeit(this.props.objekte)
    }

    const marge = event.target.value
    if (marge === '') {
      return this.setState({
        preis: '',
        marge: ''
      })
    }

    const marge_float = parseFloat(marge) / 100
    const preis = preisVonMarge(konstanten, variablen, marge_float)
    this.setState({
      preis: preis.toFixed(2),
      marge
    })
  }
  render() {
    const { preis, marge } = this.state
    return (
      <div className="rechner">
        <h3>Rechner</h3>
        <label>
          Preis (in €):
          <input value={preis} onChange={this.onChangePreis(preis)} />
        </label>
        <svg className="up" width="24" height="24" viewBox="0 0 24 24">
          <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
        </svg>
        <svg className="down" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="#010101"
            d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
          />
        </svg>
        {/* <div className="arrow">
          
        </div> */}
        <label>
          Marge (in %):
          <input value={marge} onChange={this.onChangeMarge(marge)} />
        </label>
        {marge < 5
          ? <p className="error">Die marge muss mindestens 5% sein!</p>
          : null}
      </div>
    )
  }
}
export default Marge
