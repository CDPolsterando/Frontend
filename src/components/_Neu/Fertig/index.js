import React from 'react'
import Container from '../../Container'
import { connect } from 'react-redux'
import getGesamtZeit from '../../../logic/gesamtZeit'
import runden from '../../../logic/runden'
import { changeNotiz } from '../../../state/auftrag/actions'

import moment from 'moment'
import 'moment/locale/de'
moment.locale('de')

const anmerkung = ({ name, objekte, ausgehandelter_preis, notiz }) => {
  const mitarbeiter = 'Marc Petersmann'

  const preis = String(runden(ausgehandelter_preis)).replace('.', ',')

  const zeit = getGesamtZeit(objekte) // minuten
  const duration = moment.duration(zeit, 'minutes')

  // -> https://github.com/moment/moment/issues/1048#issue-19008383

  const hours = Math.floor(duration.asHours())
  const vorgabezeit =
    (hours.toString().length === 1 ? '0' + hours : hours) +
    moment.utc(duration.asMilliseconds()).format(':mm')

  // let reinigungsobjekte = {}
  // objekte.forEach(objekt => {
  //   if
  // })
  const reinigungsobjekte = objekte
    .map(objekt => {
      let qm = objekt.qm ? `${objekt.qm} qm` : null
      let kissen_klein = objekt.abnehmbare_kissen_klein
        ? `mit kleinen abnehmbaren kissen`
        : null
      let kissen_groß = objekt.abnehmbare_kissen_groß
        ? `mit großen abnehmbaren kissen`
        : null

      let options = [kissen_klein, kissen_groß, qm].filter(e => !!e).join(', ')
      let klammern = options.length ? ` (${options})` : ''
      return `1 x ${objekt.name}${klammern}`
    })
    .join('\n')

  return `
Gebucht von: ${mitarbeiter}

$
Preis (brutto): --- In nächste Zeile eintragen $
${preis}€
$
Vorgabezeit: --- In nächste Zeile eintragen Format (hh:mm)$
${vorgabezeit}
$

Reinigungsobjekt (Menge x Art):
${reinigungsobjekte}

Besonderheiten:
${notiz.length ? notiz : ' /'}

BITTE IMMER FOLGENDE DINGE BEACHTEN:

- MATERIALTEST
- BODEN-CHECK
- PÜNKTLICH SEIN    
`
  //   return `
  // Gebucht von: ${mitarbeiter}

  // Preis (brutto):
  // ${preis} €

  // Vorgabezeit (hh:mm):
  // ${vorgabezeit}

  // Reinigungsobjekte (Menge x Art):
  // ${reinigungsobjekte}

  // Besonderheiten:
  // ${notiz.length ? notiz : ' /'}

  // BITTE IMMER FOLGENDE DINGE BEACHTEN:

  // - MATERIALTEST
  // - BODEN-CHECK
  // - PÜNKTLICH SEIN
  // `
}
const Fertig = ({ state, dispatch }) =>
  <Container routeName="fertig">
    <div>
      <p>
        Name: {state.name}
      </p>
      <p>
        PLZ: {state.plz}
      </p>
      <p>
        Standort: {state.standort_stadt}
      </p>
      <p>
        Fahrstrecke: {state.fahrstrecke} km
      </p>
      <p>
        Fahrzeit: {state.fahrzeit} minuten
      </p>

      <textarea
        placeholder="Schreibe hier eine Notiz für die Reinigungsfachkraft"
        cols={50}
        rows={7}
        value={state.notiz}
        onChange={event => {
          const value = event.target.value

          dispatch(changeNotiz(value))
        }}
      />
    </div>
    <div>
      <pre>
        {anmerkung(state)}
      </pre>
    </div>
  </Container>

const mapStateToProps = state => {
  return { state: state.auftrag }
}
export default connect(mapStateToProps)(Fertig)
