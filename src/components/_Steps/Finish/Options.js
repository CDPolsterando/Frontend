import React from 'react'
import './Options.css'

const Options = ({
  name,
  zip,
  driving_distance,
  driving_duration,
  note,
  changeNote
}) =>
  <div className="finish__options">
    <p>
      Name: {name}
    </p>
    <p>
      PLZ: {zip}
    </p>
    <p>Standort: $</p>
    <p>
      Fahrstrecke: {driving_distance} km
    </p>
    <p>
      Fahrzeit: {driving_duration} minuten
    </p>

    <textarea
      placeholder="Schreibe hier eine Notiz für die Reinigungsfachkraft"
      cols={50}
      rows={7}
      value={note}
      onChange={event => {
        const value = event.target.value
        changeNote(value)
      }}
    />
  </div>
export default Options
