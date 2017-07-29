// netto -> brutto  = 1.19
const getMindestpreis = (
  {
    stundensatz_fahrt,
    stundensatz_arbeit,
    pauschal_nacharbeit,
    pauschal_reinigunsmittel,
    cost_per_order,
    spritpreis_pro_km,
    mindest_marge
  },
  { produkte, fahrzeit, fahrstrecke },
  { arbeitszeit }
) => {
  /*
  ((Fahrzeit*StundensatzFahrt*1,31*2)+
  (Fahrstrecke*TankpauschaleProKM*2)+
  (Arbeitszeit*StundensatzArbeit*1,31)+
  (MaterialPauschale)+(ReinigungsmittelPauschale)+
  (CPOPauschale))/(1-Marge=5%)*1,19
  */
  const preis =
    (fahrzeit / 60 * stundensatz_fahrt * 1.31 * 2 +
      fahrstrecke * spritpreis_pro_km * 2 +
      arbeitszeit / 60 * stundensatz_arbeit * 1.31 +
      pauschal_nacharbeit +
      pauschal_reinigunsmittel +
      cost_per_order) /
    (1 - mindest_marge) *
    1.19

  return preis
}

const getMarge = (
  {
    // konstanten
    stundensatz_fahrt,
    stundensatz_arbeit,
    spritpreis_pro_km,
    pauschal_nacharbeit,
    pauschal_reinigunsmittel,
    cost_per_order
  },
  {
    // input
    fahrzeit,
    fahrstrecke
  },
  {
    // bereits gerechnet
    arbeitszeit,
    bruttopreis
  }
) => {
  /*
  1-(((Fahrzeit*StundensatzFahrt*1,31*2)
  +(Fahrstrecke*TankpauschaleProKM*2)
  +(Arbeitszeit*StundensatzArbeit*1,31)
  +(Nacharbeitspauschale)+(ReinigungsmittelPauschale)
  +(CPOPauschale))/(BruttoPreis/1,19))
  */

  const marge =
    1 -
    (fahrzeit / 60 * stundensatz_fahrt * 1.31 * 2 +
      fahrstrecke * spritpreis_pro_km * 2 +
      arbeitszeit / 60 * stundensatz_arbeit * 1.31 +
      pauschal_nacharbeit +
      pauschal_reinigunsmittel +
      cost_per_order) /
      (bruttopreis / 1.19)

  return marge * 100
}
const getInfo = (konstanten, input) => {
  const arbeitszeit = input.produkte.reduce((acc, val) => {
    const zeit = val.einzelzeit * (val.qm || 1)
    return acc + zeit
  }, 0)
  const bruttopreis = input.produkte.reduce((acc, val) => {
    const preis = val.einzelpreis_brutto * (val.qm || 1)
    return acc + preis
  }, 0)

  const marge = getMarge(konstanten, input, { arbeitszeit, bruttopreis })
  const mindestpreis = getMindestpreis(konstanten, input, {
    arbeitszeit
  })

  return {
    marge,
    mindestpreis
  }
}

// const margeZuPreis = ()
export default getInfo
