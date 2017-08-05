const calculate = ({
  qm,
  single_time,
  removable_pillows_small,
  removable_pillows_large
}) => {
  let time = qm ? single_time * qm : single_time

  if (removable_pillows_small) {
    time = time + 7
  }
  if (removable_pillows_large) {
    time = time + 10
  }
  return time
}
const addUp = (curr, acc) => curr + acc

const listTime = objects => {
  if (Array.isArray(objects)) {
    return objects.map(calculate).reduce(addUp, 0)
  } else if (objects) {
    return calculate(objects)
  } else {
    return 0
  }
}
export default listTime
