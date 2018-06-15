import React, { Component } from 'react';
import './App.css';
import Invitationforbid from './components/Invitationforbid';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

class App extends Component {
  render() {
    return (
      <div className="App"> 
          <Invitationforbid />
      </div>
    );
  }
}

export default App;
