import {
  CHANGE_NAME,
  ADD_OBJECT,
  CHANGE_OBJECT,
  REMOVE_OBJECT,
  CHANGE_DRIVING_INFO,
  CHANGE_NEGOTIATED_PRICE,
  CHANGE_ZIP,
  CHANGE_NOTE
} from './actionTypes'

export const changeName = name => ({
  type: CHANGE_NAME,
  name
})

export const changeZip = zip => ({
  type: CHANGE_ZIP,
  zip
})

export const addObject = object => ({
  type: ADD_OBJECT,
  object
})
export const changeObject = (object, index) => ({
  type: CHANGE_OBJECT,
  object,
  index
})
export const removeObject = index => ({
  type: REMOVE_OBJECT,
  index
})
export const changeNote = note => ({
  type: CHANGE_NOTE,
  note
})

export const changeDrivingInfo = ({ driving_distance, driving_duration }) => ({
  type: CHANGE_DRIVING_INFO,
  driving_distance,
  driving_duration
  // TODO: city
})
export const changeNegotiatedPrice = negotiated_price => ({
  type: CHANGE_NEGOTIATED_PRICE,
  negotiated_price
})
