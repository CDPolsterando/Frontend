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
  // CHANGE_PLZ,
  ADD_OBJECT,
  CHANGE_OBJECT,
  REMOVE_OBJECT,
  // CHANGE_AUSGEHANDELTER_PREIS,
  // CHANGE_STANDORT,
  // CHANGE_NOTIZ,
  __CLEAR_CONTRACT__,
  CHANGE_DRIVING_INFO,
  CHANGE_NEGOTIATED_PRICE,
  CHANGE_NOTE,
  CHANGE_ZIP
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
  zip: null,
  objects: [],
  note: '',

  driving_duration: null,
  driving_distance: null,
  negotiated_price: null
  // TODO: city
}
function reducer(state = initialState, action) {
  switch (action.type) {
    case __CLEAR_CONTRACT__: {
      return initialState
    }
    case CHANGE_DRIVING_INFO: {
      const { driving_distance, driving_duration } = action
      return {
        ...state,
        driving_distance,
        driving_duration
      }
    }
    case CHANGE_NEGOTIATED_PRICE: {
      return {
        ...state,
        negotiated_price: action.negotiated_price
      }
    }
    case CHANGE_NAME: {
      return { ...state, name: action.name }
    }
    case CHANGE_ZIP: {
      const zip = parseInt(action.zip, 10)
      return { ...state, zip }
    }
    case ADD_OBJECT: {
      return {
        ...state,
        objects: [...state.objects, { ...action.object, key: guid() }]
      }
    }
    case CHANGE_OBJECT: {
      return {
        ...state,
        objects: state.objects.map((object, index) => {
          if (action.index === index) {
            return action.object
          }
          return object
        })
      }
    }
    case REMOVE_OBJECT: {
      return {
        ...state,
        objects: state.objects.filter((object, index) => {
          return action.index !== index
        })
      }
    }
    case CHANGE_NOTE: {
      return {
        ...state,
        note: action.note
      }
    }
    default: {
      return state
    }
  }
}

export default reducer
