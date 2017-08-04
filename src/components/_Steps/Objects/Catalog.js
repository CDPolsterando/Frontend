import React from 'react'
import './table.css'
import './Catalog.css'

const ObjectsCatalog = ({ addObject, categories }) => {
  let items = []

  const onClick = product => () => {
    // TODO: more fields like qm
    addObject(product)
  }

  categories.forEach(category => {
    items.push(
      <tr className="category" key={category.name}>
        <td colSpan="5">
          {category.name}
        </td>
      </tr>
    )
    category.products.forEach(product => {
      items.push(
        <tr className="product" key={category.name + '/' + product.name}>
          <td>
            {product.name}
          </td>
          <td>
            {product.single_price_net} €
          </td>
          <td>
            {product.single_price_gross} €
          </td>
          <td>
            {product.single_time} minuten
          </td>
          <td>
            <button onClick={onClick(product)}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </button>
          </td>
        </tr>
      )
    })
  })
  return (
    <div className="objects__catalog">
      <h2>Produktkatalog</h2>
      <table className="products objects__table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Einzelpreis (netto)</th>
            <th>Einzelpreis (brutto)</th>
            <th>Einzelzeit</th>
            <th>Aktionen</th>
          </tr>
          {items}
        </tbody>
      </table>
    </div>
  )
}
export default ObjectsCatalog
