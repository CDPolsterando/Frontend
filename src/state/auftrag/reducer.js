// function counter(state = 0, action) {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1
//     case 'DECREMENT':
//       return state - 1
//     default:
//       return state
//   }
// }
import {
  CHANGE_NAME,
  CHANGE_PLZ,
  ADD_OBJECT,
  CHANGE_OBJECT,
  REMOVE_OBJECT
} from './actionTypes'

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  }
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  )
}

const initialState = {
  name: null,
  plz: null,
  objekte: []
}
function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_NAME: {
      return {
        ...state,
        name: action.name
      }
    }
    case CHANGE_PLZ: {
      const plz = parseInt(action.plz, 10)
      return {
        ...state,
        plz
      }
    }
    case ADD_OBJECT: {
      return {
        ...state,
        objekte: [
          ...state.objekte,
          {
            ...action.objekt,
            key: guid()
          }
        ]
      }
    }
    case CHANGE_OBJECT: {
      return {
        ...state,
        objekte: state.objekte.map((objekt, index) => {
          if (action.index === index) {
            return action.objekt
          }
          return objekt
        })
      }
    }
    case REMOVE_OBJECT: {
      return {
        ...state,
        objekte: state.objekte.filter((objekt, index) => {
          return action.index !== index
        })
      }
    }
    default: {
      return state
    }
  }
}

export default reducer
