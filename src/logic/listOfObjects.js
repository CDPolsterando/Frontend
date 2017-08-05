const listOfObjects = objects => {
  if (objects.length === 0) return '/'

  let keys = {}

  objects
    .map(object => {
      let qm = object.qm ? `${object.qm} qm` : null
      let removable_pillows_small = object.removable_pillows_small
        ? `mit kleinen abnehmbaren kissen`
        : null
      let removable_pillows_large = object.removable_pillows_large
        ? `mit großen abnehmbaren kissen`
        : null

      let options = [qm, removable_pillows_small, removable_pillows_large]
        .filter(e => !!e)
        .join(', ')

      let key = object.name + (options.length ? ` (${options})` : '')
      return key
    })
    .forEach(object => {
      if (!keys[object]) {
        keys[object] = 0
      }
      keys[object]++
    })

  return Object.keys(keys)
    .map(key => {
      return keys[key] + ' x ' + key
    })
    .join('\n')
}
export default listOfObjects
