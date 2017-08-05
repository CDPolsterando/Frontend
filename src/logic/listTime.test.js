import listTime from './listTime'

describe('listTime', () => {
  it('handles "1x Sessel"', () => {
    const objects = [
      {
        name: 'Sessel',
        single_time: 45
      }
    ]

    const res = listTime(objects)
    expect(res).toBe(45)
  })
  it('handles "2x Sessel"', () => {
    const objects = [
      {
        name: 'Sessel',
        single_time: 45
      },
      {
        name: 'Sessel',
        single_time: 45
      }
    ]

    const res = listTime(objects)
    expect(res).toBe(90)
  })
  it('handles "Teppich with qm"', () => {
    const objects = [
      {
        name: 'kleiner Teppich',
        single_time: 10,
        qm: 10
      }
    ]

    const res = listTime(objects)
    expect(res).toBe(100)
  })
  it('handles "addons"', () => {
    const objects = [
      {
        name: 'Geruchsneutralisierung Partiel',
        single_time: 15
      }
    ]

    const res = listTime(objects)
    expect(res).toBe(15)
  })
  it('handles "abnehmbare Kissen klein"', () => {
    const objects = [
      {
        name: 'Sessel',
        single_time: 45,
        removable_pillows_small: true,
        removable_pillows_large: false
      }
    ]

    const res = listTime(objects)
    expect(res).toBe(45 + 7)
  })
  it('handles "abnehmbare Kissen groß"', () => {
    const objects = [
      {
        name: 'Sessel',
        single_time: 45,
        removable_pillows_small: false,
        removable_pillows_large: true
      }
    ]

    const res = listTime(objects)
    expect(res).toBe(45 + 10)
  })
})
