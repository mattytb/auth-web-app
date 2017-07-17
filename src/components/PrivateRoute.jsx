import React  from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <Route {...rest}  render={(props) => {
          return this.props.loggedIn ? (
              <Component {...this.props} />
            ):(
              <Redirect to={{
                pathname: '/',
                state: { from: this.props.location }
              }} />
            )
        }
      } />
    )
  }
}

export default PrivateRoute;