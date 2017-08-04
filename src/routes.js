import React from 'react'

import Kunde from './components/_Neu/Kunde'
import Objekte from './components/_Neu/Objekte'
import Preis from './components/_Neu/Preis'
import Fertig from './components/_Neu/Fertig'

import Customer from './components/_Steps/Customer'
import ObjectsCatalog from './components/_Steps/Objects/Catalog'
import SavedObjects from './components/_Steps/Objects/Saved'

import Script from './components/Script'
import {
  changeName,
  changePlz,
  addObjekt,
  removeObjekt,
  changeObjekt
} from './state/auftrag/actions'
import listPrice from './logic/listPrice'

export default [
  // - - - - - Home - - - - - //
  {
    path: '/',
    name: 'Home',
    exact: true,
    main: () => <h2>Home</h2>
  },
  // - - - - - Customer - - - - - //
  {
    path: '/step/Kunde',
    name: 'Kunde',
    requirementsText: 'Brauche nichts.',
    requirements: state => true,
    finished: state => {
      const { name } = state.auftrag
      // TODO standort_loading
      if (name) return true

      return false
    },
    // step: true,
    left: ({ state, dispatch }) => {
      const { name, plz } = state.auftrag

      const changeZip = () => null

      return (
        <Customer
          name={name}
          zip={plz}
          changeName={name => dispatch(changeName(name))}
          changeZip={zip => dispatch(changePlz(zip))}
        />
      )
    },
    right: () => <Script name="step_kunde" />,
    // right: () => <Script />,

    topbar: true
    // main: () => <Kunde />
  },
  // - - - - - Objects - - - - - //
  {
    path: '/step/Objekte',
    name: 'Objekte',
    requirementsText: 'Brauche nichts.',
    requirements: state => true,
    finished: state => {
      const { objekte } = state.auftrag
      if (objekte.length >= 1) return true
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
          addObject={object => dispatch(addObjekt(object))}
        />
      )
    },
    right: ({ state, dispatch }) => {
      const { objekte } = state.auftrag
      return (
        <SavedObjects
          objects={objekte}
          removeObject={index => dispatch(removeObjekt(index))}
          changeObject={(object, index) =>
            dispatch(changeObjekt(object, index))}
          total_price={listPrice(objekte)}
          total_time={0}
        />
      )
    }
    // main: () => <Objekte />
  },
  // - - - - - Cleaning Process - - - - - //
  {
    path: '/step/Verfahren',
    name: 'Reinigung', // Reinigungsverfahren
    topbar: true,
    main: () => null
  },
  // - - - - - Price - - - - - //
  {
    path: '/step/Preis',
    name: 'Preis',
    requirementsText: `- name
- plz für fahrzeit & fahrstrecke
- zu reinigende objekte
`,
    requirements: state => {
      const { name, plz, objekte } = state.auftrag

      if (plz && name && objekte.length >= 1) return true
      return false
    },
    finished: state => {
      const { ausgehandelter_preis } = state.auftrag
      if (ausgehandelter_preis) return true
      return false
    },
    topbar: true,
    main: () => <Preis />
  },
  // - - - - - (Finish) - - - - - //
  {
    path: '/step/Fertig',
    name: 'Fertig',
    requirementsText: 'ausgehandelter_preis needs to be set',
    requirements: state => {
      const { ausgehandelter_preis, name } = state.auftrag
      if (ausgehandelter_preis && name) return true
      return false
    },
    finished: state => {
      // const { objekte } = state.auftrag
      // if (objekte.length >= 1) return true
      return false
    },
    topbar: true,
    main: () => <Fertig />

    // TODO: what about dynamically changing the width
    // left: () => null,
    // right: ({state}) => null (normally script)
    // container: () => ?!
  }
]
