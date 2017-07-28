const gesamtZeit = objekte => {
  return objekte
    .map(objekt => {
      return objekt.qm ? objekt.einzelzeit * objekt.qm : objekt.einzelzeit
    })
    .reduce((curr, acc) => curr + acc, 0)
}
export default gesamtZeit
