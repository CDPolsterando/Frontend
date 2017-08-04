import React from 'react'
// import gesamtPreis from '../../../logic/gesamtPreis'
import listPrice from '../../../logic/listPrice'
import './table.css'
import './Saved.css'

const ObjectRow = object => {
  const {
    name,
    qm,
    removable_pillows_small,
    removable_pillows_large,
    single_price_gross,
    onClickRemove,
    onChangeQm,
    onChangePillows
  } = object
  return (
    <tr className="object">
      <td>
        {name}
      </td>
      <td>
        <input
          className="object__qm"
          value={qm || ''}
          placeholder="1"
          onChange={onChangeQm}
          // onChange={this.qmAendern(objekt, i)}
        />
      </td>
      <td>
        <div className="object__pillow">
          <label>
            Klein
            <input
              checked={removable_pillows_small || false}
              type="checkbox"
              onChange={onChangePillows('removable_pillows_small')}
            />
          </label>
          <label>
            Groß
            <input
              checked={removable_pillows_large || false}
              type="checkbox"
              onChange={onChangePillows('removable_pillows_large')}
            />
          </label>
        </div>
      </td>
      <td>
        {listPrice(object)} €
      </td>
      <td>
        <button onClick={onClickRemove}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M19 13H5v-2h14v2z" />
          </svg>
        </button>
      </td>
    </tr>
  )
}

const Saved = ({
  removeObject,
  changeObject,
  objects,
  total_price = 0,
  total_time = 0
}) => {
  const noObjects = (
    <tr>
      <td colSpan="5">Noch keine Objekte</td>
    </tr>
  )
  const onClickRemove = index => () => removeObject(index)
  const onChangeQm = (object, index) => event => {
    const qm = event.target.value
    changeObject({ ...object, qm }, index)
  }
  const onChangePillows = (object, index) => key => event => {
    const checked = event.target.checked
    changeObject({ ...object, [key]: checked }, index)
  }

  return (
    <div className="objects__saved">
      <h2>Ausgewählte Objekte</h2>
      <table className="objects__table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>(qm)</th>
            <th>(abnehmbare Kissen)</th>
            <th>Preis</th>
            <th>Aktionen</th>
          </tr>
          {objects.length > 0
            ? objects.map((object, index) =>
                <ObjectRow
                  {...object}
                  key={object.key}
                  onClickRemove={onClickRemove(index)}
                  onChangeQm={onChangeQm(object, index)}
                  onChangePillows={onChangePillows(object, index)}
                />
              )
            : noObjects}
          <tr className="objects__saved__total">
            <td colSpan="5">
              Gesamt: {total_price} € - {total_time} minuten
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default Saved
