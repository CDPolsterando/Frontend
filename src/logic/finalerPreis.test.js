import finalerPreis from './finalerPreis'

const konstanten = {
  // alle einheiten in euro
  stundensatz_fahrt: 10,
  stundensatz_arbeit: 15,
  pauschal_nacharbeit: 5,
  pauschal_reinigunsmittel: 15,
  cost_per_order: 45,
  spritpreis_pro_km: 0.16,

  mindest_marge: 0.05 // also 5%
}

describe('finalerPreis', () => {
  it('can handle "Mittlere Eckcouch"', () => {
    const input = {
      produkte: [
        {
          name: 'Mittlere Eckcouch',
          einzelpreis_netto: 193.17, // euro
          einzelpreis_brutto: 229.87, // euro
          einzelzeit: 120 // minuten
        }
      ],
      fahrzeit: 40.266666, // minuten
      fahrstrecke: 49.135 // km
    }
    const result = finalerPreis(konstanten, input)
    expect(result.mindestpreis).toBeCloseTo(172.37, 2)
    expect(result.marge).toBeCloseTo(28.76, 2)
    console.log(result)
  })
})
