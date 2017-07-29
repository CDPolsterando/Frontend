import React, { Component } from 'react'
import { connect } from 'react-redux'
import Container from '../../Container'
import getGesamtPreis from '../../../logic/gesamtPreis'
import getGesamtZeit from '../../../logic/gesamtZeit'
import './index.css'
import Speech from '../../Speech'
import Marge from '../../Marge'

import { margeVonPreis, preisVonMarge } from '../../../logic/preis'
import gesamtZeit from '../../../logic/gesamtZeit'

class Preis extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ausgehandelterPreis: ''
    }
  }
  changeAusgehandelterPreis = event => {
    // TODO: add ausgehandelterPreis to redux
    const value = event.target.value
    this.setState({
      ausgehandelterPreis: value
    })
  }
  render() {
    const {
      objekte,
      gesamt_preis,
      gesamt_zeit,
      mindestpreis,
      marge
    } = this.props
    const { ausgehandelterPreis } = this.state
    return (
      <Container routeName="preis">
        <div>
          <h2>Übersicht Objekte</h2>
          <pre>
            {JSON.stringify(objekte, null, 2)}
          </pre>
          <div>
            <p>
              Gesamter Preis (vereinfacht): {gesamt_preis} €
            </p>
            <p>
              Gesamte Zeit: {gesamt_zeit} minuten
            </p>
          </div>
        </div>
        <div>
          <Marge {...this.props} />
          <p>
            Mindestpreis (mit anfahrt, stundenlohn, ... + 5% Marge):{' '}
            {mindestpreis.toFixed(2)} €
          </p>

          <hr />

          <div>
            <Speech text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor." />
            <label>
              Ausgehandelter Preis:
              <input
                value={ausgehandelterPreis}
                onChange={this.changeAusgehandelterPreis}
              />
            </label>
          </div>
        </div>
      </Container>
    )
  }
}

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
// const input = {
//   produkte: [
//     {
//       name: 'Mittlere Eckcouch',
//       einzelpreis_netto: 193.17, // euro
//       einzelpreis_brutto: 229.87, // euro
//       einzelzeit: 120 // minuten
//     }
//   ],
//   fahrzeit: 40.266666, // minuten
//   fahrstrecke: 49.135 // km
// }
const mapStateToProps = state => ({
  objekte: state.objekte,
  gesamt_preis: getGesamtPreis(state.objekte),
  gesamt_zeit: getGesamtZeit(state.objekte),

  mindestpreis: preisVonMarge(
    konstanten,
    {
      fahrzeit: 40.266666,
      fahrstrecke: 49.135,
      arbeitszeit: gesamtZeit(state.objekte)
    },
    0.05
  )
})
export default connect(mapStateToProps)(Preis)
