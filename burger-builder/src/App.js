import React, { Component } from 'react';
import styles from './App.module.css';
import Layout from '../src/components/Layout/Layout'

class App extends Component {
  render() {
    return(
      // <div className={styles["App"]}>
      <div>
        <Layout>
          <p>Test</p>
        </Layout>
      </div>
    )
  }
}

export default App;
