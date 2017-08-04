const calculate = ({
  qm,
  single_price_gross,
  removable_pillows_small,
  removable_pillows_large
}) => {
  let price = qm ? single_price_gross * qm : single_price_gross

  if (removable_pillows_small) {
    price = price + 20
  }
  if (removable_pillows_large) {
    price = price + 40
  }
  return price
}
const addUp = (curr, acc) => curr + acc

const listPrice = objects => {
  if (Array.isArray(objects)) {
    return objects.map(calculate).reduce(addUp, 0)
  } else if (objects) {
    return calculate(objects)
  } else {
    return 0
  }
  // return objekte
  //   .map(objekt => {
  //     let price = objekt.qm
  //       ? objekt.einzelpreis_brutto * objekt.qm
  //       : objekt.einzelpreis_brutto

  //     if (objekt.abnehmbare_kissen_klein) {
  //       price = price + 20
  //     }
  //     if (objekt.abnehmbare_kissen_groß) {
  //       price = price + 40
  //     }
  //     return price
  //   })
  //   .reduce((curr, acc) => curr + acc, 0)
}
export default listPrice
