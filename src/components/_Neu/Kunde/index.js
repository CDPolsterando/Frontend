import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  changeName,
  changePlz,
  changeStandort
} from '../../../state/auftrag/actions'

import Container from '../../Container'
// import { Link } from 'react-router-dom'
import './index.css'

// const searchPlz = plz => ({
//   type: 'SEARCH_PLZ',
//   payload: fetch('http://192.168.8.100:5010/dis?zip=' + plz)
// })

class Kunde extends Component {
  constructor(props) {
    super(props)
    this.state = {
      standort: null
    }
    // this.typingTimer
  }
  searchPlz(plz) {
    if (plz.length === 5) {
      const standort = { Zeit: 40, Strecke: 10, Stadt: 'Koeln' }
      const {
        Zeit: fahrzeit,
        Strecke: fahrstrecke,
        Stadt: standort_stadt
      } = standort

      this.props.dispatch({ type: 'STANDORT_BERECHNEN' })

      setTimeout(() => {
        this.props.dispatch({ type: 'STANDORT_FERTIG' })
        this.props.dispatch(
          changeStandort({
            fahrzeit,
            fahrstrecke,
            standort_stadt
          })
        )
        // TODO: set zeit & streck for other reducer

        // this.props.dispatch({ type: 'STANDORT_FERTIG' })
      }, 5000)

      // fetch('http://192.168.8.100:5010/dis?zip=' + plz)
      //   .then(res => res.json())
      //   .then(standort => {

      this.setState({ standort })
      // })
    }

    // clearTimeout(this.typingTimer)
    // this.typingTimer = setTimeout(() => {
    //   // console.log('yes')

    //   fetch('http://192.168.8.100:5010/dis?zip=' + plz)
    //     .then(res => res.json())
    //     .then(standort => {
    //       this.props.dispatch(
    //         changeStandort({
    //           fahrzeit: standort.Zeit,
    //           fahrstrecke: standort.Strecke
    //         })
    //       )
    //       console.log('standort: ', standort)
    //       this.setState({ standort })
    //     })
    //     .catch(err => {
    //       console.error('Error while fetching standort: ', err)
    //     })

    //   // this.props.dispatch(searchPlz(plz))
    // }, 1000)
  }
  render() {
    const { name, plz, dispatch } = this.props
    return (
      <Container routeName="kunde">
        <div />
        <div className="kunde">
          <div className="kunde__eingabe">
            <label>
              Postleitzahl ({String((plz ? String(plz) : '').length)} / 5): {''}
              <input
                value={plz || ''}
                onChange={event => {
                  this.searchPlz(event.target.value)
                  dispatch(changePlz(event.target.value))
                }}
              />
            </label>
            <label>
              Name: {' '}
              <input
                value={name || ''}
                onChange={event => {
                  dispatch(changeName(event.target.value))
                }}
              />
            </label>
          </div>
          <pre>
            {JSON.stringify(this.state.standort, null, 2)}
          </pre>
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
  // console.log(state)
  return { name: state.auftrag.name, plz: state.auftrag.plz }
}
export default connect(mapStateToProps)(Kunde)
