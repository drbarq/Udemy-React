import React, { Component, useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import asyncComponent from '../src/hoc/asyncComponent/asyncComponent'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder'
// import Checkout from './containers/Checkout/Checkout'
// import Orders from './containers/Orders/Orders'
// import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
})
const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders')
})
const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
})

const App = props => {

   useEffect(() => {
      props.onTryAutoSignup()
    }, [])

    let routes = (
      <Switch>
        {/* <Route path="/auth" component={asyncAuth}/> */}
        <Route path="/auth" render={(props) => <Auth {...props}/>}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
    )

    if (props.isAuthenticated) {
      routes = (
          <Switch>
            <Route path="/checkout" render={(props) => <Checkout {...props}/>}/>
            <Route path="/orders" render={(props) => <Orders {...props}/>}/>
            <Route path="/logout" component={Logout}/>
            {/* <Route path="/auth" component={asyncAuth}/> */}
            <Route path="/auth" render={(props) => <Auth {...props}/>}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/" />
        </Switch>
      )
    }

    return(
      <div>
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>
            {routes}
          </Suspense>
        </Layout>
      </div>
    )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()) 
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
// export default withRouter(connect(null, mapDispatchToProps)(App))
// export default connect(null, mapDispatchToProps)(App)


// <BurgerBuilder />
// <Checkout />


      // <div className={styles["App"]}>


        // state = {
  //   show: true
  // }


            /* {this.state.show ? <BurgerBuilder /> : null } */
  // componentDidMount = () => {
  //   setTimeout(() => {
  //     this.setState({show: false})
  //   }, 5000)
  // }


  {/* <Route path="/auth" component={Auth}/> */}        {/* <Route path="/auth" component={Auth}/> */}

              {/* <Route path="/orders" component={Orders}/> */}
                          {/* <Route path="/checkout" component={Checkout}/> */}

// async is replaced with hooks
// const asyncCheckout = asyncComponent(() => {
//   return import('./containers/Checkout/Checkout')
// })
// const asyncOrders = asyncComponent(() => {
//   return import('./containers/Orders/Orders')
// })
// const asyncAuth = asyncComponent(() => {
//   return import('./containers/Auth/Auth')
// })
// react 16.6 reaplces the hoc of async