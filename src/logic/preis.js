// import { typeCheck } from 'type-check'

export const margeVonPreis = (konstanten, variablen, bruttopreis) => {
  //   if (
  //     !typeCheck(
  //       `{
  //     stundensatz_fahrt: Number,
  //     spritpreis_pro_km: Float,
  //     stundensatz_arbeit: Number,
  //     pauschal_nacharbeit: Number,
  //     pauschal_reinigunsmittel: Number,
  //     cost_per_order: Number
  // }`,
  //       konstanten
  //     )
  //   )
  //     return new Error('konstanten war nicht richtig')

  const {
    stundensatz_fahrt,
    spritpreis_pro_km,
    stundensatz_arbeit,
    pauschal_nacharbeit,
    pauschal_reinigunsmittel,
    cost_per_order
  } = konstanten
  const { fahrzeit, fahrstrecke, arbeitszeit } = variablen

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
export const preisVonMarge = (konstanten, variablen, marge) => {
  const {
    cost_per_order,
    pauschal_nacharbeit,
    pauschal_reinigunsmittel,
    stundensatz_fahrt,
    stundensatz_arbeit,
    spritpreis_pro_km
  } = konstanten
  const { fahrzeit, fahrstrecke, arbeitszeit } = variablen
  const preis =
    (fahrzeit / 60 * stundensatz_fahrt * 1.31 * 2 +
      fahrstrecke * spritpreis_pro_km * 2 +
      arbeitszeit / 60 * stundensatz_arbeit * 1.31 +
      pauschal_nacharbeit +
      pauschal_reinigunsmittel +
      cost_per_order) /
    (1 - marge) *
    1.19

  return preis
}

// mindestPreis (5% Marge)
// -> preisVonMarge(0.05, variablen, konstanten)
