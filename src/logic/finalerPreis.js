const stundenlohn_arbeit = 16
const stundenlohn_transport = 10

const pauschal_nacharbeit = 5
const pauschal_reinigungsmittel = 15

const preis_pro_km = 0.16

// const input = {
//   produkte: [
//     {zeit: 2}, // stunden
//     {zeit: 1}
//   ],
//   anfahrts_zeit: 1, // stunde
//   km: 60
// }

const getPrice = ({ produkte, anfahrts_zeit, km }) => {
  const auftragszeit_gesamt = produkte.reduce((acc, val) => acc + val.zeit, 0)
  console.log(auftragszeit_gesamt)

  const price =
    auftragszeit_gesamt * stundenlohn_arbeit +
    anfahrts_zeit * stundenlohn_transport +
    pauschal_nacharbeit +
    pauschal_reinigungsmittel +
    km * preis_pro_km

  return price
}
export default getPrice
