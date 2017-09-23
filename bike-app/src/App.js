import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import '../../webtracking-experience/dist/track'
//const google = window.google;


class App extends Component {


    componentWillMount() {
        const script = document.createElement("script");

    }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
        </p>
        <iframe src="https://dashboard.hypertrack.com/widget/map/users?key=sk_db6787abee7cea2afc14fbc746c15fd110954caa" width="800" height="800"></iframe>
      </div>
    );
}
}

//AIzaSyC7jHD7-xQvGso8VRuSVSZqy08dJZvC8_o


export default App;
