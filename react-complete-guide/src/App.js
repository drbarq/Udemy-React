import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <Person name="max" age="30" />
        <Person name="Joe" age="45">My Hobbies are Racings</Person>
        <Person name="john" age="23"/>
      </div>
    );
  }
}

export default App;
