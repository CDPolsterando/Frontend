import React, { Component } from 'react'
import { margeVonPreis, preisVonMarge } from '../../logic/preis'
import gesamtZeit from '../../logic/gesamtZeit'

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
// const {
//   stundensatz_fahrt,
//   stundensatz_arbeit,
//   pauschal_nacharbeit,
//   pauschal_reinigunsmittel,
//   cost_per_order,
//   spritpreis_pro_km,

//   mindest_marge
// } = konstanten

// const fahrzeit = 40.266666 // minuten
// const fahrstrecke = 49.135 // km

// const margeToPrice = marge => {
//   return marge * 2
// }
// const priceToMarge = price => {
//   const bruttopreis = price
//   // const arbeitszeit = get

//   const marge =
//     1 -
//     (fahrzeit / 60 * stundensatz_fahrt * 1.31 * 2 +
//       fahrstrecke * spritpreis_pro_km * 2 +
//       arbeitszeit / 60 * stundensatz_arbeit * 1.31 +
//       pauschal_nacharbeit +
//       pauschal_reinigunsmittel +
//       cost_per_order) /
//       (bruttopreis / 1.19)

//   return marge * 100
// }

/* preis    marge

*/
class Marge extends Component {
  constructor(props) {
    super(props)
    this.state = {
      preis: 0,
      marge: 0
    }
  }
  onChangePreis = preis => event => {
    const variablen = {
      fahrzeit: 40.266666,
      fahrstrecke: 49.135,
      arbeitszeit: gesamtZeit(this.props.objekte)
    }

    const preis = event.target.value
    const marge = margeVonPreis(konstanten, variablen, parseFloat(preis))
    this.setState({
      preis,
      marge: marge.toFixed(2)
    })
  }
  onChangeMarge = marge => event => {
    const variablen = {
      fahrzeit: 40.266666,
      fahrstrecke: 49.135,
      arbeitszeit: gesamtZeit(this.props.objekte)
    }

    const marge = event.target.value
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
      <div>
        <label>
          Preis (in €):
          <input value={preis} onChange={this.onChangePreis(preis)} />
        </label>
        <label>
          Marge (in %):
          <input value={marge} onChange={this.onChangeMarge(marge)} />
        </label>
      </div>
    )
  }
}
export default Marge
