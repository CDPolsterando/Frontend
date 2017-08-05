import React from 'react'
import listTime from '../../../logic/listTime'
import listOfObjects from '../../../logic/listOfObjects'
import './Text.css'

import moment from 'moment'
import 'moment/locale/de'
moment.locale('de')

const getText = ({ objects, note, negotiated_price }) => {
  const employee = 'Marc Petersmann'

  const price = String(negotiated_price).replace('.', ',')

  const _time = listTime(objects)
  const _duration = moment.duration(_time, 'minutes')

  // -> https://github.com/moment/moment/issues/1048#issue-19008383
  const _hours = Math.floor(_duration.asHours())
  const work_duration =
    (_hours.toString().length === 1 ? '0' + _hours : _hours) +
    moment.utc(_duration.asMilliseconds()).format(':mm')

  const objects_to_clean = listOfObjects(objects)

  return `
Gebucht von: ${employee}

$
Preis (brutto): --- In nächste Zeile eintragen $
${price}€
$
Vorgabezeit: --- In nächste Zeile eintragen Format (hh:mm)$
${work_duration}
$

Reinigungsobjekt (Menge x Art):
${objects_to_clean}

Besonderheiten:
${note.length ? note : ' /'}

BITTE IMMER FOLGENDE DINGE BEACHTEN:

- MATERIALTEST
- BODEN-CHECK
- PÜNKTLICH SEIN    
`
}

const Text = ({ contract }) =>
  <div className="finish__text">
    <pre>
      {getText(contract)}
    </pre>
  </div>
export default Text
