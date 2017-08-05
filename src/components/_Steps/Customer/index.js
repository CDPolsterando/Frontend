import React from 'react'
import './index.css'

const Customer = ({ changeZip, changeName, name, zip }) =>
  <div className="customer">
    <label>
      Postleitzahl ({String(zip ? String(zip).length : 0)}/5):
      <input
        value={zip || ''}
        onChange={event => {
          changeZip(event.target.value)
        }}
      />
    </label>
    <label>
      Name:
      <input
        value={name || ''}
        onChange={event => {
          changeName(event.target.value)
        }}
      />
    </label>
  </div>
export default Customer
