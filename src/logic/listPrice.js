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
}
export default listPrice
