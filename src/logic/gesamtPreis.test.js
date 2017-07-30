import gesamtPreis from './gesamtPreis'

describe('gesamtPreis', () => {
  it('handles "1x Sessel"', () => {
    const objekte = [
      {
        name: 'Sessel',
        einzelpreis_netto: 41.18,
        einzelpreis_brutto: 49.0,
        einzelzeit: 45
      }
    ]

    const res = gesamtPreis(objekte)
    expect(res).toBe(49.0)
  })
  it('handles "2x Sessel"', () => {
    const objekte = [
      {
        name: 'Sessel',
        einzelpreis_netto: 41.18,
        einzelpreis_brutto: 49.0,
        einzelzeit: 45
      },
      {
        name: 'Sessel',
        einzelpreis_netto: 41.18,
        einzelpreis_brutto: 49.0,
        einzelzeit: 45
      }
    ]

    const res = gesamtPreis(objekte)
    expect(res).toBe(98.0)
  })
  it('handles "Teppich with qm"', () => {
    const objekte = [
      {
        name: 'kleiner Teppich',
        einzelpreis_netto: 7,
        einzelpreis_brutto: 7,
        einzelzeit: 10,
        qm: 10
      }
    ]

    const res = gesamtPreis(objekte)
    expect(res).toBe(70)
  })
  it('handles "addons"', () => {
    const objekte = [
      {
        name: 'Geruchsneutralisierung Partiel',
        einzelpreis_netto: 16.8067,
        einzelpreis_brutto: 20,
        einzelzeit: 15
      }
    ]

    const res = gesamtPreis(objekte)
    expect(res).toBe(20)
  })
  it('handles "abnehmbare Kissen klein"', () => {
    const objekte = [
      {
        name: 'Sessel',
        einzelpreis_netto: 41.18,
        einzelpreis_brutto: 49.0,
        einzelzeit: 45,
        abnehmbare_kissen_klein: true,
        abnehmbare_kissen_groß: false
      }
    ]

    const res = gesamtPreis(objekte)
    expect(res).toBe(49 + 20)
  })
  it('handles "abnehmbare Kissen groß"', () => {
    const objekte = [
      {
        name: 'Sessel',
        einzelpreis_netto: 41.18,
        einzelpreis_brutto: 49.0,
        einzelzeit: 45,
        abnehmbare_kissen_klein: false,
        abnehmbare_kissen_groß: true
      }
    ]

    const res = gesamtPreis(objekte)
    expect(res).toBe(49 + 40)
  })
})
