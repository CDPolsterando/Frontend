import {
  CHANGE_NAME,
  CHANGE_PLZ,
  ADD_OBJECT,
  CHANGE_OBJECT,
  REMOVE_OBJECT
} from './actionTypes'

export const changeName = name => ({
  type: CHANGE_NAME,
  name
})

export const changePlz = plz => ({
  type: CHANGE_PLZ,
  plz
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
