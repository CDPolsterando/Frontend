import React from 'react'
import Container from '../../Container'
import { connect } from 'react-redux'
import getGesamtZeit from '../../../logic/gesamtZeit'

import moment from 'moment'
import 'moment/locale/de'
moment.locale('de')

const anmerkung = ({ name, objekte }) => {
  const mitarbeiter = 'Marc Petersmann'
  const preis = 1234

  const zeit = getGesamtZeit(objekte) // minuten
  const duration = moment.duration(zeit, 'minutes')

  // -> https://github.com/moment/moment/issues/1048#issue-19008383
  const vorgabezeit =
    Math.floor(duration.asHours()) +
    moment.utc(duration.asMilliseconds()).format(':mm')

  // let reinigungsobjekte = {}
  // objekte.forEach(objekt => {
  //   if
  // })
  const reinigungsobjekte = objekte
    .map(objekt => {
      let qm = objekt.qm ? ` (${objekt.qm} qm)` : ''
      return `1 x ${objekt.name}${qm}`
    })
    .join('\n')

  return `
Gebucht von: ${mitarbeiter}

Preis (brutto):
${preis} €


Vorgabezeit (hh:mm): 
${vorgabezeit}

Reinigungsobjekte (Menge x Art):
${reinigungsobjekte}

Besonderheiten:


BITTE IMMER FOLGENDE DINGE BEACHTEN:

- MATERIALTEST
- BODEN-CHECK
- PÜNKTLICH SEIN  
`
}
const Fertig = ({ state }) =>
  <Container>
    <div>
      <p>
        Name: {state.name}
      </p>
      <p>
        PLZ: {state.plz}
      </p>
    </div>
    <div>
      <pre>
        {anmerkung(state)}
      </pre>
    </div>
  </Container>

const mapStateToProps = state => {
  return {
    state
  }
}
export default connect(mapStateToProps)(Fertig)
