import { NavLink } from 'react-router-dom'

const Button = ({ children, to, activeClassName }) =>
  <NavLink to={to} activeClassName={activeClassName}>
    {children}
  </NavLink>

// const routes = ['kunde', 'objekte', 'preis', 'fertig']

// export const ZurueckButton = ({ children, from }) => {
//   const index = routes.find(e => e === from)

//   const previous = routes[index - 1]
//   const next = routes[index + 1]

//   return (
//     <Button to={'/'}>
//       {children}
//     </Button>
//   )
// }
export default Button
