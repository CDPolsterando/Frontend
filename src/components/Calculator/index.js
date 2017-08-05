import React, { Component } from 'react'
import { marginFromPrice, priceFromMargin } from '../../logic/price'
import './index.css'

class Calculator extends Component {
  state = {
    price: 0,
    margin: 0
  }
  onChangePrice = event => {
    const { constants, variables } = this.props

    const priceText = event.target.value
    const price = parseFloat(priceText) || 0

    const margin = marginFromPrice(constants, variables, price)
    this.setState({
      price,
      margin: margin.toFixed(2)
    })
  }
  onChangeMargin = event => {
    const { constants, variables } = this.props

    const marginText = event.target.value
    const margin = parseFloat(marginText) / 100 || 0

    const price = priceFromMargin(constants, variables, margin)
    this.setState({
      margin: marginText,
      price: price.toFixed(2)
    })
  }
  render() {
    const { constants } = this.props
    const { price, margin } = this.state

    return (
      <div className="calculator">
        <h2>Rechner</h2>
        <label>
          Preis (in €):
          <input value={price} onChange={this.onChangePrice} />
        </label>
        <svg className="up" width="24" height="24" viewBox="0 0 24 24">
          <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
        </svg>
        <svg className="down" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="#010101"
            d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
          />
        </svg>
        <label>
          Marge (in %):
          <input value={margin} onChange={this.onChangeMargin} />
        </label>
        {margin < 5
          ? <p className="error">Die marge muss mindestens 5% sein!</p>
          : null}
      </div>
    )
  }
}

export default Calculator
