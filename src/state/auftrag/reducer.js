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
  REMOVE_OBJECT,
  CHANGE_AUSGEHANDELTER_PREIS,
  CHANGE_STANDORT,
  CHANGE_NOTIZ,
  __CLEAR_CONTRACT__,
  CHANGE_DRIVING_INFO,
  CHANGE_NEGOTIATED_PRICE
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
  objekte: [],
  ausgehandelter_preis: null,
  fahrzeit: null,
  fahrstrecke: null,
  standort_stadt: null,
  notiz: '',

  driving_duration: null,
  driving_distance: null,
  negotiated_price: null
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

    // - - - //

    case CHANGE_NAME: {
      return { ...state, name: action.name }
    }
    case CHANGE_PLZ: {
      const plz = parseInt(action.plz, 10)
      return { ...state, plz }
    }
    case ADD_OBJECT: {
      return {
        ...state,
        objekte: [...state.objekte, { ...action.objekt, key: guid() }]
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
    case CHANGE_AUSGEHANDELTER_PREIS: {
      return { ...state, ausgehandelter_preis: action.preis }
    }
    case CHANGE_STANDORT: {
      return {
        ...state,
        fahrzeit: action.fahrzeit,
        fahrstrecke: action.fahrstrecke,
        standort_stadt: action.standort_stadt
      }
    }
    case CHANGE_NOTIZ: {
      return {
        ...state,
        notiz: action.notiz
      }
    }
    // case 'SEARCH_PLZ_FULFILLED': {
    //   return { ...state, standort_loading: false, standort_data: action.payload, standort_error: null }
    // }
    default: {
      return state
    }
  }
}

export default reducer
