import { SEARCH_PLZ } from './actionTypes'

export const searchForPlz = plz => ({
  type: SEARCH_PLZ,
  payload: fetch('http://192.168.8.100:5010/dis?zip=' + plz)
    .then(res => res.text())
    .then(res => {
      console.log('res: ', res)
    })
})
