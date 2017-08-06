// import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware'
import {
  SCRIPTS_START,
  SCRIPTS_END,
  SCRIPTS_ERROR,
  CONSTANTS_START,
  CONSTANTS_END,
  CONSTANTS_ERROR,
  DISCOUNTS_END,
  DISCOUNTS_ERROR,
  DISCOUNTS_START,
  PRODUCTS_END,
  PRODUCTS_ERROR,
  PRODUCTS_START,
  __CLEAR_NETWORK__
} from './actionTypes'

const initialState = {
  constants: null,
  constants_loading: false,
  constants_error: null,

  discounts: null,
  discounts_loading: false,
  discounts_error: null,

  scripts: null,
  scripts_loading: false,
  scripts_error: null,

  products: null,
  products_loading: false,
  products_error: null

  // - - - old - - - //

  // standort_loading: false,
  // // standort_data: null,
  // standort_error: null
}
function reducer(state = initialState, action) {
  switch (action.type) {
    case __CLEAR_NETWORK__: {
      return initialState
    }

    // - - - - constants - - - - //
    case CONSTANTS_START: {
      return {
        ...state,
        constants_loading: true
      }
    }
    case CONSTANTS_END: {
      return {
        ...state,
        constants_loading: false,
        constants: action.constants
      }
    }
    case CONSTANTS_ERROR: {
      return {
        ...state,
        constants_loading: false,
        constants_error: action.error
      }
    }

    // - - - - discounts - - - - //
    case DISCOUNTS_START: {
      return {
        ...state,
        discounts_loading: true
      }
    }
    case DISCOUNTS_END: {
      return {
        ...state,
        discounts_loading: false,
        discounts: action.discounts
      }
    }
    case DISCOUNTS_ERROR: {
      return {
        ...state,
        discounts_loading: false,
        discounts_error: action.error
      }
    }

    // - - - - scripts - - - - //
    case SCRIPTS_START: {
      return {
        ...state,
        scripts_loading: true
      }
    }
    case SCRIPTS_END: {
      return {
        ...state,
        scripts_loading: false,
        scripts: action.scripts
      }
    }
    case SCRIPTS_ERROR: {
      return {
        ...state,
        scripts_loading: false,
        scripts_error: action.error
      }
    }

    // - - - - products - - - - //
    case PRODUCTS_START: {
      return {
        ...state,
        products_loading: true
      }
    }
    case PRODUCTS_END: {
      return {
        ...state,
        products_loading: false,
        products: action.products
      }
    }
    case PRODUCTS_ERROR: {
      return {
        ...state,
        products_loading: false,
        products_error: action.error
      }
    }

    // case 'STANDORT_BERECHNEN': {
    //   return { standort_loading: true, standort_error: null }
    // }
    // case 'STANDORT_FERTIG': {
    //   // TODO
    //   return { standort_loading: false, standort_error: null }
    // }
    // case 'STANDORT_FEHLER': {
    //   return { standort_loading: false, standort_error: action.error }
    // }

    // case `${SEARCH_PLZ}_${PENDING}`: {
    //   return { ...state, standort_loading: true }
    // }
    // case `${SEARCH_PLZ}_${REJECTED}`: {
    //   return {
    //     ...state,
    //     standort_loading: false,
    //     standort_error: action.payload
    //   }
    // }
    // case 'SEARCH_PLZ_FULFILLED': {
    //   return {
    //     ...state,
    //     standort_loading: false,
    //     standort_data: action.payload,
    //     standort_error: null
    //   }
    // }
    default: {
      return state
    }
  }
}
export default reducer
