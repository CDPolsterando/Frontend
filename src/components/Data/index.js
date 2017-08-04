import React from 'react'
import services from '../../services'
import './index.css'

const CheckIcon = () =>
  <svg
    className="dataloading__finished"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>

// const CheckIcon = () =>
//   <svg
//     className="dataloading__finished"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//   >
//     <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
//   </svg>

const ErrorIcon = () =>
  <svg
    className="dataloading__error"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>

const LoadingIcon = () => <div className="dataloading__loading" />

const RefreshIcon = () =>
  <svg
    className="dataloading__refresh"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
  </svg>

const QuestionIcon = () =>
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
  </svg>

const Swap = ({ first: First, second: Second, onClick }) =>
  <span onClick={onClick} className="dataloading__swap">
    <span>
      <First />
    </span>
    <span>
      <Second />
    </span>
  </span>
const Data = ({ network, keys }) =>
  <ul className="dataloading">
    {keys.map(key => {
      const loading = network[key + '_loading']
      const error = network[key + '_error']
      const data = network[key]

      const load = services.load[key]

      let state
      if (loading) {
        state = <LoadingIcon />
      } else if (error) {
        state = <ErrorIcon />
      } else if (data) {
        state = <Swap onClick={load} first={CheckIcon} second={RefreshIcon} />
      } else {
        state = (
          <Swap onClick={load} first={QuestionIcon} second={RefreshIcon} />
        )
      }

      return (
        <li key={key}>
          <span className="dataloading__key">{key}</span> {state}
        </li>
      )
    })}
  </ul>
export default Data
