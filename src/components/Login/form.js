import React from 'react'

const LoginForm = ({ loading, success, error, onLogin, closeError }) => {
  let usernameElement
  let passwordElement

  const onSubmit = event => {
    event.preventDefault()

    const username = usernameElement.value
    const password = passwordElement.value
    onLogin({ username, password })
  }
  let elem

  if (loading) {
    elem = (
      <div className="login__loading">
        <div className="loader" />
        <p>Einloggen...</p>
      </div>
    )
  } else if (success) {
    elem = (
      <div className="login__success">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
        <p>Eingeloggt</p>
        <p>Daten laden...</p>
      </div>
    )
  } else if (error) {
    elem = (
      <div className="login__error">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <p>
          Fehler: {JSON.stringify(error, null, 2)}
        </p>
        <button onClick={closeError}>Fehlermeldung schließen</button>
      </div>
    )
  } else {
    elem = (
      <form onSubmit={onSubmit}>
        <label>
          Nutzername:
          <input ref={e => (usernameElement = e)} name="username" type="text" />
        </label>
        <label>
          Passwort:
          <input
            ref={e => (passwordElement = e)}
            name="password"
            type="password"
          />
        </label>
        <input className="button__submit" type="submit" value="Anmelden" />
      </form>
    )
  }
  return (
    <div className="login__container">
      {elem}
    </div>
  )
}
export default LoginForm
