import React, { Component } from 'react';
import styles from './App.module.css';
import Layout from '../src/components/Layout/Layout'
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder'

class App extends Component {
  render() {
    return(
      // <div className={styles["App"]}>
      <div>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    )
  }
}

export default App;
