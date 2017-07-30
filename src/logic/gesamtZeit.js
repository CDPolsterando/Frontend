const gesamtZeit = objekte => {
  return objekte
    .map(objekt => {
      let price = objekt.qm ? objekt.einzelzeit * objekt.qm : objekt.einzelzeit

      if (objekt.abnehmbare_kissen_klein) {
        price = price + 7
      }
      if (objekt.abnehmbare_kissen_groß) {
        price = price + 10
      }
      return price
    })
    .reduce((curr, acc) => curr + acc, 0)
}
export default gesamtZeit
