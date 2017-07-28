import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeName, changePlz } from '../../../state/auftrag/actions'

import Container from '../../Container'
import { Link } from 'react-router-dom'

class Kunde extends Component {
  render() {
    const { name, plz, dispatch } = this.props
    return (
      <Container>
        <div />
        <div>
          <label>
            Name
            <input
              value={name || ''}
              onChange={event => {
                dispatch(changeName(event.target.value))
              }}
            />
          </label>
          <label>
            Postleitzahl
            <input
              value={plz || ''}
              onChange={event => {
                dispatch(changePlz(event.target.value))
              }}
            />
          </label>
          <Link to="/neu/objekte">Weiter</Link>
        </div>
      </Container>
    )
  }
}
// const Kunde = ({ state }) =>
//   <Container>
//     <div className="">
//       <h3>Skript</h3>
//     </div>
//     <div>
//       <h3>Eingabe</h3>

// </div>
//     {/* <Left>
//       Left
//     </Left>
//     <Right>
//       Right
//     </Right> */}
//   </Container>

const mapStateToProps = state => {
  return {
    name: state.name,
    plz: state.plz
  }
}
export default connect(mapStateToProps)(Kunde)
