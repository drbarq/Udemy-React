import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'

class App extends Component {

  render() {
    return(
      <div>
        <Layout>
          <BurgerBuilder />
          <Checkout />
        </Layout>
      </div>
    )
  }
}

export default App;


      // <div className={styles["App"]}>


        // state = {
  //   show: true
  // }


            {/* {this.state.show ? <BurgerBuilder /> : null } */}
  // componentDidMount = () => {
  //   setTimeout(() => {
  //     this.setState({show: false})
  //   }, 5000)
  // }
