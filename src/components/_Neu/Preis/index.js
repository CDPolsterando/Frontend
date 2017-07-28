import React, { Component } from 'react'
import { connect } from 'react-redux'
import Container from '../../Container'
import getGesamtPreis from '../../../logic/gesamtPreis'
import getGesamtZeit from '../../../logic/gesamtZeit'
import './index.css'
import Speech from '../../Speech'
import Marge from '../../Marge'

// const x = () => {

// }
// nenner 100
// zähler 50
// 50%

// 50
// 0.5

class Preis extends Component {
  render() {
    const { objekte, gesamt_preis, gesamt_zeit } = this.props
    return (
      <Container>
        <div>
          <h2>Übersicht Objekte</h2>
          <pre>
            {JSON.stringify(objekte, null, 2)}
          </pre>
          <div>
            <p>
              Gesamter Preis: {gesamt_preis}
            </p>
            <p>
              Gesamte Zeit: {gesamt_zeit}
            </p>
          </div>
        </div>
        <div>
          <Marge />

          <div className="rechner">
            <div>
              <p>Marge manuell eingeben</p>
            </div>
            <div>
              <p>Preis manuell eingeben</p>
            </div>
          </div>
          <div>
            <p>Mindestpreis:</p>
          </div>
          <Speech text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor." />
          <div>
            <p>Ausgehandelter Preis:</p>
          </div>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  objekte: state.objekte,
  gesamt_preis: getGesamtPreis(state.objekte),
  gesamt_zeit: getGesamtZeit(state.objekte)
})
export default connect(mapStateToProps)(Preis)
