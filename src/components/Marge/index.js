import React, { Component } from 'react'

const margeToPrice = marge => {
  return marge * 2
}
const priceToMarge = price => {
  return price * 2
}

/* preis    marge

*/
class Marge extends Component {
  constructor(props) {
    super(props)
    this.state = {
      preis: 0,
      marge: 0
    }
  }
  onChangePreis = preis => event => {
    const preis = event.target.value
    this.setState({
      preis,
      marge: priceToMarge(preis)
    })
  }
  onChangeMarge = marge => event => {
    const marge = event.target.value
    this.setState({
      preis: margeToPrice(marge),
      marge
    })
  }
  render() {
    const { preis, marge } = this.state
    return (
      <div>
        <label>
          Preis:
          <input value={preis} onChange={this.onChangePreis(preis)} />
        </label>
        <label>
          Marge:
          <input value={marge} onChange={this.onChangeMarge(marge)} />
        </label>
      </div>
    )
  }
}
export default Marge
