import React from 'react'
import './List.css'
import listOfObjects from '../../../logic/listOfObjects'
import listPrice from '../../../logic/listPrice'
import listTime from '../../../logic/listTime'

const PriceLeft = ({ objects }) =>
  <div className="price__list">
    <h2>Gebuchte Objekte</h2>
    <pre>
      {listOfObjects(objects)}
    </pre>
    <p>
      Listenpreis: {listPrice(objects)} €
    </p>
    <p>
      Listenzeit: {listTime(objects)} minuten
    </p>
  </div>
export default PriceLeft
