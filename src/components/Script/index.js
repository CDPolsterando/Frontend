import React from 'react'
import { connect } from 'react-redux'
import Speech from '../Speech'

const Script = ({ loading, error, text }) =>
  <Speech
    text={loading ? 'Loading...' : error ? 'Error: ' + error.message : text}
  />
// <div>
//   {loading
//     ? <p>Loading...</p>
//     : error
//       ? <p>
//           Error: {error}
//         </p>
//       : <p>
//           {text}
//         </p>}
// </div>

const mapStateToProps = (state, props) => {
  const {
    scripts_loading: loading,
    scripts_error: error,
    scripts
  } = state.network

  let text = 'Skript wurde noch nicht geladen'
  if (!loading && !error && scripts && props.name) {
    text = scripts[props.name] || 'Skript nicht im Datensatz'
  }

  return {
    loading,
    error,
    text
  }
}
export default connect(mapStateToProps)(Script)
