import React from 'react'

import Home from './components/Home'

import Customer from './components/_Steps/Customer'
import ObjectsCatalog from './components/_Steps/Objects/Catalog'
import SavedObjects from './components/_Steps/Objects/Saved'

import PriceList from './components/_Steps/Price/List'
import Calculator from './components/Calculator'
import MinimumPrice from './components/_Steps/Price/Minimum'
import SetPrice from './components/_Steps/Price/Set'

import FinishText from './components/_Steps/Finish/Text'
import FinishOptions from './components/_Steps/Finish/Options'

import Script from './components/Script'
import {
  changeName,
  changeZip,
  addObject,
  removeObject,
  changeObject,
  changeNegotiatedPrice,
  changeNote
} from './state/contract/actions'
import listPrice from './logic/listPrice'
import listTime from './logic/listTime'
import { priceFromMargin } from './logic/price'
import services from './services'

export default [
  // - - - - - Home - - - - - //
  {
    path: '/',
    name: 'Home',
    exact: true,
    main: () => <Home />
  },
  // - - - - - Customer - - - - - //
  {
    path: '/step/Kunde',
    name: 'Kunde',
    requirementsText: 'Brauche nichts.',
    requirements: state => true,
    finished: state => {
      const { name, zip } = state.contract
      // TODO standort_loading
      if (name && String(zip).length === 5) return true

      return false
    },
    left: ({ state, dispatch }) => {
      const { name, zip } = state.contract

      return (
        <Customer
          name={name}
          zip={zip}
          changeName={name => dispatch(changeName(name))}
          changeZip={zip => {
            if (zip.length === 5) {
              services.getDrivingInfo()
            }
            dispatch(changeZip(zip))
          }}
        />
      )
    },
    right: () => <Script name="step_customer" />,
    topbar: true
  },
  // - - - - - Objects - - - - - //
  {
    path: '/step/Objekte',
    name: 'Objekte',
    containerWidth: 95,
    requirementsText: '/',
    requirements: state => true,
    finished: state => {
      const { objects } = state.contract
      if (objects.length > 0) return true
      return false
    },
    topbar: true,
    left: ({ dispatch }) => {
      const catalog = [
        {
          name: 'Polstermöbel',
          products: [
            {
              name: 'Sessel',
              single_price_net: 41.18,
              single_price_gross: 49.0,
              single_time: 45
            }
          ]
        }
      ]
      return (
        <ObjectsCatalog
          categories={catalog}
          addObject={object => dispatch(addObject(object))}
        />
      )
    },
    right: ({ state, dispatch }) => {
      const { objects } = state.contract
      return (
        <SavedObjects
          objects={objects}
          removeObject={index => dispatch(removeObject(index))}
          changeObject={(object, index) =>
            dispatch(changeObject(object, index))}
          total_price={listPrice(objects)}
          total_time={0}
        />
      )
    }
  },
  // - - - - - Cleaning Process - - - - - //
  {
    path: '/step/Reinigung',
    name: 'Reinigung', // Reinigungsverfahren
    topbar: true,
    left: () => null,
    right: () => <Script name="step_cleaning" />
  },
  // - - - - - Price - - - - - //
  {
    path: '/step/Preis',
    name: 'Preis',
    topbar: true,
    requirementsText: `
objects.length > 0
constants
driving_distance > 0
driving_duration > 0
`,
    requirements: state => {
      const { objects, driving_duration, driving_distance } = state.contract

      const { constants, constants_loading, constants_error } = state.network

      if (
        objects.length > 0 &&
        (!constants_error && !constants_loading && constants) &&
        (driving_distance > 0 && driving_duration > 0)
      )
        return true
      return false
    },
    finished: state => {
      return state.contract.negotiated_price > 0
    },
    left: ({ state }) => {
      const { objects, driving_duration, driving_distance } = state.contract
      const { constants } = state.network
      return (
        <div style={{ padding: '10px 20px' }}>
          <PriceList objects={objects} />
          <Calculator
            constants={constants}
            variables={{
              driving_duration,
              driving_distance,
              work_duration: listTime(objects)
            }}
          />
        </div>
      )
    },
    right: ({ dispatch, state }) => {
      const {
        objects,
        driving_duration,
        driving_distance,
        negotiated_price
      } = state.contract
      const { constants } = state.network
      const variables = {
        driving_duration,
        driving_distance,
        work_duration: listTime(objects)
      }
      const minimumPrice = priceFromMargin(constants, variables, 0.05)
      return (
        <div style={{ padding: '10px 20px' }}>
          <MinimumPrice price={minimumPrice.toFixed(2)} />
          <hr />
          <SetPrice
            negotiated_price={negotiated_price}
            changeNegotiatedPrice={price =>
              dispatch(changeNegotiatedPrice(price))}
          />
        </div>
      )
    }
    // right: () => <Script name="step_cleaning" />
  },
  // - - - - - (Finish) - - - - - //
  {
    path: '/step/Fertig',
    name: 'Fertig',
    topbar: true,
    requirementsText: `
name
zip
driving_duration
driving_distance
negotiated_price > 0
objects.length > 0
`,
    requirements: state => {
      const {
        name,
        zip,
        driving_duration,
        driving_distance,
        negotiated_price,
        objects
      } = state.contract

      if (
        name &&
        zip &&
        driving_duration &&
        driving_distance &&
        negotiated_price > 0 &&
        objects.length > 0
      )
        return true
      return false
    },
    left: ({ state, dispatch }) => {
      return (
        <FinishOptions
          changeNote={note => dispatch(changeNote(note))}
          {...state.contract}
        />
      )
    },
    right: ({ state }) => {
      return <FinishText contract={state.contract} />
    }
  }
]
