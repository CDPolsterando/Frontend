const gesamtPreis = objekte => {
  return objekte
    .map(objekt => {
      return objekt.qm
        ? objekt.einzelpreis_brutto * objekt.qm
        : objekt.einzelpreis_brutto
    })
    .reduce((curr, acc) => curr + acc, 0)
}
export default gesamtPreis
