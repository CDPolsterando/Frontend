import React from 'react'
import { connect } from 'react-redux'

const Script = ({ loading, error, text }) =>
  <div>
    {loading
      ? <p>Loading...</p>
      : error
        ? <p>
            Error: {error}
          </p>
        : <p>
            Script: {text}
          </p>}
  </div>

const mapStateToProps = (state, props) => {
  const {
    scripts_loading: loading,
    scripts_error: error,
    scripts
  } = state.network

  let text = '/'
  if (!loading && !error && scripts && props.name) {
    text = scripts[props.name] || '/'
  }

  return {
    loading,
    error,
    text
  }
}
export default connect(mapStateToProps)(Script)
