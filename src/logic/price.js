export const marginFromPrice = (constants, variables, gross_price) => {
  if (!constants || !variables || !gross_price) return 0
  const {
    wage_ride,
    wage_work,

    flat_rate_extra_work,
    flat_rate_cleaning_supplies,

    cost_per_order,
    price_per_kilometer,

    minimum_margin
  } = constants
  const { driving_duration, driving_distance, work_duration } = variables

  const margin =
    1 -
    (driving_duration / 60 * wage_ride * 1.31 * 2 +
      driving_distance * price_per_kilometer * 2 +
      work_duration / 60 * wage_work * 1.31 +
      flat_rate_extra_work +
      flat_rate_cleaning_supplies +
      cost_per_order) /
      (gross_price / 1.19)

  return margin * 100
}
export const priceFromMargin = (constants, variables, margin) => {
  if (!constants || !variables || !margin) return 0
  const {
    wage_ride,
    wage_work,

    flat_rate_extra_work,
    flat_rate_cleaning_supplies,

    cost_per_order,
    price_per_kilometer,

    minimum_margin
  } = constants
  const { driving_duration, driving_distance, work_duration } = variables

  const price =
    (driving_duration / 60 * wage_ride * 1.31 * 2 +
      driving_distance * price_per_kilometer * 2 +
      work_duration / 60 * wage_work * 1.31 +
      flat_rate_extra_work +
      flat_rate_cleaning_supplies +
      cost_per_order) /
    (1 - margin) *
    1.19

  return price
}
// export const preisVonMarge = (konstanten, variablen, marge) => {
//   const {
//     cost_per_order,
//     pauschal_nacharbeit,
//     pauschal_reinigunsmittel,
//     stundensatz_fahrt,
//     stundensatz_arbeit,
//     spritpreis_pro_km
//   } = konstanten
//   const { fahrzeit, fahrstrecke, arbeitszeit } = variablen
//   const preis =
//     (fahrzeit / 60 * stundensatz_fahrt * 1.31 * 2 +
//       fahrstrecke * spritpreis_pro_km * 2 +
//       arbeitszeit / 60 * stundensatz_arbeit * 1.31 +
//       pauschal_nacharbeit +
//       pauschal_reinigunsmittel +
//       cost_per_order) /
//     (1 - marge) *
//     1.19

//   return preis
// }
