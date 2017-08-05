import listPrice from './listPrice'

describe('listPrice', () => {
  it('handles "1x Sessel"', () => {
    const objects = [
      {
        name: 'Sessel',
        single_price_gross: 49.0
      }
    ]

    const res = listPrice(objects)
    expect(res).toBe(49.0)
  })
  it('handles "2x Sessel"', () => {
    const objects = [
      {
        name: 'Sessel',
        single_price_gross: 49.0
      },
      {
        name: 'Sessel',
        single_price_gross: 49.0
      }
    ]

    const res = listPrice(objects)
    expect(res).toBe(98.0)
  })
  it('handles "Teppich with qm"', () => {
    const objects = [
      {
        name: 'kleiner Teppich',
        single_price_gross: 7,
        qm: 10
      }
    ]

    const res = listPrice(objects)
    expect(res).toBe(70)
  })
  it('handles "addons"', () => {
    const objects = [
      {
        name: 'Geruchsneutralisierung Partiel',
        single_price_gross: 20
      }
    ]

    const res = listPrice(objects)
    expect(res).toBe(20)
  })
  it('handles "abnehmbare Kissen klein"', () => {
    const objects = [
      {
        name: 'Sessel',
        single_price_gross: 49.0,
        removable_pillows_small: true,
        removable_pillows_large: false
      }
    ]

    const res = listPrice(objects)
    expect(res).toBe(49 + 20)
  })
  it('handles "abnehmbare Kissen groß"', () => {
    const objects = [
      {
        name: 'Sessel',
        single_price_gross: 49.0,
        removable_pillows_small: false,
        removable_pillows_large: true
      }
    ]

    const res = listPrice(objects)
    expect(res).toBe(49 + 40)
  })
})
