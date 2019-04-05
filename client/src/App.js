import React, { Component } from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Jokes from './components/Jokes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: {
        username: '',
        password: '',
      },
      signUp: {
        username: '',
        password: '',
      },
      jokes: [],
      signedIn: false,
    };
  }

  handleSignInChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      signIn: {...this.state.signIn, [name]: value}
    });
  };

  handleSignIn = (event) => {
    event.preventDefault();
    axios
        .post('http://localhost:3300/api/login', this.state.signIn)
        .then(response => {
          localStorage.setItem('token', response.data.token);
          this.setState({ signedIn: true });
          this.props.history.push('/jokes');
        })
        .catch((error) => console.log(error));
  };

  render() {
    const { signIn, signedIn } = this.state;
    return (
      <div className="App">
        <nav>
          <NavLink to="/jokes">HOME</NavLink>
          <NavLink to="/sign-in">SIGN IN</NavLink>
          <NavLink to="/sign-up">SIGN UP</NavLink>
          <button type="submit">SIGN OUT</button>
        </nav>

        <main>
          <Route exact path="/sign-in" render={(props) =>
            <SignIn
                {...props}
                signIn={signIn}
                signedIn={signedIn}
                handleSignInChange={this.handleSignInChange}
                handleSignIn={this.handleSignIn}
            />}
          />
          <Route path="/sign-up" component={SignUp}/>
          <Route path="/jokes" component={Jokes}/>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
