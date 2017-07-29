const runden = input => {
  if (input < 104.87) {
    return 109.87
  }

  let h = input % 10
  let y = input / 10

  if (h >= 4.87) {
    return Number(parseInt(y, 10) + '9.87')
  } else {
    return Number(parseInt(y - 1, 10) + '9.87')
  }
}
export default runden

// min 109.87
