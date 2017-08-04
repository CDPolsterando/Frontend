import React from 'react'
import StoryRouter from 'storybook-router'
import './index.css'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Button, Welcome } from '@storybook/react/demo'
import Login from '../components/Login'
import LoginForm from '../components/Login/form'
import Modal from '../components/Modal'
import Requirements from '../components/Requirements'
import Topbar from '../components/Topbar/topbar'
import Bottombar from '../components/Bottombar/'
import Customer from '../components/_Steps/Customer'
import ObjectsCatalog from '../components/_Steps/Objects/Catalog'
import SavedObjects from '../components/_Steps/Objects/Saved'
import Data from '../components/Data'

storiesOf('Data', module)
  .add('no data', () => {
    const network = {
      scripts: null,
      scripts_loading: false,
      scripts_error: null
    }
    const keys = ['scripts']
    return <Data network={network} keys={keys} />
  })
  .add('loading', () => {
    const network = {
      scripts: null,
      scripts_loading: true,
      scripts_error: null
    }
    const keys = ['scripts']
    return <Data network={network} keys={keys} />
  })
  .add('error', () => {
    const network = {
      scripts: null,
      scripts_loading: false,
      scripts_error: new Error('some error message')
    }
    const keys = ['scripts']
    return <Data network={network} keys={keys} />
  })
  .add('with data', () => {
    const network = {
      scripts: {},
      scripts_loading: false,
      scripts_error: null
    }
    const keys = ['scripts']
    return <Data network={network} keys={keys} />
  })
  .add('mutiple', () => {
    const network = {
      scripts: null,
      scripts_loading: false,
      scripts_error: null,

      discounts: null,
      discounts_loading: true,
      discounts_error: null
    }
    const keys = ['scripts', 'discounts']
    return <Data network={network} keys={keys} />
  })

const catalog = [
  {
    name: 'Polstermöbel',
    products: [
      {
        name: 'Sessel',
        single_price_net: 41.18,
        single_price_gross: 49.0,
        single_time: 45
        // einzelpreis_netto: 41.18,
        // einzelpreis_brutto: 49.0,
        // einzelzeit: 45
      }
    ]
  }
]
const saved = [
  {
    key: '1234',
    name: 'Sessel',
    single_price_net: 41.18,
    single_price_gross: 49.0,
    single_time: 45,
    removable_pillows_small: null,
    removable_pillows_large: null
  },
  {
    key: '5678',
    name: 'Sessel',
    single_price_net: 41.18,
    single_price_gross: 49.0,
    single_time: 45,
    removable_pillows_small: null,
    removable_pillows_large: true
  }
]
storiesOf('Steps/Objects', module).add('both', () => {
  return (
    <div style={{ display: 'flex' }}>
      <ObjectsCatalog addObject={action('addObject')} categories={catalog} />
      <SavedObjects objects={saved} removeObject={action('removeObject')} />
    </div>
  )
})
storiesOf('Steps/Objects/Catalog', module).add('default', () => {
  return <ObjectsCatalog addObject={action('addObject')} categories={catalog} />
})
storiesOf('Steps/Objects/Saved', module)
  .add('no items', () => {
    return <SavedObjects objects={[]} removeObject={action('removeObject')} />
  })
  .add('2 items', () => {
    return (
      <SavedObjects objects={saved} removeObject={action('removeObject')} />
    )
  })

storiesOf('Steps/Customer', module)
  // .addDecorator(StoryRouter())
  .add('default', () =>
    <Customer
      name="Johannes"
      zip={1234}
      changeName={action('changeName')}
      changeZip={action('changeZip')}
    />
  )

storiesOf('Topbar', module)
  .addDecorator(StoryRouter())
  .add('default', () =>
    <Topbar state={{ auftrag: { name: 'Johannes', plz: 1234, objekte: [] } }} />
  )

storiesOf('Login', module)
  .add('with State', () => <Login />)
  .add('not filled out', () => <LoginForm />)
  .add('submited', () => <LoginForm loading={true} />)
  .add('with success', () => <LoginForm success={true} />)
  .add('with error', () => <LoginForm error={'Wrong username or password'} />)

storiesOf('Modal', module)
  .add('closed', () => <Modal open={false}>Hi</Modal>)
  .add('open (Login)', () =>
    <Modal open={true} modal={() => <Login />}>
      Hi
    </Modal>
  )
  .add('open (Requirements)', () =>
    <Modal
      open={true}
      modal={() => <Requirements text="Name & Plz need to be filled out!" />}
    >
      Hi
    </Modal>
  )

storiesOf('Welcome', module).add('to Storybook', () =>
  <Welcome showApp={linkTo('Button')} />
)

storiesOf('Button', module)
  .add('with text', () =>
    <Button onClick={action('clicked')}>Hello Button</Button>
  )
  .add('with some emoji', () =>
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  )
