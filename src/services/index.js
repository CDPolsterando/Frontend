import {
  SCRIPTS_START,
  SCRIPTS_END,
  CONSTANTS_END,
  CONSTANTS_START,
  DISCOUNTS_START,
  DISCOUNTS_END,
  PRODUCTS_END,
  PRODUCTS_START
} from '../state/network/actionTypes'
import { changeDrivingInfo } from '../state/auftrag/actions'
import { store } from '../App'

class ServicesMock {
  constructor(baseUrl) {
    this._username = localStorage.getItem('username')
    this._access_token = localStorage.getItem('access_token')
  }
  get isAuthenticated() {
    return this._access_token ? true : false
  }
  get username() {
    return this._username
  }

  get load() {
    return {
      scripts: this.getScripts,
      products: this.getProducts,
      constants: this.getConstants,
      discounts: this.getDiscounts
      // TODO: products
    }
  }
  // authenticate
  signout() {
    this._access_token = null
    localStorage.removeItem('access_token')

    this._username = null
    localStorage.removeItem('username')
  }

  getToken({ username, password }) {
    this._username = username
    localStorage.setItem('username', username)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const access_token = 'xyz'

        this._access_token = access_token
        localStorage.setItem('access_token', access_token)
        resolve({ access_token })
      }, 2000)
    })
  }
  getDrivingInfo() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const drivingInfo = {
          driving_distance: 10, // km
          driving_duration: 8 // minutes
        }

        store.dispatch(changeDrivingInfo(drivingInfo))
        resolve(drivingInfo)
      }, 3000)
    })
  }
  getProducts() {
    let products = [
      {
        name: 'Polstermöbel',
        products: [
          {
            name: 'Sessel'
          }
        ]
      }
    ]
    store.dispatch({
      type: PRODUCTS_START
    })

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(products)
        store.dispatch({
          type: PRODUCTS_END,
          products
        })
      }, 1200)
    })
  }
  getScripts() {
    let scripts = {
      step_customer: 'Skript für "Kunde"',
      step_cleaning: 'Skript für "Reinigung"'
    }
    store.dispatch({
      type: SCRIPTS_START
    })

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(scripts)
        store.dispatch({
          type: SCRIPTS_END,
          scripts
        })
      }, 1000)
    })
  }
  getConstants() {
    // const konstanten = {
    //   // alle einheiten in euro
    //   stundensatz_fahrt: 10,
    //   stundensatz_arbeit: 15,
    //   pauschal_nacharbeit: 5,
    //   pauschal_reinigunsmittel: 15,
    //   cost_per_order: 45,
    //   spritpreis_pro_km: 0.16,

    //   mindest_marge: 0.05 // also 5%
    // }

    let constants = {
      wage_ride: 10,
      wage_work: 15,

      flat_rate_extra_work: 5,
      flat_rate_cleaning_supplies: 15,

      cost_per_order: 45,
      price_per_kilometer: 0.16,

      minimum_margin: 0.05 // 5%
    }
    store.dispatch({
      type: CONSTANTS_START
    })

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(constants)
        store.dispatch({
          type: CONSTANTS_END,
          constants
        })
      }, 1000)
    })
  }
  getDiscounts() {
    let discounts = []
    store.dispatch({
      type: DISCOUNTS_START
    })

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(discounts)
        store.dispatch({
          type: DISCOUNTS_END,
          discounts
        })
      }, 1000)
    })
  }
}

class Services {
  constructor(baseUrl) {
    this._base = baseUrl + '/api'
    this._access_token = null
  }
  get isAuthenticated() {
    return this._access_token ? true : false
  }
  getToken({ username, password }) {
    return fetch(this._base + '/auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this._access_token = res.access_token
        return res.access_token
      })
  }
  getProducts() {
    if (!this._access_token) return Promise.reject('access_token not set')
    return fetch(this._base + '/products', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + this._access_token
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        return res
      })
  }
}

// export default new Services('https://example.com')
export default new ServicesMock()
