import React, { Component } from 'react'
import Container from '../../Container'
import './index.css'
import { connect } from 'react-redux'
import {
  addObjekt,
  changeObjekt,
  removeObjekt
} from '../../../state/auftrag/actions'
import getGesamtPreis from '../../../logic/gesamtPreis'
import getGesamtZeit from '../../../logic/gesamtZeit'

class Objekte extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gebuchteObjekte: []
    }
    // this.objektHinzufuegen = this.objektHinzufuegen.bind(this)
  }
  objektHinzufuegen = (produkt, weitereAngaben = []) => t => {
    let objekt = produkt
    weitereAngaben.forEach(e => {
      objekt[e] = null
    })
    this.props.dispatch(addObjekt(produkt))
  }
  qmAendern = (produkt, index) => event => {
    const qm = event.target.value
    this.props.dispatch(
      changeObjekt(
        {
          ...produkt,
          qm
        },
        index
      )
    )
    // const anzahl = event.target.value
    // let objekte = this.state.gebuchteObjekte
    // objekte[index] = {
    //   ...produkt,
    //   anzahl,
    //   preis: produkt.eizelpreis_brutto * anzahl
    // }
    // this.setState({
    //   gebuchteObjekte: objekte
    // })
  }
  objektEntfernen = index => () => {
    this.props.dispatch(removeObjekt(index))
    // this.setState({
    //   gebuchteObjekte: this.state.gebuchteObjekte.filter((e, i) => index !== i)
    // })
  }
  render() {
    const kategorien = [
      {
        name: 'Polstermöbel',
        produkte: [
          {
            name: 'Sessel',
            einzelpreis_netto: 41.18,
            einzelpreis_brutto: 49.0,
            einzelzeit: 45
          }
        ]
      },
      {
        name: 'Teppiche',
        weitereAngaben: ['qm'],
        produkte: [
          {
            name: 'kleiner Teppich',
            einzelpreis_netto: 7,
            einzelpreis_brutto: 7,
            einzelzeit: 10
          }
        ]
      }
    ]
    const loading = false

    let items = []
    kategorien.forEach(kategorie => {
      items.push(
        <tr className="kategorie" key={kategorie.name}>
          <td colSpan="5">
            {kategorie.name}
          </td>
        </tr>
      )
      kategorie.produkte.forEach(produkt => {
        items.push(
          <tr className="produkt" key={kategorie.name + '/' + produkt.name}>
            <td>
              {produkt.name}
            </td>
            <td>
              {produkt.einzelpreis_netto} €
            </td>
            <td>
              {produkt.einzelpreis_brutto} €
            </td>
            <td>
              {produkt.einzelzeit} minuten
            </td>
            <td>
              <button
                onClick={this.objektHinzufuegen(
                  produkt,
                  kategorie.weitereAngaben
                )}
              >
                Hinzufügen
              </button>
            </td>
          </tr>
        )
      })
    })

    const { objekte } = this.props
    return (
      <Container routeName="objekte">
        <div>
          {loading ? <p>Loading...</p> : null}

          <h2>Produktkatalog</h2>
          <table className="produkte">
            <tbody>
              <tr className="header">
                <th>Name</th>
                <th>Einzelpreis (netto)</th>
                <th>Einzelpreis (brutto)</th>
                <th>Einzelzeit</th>
                <th>Aktionen</th>
              </tr>
              {items}
            </tbody>
          </table>
        </div>
        <div>
          <h2>zu reinigenden Objekte</h2>
          <table className="objekte">
            <tbody>
              <tr className="header">
                <th>Name</th>
                <th>(qm)</th>
                <th>Preis</th>
                <th>Aktionen</th>
              </tr>
              {objekte.length > 0
                ? objekte.map((objekt, i) =>
                    <tr key={objekt.key}>
                      <td>
                        {objekt.name}
                      </td>
                      <td>
                        {objekt.qm !== undefined
                          ? <input
                              value={objekt.qm || ''}
                              placeholder="1"
                              onChange={this.qmAendern(objekt, i)}
                            />
                          : null}
                      </td>
                      <td>
                        {objekt.qm
                          ? objekt.einzelpreis_brutto * objekt.qm
                          : objekt.einzelpreis_brutto}{' '}
                        €
                      </td>
                      <td>
                        <button onClick={this.objektEntfernen(i)}>
                          Entfernen
                        </button>
                      </td>
                    </tr>
                  )
                : <tr>
                    <td colSpan="4">Noch keine Objekte</td>
                  </tr>}
              <tr className="gesamt">
                <td colSpan="4">
                  Gesamt: {this.props.gesamt_preis} € - {this.props.gesamt_zeit}{' '}
                  minuten
                </td>
              </tr>
            </tbody>
          </table>
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
export default connect(mapStateToProps)(Objekte)
