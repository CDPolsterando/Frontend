import listOfObjects from './listOfObjects'

describe('listOfObjects', () => {
  it('handles "2 x Sessel"', () => {
    const input = [
      {
        name: 'Sessel'
      },
      {
        name: 'Sessel'
      }
    ]
    const result = listOfObjects(input)
    expect(result).toBe('2 x Sessel')
  })
  it('handles "1 Teppich 2qm & 1 Teppich 4qm"', () => {
    const input = [
      {
        name: 'Teppich',
        qm: 2
      },
      {
        name: 'Teppich',
        qm: 4
      }
    ]
    const result = listOfObjects(input)
    expect(result).toBe(`1 x Teppich (2 qm)
1 x Teppich (4 qm)`)
  })
})
