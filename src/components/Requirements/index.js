import React from 'react'
import './index.css'

const Requirements = ({ text }) =>
  <div className="requirements">
    <svg viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
    <div>
      <h3>Does not meet the requirements:</h3>
      <pre>
        {text}
      </pre>
    </div>
  </div>
export default Requirements
