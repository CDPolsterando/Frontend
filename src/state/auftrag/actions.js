import {
  CHANGE_NAME,
  CHANGE_PLZ,
  ADD_OBJECT,
  CHANGE_OBJECT,
  REMOVE_OBJECT,
  CHANGE_AUSGEHANDELTER_PREIS,
  CHANGE_STANDORT
} from './actionTypes'

export const changeName = name => ({
  type: CHANGE_NAME,
  name
})

export const changePlz = plz => ({
  type: CHANGE_PLZ,
  plz
})

export const changeStandort = ({ fahrzeit, fahrstrecke }) => ({
  type: CHANGE_STANDORT,
  fahrzeit,
  fahrstrecke
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
