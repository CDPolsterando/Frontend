import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware'
import { SEARCH_PLZ } from './actionTypes'

const initialState = {
  standort_loading: false,
  standort_data: null,
  standort_error: null
}
function reducer(state = initialState, action) {
  // console.log(action)
  switch (action.type) {
    case `${SEARCH_PLZ}_${PENDING}`: {
      return { ...state, standort_loading: true }
    }
    case `${SEARCH_PLZ}_${REJECTED}`: {
      return {
        ...state,
        standort_loading: false,
        standort_error: action.payload
      }
    }
    case 'SEARCH_PLZ_FULFILLED': {
      return {
        ...state,
        standort_loading: false,
        standort_data: action.payload,
        standort_error: null
      }
    }
    default: {
      return state
    }
  }
}
export default reducer