import React from 'react'
import runden from '../../../logic/runden'

const SetPrice = ({ negotiated_price, changeNegotiatedPrice }) => {
  let priceInput

  const setPrice = () => {
    const value = priceInput.value
    const price = runden(parseFloat(value)) // TODO: rename runden to round
    changeNegotiatedPrice(price)
  }

  return (
    <div>
      <label>
        Ausgehandelter Preis:
        <input
          ref={e => {
            priceInput = e
          }}
        />
      </label>
      <button onClick={setPrice}>Setzen</button>

      <p>
        Gesetzter/Ausgehandelter Preis (speziell gerundet):{' '}
        {negotiated_price === 109.87
          ? negotiated_price + ' (mindestpreis)'
          : negotiated_price}{' '}
        €
      </p>
    </div>
  )
}
export default SetPrice
