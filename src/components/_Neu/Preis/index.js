import React, { Component } from 'react'
import { connect } from 'react-redux'
import Container from '../../Container'
import getGesamtPreis from '../../../logic/gesamtPreis'
import getGesamtZeit from '../../../logic/gesamtZeit'
import './index.css'
import Speech from '../../Speech'
import Marge from '../../Marge'
import { changeAusgehandelterPreis } from '../../../state/auftrag/actions'
import runden from '../../../logic/runden'

import { margeVonPreis, preisVonMarge } from '../../../logic/preis'
import gesamtZeit from '../../../logic/gesamtZeit'

class Preis extends Component {
  // constructor (props) {
  //   super(props)
  // }
  changeAusgehandelterPreis = event => {
    // TODO: add ausgehandelterPreis to redux
    const value = event.target.value
    const preis = parseFloat(value)
    // this.props.dispatch(changeAusgehandelterPreis(preis))
  }
  preisSetzen = () => {
    const value = this.ausgehandelterPreisInput.value
    const preis = runden(parseFloat(value))
    // this.setState({ ausgehandelterPreis: value })
    this.props.dispatch(changeAusgehandelterPreis(preis))
  }
  render() {
    const {
      objekte,
      gesamt_preis,
      gesamt_zeit,
      mindestpreis,
      marge,
      ausgehandelter_preis
    } = this.props
    return (
      <Container routeName="preis">
        <div>
          <h2>Übersicht Objekte</h2>
          <pre>
            {JSON.stringify(objekte, null, 2)}
          </pre>
          <div>
            <p>
              Gesamter Preis (bruttopreise addiert): {runden(gesamt_preis)} €
            </p>
            <p>
              Gesamte Zeit: {gesamt_zeit} minuten
            </p>
          </div>
        </div>
        <div>
          <Marge {...this.props} />
          <p className="mindestpreis">
            Mindestpreis (mit anfahrt, stundenlohn, ... + 5% Marge):{' '}
            {mindestpreis.toFixed(2)} €
          </p>

          <hr />

          <div className="preis_setzen">
            <Speech text="Gib hier den Preis ein, den du mit dem Kunden ausgehandelt hast." />
            <label className="preis_setzen__label">
              Ausgehandelter Preis:
              <input
                ref={e => {
                  this.ausgehandelterPreisInput = e
                }}
              />
            </label>
            <button onClick={this.preisSetzen} className="preis_setzen__button">
              Setzen
            </button>
            {/* TODO: add to redux if button is pressed  */}
            <p>
              Gesetzter Preis (speziell gerundet): {ausgehandelter_preis || 0} €
            </p>
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
  objekte: state.auftrag.objekte,
  gesamt_preis: getGesamtPreis(state.auftrag.objekte),
  gesamt_zeit: getGesamtZeit(state.auftrag.objekte),

  ausgehandelter_preis: state.auftrag.ausgehandelter_preis,

  mindestpreis: preisVonMarge(
    konstanten,
    {
      fahrzeit: 40.266666,
      fahrstrecke: 49.135,
      arbeitszeit: gesamtZeit(state.auftrag.objekte)
    },
    0.05
  )
})
export default connect(mapStateToProps)(Preis)
