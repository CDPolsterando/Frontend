import runden from './runden'

/*
297 -> 299.78

109,87

+
104,87
- - -
104,86
-

99,87


342 -> 340.78
*/

describe('runden', () => {
  it('can handle 297', () => {
    expect(runden(297)).toBe(299.87)
  })
  it('can handle 104,87', () => {
    expect(runden(104.87)).toBe(109.87)
  })
  it('can handle 104,86 (mindest)', () => {
    expect(runden(104.86)).toBe(109.87)
  })
  it('can handle 342', () => {
    expect(runden(342)).toBe(339.87)
  })
  it('can handle 92 (mindest(', () => {
    expect(runden(92)).toBe(109.87)
  })
  it('can handle 399,95', () => {
    expect(runden(399.95)).toBe(399.87)
  })
  it('can handle 237,35', () => {
    expect(runden(237.35)).toBe(239.87)
  })
  it('can handle 104,87', () => {
    expect(runden(104.87)).toBe(109.87)
  })
  it('can handle 104,86 (mindest)', () => {
    expect(runden(104.86)).toBe(109.87)
  })
  it('can handle 3 (mindest)', () => {
    expect(runden(3)).toBe(109.87)
  })
})

// 104.87
