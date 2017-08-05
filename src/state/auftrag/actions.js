import {
  CHANGE_NAME,
  CHANGE_PLZ,
  ADD_OBJECT,
  CHANGE_OBJECT,
  REMOVE_OBJECT,
  CHANGE_AUSGEHANDELTER_PREIS,
  CHANGE_STANDORT,
  CHANGE_NOTIZ,
  CHANGE_DRIVING_INFO,
  CHANGE_NEGOTIATED_PRICE
} from './actionTypes'

export const changeName = name => ({
  type: CHANGE_NAME,
  name
})

export const changePlz = plz => ({
  type: CHANGE_PLZ,
  plz
})

export const changeStandort = ({ fahrzeit, fahrstrecke, standort_stadt }) => ({
  type: CHANGE_STANDORT,
  fahrzeit,
  fahrstrecke,
  standort_stadt
})

export const addObjekt = objekt => ({
  type: ADD_OBJECT,
  objekt
})
export const changeObjekt = (objekt, index) => ({
  type: CHANGE_OBJECT,
  objekt,
  index
})
export const removeObjekt = index => ({
  type: REMOVE_OBJECT,
  index
})
export const changeAusgehandelterPreis = preis => ({
  type: CHANGE_AUSGEHANDELTER_PREIS,
  preis
})

export const changeNotiz = notiz => ({ type: CHANGE_NOTIZ, notiz })

// - - - //

export const changeDrivingInfo = ({ driving_distance, driving_duration }) => ({
  type: CHANGE_DRIVING_INFO,
  driving_distance,
  driving_duration
})
export const changeNegotiatedPrice = negotiated_price => ({
  type: CHANGE_NEGOTIATED_PRICE,
  negotiated_price
})
