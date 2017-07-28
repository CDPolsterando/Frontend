const gesamtPreis = objekte => {
  return objekte
    .map(objekt => {
      return objekt.qm
        ? objekt.eizelpreis_brutto * objekt.qm
        : objekt.eizelpreis_brutto
    })
    .reduce((curr, acc) => curr + acc, 0)
}
export default gesamtPreis
