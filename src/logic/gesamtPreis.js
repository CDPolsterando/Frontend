/*
Abnehmbare Kissen (klein) - 20 EURO, 7min
Abnehmbare Kissen (groß) - 40 EURO, 10min

Geruchsneutralisierung partiell - 20 EURO, 15min
Geruchsneutralisierung großflächig - 50 EURO, 25min
*/

const gesamtPreis = objekte => {
  return objekte
    .map(objekt => {
      let price = objekt.qm
        ? objekt.einzelpreis_brutto * objekt.qm
        : objekt.einzelpreis_brutto

      if (objekt.abnehmbare_kissen_klein) {
        price = price + 20
      }
      if (objekt.abnehmbare_kissen_groß) {
        price = price + 40
      }
      return price
    })
    .reduce((curr, acc) => curr + acc, 0)
}
export default gesamtPreis
