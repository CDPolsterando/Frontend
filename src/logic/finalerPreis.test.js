import finalerPreis from './finalerPreis'

describe('finalerPreis', () => {
  it('can handle one couch', () => {
    const input = {
      produkte: [
        { zeit: 2 } // stunden
        // {zeit: 1}
      ],
      anfahrts_zeit: 1, // stunde
      km: 60
    }
    const result = finalerPreis(input)
    expect(result).toBe(229)
  })
})
