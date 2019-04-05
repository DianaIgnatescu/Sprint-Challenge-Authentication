import React, { Component } from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Jokes from './components/Jokes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/jokes">HOME</NavLink>
          <NavLink to="/sign-in">SIGN IN</NavLink>
          <NavLink to="/sign-up">SIGN UP</NavLink>
          <button type="submit">SIGN OUT</button>
        </nav>

      </div>
    );
  }
}

export default App;
