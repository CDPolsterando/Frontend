import React from 'react'
import './index.css'

const Speech = ({ text }) =>
  <p className="speech">
    <span>Skript:</span>
    {text}
  </p>
export default Speech
